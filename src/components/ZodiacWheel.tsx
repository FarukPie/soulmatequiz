// ︎: burç sembollerinin emoji yerine metin olarak çizilmesini sağlar.
const SIGNS = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"].map((s) => s + "︎");

// Sunucu ve tarayıcı trigonometride son basamakta farklılaşabilir; yuvarlamak hydration uyuşmazlığını önler.
const r2 = (n: number) => Math.round(n * 100) / 100;

export function ZodiacWheel({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" aria-hidden className={className}>
      <defs>
        <radialGradient id="wheel-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="200" fill="url(#wheel-glow)" />
      <g fill="none" stroke="var(--color-gold)" strokeOpacity="0.45">
        <circle cx="200" cy="200" r="190" strokeWidth="1" />
        <circle cx="200" cy="200" r="150" strokeWidth="0.75" />
        <circle cx="200" cy="200" r="70" strokeWidth="0.75" strokeDasharray="2 6" />
        {Array.from({ length: 72 }, (_, i) => {
          const a = (i * 5 * Math.PI) / 180;
          const inner = i % 6 === 0 ? 150 : 182;
          return (
            <line
              key={i}
              x1={r2(200 + Math.cos(a) * inner)}
              y1={r2(200 + Math.sin(a) * inner)}
              x2={r2(200 + Math.cos(a) * 190)}
              y2={r2(200 + Math.sin(a) * 190)}
              strokeWidth={i % 6 === 0 ? 0.75 : 0.5}
            />
          );
        })}
        <polygon points="200,80 304,260 96,260" strokeWidth="0.6" strokeOpacity="0.3" />
        <polygon points="200,320 96,140 304,140" strokeWidth="0.6" strokeOpacity="0.3" />
      </g>
      {SIGNS.map((sign, i) => {
        const a = ((i * 30 + 15 - 90) * Math.PI) / 180;
        return (
          <text
            key={i}
            x={r2(200 + Math.cos(a) * 168)}
            y={r2(200 + Math.sin(a) * 168)}
            fill="var(--color-gold)"
            fillOpacity="0.75"
            fontSize="18"
            textAnchor="middle"
            dominantBaseline="central"
          >
            {sign}
          </text>
        );
      })}
    </svg>
  );
}
