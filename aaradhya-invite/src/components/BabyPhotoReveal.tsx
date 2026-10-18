import { useMemo, useRef, useState } from 'react';
import { useInvitation } from '../lib/context';
import { usePrefersReducedMotion, seeded } from '../lib/hooks';
import { LuxuryButton, PhotoFrame, SectionHeading, Reveal } from './ui';
import { Sparkle } from './art/Ornaments';
import { ChevronRight } from './art/Icons';

type State = 'closed' | 'opening' | 'open';

export default function BabyPhotoReveal() {
  const { config, content } = useInvitation();
  const photos = config.revealPhotos.length ? config.revealPhotos.slice(0, 4) : [config.heroPhoto];
  const reduced = usePrefersReducedMotion();
  const [state, setState] = useState<State>('closed');
  const [index, setIndex] = useState(0);
  const timer = useRef<number>(0);

  const stars = useMemo(() => {
    const r = seeded(5);
    return Array.from({ length: 14 }, () => ({ x: (r() - 0.5) * 340, y: -60 - r() * 220, s: 8 + r() * 12, d: r() * 500 }));
  }, []);

  const open = () => {
    if (state !== 'closed') return;
    setState('opening');
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState('open'), reduced ? 50 : 1600);
  };

  const next = () => {
    if (state === 'closed') return open();
    setIndex((i) => (i + 1) % photos.length);
  };

  return (
    <section id="reveal" className="section reveal-section" aria-labelledby="reveal-title">
      <div className="container narrow">
        <SectionHeading id="reveal-title" script="A Little Surprise" title={content.reveal.heading} />

        <div className={`gift-stage is-${state}`}>
          <div className="gift-stage__glow" aria-hidden="true" />
          <div className="reveal-photos" aria-live="polite">
            {photos.map((p, i) => (
              <div key={i} className={`reveal-photo ${i === index ? 'is-current' : ''}`} aria-hidden={i !== index || state === 'closed'}>
                <PhotoFrame photo={p} shape="arch" />
              </div>
            ))}
          </div>

          <button type="button" className="gift" onClick={open} disabled={state !== 'closed'} aria-label="उपहार खोलें और तस्वीर देखें">
            <span className="gift__lid"><span className="gift__lid-band" /></span>
            <svg className="gift__bow" viewBox="0 0 120 64" aria-hidden="true">
              <path d="M60 40 C 36 10, 6 14, 12 36 C 18 54, 46 50, 60 40Z" />
              <path d="M60 40 C 84 10, 114 14, 108 36 C 102 54, 74 50, 60 40Z" />
              <circle cx="60" cy="40" r="8" />
            </svg>
            <span className="gift__box"><span className="gift__band" /><span className="gift__pearls" /></span>
          </button>

          <div className="gift-stars" aria-hidden="true">
            {stars.map((s, i) => (
              <Sparkle key={i} className="gift-star" style={{ ['--tx' as string]: `${s.x}px`, ['--ty' as string]: `${s.y}px`, width: s.s, height: s.s, animationDelay: `${s.d}ms` }} />
            ))}
          </div>

          {state === 'closed' && <p className="gift-hint">उपहार खोलने के लिए छुएँ</p>}
        </div>

        <Reveal className="reveal-caption-wrap">
          <p className={`reveal-caption ${state === 'open' ? 'is-shown' : ''}`}>{content.reveal.caption}</p>
          {photos.length > 1 && state === 'open' && (
            <div className="dots" aria-hidden="true">
              {photos.map((_, i) => <span key={i} className={i === index ? 'is-on' : ''} />)}
            </div>
          )}
          <div className="btn-row">
            <LuxuryButton onClick={next} icon={<ChevronRight size={18} />}>
              {state === 'closed' ? 'उपहार खोलें' : 'अगली याद देखें'}
            </LuxuryButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
