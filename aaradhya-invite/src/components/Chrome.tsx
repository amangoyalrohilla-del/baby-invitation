/** Site chrome: fixed header with section navigation, calendar sheet, toast and optional music control. */
import { useEffect, useRef, useState } from 'react';
import { useInvitation } from '../lib/context';
import { downloadIcs, googleCalendarUrl, scrollToId } from '../lib/actions';
import { hindiDate, hindiTime } from '../lib/date';
import {
  CalendarIcon, CloseIcon, DownloadIcon, ExternalIcon, MenuIcon, MusicOffIcon, MusicOnIcon, CheckIcon,
} from './art/Icons';

const NAV = [
  { id: 'details', label: 'समारोह' },
  { id: 'gallery', label: 'यादें' },
  { id: 'family', label: 'परिवार' },
  { id: 'venue', label: 'स्थल' },
];

export function Header() {
  const { content } = useInvitation();
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const go = (id: string) => {
    setMenu(false);
    scrollToId(id);
  };

  return (
    <header className={`site-header ${solid ? 'is-solid' : ''}`}>
      <div className="site-header__inner">
        <button type="button" className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="ऊपर जाएँ">
          <span className="brand__mono">{content.monogram}</span>
          <span className="brand__name">{content.titleName}</span>
        </button>
        <nav className="site-nav" aria-label="मुख्य">
          {NAV.map((n) => (
            <button key={n.id} type="button" onClick={() => go(n.id)}>{n.label}</button>
          ))}
        </nav>
        <div className="site-header__tools">
          <MusicToggle />
          <button type="button" className="icon-btn menu-btn" aria-expanded={menu} aria-controls="mobile-menu" aria-label="मेन्यू" onClick={() => setMenu((m) => !m)}>
            {menu ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      <div id="mobile-menu" className="mobile-menu" hidden={!menu}>
        {NAV.map((n) => (
          <button key={n.id} type="button" onClick={() => go(n.id)}>{n.label}</button>
        ))}
      </div>
    </header>
  );
}

export function CalendarSheet() {
  const { config, content, calendarOpen, closeCalendar, toast } = useInvitation();
  const panel = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const when = `${hindiDate(config.eventDateTime, config.timezone)}, ${hindiTime(config.eventDateTime, config.timezone)}`;
  const details = `${content.eventName}\n${when}\n${config.venue.name}, ${config.venue.addressLines.join(', ')}\n\n${content.final.from}`;

  useEffect(() => {
    if (!calendarOpen) return;
    lastFocus.current = document.activeElement as HTMLElement;
    panel.current?.querySelector<HTMLElement>('a,button')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCalendar();
      if (e.key === 'Tab' && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>('a,button');
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      lastFocus.current?.focus?.({ preventScroll: true });
    };
  }, [calendarOpen, closeCalendar]);

  if (!calendarOpen) return null;

  return (
    <div className="sheet-backdrop" onClick={closeCalendar}>
      <div ref={panel} className="sheet" role="dialog" aria-modal="true" aria-labelledby="cal-title" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="icon-btn sheet__close" onClick={closeCalendar} aria-label="बंद करें"><CloseIcon /></button>
        <CalendarIcon size={28} className="sheet__icon" />
        <h2 id="cal-title" className="sheet__title">तारीख अपने कैलेंडर में सेव करें</h2>
        <p className="sheet__when">{content.eventName}<br />{when}</p>
        <div className="sheet__actions">
          <a className="sheet-option" href={googleCalendarUrl(config, content.eventName, details)} target="_blank" rel="noopener noreferrer" onClick={closeCalendar}>
            <ExternalIcon /> <span><strong>Google Calendar</strong><small>Android व वेब के लिए</small></span>
          </a>
          <button
            type="button"
            className="sheet-option"
            onClick={() => {
              const ok = downloadIcs(config, content.eventName, details);
              toast(ok ? 'कैलेंडर फ़ाइल डाउनलोड हो रही है' : 'डाउनलोड नहीं हो सका, कृपया Google Calendar चुनें');
              closeCalendar();
            }}
          >
            <DownloadIcon /> <span><strong>कैलेंडर फ़ाइल (.ics)</strong><small>iPhone, Outlook व अन्य ऐप्स के लिए</small></span>
          </button>
        </div>
        <p className="sheet__note">समारोह से एक दिन पहले याद दिलाने का रिमाइंडर भी जुड़ जाएगा।</p>
      </div>
    </div>
  );
}

export function Toast() {
  const { toastMsg } = useInvitation();
  return (
    <div className="toast-region" role="status" aria-live="polite">
      {toastMsg && (
        <div className="toast"><CheckIcon size={18} /> {toastMsg}</div>
      )}
    </div>
  );
}

/** Rendered only when a licensed audio file is configured. Never autoplays with sound. */
export function MusicToggle() {
  const { config } = useInvitation();
  const audio = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => () => audio.current?.pause(), []);
  if (!config.music.src || error) return null;

  const toggle = async () => {
    if (!audio.current) {
      audio.current = new Audio(config.music.src!);
      audio.current.loop = true;
      audio.current.volume = 0.45;
      audio.current.addEventListener('error', () => setError(true));
    }
    if (on) {
      audio.current.pause();
      setOn(false);
    } else {
      try {
        await audio.current.play();
        setOn(true);
      } catch {
        setOn(false);
      }
    }
  };

  return (
    <button type="button" className="icon-btn" aria-pressed={on} aria-label={on ? `संगीत बंद करें (${config.music.title})` : `संगीत चालू करें (${config.music.title})`} onClick={toggle}>
      {on ? <MusicOnIcon /> : <MusicOffIcon />}
    </button>
  );
}
