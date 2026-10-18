import { useEffect, useRef, useState } from 'react';
import { useInvitation } from '../lib/context';
import { scrollToId } from '../lib/actions';
import type { Photo } from '../config/invitation';
import { LuxuryButton, PhotoFrame, Reveal, SectionHeading } from './ui';
import { ChevronLeft, ChevronRight, CloseIcon, SparklesIcon } from './art/Icons';

export default function BabyGallery() {
  const { config } = useInvitation();
  const photos = config.babyGallery;
  const [open, setOpen] = useState<number | null>(null);

  if (!photos.length) return null;

  return (
    <section id="gallery" className="section gallery-section" aria-labelledby="gallery-title">
      <div className="container">
        <SectionHeading id="gallery-title" script="Sweet Little Memories" title="प्यारी-प्यारी यादें" />
        <ul className="gallery">
          {photos.map((p, i) => (
            <Reveal as="li" key={i} className="gallery__item" delay={(i % 3) * 110}>
              <button type="button" className="gallery__btn" onClick={() => setOpen(i)} aria-label={`बड़ी तस्वीर देखें: ${p.alt}`}>
                <PhotoFrame photo={p} shape="arch" />
              </button>
            </Reveal>
          ))}
        </ul>
        <Reveal className="btn-row centered-row">
          <LuxuryButton onClick={() => scrollToId('invitation')} icon={<SparklesIcon size={18} />}>समारोह का निमंत्रण देखें</LuxuryButton>
        </Reveal>
      </div>
      {open !== null && <Lightbox photos={photos} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </section>
  );
}

function Lightbox({ photos, index, onIndex, onClose }: { photos: Photo[]; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const prev = () => onIndex((index - 1 + photos.length) % photos.length);
  const next = () => onIndex((index + 1) % photos.length);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      opener?.focus?.({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const p = photos[index];
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="तस्वीर दर्शक" onClick={onClose}>
      <button ref={closeRef} type="button" className="icon-btn lightbox__close" onClick={onClose} aria-label="बंद करें"><CloseIcon /></button>
      <div
        className="lightbox__stage"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
        onTouchEnd={(e) => {
          if (!touch.current) return;
          const dx = e.changedTouches[0].clientX - touch.current.x;
          const dy = e.changedTouches[0].clientY - touch.current.y;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) (dx < 0 ? next : prev)();
          touch.current = null;
        }}
      >
        <PhotoFrame key={index} photo={p} shape="rect" className="lightbox__photo" eager />
        <p className="lightbox__caption">{p.alt}<span>{index + 1} / {photos.length}</span></p>
      </div>
      {photos.length > 1 && (
        <>
          <button type="button" className="icon-btn lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="पिछली तस्वीर"><ChevronLeft size={26} /></button>
          <button type="button" className="icon-btn lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="अगली तस्वीर"><ChevronRight size={26} /></button>
        </>
      )}
    </div>
  );
}
