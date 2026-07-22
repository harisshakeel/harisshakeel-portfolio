"use client"

import { useEffect, useMemo, useState } from "react"
import {
  ChevronRight,
  Circle,
  FolderClosed,
  GitBranch,
  Search,
  Settings,
  TerminalSquare,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"

/* ─────────────────────────────────────────────────────────────
 * Tokenized code. Colors are theme-driven via --code-* CSS vars
 * (VS Code Dark+ in dark mode, Light+ in light mode — see globals.css).
 * The snippet is a type-safe agentic-streaming React hook with
 * generics, reducer, websocket lifecycle, and tool-call wiring.
 * ───────────────────────────────────────────────────────────── */

type Token = { t: string; c: string }
type Line = { indent: number; tokens: Token[] }

const C = {
  kw: "var(--code-kw)", // keyword
  type: "var(--code-type)", // type / class
  str: "var(--code-str)", // string
  fn: "var(--code-fn)", // function name
  var: "var(--code-var)", // variable
  cmt: "var(--code-cmt)", // comment
  num: "var(--code-num)", // number
  op: "var(--code-op)", // operator / punctuation
  ctl: "var(--code-ctl)", // control (if/return/await)
  jsx: "var(--code-var)", // jsx attr
}

const lines: Line[] = [
  { indent: 0, tokens: [{ t: "// useAgenticStream.ts, type-safe streaming for AI agents", c: C.cmt }] },
  { indent: 0, tokens: [
    { t: "import", c: C.kw }, { t: " { ", c: C.op },
    { t: "useEffect", c: C.var }, { t: ", ", c: C.op },
    { t: "useReducer", c: C.var }, { t: ", ", c: C.op },
    { t: "useRef", c: C.var },
    { t: " } ", c: C.op }, { t: "from", c: C.kw }, { t: " ", c: C.op },
    { t: "'react'", c: C.str },
  ]},
  { indent: 0, tokens: [
    { t: "import", c: C.kw }, { t: " ", c: C.op }, { t: "type", c: C.kw }, { t: " { ", c: C.op },
    { t: "AgentConfig", c: C.type }, { t: ", ", c: C.op },
    { t: "ToolSchema", c: C.type }, { t: ", ", c: C.op },
    { t: "Chunk", c: C.type },
    { t: " } ", c: C.op }, { t: "from", c: C.kw }, { t: " ", c: C.op },
    { t: "'./types'", c: C.str },
  ]},
  { indent: 0, tokens: [] },
  { indent: 0, tokens: [
    { t: "export ", c: C.kw }, { t: "function ", c: C.kw },
    { t: "useAgenticStream", c: C.fn }, { t: "<", c: C.op },
    { t: "T", c: C.type }, { t: " extends ", c: C.kw }, { t: "ToolSchema", c: C.type },
    { t: ">(", c: C.op },
  ]},
  { indent: 1, tokens: [{ t: "config", c: C.var }, { t: ": ", c: C.op }, { t: "AgentConfig", c: C.type }, { t: "<", c: C.op }, { t: "T", c: C.type }, { t: ">,", c: C.op }] },
  { indent: 0, tokens: [{ t: ") {", c: C.op }] },
  { indent: 1, tokens: [
    { t: "const", c: C.kw }, { t: " [", c: C.op },
    { t: "state", c: C.var }, { t: ", ", c: C.op },
    { t: "dispatch", c: C.var }, { t: "] = ", c: C.op },
    { t: "useReducer", c: C.fn }, { t: "(", c: C.op },
    { t: "reducer", c: C.var }, { t: "<", c: C.op }, { t: "T", c: C.type }, { t: ">, ", c: C.op },
    { t: "initialState", c: C.var }, { t: ")", c: C.op },
  ]},
  { indent: 1, tokens: [
    { t: "const", c: C.kw }, { t: " ", c: C.op },
    { t: "ws", c: C.var }, { t: " = ", c: C.op },
    { t: "useRef", c: C.fn }, { t: "<", c: C.op },
    { t: "WebSocket", c: C.type }, { t: " | ", c: C.op },
    { t: "null", c: C.kw }, { t: ">(", c: C.op },
    { t: "null", c: C.kw }, { t: ")", c: C.op },
  ]},
  { indent: 0, tokens: [] },
  { indent: 1, tokens: [
    { t: "useEffect", c: C.fn }, { t: "(() => {", c: C.op },
  ]},
  { indent: 2, tokens: [
    { t: "const", c: C.kw }, { t: " ", c: C.op },
    { t: "socket", c: C.var }, { t: " = ", c: C.op },
    { t: "new", c: C.kw }, { t: " ", c: C.op },
    { t: "WebSocket", c: C.type }, { t: "(", c: C.op },
    { t: "config", c: C.var }, { t: ".", c: C.op },
    { t: "endpoint", c: C.var }, { t: ")", c: C.op },
  ]},
  { indent: 2, tokens: [
    { t: "socket", c: C.var }, { t: ".", c: C.op },
    { t: "onmessage", c: C.var }, { t: " = ", c: C.op },
    { t: "async", c: C.kw }, { t: " (", c: C.op },
    { t: "event", c: C.var }, { t: ") => {", c: C.op },
  ]},
  { indent: 3, tokens: [
    { t: "const", c: C.kw }, { t: " ", c: C.op },
    { t: "chunk", c: C.var }, { t: " = ", c: C.op },
    { t: "JSON", c: C.type }, { t: ".", c: C.op },
    { t: "parse", c: C.fn }, { t: "(", c: C.op },
    { t: "event", c: C.var }, { t: ".", c: C.op },
    { t: "data", c: C.var }, { t: ") ", c: C.op },
    { t: "as", c: C.kw }, { t: " ", c: C.op },
    { t: "Chunk", c: C.type }, { t: "<", c: C.op }, { t: "T", c: C.type }, { t: ">", c: C.op },
  ]},
  { indent: 3, tokens: [
    { t: "dispatch", c: C.var }, { t: "({ ", c: C.op },
    { t: "type", c: C.var }, { t: ": ", c: C.op },
    { t: "'CHUNK'", c: C.str }, { t: ", ", c: C.op },
    { t: "payload", c: C.var }, { t: ": ", c: C.op },
    { t: "chunk", c: C.var }, { t: " })", c: C.op },
  ]},
  { indent: 3, tokens: [
    { t: "if", c: C.ctl }, { t: " (", c: C.op },
    { t: "chunk", c: C.var }, { t: ".", c: C.op },
    { t: "kind", c: C.var }, { t: " === ", c: C.op },
    { t: "'tool_call'", c: C.str }, { t: ") {", c: C.op },
  ]},
  { indent: 4, tokens: [
    { t: "const", c: C.kw }, { t: " ", c: C.op },
    { t: "result", c: C.var }, { t: " = ", c: C.op },
    { t: "await", c: C.ctl }, { t: " ", c: C.op },
    { t: "runTools", c: C.fn }, { t: "(", c: C.op },
    { t: "chunk", c: C.var }, { t: ".", c: C.op },
    { t: "tools", c: C.var }, { t: ", ", c: C.op },
    { t: "config", c: C.var }, { t: ".", c: C.op },
    { t: "handlers", c: C.var }, { t: ")", c: C.op },
  ]},
  { indent: 4, tokens: [
    { t: "socket", c: C.var }, { t: ".", c: C.op },
    { t: "send", c: C.fn }, { t: "(", c: C.op },
    { t: "JSON", c: C.type }, { t: ".", c: C.op },
    { t: "stringify", c: C.fn }, { t: "({ ", c: C.op },
    { t: "kind", c: C.var }, { t: ": ", c: C.op },
    { t: "'tool_result'", c: C.str }, { t: ", ", c: C.op },
    { t: "result", c: C.var }, { t: " }))", c: C.op },
  ]},
  { indent: 3, tokens: [{ t: "}", c: C.op }] },
  { indent: 2, tokens: [{ t: "}", c: C.op }] },
  { indent: 2, tokens: [
    { t: "ws", c: C.var }, { t: ".", c: C.op },
    { t: "current", c: C.var }, { t: " = ", c: C.op },
    { t: "socket", c: C.var },
  ]},
  { indent: 2, tokens: [
    { t: "return", c: C.ctl }, { t: " () => ", c: C.op },
    { t: "socket", c: C.var }, { t: ".", c: C.op },
    { t: "close", c: C.fn }, { t: "()", c: C.op },
  ]},
  { indent: 1, tokens: [{ t: "}, [", c: C.op }, { t: "config", c: C.var }, { t: ".", c: C.op }, { t: "endpoint", c: C.var }, { t: "])", c: C.op }] },
  { indent: 0, tokens: [] },
  { indent: 1, tokens: [
    { t: "return", c: C.ctl }, { t: " { ", c: C.op },
    { t: "state", c: C.var }, { t: ", ", c: C.op },
    { t: "dispatch", c: C.var }, { t: " } ", c: C.op },
    { t: "as", c: C.kw }, { t: " ", c: C.op },
    { t: "const", c: C.kw },
  ]},
  { indent: 0, tokens: [{ t: "}", c: C.op }] },
]

/* ─────────────────────────────────────────────────────────────
 * Typewriter, counts characters across all lines.
 * ───────────────────────────────────────────────────────────── */

function lineLength(line: Line) {
  return (
    line.indent * 2 + line.tokens.reduce((acc, tk) => acc + tk.t.length, 0)
  )
}

function useTypewriter(total: number, speed = 14) {
  const [typed, setTyped] = useState(0)

  useEffect(() => {
    if (typed >= total) {
      const hold = setTimeout(() => setTyped(0), 4500)
      return () => clearTimeout(hold)
    }
    // Speed up slightly inside long-ish runs (varying makes it feel real)
    const jitter = 0.85 + Math.random() * 0.5
    const t = setTimeout(() => setTyped((n) => n + 1), speed * jitter)
    return () => clearTimeout(t)
  }, [typed, total, speed])

  return typed
}

/* ─────────────────────────────────────────────────────────────
 * Streaming terminal logs.
 * ───────────────────────────────────────────────────────────── */

interface LogEntry {
  text: string
  tone: "muted" | "ok" | "info" | "warn" | "cmd"
  delay?: number
}

const logScript: LogEntry[] = [
  { text: "$ pnpm dev", tone: "cmd" },
  { text: "  Next.js 15.2, production agent runtime", tone: "muted", delay: 280 },
  { text: "✓ Ready on http://localhost:3000", tone: "ok", delay: 420 },
  { text: "○ Compiling /api/agent/stream …", tone: "warn", delay: 700 },
  { text: "✓ Compiled /api/agent/stream in 240ms (12 modules)", tone: "ok", delay: 600 },
  { text: "GET  /api/agent/stream  101  in 14ms  · upgrade=ws", tone: "info", delay: 480 },
  { text: "→ stream: model=claude-opus-4 tokens=38/s", tone: "info", delay: 520 },
  { text: "✓ tool_call · search_codebase('useAgenticStream')", tone: "ok", delay: 540 },
  { text: "✓ tool_call · read_file('src/agent/types.ts')", tone: "ok", delay: 520 },
  { text: "✓ tool_call · write_file('src/hooks/use-agentic-stream.ts')", tone: "ok", delay: 600 },
  { text: "→ stream: 1,284 tokens · finish=tool_use", tone: "info", delay: 460 },
  { text: "✓ types check · 0 errors · 0.9s", tone: "ok", delay: 420 },
]

function useLoopingLogs() {
  const [visible, setVisible] = useState<LogEntry[]>([])

  useEffect(() => {
    let i = 0
    let cancelled = false

    const tick = () => {
      if (cancelled) return
      if (i === 0) setVisible([])
      const next = logScript[i]
      setVisible((prev) =>
        prev.length >= 9 ? [...prev.slice(1), next] : [...prev, next],
      )
      i = (i + 1) % logScript.length
      const wait = (next.delay ?? 500) + (i === 0 ? 1500 : 0)
      window.setTimeout(tick, wait)
    }

    tick()
    return () => {
      cancelled = true
    }
  }, [])

  return visible
}

/* ─────────────────────────────────────────────────────────────
 * VSCodeLive, composed
 * ───────────────────────────────────────────────────────────── */

export function VSCodeLive() {
  const totalChars = useMemo(
    () => lines.reduce((acc, l) => acc + lineLength(l) + 1, 0),
    [],
  )
  const typed = useTypewriter(totalChars)
  const logs = useLoopingLogs()

  return (
    <div className="relative w-full select-none overflow-hidden rounded-2xl border border-code-chrome/[0.08] bg-code-bg font-mono text-[12.5px] text-code-fg shadow-[0_60px_120px_-30px_rgba(0,0,0,0.7),0_30px_60px_-30px_rgba(168,85,247,0.25)]">
      {/* ── Title bar ────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-code-chrome/[0.06] bg-code-titlebar px-3 py-2 backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex items-center gap-2 text-[11px] text-code-chrome/60">
          <FolderClosed className="h-3 w-3" />
          <span>twopixel-agents</span>
          <ChevronRight className="h-3 w-3 text-code-chrome/40" />
          <span>src/hooks</span>
          <ChevronRight className="h-3 w-3 text-code-chrome/40" />
          <span className="text-code-chrome/90">use-agentic-stream.ts</span>
        </div>
        <div className="flex items-center gap-3 text-code-chrome/50">
          <Search className="h-3.5 w-3.5" />
          <Settings className="h-3.5 w-3.5" />
        </div>
      </div>

      {/* ── Body: sidebar + editor ──────────────────────────── */}
      <div className="flex min-h-[420px]">
        {/* Activity rail */}
        <div className="hidden w-10 flex-col items-center gap-3 border-r border-code-chrome/[0.06] bg-code-panel py-3 text-code-chrome/50 sm:flex">
          <div className="h-7 w-7 rounded bg-code-chrome/10 ring-1 ring-code-chrome/[0.06]" />
          <Search className="h-4 w-4" />
          <GitBranch className="h-4 w-4" />
          <TerminalSquare className="h-4 w-4 text-primary" />
        </div>

        {/* Explorer */}
        <div className="hidden w-48 shrink-0 border-r border-code-chrome/[0.06] bg-code-panel py-3 text-[12px] md:block">
          <div className="px-3 pb-2 text-[10px] uppercase tracking-[0.18em] text-code-chrome/50">
            Explorer
          </div>
          <Tree />
        </div>

        {/* Editor area */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Tabs */}
          <div className="flex border-b border-code-chrome/[0.06] bg-code-panel text-[11.5px]">
            <Tab label="types.ts" />
            <Tab label="use-agentic-stream.ts" active />
            <Tab label="reducer.ts" />
            <Tab label="agent.config.ts" />
            <div className="flex-1 border-b border-code-chrome/[0.06]" />
          </div>

          {/* Code surface */}
          <div className="relative min-h-[280px] flex-1 overflow-hidden bg-code-bg py-3">
            <CodeView typed={typed} />
            {/* Subtle right-side fade so long lines don't hard-wrap visually */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-code-bg to-transparent" />
          </div>

          {/* Terminal */}
          <Terminal logs={logs} />
        </div>
      </div>

      {/* ── Status bar ──────────────────────────────────────── */}
      <div className="flex items-center justify-between border-t border-code-chrome/[0.06] bg-primary/85 px-3 py-1 text-[10.5px] font-medium text-white">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <GitBranch className="h-3 w-3" />
            main
          </span>
          <span className="flex items-center gap-1.5">
            <Circle className="h-2 w-2 fill-white/85" />0 · 0
          </span>
          <span className="opacity-80">TypeScript React</span>
        </div>
        <div className="flex items-center gap-3 opacity-90">
          <span>Ln {lineFromTyped(typed)}, Col {colFromTyped(typed)}</span>
          <span>UTF-8</span>
          <span>LF</span>
          <span className="font-semibold">TwoPixel</span>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
 * Sub-components
 * ───────────────────────────────────────────────────────────── */

function Tab({ label, active }: { label: string; active?: boolean }) {
  return (
    <div
      className={cn(
        "group flex items-center gap-2 border-r border-code-chrome/[0.06] px-3.5 py-2 text-code-chrome/60 transition-colors",
        active && "bg-code-bg text-code-fg",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          label.endsWith(".ts")
            ? "bg-[#3178c6]"
            : "bg-[#cbcb41]",
        )}
      />
      <span>{label}</span>
      <X
        className={cn(
          "h-3 w-3 opacity-0 transition-opacity",
          active && "opacity-50 group-hover:opacity-100",
        )}
      />
    </div>
  )
}

interface TreeItem {
  label: string
  depth: number
  folder?: boolean
  open?: boolean
  active?: boolean
}

const tree: TreeItem[] = [
  { label: "src", depth: 0, folder: true, open: true },
  { label: "agent", depth: 1, folder: true, open: true },
  { label: "types.ts", depth: 2 },
  { label: "reducer.ts", depth: 2 },
  { label: "tools.ts", depth: 2 },
  { label: "hooks", depth: 1, folder: true, open: true },
  { label: "use-agentic-stream.ts", depth: 2, active: true },
  { label: "use-tool-router.ts", depth: 2 },
  { label: "components", depth: 1, folder: true },
  { label: "lib", depth: 1, folder: true },
  { label: "package.json", depth: 0 },
  { label: "tsconfig.json", depth: 0 },
]

function Tree() {
  return (
    <div className="space-y-[3px]">
      {tree.map((it, i) => (
        <div
          key={i}
          className={cn(
            "flex items-center gap-1 px-3 py-[2px]",
            it.active && "bg-primary/15 text-code-fg",
            !it.active && "text-code-chrome/70",
          )}
          style={{ paddingLeft: 12 + it.depth * 12 }}
        >
          {it.folder ? (
            <ChevronRight
              className={cn(
                "h-3 w-3 shrink-0 text-code-chrome/50 transition-transform",
                it.open && "rotate-90",
              )}
            />
          ) : (
            <span className="ml-3.5" />
          )}
          {it.folder ? (
            <FolderClosed className="h-3.5 w-3.5 text-[#dcb67a]" />
          ) : (
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                it.label.endsWith(".ts") || it.label.endsWith(".tsx")
                  ? "bg-[#3178c6]"
                  : "bg-code-chrome/40",
              )}
            />
          )}
          <span className="truncate">{it.label}</span>
        </div>
      ))}
    </div>
  )
}

function CodeView({ typed }: { typed: number }) {
  let remaining = typed
  return (
    <div className="leading-[1.7]">
      {lines.map((line, i) => {
        const lineLen = lineLength(line)
        const lineCharsAvailable = remaining
        const lineConsumed = Math.min(remaining, lineLen)
        // Newline costs 1 char
        remaining = Math.max(0, remaining - lineLen - 1)

        const isBeingTyped =
          lineCharsAvailable > 0 && lineCharsAvailable < lineLen + 1
        const isTyped = lineCharsAvailable >= lineLen
        const isUntouched = lineCharsAvailable <= 0

        return (
          <div
            key={i}
            className={cn(
              "flex items-start whitespace-pre transition-opacity",
              isUntouched && "opacity-0",
            )}
          >
            <span className="w-10 shrink-0 select-none pr-3 text-right text-code-line">
              {i + 1}
            </span>
            <span className="min-w-0">
              {/* indent */}
              {"  ".repeat(line.indent)}
              {(() => {
                let budget =
                  isTyped ? lineLen : Math.max(0, lineConsumed - line.indent * 2)
                return line.tokens.map((tk, j) => {
                  if (budget <= 0) return null
                  const visible = tk.t.slice(0, budget)
                  budget -= visible.length
                  return (
                    <span key={j} style={{ color: tk.c }}>
                      {visible}
                    </span>
                  )
                })
              })()}
              {isBeingTyped && (
                <span className="inline-block h-[14px] w-[6px] -mb-[2px] translate-y-[2px] bg-primary/90 align-middle [animation:caret_1s_steps(2,start)_infinite]" />
              )}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function Terminal({ logs }: { logs: LogEntry[] }) {
  const toneClass: Record<LogEntry["tone"], string> = {
    cmd: "text-code-fg",
    ok: "text-emerald-700 dark:text-emerald-300/95",
    warn: "text-amber-600 dark:text-amber-300/95",
    info: "text-sky-700 dark:text-sky-300/90",
    muted: "text-code-chrome/50",
  }
  return (
    <div className="border-t border-code-chrome/[0.06] bg-code-term">
      <div className="flex items-center justify-between border-b border-code-chrome/[0.06] px-3 py-1.5 text-[10.5px] uppercase tracking-[0.18em] text-code-chrome/50">
        <div className="flex items-center gap-3">
          <span className="text-code-fg">Terminal</span>
          <span>Problems</span>
          <span>Output</span>
          <span>Debug Console</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-sm bg-primary/85 px-1.5 text-white">
            zsh
          </span>
          <X className="h-3 w-3 opacity-50" />
        </div>
      </div>
      <div className="h-[120px] overflow-hidden px-3 py-2 text-[11.5px] leading-[1.55]">
        {logs.map((line, i) => (
          <div
            key={`${line.text}-${i}`}
            className={cn(
              "transition-opacity duration-200",
              toneClass[line.tone],
            )}
          >
            {line.text}
          </div>
        ))}
        <div className="flex items-center text-code-chrome/85">
          <span className="text-emerald-700 dark:text-emerald-300/85">$</span>
          <span className="ml-2 inline-block h-3 w-[6px] -mb-[1px] translate-y-[1px] bg-emerald-600 dark:bg-emerald-300 align-middle [animation:caret_1s_steps(2,start)_infinite]" />
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
 * Helpers, derive Ln/Col from typed counter for the status bar
 * ───────────────────────────────────────────────────────────── */

function lineFromTyped(typed: number) {
  let remaining = typed
  for (let i = 0; i < lines.length; i++) {
    const len = lineLength(lines[i]) + 1
    if (remaining < len) return i + 1
    remaining -= len
  }
  return lines.length
}
function colFromTyped(typed: number) {
  let remaining = typed
  for (const line of lines) {
    const len = lineLength(line) + 1
    if (remaining < len) return Math.max(1, remaining + 1)
    remaining -= len
  }
  return 1
}

export default VSCodeLive
