# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio site for Haris Shakeel (package name `twopixel`, deployed at <https://www.twopixel.org>). Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 3 + shadcn/ui (Radix primitives), framer-motion/GSAP for animation. There is no test suite.

## Commands

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run lint` — ESLint (`eslint .`)
- `npx tsc --noEmit` — type-check. Important: `next.config.mjs` sets `typescript.ignoreBuildErrors: true`, so `npm run build` succeeds even with type errors; run tsc to actually catch them.

## Architecture

### Design system: brutalist editorial theme

- The site was redesigned from a generic agency template to a brutalist editorial style. New-style components are the `components/brutalist-*.tsx` files plus `components/hero-section.tsx`; the home page (`app/page.tsx`) composes only these.
- Theming: `next-themes` toggles the `.dark` class on `<html>` (`defaultTheme="dark"`, system disabled). All colors are HSL CSS variables defined in `app/globals.css` — `:root` is the light palette (warm paper + near-black ink), `.dark` is the dark palette (near-black + warm cream). Tailwind maps them in `tailwind.config.ts`. Never hardcode colors; use the token classes (`bg-background`, `text-foreground`, `border-border`, plus special `screen-*` and `code-*` groups for device/editor mockups).
- Typography via next/font variables wired in `app/layout.tsx`: Anton (`font-display`, giant headings), Space Grotesk (`font-sans`, body/UI), Geist Mono (`font-mono`, eyebrows/code), Press Start 2P (`font-pixel`).

### Case studies (projects)

Each project lives at `app/projects/<slug>/page.tsx` and is data-driven: the page defines a `CaseStudyData` object and renders it through `components/ui/case-study.tsx`. Adding or removing a project requires touching four places:

1. `app/projects/<slug>/page.tsx` — the case study itself
2. `app/projects/page.tsx` — the projects index listing
3. `components/brutalist-projects.tsx` — the "Selected work" cards on the home page
4. `app/sitemap.ts` — the sitemap entry

Retired projects are kept as commented-out entries in the listings (see `destiny`) rather than deleted.

### SEO

Centralized in `lib/seo.ts` (`siteConfig`, `defaultMetadata`, `buildPageMetadata`) and `lib/schema/index.ts` (JSON-LD builders: `breadcrumbSchema`, `caseStudySchema`, etc.). Every page exports `metadata` via `buildPageMetadata({ title, description, path })` and injects JSON-LD schema scripts; follow that pattern for new pages.

### Disabled AI bot (intentionally dead code)

The AI chatbot feature is disabled but its code is kept commented out: the routes in `app/api/{chat,research,search}/route.ts` return 410, `lib/store.ts` has the Redux store commented out (though `StoreProvider` still wraps the app as a pass-through), and `app/bot` / `app/login` remain. `.env.local.example` documents the keys it used (GROQ, Tavily/SerpAPI). Do not revive or delete any of this unless asked.

### Legacy agency pages

`app/services/*`, `app/solutions`, `app/blog`, `app/testimonials`, `components/bento/*`, and many `components/ui/*` files are carried over from the earlier agency-style site and are still routable. The brutalist home page does not use them, but they share the same theme tokens.

## Notes

- shadcn/ui is configured via `components.json`; path alias `@/*` maps to the repo root (`@/components`, `@/lib`, `@/hooks`).
- Remote images are restricted to `images.unsplash.com` in `next.config.mjs`; local assets go in `public/images/`.
- 3D models: case studies can show an interactive GLB via the optional `model` field on `CaseStudyData`, rendered by `components/ui/model-viewer.tsx` (three.js, dynamically imported, meshopt-compressed GLBs). Web-ready models live in `public/models/`. `xision.glb` at the repo root is the ~79 MB raw source export — do not commit it; regenerate the optimized version with `npx @gltf-transform/cli optimize xision.glb public/models/xision-avatar.glb --compress meshopt --texture-compress webp --texture-size 1024`.
