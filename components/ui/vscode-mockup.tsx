"use client";

const files = [
  { name: "page.tsx", active: true },
  { name: "hero-section.tsx", active: false },
  { name: "globals.css", active: false },
];

const sidebarFiles = [
  { name: "app", folder: true, depth: 0 },
  { name: "page.tsx", folder: false, depth: 1 },
  { name: "globals.css", folder: false, depth: 1 },
  { name: "layout.tsx", folder: false, depth: 1 },
  { name: "components", folder: true, depth: 0 },
  { name: "hero-section.tsx", folder: false, depth: 1 },
  { name: "header.tsx", folder: false, depth: 1 },
  { name: "ui", folder: true, depth: 1 },
  { name: "button.tsx", folder: false, depth: 2 },
  { name: "card.tsx", folder: false, depth: 2 },
  { name: "lib", folder: true, depth: 0 },
  { name: "utils.ts", folder: false, depth: 1 },
];

type Token = { text: string; color: string };
type Line = { indent: number; tokens: Token[] };

const code: Line[] = [
  { indent: 0, tokens: [{ text: "import", color: "#c792ea" }, { text: " dynamic ", color: "#82aaff" }, { text: "from", color: "#c792ea" }, { text: ' "next/dynamic"', color: "#c3e88d" }] },
  { indent: 0, tokens: [{ text: "import", color: "#c792ea" }, { text: " { HeroSection } ", color: "#82aaff" }, { text: "from", color: "#c792ea" }, { text: ' "@/components/hero-section"', color: "#c3e88d" }] },
  { indent: 0, tokens: [] },
  { indent: 0, tokens: [{ text: "const", color: "#c792ea" }, { text: " BentoSection ", color: "#82aaff" }, { text: "=", color: "#89ddff" }, { text: " dynamic", color: "#82aaff" }, { text: "(() => ", color: "#a6accd" }, { text: "import", color: "#c792ea" }, { text: '("@/components/bento-section"))', color: "#c3e88d" }] },
  { indent: 0, tokens: [] },
  { indent: 0, tokens: [{ text: "export default function", color: "#c792ea" }, { text: " LandingPage", color: "#82aaff" }, { text: "() {", color: "#a6accd" }] },
  { indent: 1, tokens: [{ text: "return", color: "#c792ea" }, { text: " (", color: "#a6accd" }] },
  { indent: 2, tokens: [{ text: "<", color: "#89ddff" }, { text: "div", color: "#f07178" }, { text: " className=", color: "#a6accd" }, { text: '"min-h-[100dvh] bg-background"', color: "#c3e88d" }, { text: ">", color: "#89ddff" }] },
  { indent: 3, tokens: [{ text: "{/* Hero with animated grid */}", color: "#546e7a" }] },
  { indent: 3, tokens: [{ text: "<", color: "#89ddff" }, { text: "HeroSection", color: "#ffcb6b" }, { text: " />", color: "#89ddff" }] },
  { indent: 0, tokens: [] },
  { indent: 3, tokens: [{ text: "{/* Services grid */}", color: "#546e7a" }] },
  { indent: 3, tokens: [{ text: "<", color: "#89ddff" }, { text: "BentoSection", color: "#ffcb6b" }, { text: " />", color: "#89ddff" }] },
  { indent: 0, tokens: [] },
  { indent: 3, tokens: [{ text: "{/* Feature highlights */}", color: "#546e7a" }] },
  { indent: 3, tokens: [{ text: "<", color: "#89ddff" }, { text: "FeatureHighlights", color: "#ffcb6b" }, { text: " />", color: "#89ddff" }] },
  { indent: 2, tokens: [{ text: "</", color: "#89ddff" }, { text: "div", color: "#f07178" }, { text: ">", color: "#89ddff" }] },
  { indent: 1, tokens: [{ text: ")", color: "#a6accd" }] },
  { indent: 0, tokens: [{ text: "}", color: "#a6accd" }] },
];

export function VSCodeMockup() {
  return (
    <div className="w-full h-full flex flex-col bg-[#1e1e2e] rounded-xl overflow-hidden font-mono text-xs select-none">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[#181825] border-b border-white/5 shrink-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-3 text-[#6e6a86] text-[11px]">TwoPixel, Visual Studio Code</span>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#181825] border-b border-white/5 shrink-0">
        {files.map((f) => (
          <div
            key={f.name}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-[11px] border-r border-white/5 ${
              f.active
                ? "bg-[#1e1e2e] text-[#cdd6f4] border-t border-t-[#a855f7]"
                : "text-[#6e6a86] hover:text-[#cdd6f4]"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#a855f7] opacity-70" />
            {f.name}
          </div>
        ))}
      </div>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-44 shrink-0 bg-[#181825] border-r border-white/5 overflow-hidden py-2">
          <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#6e6a86]">Explorer</p>
          {sidebarFiles.map((f, i) => (
            <div
              key={i}
              className={`flex items-center gap-1.5 px-3 py-0.5 text-[11px] hover:bg-white/5 cursor-pointer ${
                f.name === "page.tsx" && f.depth === 1 ? "bg-[#a855f7]/10 text-[#cdd6f4]" : "text-[#6e6a86]"
              }`}
              style={{ paddingLeft: `${f.depth * 12 + 12}px` }}
            >
              {f.folder ? (
                <svg className="w-3 h-3 text-[#a855f7]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
              ) : (
                <span className="w-3 h-3 flex items-center justify-center text-[#a855f7]/70">
                  <svg viewBox="0 0 16 16" fill="currentColor" className="w-2.5 h-2.5">
                    <path d="M4 0h8l4 4v12H0V0h4zm7 1v4h4l-4-4zM2 3v2h4V3H2zm0 4v2h12V7H2zm0 4v2h12v-2H2z" />
                  </svg>
                </span>
              )}
              {f.name}
            </div>
          ))}
        </div>

        {/* Editor */}
        <div className="flex-1 overflow-auto py-4 bg-[#1e1e2e]">
          {code.map((line, i) => (
            <div
              key={i}
              className="flex items-baseline hover:bg-white/[0.03] px-2"
              style={{ minHeight: "1.6rem" }}
            >
              <span className="w-8 shrink-0 text-right text-[#3d3d5c] text-[11px] mr-4 select-none">
                {i + 1}
              </span>
              <span style={{ paddingLeft: `${line.indent * 16}px` }}>
                {line.tokens.length === 0 ? (
                  <span>&nbsp;</span>
                ) : (
                  line.tokens.map((t, j) => (
                    <span key={j} style={{ color: t.color }}>
                      {t.text}
                    </span>
                  ))
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-1 bg-[#a855f7] shrink-0">
        <div className="flex items-center gap-3 text-[10px] text-white/90">
          <span>⎇ main</span>
          <span>✓ TypeScript</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-white/90">
          <span>Ln 6, Col 1</span>
          <span>UTF-8</span>
          <span>Next.js 15</span>
        </div>
      </div>
    </div>
  );
}
