/**
 * Cinematic opening: a nursery at dusk with a 3D palace door sealed by a ribbon.
 * Timeline on tap: seal glows → ribbon separates → doors swing open → sparkles,
 * clouds part, golden light → camera zooms through the doorway → invitation.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useInvitation } from '../lib/context';
import { usePrefersReducedMotion, seeded } from '../lib/hooks';
import { PhotoFrame } from './ui';
import { CrescentMoon, Cloud, TeddyBear, Balloon, Flower, StarField } from './art/Nursery';
import { Sparkle } from './art/Ornaments';
import { SparklesIcon } from './art/Icons';

type Phase = 'idle' | 'seal' | 'ribbon' | 'open' | 'zoom';

const TIMELINE: [Phase, number][] = [
  ['seal', 0],
  ['ribbon', 850],
  ['open', 1500],
  ['zoom', 3300],
];
const DONE_AT = 4500;

export default function MagicalOpening({ onDone }: { onDone: () => void }) {
  const { config, content } = useInvitation();
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>('idle');
  const timers = useRef<number[]>([]);
  const ctaRef = useRef<HTMLButtonElement>(null);

  // Lock page scroll behind the overlay; focus the main action
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    ctaRef.current?.focus({ preventScroll: true });
    return () => {
      document.documentElement.style.overflow = prev;
      timers.current.forEach(clearTimeout);
    };
  }, []);

  const finish = () => {
    timers.current.forEach(clearTimeout);
    onDone();
  };

  const start = () => {
    if (phase !== 'idle') return;
    if (reduced) {
      setPhase('zoom');
      timers.current.push(window.setTimeout(finish, 450));
      return;
    }
    TIMELINE.forEach(([p, t]) => timers.current.push(window.setTimeout(() => setPhase(p), t)));
    timers.current.push(window.setTimeout(finish, DONE_AT));
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') finish();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const particles = useMemo(() => {
    const r = seeded(21);
    return Array.from({ length: 26 }, () => {
      const a = r() * Math.PI * 2;
      const dist = 120 + r() * 260;
      return {
        x: Math.cos(a) * dist,
        y: Math.sin(a) * dist * 0.8 - 40,
        s: 8 + r() * 16,
        d: r() * 400,
      };
    });
  }, []);

  const opened = phase === 'open' || phase === 'zoom';

  return (
    <div className={`opening phase-${phase} ${opened ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-labelledby="opening-title">
      <div className="opening__sky" aria-hidden="true">
        <StarField count={60} seed={3} />
        <CrescentMoon className="opening__moon" />
        <Cloud className="sky-cloud sky-cloud--1" />
        <Cloud className="sky-cloud sky-cloud--2" />
      </div>

      <button type="button" className="skip-intro" onClick={finish}>
        इंट्रो छोड़ें
      </button>

      <div className="opening__scene">
        <p className="opening__above" id="opening-title">{content.opening.above}</p>

        <div className="door-stage">
          <div className="door-glow" aria-hidden="true" />
          <Balloon tone="blush" className="stage-balloon stage-balloon--1" />
          <Balloon tone="gold" className="stage-balloon stage-balloon--2" />
          <Balloon tone="lavender" className="stage-balloon stage-balloon--3" />

          <div className="door-arch" aria-hidden="true" onClick={start}>
            <div className="door-inside">
              <div className="door-inside__light" />
              <PhotoFrame photo={config.heroPhoto} shape="oval" className="door-peek" eager />
            </div>
            <div className="door-leaves">
              {(['left', 'right'] as const).map((side) => (
                <div key={side} className={`door-leaf door-leaf--${side}`}>
                  <div className="leaf-face">
                    <div className="leaf-panel leaf-panel--top" />
                    <div className="leaf-panel leaf-panel--mid" />
                    <div className="leaf-panel leaf-panel--low" />
                    <Sparkle className="leaf-star" />
                    <span className="leaf-knob" />
                    <span className="leaf-ribbon" />
                  </div>
                  <div className="leaf-edge" />
                </div>
              ))}
            </div>
            <div className="door-seal">
              <svg className="seal-bow" viewBox="0 0 120 60">
                <path d="M60 30 C 40 6, 10 6, 14 26 C 18 44, 44 40, 60 30Z" />
                <path d="M60 30 C 80 6, 110 6, 106 26 C 102 44, 76 40, 60 30Z" />
                <path d="M56 32 L 38 58 L 48 56 L 58 36Z M64 32 L 82 58 L 72 56 L 62 36Z" />
              </svg>
              <span className="seal-medal">
                <span className="seal-letter">{content.monogram}</span>
              </span>
            </div>
          </div>

          <div className="door-step" aria-hidden="true" />
          <div className="door-flowers" aria-hidden="true">
            <Flower tone="blush" className="df df--1" />
            <Flower tone="peach" className="df df--2" />
            <Flower tone="lavender" className="df df--3" />
            <Flower tone="blush" className="df df--4" />
          </div>
          <TeddyBear className="opening__teddy" />
        </div>

        <p className="opening__below">{content.opening.below}</p>

        <button ref={ctaRef} type="button" className="open-cta" onClick={start} disabled={phase !== 'idle'} aria-label="निमंत्रण खोलें">
          <span>निमंत्रण खोलें</span>
          <SparklesIcon size={18} />
        </button>
      </div>

      <div className="opening__clouds" aria-hidden="true">
        <Cloud className="front-cloud front-cloud--l" />
        <Cloud className="front-cloud front-cloud--r" />
      </div>

      <div className="burst" aria-hidden="true">
        {particles.map((p, i) => (
          <Sparkle
            key={i}
            className="burst__p"
            style={{
              ['--tx' as string]: `${p.x}px`,
              ['--ty' as string]: `${p.y}px`,
              width: p.s,
              height: p.s,
              animationDelay: `${p.d}ms`,
            }}
          />
        ))}
      </div>
      <div className="opening__flash" aria-hidden="true" />
    </div>
  );
}
