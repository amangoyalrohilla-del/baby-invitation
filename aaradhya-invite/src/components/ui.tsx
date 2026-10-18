/** Shared building blocks: LuxuryButton, PhotoFrame, Reveal, SectionHeading. */
import { useState, type ElementType, type ReactNode, type CSSProperties } from 'react';
import type { Photo } from '../config/invitation';
import { useInView } from '../lib/hooks';
import { useInvitation } from '../lib/context';
import PlaceholderArt from './art/PlaceholderArt';
import { FloralCorner, OrnamentDivider } from './art/Ornaments';

/* ───────── LuxuryButton ───────── */
type BtnProps = {
  children: ReactNode;
  variant?: 'gold' | 'ghost';
  icon?: ReactNode;
  className?: string;
} & (
  | { href: string; onClick?: never; type?: never }
  | { href?: never; onClick: () => void; type?: 'button' }
);

export function LuxuryButton({ children, variant = 'gold', icon, className = '', ...rest }: BtnProps) {
  const cls = `lux-btn lux-btn--${variant} ${className}`;
  const inner = (
    <>
      {icon && <span className="lux-btn__icon">{icon}</span>}
      <span>{children}</span>
    </>
  );
  if ('href' in rest && rest.href) {
    return (
      <a className={cls} href={rest.href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className={cls} onClick={rest.onClick}>
      {inner}
    </button>
  );
}

/* ───────── PhotoFrame ───────── */
export type FrameShape = 'oval' | 'arch' | 'rect' | 'card';

export function PhotoFrame({
  photo, shape, className = '', eager = false, corners = false, style,
}: { photo: Photo; shape: FrameShape; className?: string; eager?: boolean; corners?: boolean; style?: CSSProperties }) {
  const { config } = useInvitation();
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const showImg = photo.src && !failed;
  return (
    <figure className={`frame frame--${shape} ${className}`} style={style}>
      <div className="frame__ring">
        <div className={`frame__inner ${showImg && !loaded ? 'is-loading' : ''}`}>
          {showImg ? (
            <img
              src={photo.src!}
              alt={photo.alt}
              loading={eager ? 'eager' : 'lazy'}
              decoding="async"
              {...(eager ? { fetchPriority: 'high' as const } : {})}
              style={{ objectPosition: photo.focus ?? '50% 40%' }}
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
            />
          ) : (
            <>
              <PlaceholderArt kind={photo.placeholder} badge={config.showPlaceholderBadge} />
              <span className="sr-only">{photo.alt}</span>
            </>
          )}
        </div>
      </div>
      {corners && (
        <>
          <FloralCorner className="corner corner--tl" />
          <FloralCorner className="corner corner--br" />
        </>
      )}
    </figure>
  );
}

/* ───────── Reveal (staggered scroll reveal) ───────── */
export function Reveal({
  as: Tag = 'div', children, className = '', delay = 0, id,
}: { as?: ElementType; children: ReactNode; className?: string; delay?: number; id?: string }) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Tag ref={ref} id={id} className={`reveal ${inView ? 'is-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

/* ───────── SectionHeading ───────── */
export function SectionHeading({ script, title, id }: { script?: string; title: string; id?: string }) {
  return (
    <Reveal className="section-heading">
      {script && <p className="script-label" lang="en">{script}</p>}
      <h2 id={id} className="hindi-heading">{title}</h2>
      <OrnamentDivider />
    </Reveal>
  );
}
