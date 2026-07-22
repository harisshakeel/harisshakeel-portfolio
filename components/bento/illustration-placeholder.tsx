"use client"

export function IllustrationPlaceholder() {
  return (
    <div className="w-full h-full min-h-[192px] flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-primary/25 border border-primary/40 flex items-center justify-center animate-pulse" />
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-2 rounded-full bg-primary/25 w-10" />
          ))}
        </div>
      </div>
    </div>
  )
}
