# Haris Shakeel Portfolio

This repository contains the personal portfolio and digital playground for Haris Shakeel, an AI/ML and Systems Engineer specializing in applied computer vision, multi-agent AI, and highly scalable full-stack applications.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS (with arbitrary variants and complex grid/flexbox layouts)
- **Animation:** Framer Motion (for page transitions, scroll-driven reveals, and the PremiumNav capsule)
- **State Management:** Redux Toolkit (for complex UI states, if applicable)
- **Fonts:** Anton (Hero Display), Space Grotesk (Body), Geist Mono (Code/Small labels), Michroma (Cinematic Headers), Montserrat (Sub-headers)

## Directory Structure
- `app/`: Next.js App Router pages and layouts. Page transitions are handled via `template.tsx`.
- `components/`: Core UI components.
  - `components/ui/`: Reusable primitive components (text cycles, reveals, marquees).
  - `components/premium-nav/`: The floating capsule navigation bar.
- `public/`: Static assets (images, 3D models like `xision.glb`).
- `hooks/`: Custom React hooks (e.g., `use-dimensions`, `use-time-out`).
- `lib/`: Utilities, schema generation, and SEO configuration (`seo.ts`).

## Development Commands
- `npm run dev`: Start the development server on localhost:3000.
- `npm run build`: Build for production.
- `npm start`: Start the production server.

## Design Philosophy
- **Brutalist/Editorial Aesthetic:** Heavy reliance on typography, stark contrasts, and grid alignments.
- **Micro-interactions:** Buttons and nav elements should have snappy, spring-based animations.
- **Dark Mode First:** The default theme is dark, utilizing colors from the custom palette (`lib/palette.ts`).

## Guidelines for AI Agents
- When making UI changes, prioritize Tailwind utility classes over custom CSS unless absolutely necessary.
- Ensure all new pages are added to the `app/sitemap.ts` and use `buildPageMetadata` for SEO.
- Maintain the brutalist aesthetic: use `Anton` for large headers and `Geist Mono` for technical details.
- Avoid using placeholder images; use assets from the `public/images/` directory.
