/** Nursery illustrations: teddy bear, crescent moon, clouds, balloons and flowers (pure SVG, theme-aware). */
import { useId, useMemo, type CSSProperties } from 'react';
import { seeded } from '../../lib/hooks';

const v = (n: string) => `var(--${n})`;
const useUid = () => useId().replace(/:/g, '');

export function TeddyBear({ className = '', withBalloons = false }: { className?: string; withBalloons?: boolean }) {
  const id = useUid();
  return (
    <svg className={`teddy ${className}`} viewBox="0 0 220 300" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`fur${id}`} cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#F1DCC4" />
          <stop offset=".6" stopColor="#D9B58F" />
          <stop offset="1" stopColor="#B88B63" />
        </radialGradient>
        <radialGradient id={`inner${id}`} cx="50%" cy="40%" r="60%">
          <stop offset="0" stopColor="#FBEFE2" />
          <stop offset="1" stopColor="#E9CDAE" />
        </radialGradient>
        <linearGradient id={`bal${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: v('blush') }} />
          <stop offset="1" style={{ stopColor: v('blush-deep') }} />
        </linearGradient>
      </defs>
      {withBalloons && (
        <g className="teddy-balloons">
          <path d="M150 168 C 150 120, 172 92, 176 62" stroke={v('gold')} style={{ stroke: v('gold') }} strokeWidth="1" fill="none" />
          <path d="M150 168 C 152 120, 142 86, 132 50" style={{ stroke: v('gold') }} strokeWidth="1" fill="none" />
          <ellipse cx="176" cy="40" rx="20" ry="24" style={{ fill: `url(#bal${id})` }} />
          <ellipse cx="170" cy="32" rx="5" ry="8" fill="#fff" opacity=".45" />
          <ellipse cx="130" cy="28" rx="18" ry="22" style={{ fill: v('lavender') }} />
          <ellipse cx="124" cy="20" rx="4.5" ry="7" fill="#fff" opacity=".5" />
        </g>
      )}
      {/* ears */}
      <circle cx="62" cy="96" r="24" fill={`url(#fur${id})`} />
      <circle cx="148" cy="96" r="24" fill={`url(#fur${id})`} />
      <circle cx="62" cy="96" r="12" fill={`url(#inner${id})`} />
      <circle cx="148" cy="96" r="12" fill={`url(#inner${id})`} />
      {/* body */}
      <ellipse cx="105" cy="222" rx="66" ry="64" fill={`url(#fur${id})`} />
      <ellipse cx="105" cy="230" rx="38" ry="40" fill={`url(#inner${id})`} />
      {/* feet */}
      <ellipse cx="60" cy="276" rx="26" ry="18" fill={`url(#fur${id})`} />
      <ellipse cx="150" cy="276" rx="26" ry="18" fill={`url(#fur${id})`} />
      <ellipse cx="60" cy="278" rx="14" ry="10" fill={`url(#inner${id})`} />
      <ellipse cx="150" cy="278" rx="14" ry="10" fill={`url(#inner${id})`} />
      {/* arms */}
      <ellipse cx="46" cy="210" rx="18" ry="32" transform="rotate(24 46 210)" fill={`url(#fur${id})`} />
      <ellipse cx="160" cy="196" rx="18" ry="32" transform="rotate(-36 160 196)" fill={`url(#fur${id})`} />
      {/* head */}
      <circle cx="105" cy="134" r="58" fill={`url(#fur${id})`} />
      <ellipse cx="105" cy="154" rx="28" ry="22" fill={`url(#inner${id})`} />
      <ellipse cx="105" cy="145" rx="9" ry="6.5" fill="#5B3E2F" />
      <path d="M105 152 v8 M97 164 q8 6 16 0" stroke="#5B3E2F" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <circle cx="84" cy="124" r="5" fill="#3E2A20" />
      <circle cx="126" cy="124" r="5" fill="#3E2A20" />
      <circle cx="85.5" cy="122.5" r="1.6" fill="#fff" />
      <circle cx="127.5" cy="122.5" r="1.6" fill="#fff" />
      <ellipse cx="72" cy="146" rx="9" ry="5" style={{ fill: v('blush-deep') }} opacity=".55" />
      <ellipse cx="138" cy="146" rx="9" ry="5" style={{ fill: v('blush-deep') }} opacity=".55" />
      {/* satin bow */}
      <g style={{ fill: v('blush-deep') }}>
        <path d="M105 186 C 86 172, 72 178, 74 192 C 76 204, 92 200, 105 190Z" />
        <path d="M105 186 C 124 172, 138 178, 136 192 C 134 204, 118 200, 105 190Z" />
      </g>
      <circle cx="105" cy="188" r="6.5" style={{ fill: v('gold') }} />
      <circle cx="103" cy="186" r="2" fill="#fff" opacity=".6" />
    </svg>
  );
}

export function CrescentMoon({ className = '' }: { className?: string }) {
  const id = useUid();
  return (
    <svg className={`moon ${className}`} viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`mg${id}`} cx="35%" cy="35%" r="75%">
          <stop offset="0" stopColor="#FFF8E6" />
          <stop offset=".55" style={{ stopColor: v('gold-light') }} />
          <stop offset="1" style={{ stopColor: v('gold') }} />
        </radialGradient>
        <mask id={`mm${id}`}>
          <rect width="200" height="200" fill="#fff" />
          <circle cx="128" cy="78" r="66" fill="#000" />
        </mask>
        <filter id={`mglow${id}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      <circle cx="96" cy="104" r="76" style={{ fill: v('gold-light') }} opacity=".35" filter={`url(#mglow${id})`} mask={`url(#mm${id})`} />
      <circle cx="96" cy="104" r="72" fill={`url(#mg${id})`} mask={`url(#mm${id})`} />
      <circle cx="70" cy="132" r="5" fill="#fff" opacity=".25" mask={`url(#mm${id})`} />
      <circle cx="52" cy="104" r="3" fill="#fff" opacity=".25" mask={`url(#mm${id})`} />
    </svg>
  );
}

export function Cloud({ className = '', style }: { className?: string; style?: CSSProperties }) {
  const id = useUid();
  return (
    <svg className={`cloud ${className}`} style={style} viewBox="0 0 320 130" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`cg${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" style={{ stopColor: v('blush') }} />
        </linearGradient>
      </defs>
      <path
        d="M34 118 C 6 118, 2 84, 30 78 C 28 52, 60 40, 80 54 C 90 22, 140 16, 156 46 C 172 20, 220 26, 222 58 C 250 44, 288 60, 280 88 C 312 90, 316 118, 290 118 Z"
        fill={`url(#cg${id})`}
      />
      <path d="M60 104 C 120 112, 220 112, 272 102" stroke="#fff" strokeOpacity=".7" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Balloon({ tone = 'blush', className = '', style }: { tone?: 'blush' | 'lavender' | 'peach' | 'gold'; className?: string; style?: CSSProperties }) {
  const id = useUid();
  const fill = tone === 'gold' ? v('gold-light') : v(tone === 'blush' ? 'blush-deep' : tone);
  return (
    <svg className={`balloon ${className}`} style={style} viewBox="0 0 80 190" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`b${id}`} cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity=".95" />
          <stop offset=".35" style={{ stopColor: fill }} />
          <stop offset="1" style={{ stopColor: fill }} stopOpacity=".9" />
        </radialGradient>
      </defs>
      <path d="M40 98 C 36 120, 46 140, 38 160 C 32 174, 42 182, 40 190" style={{ stroke: v('gold') }} strokeWidth="1" fill="none" />
      <ellipse cx="40" cy="48" rx="34" ry="44" fill={`url(#b${id})`} />
      <path d="M35 91 L 45 91 L 42 98 L 38 98 Z" style={{ fill }} />
      <ellipse cx="28" cy="30" rx="7" ry="12" fill="#fff" opacity=".5" transform="rotate(-20 28 30)" />
    </svg>
  );
}

export function Flower({ className = '', tone = 'blush' }: { className?: string; tone?: 'blush' | 'peach' | 'lavender' }) {
  const c = v(tone === 'blush' ? 'blush-deep' : tone);
  return (
    <svg className={`flower ${className}`} viewBox="0 0 60 60" aria-hidden="true" focusable="false">
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} cx="30" cy="16" rx="9" ry="13" style={{ fill: c }} opacity=".9" transform={`rotate(${r} 30 30)`} />
      ))}
      <circle cx="30" cy="30" r="7" style={{ fill: v('gold-light') }} />
      <circle cx="30" cy="30" r="3" style={{ fill: v('gold') }} />
    </svg>
  );
}

/** Twinkling star field. Positions are seeded so they never jump between renders. */
export function StarField({ count = 40, seed = 7, className = '' }: { count?: number; seed?: number; className?: string }) {
  const stars = useMemo(() => {
    const r = seeded(seed);
    return Array.from({ length: count }, () => ({
      x: r() * 100,
      y: r() * 100,
      s: 2 + r() * 5,
      d: 2.5 + r() * 4,
      delay: r() * 5,
      big: r() > 0.82,
    }));
  }, [count, seed]);
  return (
    <div className={`starfield ${className}`} aria-hidden="true">
      {stars.map((st, i) =>
        st.big ? (
          <svg key={i} className="star star--big" viewBox="0 0 24 24"
            style={{ left: `${st.x}%`, top: `${st.y}%`, width: st.s * 3, height: st.s * 3, animationDuration: `${st.d}s`, animationDelay: `${st.delay}s` }}>
            <path d="M12 0 L13.6 10.4 L24 12 L13.6 13.6 L12 24 L10.4 13.6 L0 12 L10.4 10.4 Z" />
          </svg>
        ) : (
          <span key={i} className="star"
            style={{ left: `${st.x}%`, top: `${st.y}%`, width: st.s, height: st.s, animationDuration: `${st.d}s`, animationDelay: `${st.delay}s` }} />
        ),
      )}
    </div>
  );
}

/** Background balloons that drift slowly. Used sparingly (two sections). */
export function FloatingBalloons({ side = 'both' }: { side?: 'left' | 'right' | 'both' }) {
  return (
    <div className="floating-balloons" aria-hidden="true">
      {side !== 'right' && (
        <>
          <Balloon tone="blush" className="fb fb--1" />
          <Balloon tone="gold" className="fb fb--2" />
        </>
      )}
      {side !== 'left' && (
        <>
          <Balloon tone="lavender" className="fb fb--3" />
          <Balloon tone="peach" className="fb fb--4" />
        </>
      )}
    </div>
  );
}
