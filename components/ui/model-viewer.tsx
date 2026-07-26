"use client"

import { useEffect, useRef, useState } from "react"

interface ModelViewerProps {
  /** Path to a .glb file (meshopt-compressed supported) */
  src: string
  alt: string
  className?: string
  /** Allow drag-to-orbit (default true). When false the model still auto-rotates. */
  interactive?: boolean
  /** "full" frames the whole model; "bust" frames the upper body (for small logo chips) */
  frame?: "full" | "bust"
  /** Compact loading indicator (pulsing dot) instead of text — for small containers */
  minimal?: boolean
}

/**
 * Lightweight GLB viewer. three.js is imported dynamically inside the effect
 * so it stays out of the main bundle, and the scene is only created once the
 * container scrolls near the viewport. The render loop pauses off-screen.
 */
export function ModelViewer({
  src,
  alt,
  className,
  interactive = true,
  frame = "full",
  minimal = false,
}: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle")

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let disposed = false
    let cleanup: (() => void) | undefined

    const init = async () => {
      setStatus("loading")
      try {
        const [THREE, { GLTFLoader }, { OrbitControls }, { RoomEnvironment }, { MeshoptDecoder }] =
          await Promise.all([
            import("three"),
            import("three/examples/jsm/loaders/GLTFLoader.js"),
            import("three/examples/jsm/controls/OrbitControls.js"),
            import("three/examples/jsm/environments/RoomEnvironment.js"),
            import("three/examples/jsm/libs/meshopt_decoder.module.js"),
          ])
        if (disposed) return

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setSize(container.clientWidth, container.clientHeight)
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.domElement.style.display = "block"
        container.appendChild(renderer.domElement)

        const scene = new THREE.Scene()
        const pmrem = new THREE.PMREMGenerator(renderer)
        scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture

        const camera = new THREE.PerspectiveCamera(
          32,
          container.clientWidth / container.clientHeight,
          0.01,
          50
        )

        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enabled = interactive
        controls.enableDamping = true
        controls.enablePan = false
        controls.enableZoom = false
        controls.autoRotate = true
        controls.autoRotateSpeed = 1.6
        controls.minPolarAngle = Math.PI * 0.25
        controls.maxPolarAngle = Math.PI * 0.62

        const loader = new GLTFLoader()
        loader.setMeshoptDecoder(MeshoptDecoder)
        const gltf = await loader.loadAsync(src, (e) => {
          if (e.total > 0) setProgress(Math.round((e.loaded / e.total) * 100))
        })
        if (disposed) {
          renderer.dispose()
          pmrem.dispose()
          return
        }

        const model = gltf.scene
        const box = new THREE.Box3().setFromObject(model)
        const size = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())
        model.position.sub(center)
        scene.add(model)

        const fov = (camera.fov * Math.PI) / 180
        if (frame === "bust") {
          // Frame the upper body: target chest height, view ~half the model height
          const targetY = size.y * 0.27
          const distance = (size.y * 0.5) / 2 / Math.tan(fov / 2)
          controls.target.set(0, targetY, 0)
          camera.position.set(0, targetY, distance)
        } else {
          const fitHeight = size.y / 2 / Math.tan(fov / 2)
          const fitWidth = size.x / 2 / (Math.tan(fov / 2) * camera.aspect)
          const distance = Math.max(fitHeight, fitWidth) * 1.15
          camera.position.set(0, size.y * 0.05, distance)
        }
        controls.update()

        let raf = 0
        let running = false
        const renderLoop = () => {
          raf = requestAnimationFrame(renderLoop)
          controls.update()
          renderer.render(scene, camera)
        }
        const start = () => {
          if (!running) {
            running = true
            renderLoop()
          }
        }
        const stop = () => {
          running = false
          cancelAnimationFrame(raf)
        }

        // Pause rendering while scrolled out of view
        const visibility = new IntersectionObserver(
          ([entry]) => (entry.isIntersecting ? start() : stop()),
          { rootMargin: "100px" }
        )
        visibility.observe(container)

        const resize = new ResizeObserver(() => {
          const w = container.clientWidth
          const h = container.clientHeight
          if (w === 0 || h === 0) return
          camera.aspect = w / h
          camera.updateProjectionMatrix()
          renderer.setSize(w, h)
        })
        resize.observe(container)

        setStatus("ready")

        cleanup = () => {
          stop()
          visibility.disconnect()
          resize.disconnect()
          controls.dispose()
          pmrem.dispose()
          renderer.dispose()
          scene.traverse((obj) => {
            const mesh = obj as import("three").Mesh
            if (mesh.isMesh) {
              mesh.geometry.dispose()
              const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
              materials.forEach((m) => m.dispose())
            }
          })
          renderer.domElement.remove()
        }
      } catch (err) {
        console.error("ModelViewer failed to load", err)
        if (!disposed) setStatus("error")
      }
    }

    // Defer everything (three.js download included) until the viewer is near view
    const lazy = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          lazy.disconnect()
          init()
        }
      },
      { rootMargin: "400px" }
    )
    lazy.observe(container)

    return () => {
      disposed = true
      lazy.disconnect()
      cleanup?.()
    }
  }, [src, interactive, frame])

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={alt}
      className={`relative touch-pan-y ${className ?? ""}`}
    >
      {status !== "ready" && (
        <div className="absolute inset-0 flex items-center justify-center">
          {minimal ? (
            status !== "error" && (
              <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground/50" />
            )
          ) : status === "error" ? (
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              3D preview unavailable
            </span>
          ) : (
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Loading 3D{progress > 0 ? ` ${progress}%` : ""}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
