/**
 * The site-wide "dark olive editorial" palette — one named source of truth
 * for the redesign, rather than hex scattered through Tailwind arbitrary-
 * value classes. Shared by the hero (`components/haris-hero/`) and the
 * premium nav (`components/premium-nav/`); anything else redesigned to this
 * look should import from here too rather than re-declaring it.
 *
 * This sits alongside the site's shadcn HSL tokens in `globals.css`
 * (`--background`, `--foreground`, …) rather than replacing them — those
 * still theme the not-yet-redesigned sections (About, Experience, Work,
 * Contact all still use the original brutalist dark theme). This palette
 * is for surfaces that have been redesigned to the new look.
 */
export const PALETTE = {
  obsidian: "#10120F", // primary background
  forestCharcoal: "#181C17", // secondary background
  smokedOlive: "#232820", // elevated surfaces
  warmIvory: "#F1EFE8", // light sections
  stoneBeige: "#D8D3C8", // secondary light
  ivory: "#F5F3EC", // primary text on dark
  sage: "#A7ADA1", // secondary text on dark
  inkOlive: "#161A15", // primary text on light
  warmGrey: "#696D65", // muted text on light
  chartreuse: "#C7F36B", // primary accent — kept under ~8% of the visible interface
  mineralSage: "#91A883", // softer accent
  champagne: "#C8AA72", // premium highlight, used sparingly
  borderIvory: "rgba(245, 243, 236, 0.14)",
} as const;
