---
name: three-js
description: Three.js and React Three Fiber (R3F) for WebGL in the browser. Use when the user asks for 3D, WebGL, a canvas scene, shaders, GLTF/GLB models, particles, `useFrame`, `@react-three/fiber`, `@react-three/drei`, camera/lighting/material setup, or "make this section 3D". Covers vanilla Three.js, the R3F React bindings, Next.js App Router integration, disposal/memory leaks, and performance budgets.
---

# Three.js / React Three Fiber

Three.js is the WebGL renderer. **React Three Fiber** (`@react-three/fiber`) is a
React reconciler for it — same objects, same performance, expressed as JSX. In a
React or Next.js project, use R3F; drop to vanilla Three only for a standalone
canvas outside React.

```bash
npm i three
npm i @react-three/fiber @react-three/drei   # React
npm i -D @types/three
```

`@react-three/drei` is the helper library (controls, loaders, environments,
shaders). Reach for it before hand-rolling — `OrbitControls`, `Environment`,
`useGLTF`, `Html`, `Float`, `Text` cover most needs.

## Next.js App Router

The canvas is client-only and heavy. Mark the component `"use client"`, and
import it from the page with `ssr: false` so Three is not in the server bundle:

```tsx
// app/page.tsx  (server component)
import dynamic from "next/dynamic"
const Scene = dynamic(() => import("@/components/scene"), { ssr: false })
```

`next/dynamic` with `ssr: false` is only allowed in a client component in newer
Next versions — if it errors, put the `dynamic()` call in a small `"use client"`
wrapper. Always render a sized placeholder while it loads, or the page jumps.

## R3F: the shape of a scene

```tsx
"use client"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { useRef, Suspense } from "react"
import type { Mesh } from "three"

function Box() {
  const ref = useRef<Mesh>(null)
  useFrame((state, delta) => {
    ref.current!.rotation.y += delta * 0.5   // delta, never a fixed step
  })
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#8855ff" roughness={0.3} />
    </mesh>
  )
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <Suspense fallback={null}>
        <Box />
        <Environment preset="city" />
      </Suspense>
      <OrbitControls enablePan={false} />
    </Canvas>
  )
}
```

Key conventions:

- Every Three class is a JSX element in camelCase: `<meshStandardMaterial />`.
  Constructor arguments go in `args={[...]}`; **changing `args` rebuilds the
  object**, so keep them static or memoize.
- Any nested property is set with dashes: `position-x={2}`,
  `material-color="red"`, `rotation-y={Math.PI}`.
- `<Canvas>` must have a parent with an explicit height. A `100%`-height canvas
  inside an auto-height div renders 0px — the #1 "nothing shows up" cause.

## `useFrame` — the render loop

```tsx
useFrame((state, delta) => { /* runs ~60x/sec */ })
```

Rules:

- **Never `setState` inside `useFrame`.** Mutate refs directly
  (`ref.current.position.x = …`). State in the loop re-renders every frame.
- Multiply by `delta` so motion is framerate-independent.
- `state.clock.getElapsedTime()` for time-based motion, `state.pointer` for
  normalized mouse (`-1..1`), `state.camera` for the camera.
- Lerp toward a target instead of snapping:
  `ref.current.position.x += (target - ref.current.position.x) * 0.1`.

## Loading models

```tsx
import { useGLTF } from "@react-three/drei"

function Model() {
  const { scene } = useGLTF("/models/thing.glb")
  return <primitive object={scene} />
}
useGLTF.preload("/models/thing.glb")
```

`useGLTF` suspends — it must sit inside a `<Suspense>` boundary. Prefer **`.glb`,
Draco- or Meshopt-compressed**; run `npx gltfjsx model.glb --transform` to both
compress the asset and generate a typed component with named nodes you can style
individually.

`<primitive object={scene} />` shares one instance — rendering it twice moves the
same object. Use `useGraph`/`clone` (or a gltfjsx component) for multiple copies.

## Materials and lighting

- `meshStandardMaterial` / `meshPhysicalMaterial` need light. A black object
  almost always means no light in the scene.
- `meshBasicMaterial` ignores light — use for unlit/flat or shader-driven looks.
- An `<Environment preset="…" />` from drei is the fastest route to a decent
  look; it lights everything via IBL and gives reflections.
- Colors are managed by default in modern Three (`outputColorSpace = SRGBColorSpace`).
  Textures used as color must be `texture.colorSpace = THREE.SRGBColorSpace`;
  data maps (normal, roughness, AO) must stay linear — this is the usual cause
  of washed-out or oversaturated output.

## Performance budget

- **Draw calls are the currency.** Merge static geometry, and use
  `<instancedMesh>` (or drei `<Instances>`) for anything repeated more than ~50
  times. 10,000 instanced cubes is one draw call; 10,000 meshes is a stall.
- Clamp pixel ratio: `dpr={[1, 2]}`. Uncapped DPR on a 3× phone renders 9× the
  pixels.
- `frameloop="demand"` renders only when something changes — right for static
  product views, wrong for continuous animation. Call `invalidate()` to request
  a frame.
- Create geometries/materials **outside** the render path or in `useMemo`.
  Constructing `new THREE.MeshStandardMaterial()` inside a component body leaks
  a GPU resource every render.
- Shadows are expensive: enable per-light, keep `shadow-mapSize` at 1024, and
  set `castShadow`/`receiveShadow` only where visible.
- Postprocessing (`@react-three/postprocessing`) costs a full-screen pass per
  effect. Budget one or two.

## Disposal and memory

R3F disposes objects it created when a component unmounts. You are responsible
for anything you made yourself:

```ts
useEffect(() => () => {
  geometry.dispose()
  material.dispose()
  texture.dispose()
}, [])
```

In **vanilla** Three, unmounting must also stop the RAF loop and call
`renderer.dispose()` — plus remove the resize listener. Leaked loops are why a
route change tanks the framerate.

```ts
const raf = () => { id = requestAnimationFrame(raf); renderer.render(scene, camera) }
// cleanup:
cancelAnimationFrame(id)
renderer.dispose()
window.removeEventListener("resize", onResize)
container.removeChild(renderer.domElement)
```

## Vanilla Three checklist

Scene → PerspectiveCamera → WebGLRenderer → `renderer.setSize()` →
`setPixelRatio(Math.min(devicePixelRatio, 2))` → append `renderer.domElement` →
RAF loop → resize handler updating `camera.aspect`, `camera.updateProjectionMatrix()`,
and `renderer.setSize()`.

## Accessibility and fallback

- Respect `(prefers-reduced-motion: reduce)`: stop auto-rotation and
  scroll-driven camera moves, render a still frame.
- Canvas content is invisible to screen readers. Provide real DOM text for
  anything meaningful; drei's `<Html>` renders DOM inside the scene.
- Guard for missing WebGL and render a poster image instead of a blank box.

## Pitfalls

- Canvas with no height → nothing renders.
- Object not visible → check it is in front of the camera, is lit, and its scale
  is not 0.001 (GLTF unit mismatch).
- `setState` in `useFrame` → dropped frames.
- Changing `args` on a JSX element → object rebuilt every render.
- Two `<Canvas>` elements on one page → two WebGL contexts; browsers cap them
  (~8–16). Use one canvas with `<View>` from drei for multiple viewports.
- Scroll-linked cameras: with **Lenis** in the project, read scroll through Lenis
  or ScrollTrigger rather than a second listener — see **lenis-smooth-scroll**
  and **gsap-scrolltrigger**.
