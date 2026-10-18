/**
 * Illustrated stand-ins shown wherever a client photo has not been configured yet
 * (or a photo fails to load). Same 4:5 canvas for every variant; the frame crops it.
 */
import { useId } from 'react';
import type { PlaceholderKind } from '../../config/invitation';

const v = (n: string) => `var(--${n})`;

function BabyFace({ id, cap = false }: { id: string; cap?: boolean }) {
  return (
    <g>
      <circle cx="0" cy="0" r="62" fill={`url(#skin${id})`} />
      {cap ? (
        <g>
          <path d="M-64 -6 C -64 -60, 64 -60, 64 -6 C 40 -22, -40 -22, -64 -6 Z" style={{ fill: v('blush-deep') }} />
          <path d="M-62 -8 C -36 -20, 36 -20, 62 -8" style={{ stroke: v('ivory') }} strokeWidth="5" fill="none" strokeLinecap="round" />
          <circle cx="0" cy="-60" r="13" style={{ fill: v('ivory') }} />
        </g>
      ) : (
        <path d="M-6 -60 C 4 -72, 18 -66, 10 -56" stroke="#A97E5F" strokeWidth="3" fill="none" strokeLinecap="round" />
      )}
      <path d="M-30 4 q 10 8 20 0" stroke="#6E4A3A" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M10 4 q 10 8 20 0" stroke="#6E4A3A" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M-28 8 l -3 4 M-20 11 l -1 4 M28 8 l 3 4 M20 11 l 1 4" stroke="#6E4A3A" strokeWidth="1.6" strokeLinecap="round" />
      <ellipse cx="-34" cy="24" rx="12" ry="8" style={{ fill: v('blush-deep') }} opacity=".55" />
      <ellipse cx="34" cy="24" rx="12" ry="8" style={{ fill: v('blush-deep') }} opacity=".55" />
      <ellipse cx="0" cy="18" rx="5" ry="3.5" fill="#E4B096" />
      <path d="M-7 33 q 7 6 14 0" stroke="#C47F74" strokeWidth="2.6" fill="none" strokeLinecap="round" />
    </g>
  );
}

function Swaddle() {
  return (
    <g>
      <path d="M-92 40 C -110 150, -40 210, 0 214 C 40 210, 110 150, 92 40 C 60 72, -60 72, -92 40 Z" style={{ fill: v('blush') }} />
      <path d="M-92 40 C -40 92, 40 118, 86 94" style={{ stroke: v('blush-deep') }} strokeWidth="3" fill="none" />
      <path d="M92 40 C 50 80, 0 96, -50 92" style={{ stroke: v('blush-deep') }} strokeWidth="2" fill="none" opacity=".6" />
      {[[-40, 140], [10, 160], [50, 130], [-10, 120], [30, 186], [-50, 176]].map(([x, y], i) => (
        <path key={i} transform={`translate(${x} ${y}) scale(.5)`} d="M0 -10 L2.5 -2.5 L10 0 L2.5 2.5 L0 10 L-2.5 2.5 L-10 0 L-2.5 -2.5 Z" style={{ fill: v('gold') }} opacity=".75" />
      ))}
    </g>
  );
}

function Person({ x, y, s = 1, tone, hair = 'short' }: { x: number; y: number; s?: number; tone: string; hair?: 'short' | 'long' | 'bun' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {hair === 'long' && <path d="M-34 -40 C -46 10, -40 50, -30 70 L 30 70 C 40 50, 46 10, 34 -40 Z" style={{ fill: tone }} opacity=".75" />}
      <path d="M-70 150 C -70 80, -40 56, 0 56 C 40 56, 70 80, 70 150 Z" style={{ fill: tone }} />
      <circle cx="0" cy="0" r="36" style={{ fill: tone }} opacity=".92" />
      {hair === 'bun' && <circle cx="0" cy="-40" r="14" style={{ fill: tone }} />}
    </g>
  );
}

export default function PlaceholderArt({ kind, badge }: { kind: PlaceholderKind; badge: boolean }) {
  const id = useId().replace(/:/g, '');
  const bgTop = kind === 'venue' ? v('lavender') : kind === 'parents' || kind === 'family' ? v('peach') : v('cream');
  const bgBottom = kind === 'venue' ? v('peach') : v('blush');
  return (
    <div className="placeholder-art">
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={`bg${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: bgTop }} />
            <stop offset="1" style={{ stopColor: bgBottom }} />
          </linearGradient>
          <radialGradient id={`skin${id}`} cx="40%" cy="35%" r="70%">
            <stop offset="0" stopColor="#FCE5D4" />
            <stop offset="1" stopColor="#EFC2A6" />
          </radialGradient>
          <radialGradient id={`glow${id}`} cx="50%" cy="40%" r="55%">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity=".9" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="500" fill={`url(#bg${id})`} />
        <circle cx="200" cy="200" r="220" fill={`url(#glow${id})`} />

        {/* soft stars */}
        {[[60, 70], [330, 90], [300, 40], [90, 150], [350, 200], [40, 260]].map(([x, y], i) => (
          <path key={i} transform={`translate(${x} ${y}) scale(${0.6 + (i % 3) * 0.25})`} d="M0 -10 L2.5 -2.5 L10 0 L2.5 2.5 L0 10 L-2.5 2.5 L-10 0 L-2.5 -2.5 Z" style={{ fill: v('gold-light') }} />
        ))}

        {kind === 'baby' && (
          <g>
            <path d="M40 470 C 30 400, 120 380, 150 410 C 170 360, 260 360, 270 410 C 320 380, 390 420, 370 480 Z" fill="#fff" opacity=".85" />
            <g transform="translate(200 230)"><Swaddle /><BabyFace id={id} /></g>
          </g>
        )}
        {kind === 'sleeping' && (
          <g>
            <ellipse cx="200" cy="392" rx="190" ry="70" fill="#fff" opacity=".8" />
            <g transform="translate(206 300) rotate(-72)"><Swaddle /><BabyFace id={id} /></g>
            <text x="300" y="150" fontFamily="'Cormorant Garamond', Georgia, serif" fontStyle="italic" fontSize="34" style={{ fill: v('gold-deep') }} opacity=".7">z</text>
            <text x="324" y="118" fontFamily="'Cormorant Garamond', Georgia, serif" fontStyle="italic" fontSize="24" style={{ fill: v('gold-deep') }} opacity=".55">z</text>
          </g>
        )}
        {kind === 'closeup' && (
          <g transform="translate(200 270) scale(2.35)"><BabyFace id={id} cap /></g>
        )}
        {(kind === 'parents' || kind === 'parentsBaby') && (
          <g>
            <g transform="rotate(-6 150 300)"><Person x={150} y={250} s={1.25} tone={v('ink-soft')} /></g>
            <g transform="rotate(6 250 300)"><Person x={252} y={262} s={1.15} tone={v('blush-deep')} hair="long" /></g>
            {kind === 'parents' ? (
              <path d="M200 150 c -10 -16 -34 -8 -26 10 c 6 12 26 22 26 22 s 20 -10 26 -22 c 8 -18 -16 -26 -26 -10z" style={{ fill: v('gold') }} />
            ) : (
              <g transform="translate(204 380) scale(.62)"><Swaddle /><BabyFace id={id} /></g>
            )}
          </g>
        )}
        {kind === 'family' && (
          <g>
            <Person x={96} y={250} s={0.95} tone={v('ink-soft')} />
            <Person x={304} y={256} s={0.92} tone={v('lavender')} hair="bun" />
            <Person x={164} y={300} s={1.05} tone={v('gold-deep')} />
            <Person x={240} y={308} s={1} tone={v('blush-deep')} hair="long" />
            <g transform="translate(202 430) scale(.5)"><Swaddle /><BabyFace id={id} /></g>
          </g>
        )}
        {kind === 'maternity' && (
          <g>
            <circle cx="200" cy="140" r="40" style={{ fill: v('ink-soft') }} />
            <path d="M160 500 C 150 400, 150 300, 176 196 C 190 180, 220 180, 230 200 C 236 240, 244 270, 280 320 C 300 360, 270 410, 236 410 C 236 440, 240 470, 244 500 Z" style={{ fill: v('ink-soft') }} />
            <path d="M200 300 C 230 310, 260 340, 262 370" style={{ stroke: v('gold-light') }} strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M262 300 c -6 -10 -20 -5 -16 6 c 3 7 16 13 16 13 s 13 -6 16 -13 c 4 -11 -10 -16 -16 -6z" style={{ fill: v('gold') }} />
          </g>
        )}
        {kind === 'venue' && (
          <g>
            <path d="M0 360 C 100 340, 300 340, 400 360 L 400 500 L 0 500 Z" style={{ fill: v('blush') }} />
            <ellipse cx="60" cy="300" rx="70" ry="90" style={{ fill: v('ink-soft') }} opacity=".35" />
            <ellipse cx="350" cy="290" rx="70" ry="100" style={{ fill: v('ink-soft') }} opacity=".3" />
            <path d="M110 400 L 110 230 C 110 150, 290 150, 290 230 L 290 400" style={{ stroke: v('gold') }} strokeWidth="10" fill="none" />
            <path d="M126 400 L 126 232 C 126 170, 274 170, 274 232 L 274 400" style={{ stroke: v('gold-light') }} strokeWidth="3" fill="none" />
            {Array.from({ length: 14 }, (_, i) => {
              const t = i / 13;
              const a = Math.PI * (1 - t);
              return <circle key={i} cx={200 + Math.cos(a) * 92} cy={232 - Math.sin(a) * 74} r="9" style={{ fill: i % 2 ? v('blush-deep') : v('peach') }} />;
            })}
            <path d="M0 120 Q 100 160 200 120 T 400 120" style={{ stroke: v('gold') }} strokeWidth="1" fill="none" />
            {Array.from({ length: 11 }, (_, i) => (
              <circle key={i} cx={i * 40} cy={120 + Math.sin(i * 1.57) * 18 + 10} r="4" fill="#FFF3C9" />
            ))}
            <rect x="170" y="390" width="60" height="110" style={{ fill: v('cream') }} opacity=".7" />
          </g>
        )}
      </svg>
      {badge && <span className="placeholder-badge">फ़ोटो</span>}
    </div>
  );
}
