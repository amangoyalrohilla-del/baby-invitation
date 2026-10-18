/** Gold ornaments: dividers, floral corners, the lotus motif and small sparkles. All theme-aware. */
import { useId, type CSSProperties } from 'react';

const v = (name: string) => `var(--${name})`;

export function GoldGradient({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" style={{ stopColor: v('gold-light') }} />
      <stop offset="0.45" style={{ stopColor: v('gold') }} />
      <stop offset="0.75" style={{ stopColor: v('gold-light') }} />
      <stop offset="1" style={{ stopColor: v('gold-deep') }} />
    </linearGradient>
  );
}

/** Animated ornamental divider: lines draw outward from a pearl-and-star centre */
export function OrnamentDivider({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg className={`ornament-divider ${className}`} viewBox="0 0 320 28" aria-hidden="true" focusable="false">
      <defs><GoldGradient id={`g${id}`} /></defs>
      <g style={{ stroke: `url(#g${id})` }} fill="none" strokeWidth="1.1" strokeLinecap="round">
        <path className="draw-line" d="M150 14 H18" />
        <path className="draw-line" d="M170 14 H302" />
        <path className="draw-line" d="M138 14 c-10 -9 -22 -9 -30 0 c8 9 20 9 30 0" />
        <path className="draw-line" d="M182 14 c10 -9 22 -9 30 0 c-8 9 -20 9 -30 0" />
      </g>
      <path d="M160 3 l3 8.5 8.5 2.5 -8.5 2.5 -3 8.5 -3 -8.5 -8.5 -2.5 8.5 -2.5z" style={{ fill: `url(#g${id})` }} />
      <circle cx="12" cy="14" r="2.2" style={{ fill: v('gold-light') }} />
      <circle cx="308" cy="14" r="2.2" style={{ fill: v('gold-light') }} />
    </svg>
  );
}

/** A delicate floral sprig for frame corners. Rotate/flip via CSS. */
export function FloralCorner({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg className={`floral-corner ${className}`} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <defs><GoldGradient id={`f${id}`} /></defs>
      <g fill="none" style={{ stroke: `url(#f${id})` }} strokeWidth="1.3" strokeLinecap="round">
        <path d="M8 112 C 20 70, 50 40, 108 10" />
        <path d="M30 78 c -12 -4 -20 -14 -20 -26 c 12 2 20 12 20 26z" />
        <path d="M52 54 c -4 -12 0 -24 10 -32 c 4 12 0 24 -10 32z" />
        <path d="M44 66 c 12 -2 24 4 30 14 c -12 2 -24 -4 -30 -14z" />
        <path d="M74 34 c 10 -6 22 -4 30 4 c -10 6 -22 4 -30 -4z" />
      </g>
      <g>
        <circle cx="18" cy="96" r="7" style={{ fill: v('blush-deep') }} opacity=".85" />
        <circle cx="18" cy="96" r="2.6" style={{ fill: v('gold-light') }} />
        <circle cx="88" cy="24" r="5" style={{ fill: v('peach') }} />
        <circle cx="88" cy="24" r="1.8" style={{ fill: v('gold') }} />
        <circle cx="64" cy="44" r="3.2" style={{ fill: v('lavender') }} />
        <circle cx="100" cy="12" r="2" style={{ fill: v('gold-light') }} />
        <circle cx="10" cy="112" r="2" style={{ fill: v('gold-light') }} />
      </g>
    </svg>
  );
}

/** Traditional lotus motif used for the invitation message */
export function LotusMotif({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg className={`lotus ${className}`} viewBox="0 0 200 110" aria-hidden="true" focusable="false">
      <defs><GoldGradient id={`l${id}`} /></defs>
      <g fill="none" style={{ stroke: `url(#l${id})` }} strokeWidth="1.4" strokeLinejoin="round">
        <path d="M100 18 C 86 40, 86 66, 100 86 C 114 66, 114 40, 100 18 Z" style={{ fill: v('blush') }} />
        <path d="M100 86 C 80 78, 64 58, 64 34 C 82 42, 94 60, 100 86 Z" style={{ fill: v('peach') }} />
        <path d="M100 86 C 120 78, 136 58, 136 34 C 118 42, 106 60, 100 86 Z" style={{ fill: v('peach') }} />
        <path d="M100 86 C 72 86, 46 74, 34 54 C 58 54, 84 66, 100 86 Z" style={{ fill: v('cream') }} />
        <path d="M100 86 C 128 86, 154 74, 166 54 C 142 54, 116 66, 100 86 Z" style={{ fill: v('cream') }} />
        <path d="M30 92 C 70 100, 130 100, 170 92" />
        <path d="M14 96 h20 M166 96 h20" />
      </g>
      <circle cx="100" cy="8" r="2.4" style={{ fill: v('gold') }} />
      <circle cx="78" cy="14" r="1.6" style={{ fill: v('gold-light') }} />
      <circle cx="122" cy="14" r="1.6" style={{ fill: v('gold-light') }} />
      {[40, 60, 80, 100, 120, 140, 160].map((x) => (
        <circle key={x} cx={x} cy={104} r="1.7" style={{ fill: v('gold-light') }} />
      ))}
    </svg>
  );
}

export function Sparkle({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={`sparkle ${className}`} style={style} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" style={{ fill: 'var(--gold-light)' }} />
    </svg>
  );
}
