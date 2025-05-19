// components/CategorySummary.tsx
export function CategorySummary() {
    return (
      <section className="rounded-2xl bg-gray-50 p-4 border border-gray-200 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Top Categories
          </p>
          <i className="lucide lucide-chevron-right w-4 h-4 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-4">
          <svg viewBox="0 0 36 36" className="w-20 h-20">
            <circle cx="18" cy="18" r="16" fill="#F3F4F6" />
            <path d="M18 2 A 16 16 0 0 1 33 12 L 18 18 Z" fill="oklch(70% 0.19 280)" />
            <path d="M33 12 A 16 16 0 0 1 26 30 L 18 18 Z" fill="oklch(72% 0.14 140)" />
            <path d="M26 30 A 16 16 0 0 1 18 2 L 18 18 Z" fill="oklch(88% 0.12 70)" />
          </svg>
          <ul className="flex-1 space-y-2 text-sm">
            <li className="flex justify-between items-center">
              <span className="flex gap-2 items-center">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "oklch(70% 0.19 280)" }} />
                Food
              </span>
              <span className="text-xs text-muted-foreground">52%</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="flex gap-2 items-center">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "oklch(72% 0.14 140)" }} />
                Transport
              </span>
              <span className="text-xs text-muted-foreground">30%</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="flex gap-2 items-center">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "oklch(88% 0.12 70)" }} />
                Shopping
              </span>
              <span className="text-xs text-muted-foreground">18%</span>
            </li>
          </ul>
        </div>
      </section>
    );
  }
  