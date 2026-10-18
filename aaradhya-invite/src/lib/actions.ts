/** Calendar, maps and clipboard helpers. No navigation logic is hard-coded in components. */
import type { InvitationConfig } from '../config/invitation';

const utcStamp = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

export function eventSummary(c: InvitationConfig, eventName: string) {
  const who = c.invitationMode === 'newborn' && c.babyName ? ` — ${c.babyName}` : '';
  return `${eventName}${who}`;
}

export function venueText(c: InvitationConfig) {
  return [c.venue.name, ...c.venue.addressLines].join(', ');
}

export function googleCalendarUrl(c: InvitationConfig, eventName: string, details: string) {
  const start = utcStamp(new Date(c.eventDateTime));
  const end = utcStamp(new Date(c.eventEndDateTime));
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: eventSummary(c, eventName),
    dates: `${start}/${end}`,
    details,
    location: venueText(c),
    ctz: c.timezone,
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

/** RFC 5545 text escaping */
const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

/** Fold lines to 75 octets without splitting a multi-byte character */
function fold(line: string) {
  const enc = new TextEncoder();
  const out: string[] = [];
  let cur = '';
  let bytes = 0;
  for (const ch of line) {
    const b = enc.encode(ch).length;
    const limit = out.length === 0 ? 75 : 74; // continuation lines start with a space
    if (bytes + b > limit) {
      out.push(cur);
      cur = '';
      bytes = 0;
    }
    cur += ch;
    bytes += b;
  }
  out.push(cur);
  return out.join('\r\n ');
}

export function buildIcs(c: InvitationConfig, eventName: string, details: string) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Luxury Baby Invitation//HI',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${utcStamp(new Date(c.eventDateTime))}-${c.familySurname.length}@baby-invitation`,
    `DTSTAMP:${utcStamp(new Date())}`,
    `DTSTART:${utcStamp(new Date(c.eventDateTime))}`,
    `DTEND:${utcStamp(new Date(c.eventEndDateTime))}`,
    `SUMMARY:${esc(eventSummary(c, eventName))}`,
    `DESCRIPTION:${esc(details)}`,
    `LOCATION:${esc(venueText(c))}`,
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:${esc(eventName)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return lines.map(fold).join('\r\n') + '\r\n';
}

/** Returns false when the browser/frame blocks downloads */
export function downloadIcs(c: InvitationConfig, eventName: string, details: string) {
  try {
    const blob = new Blob([buildIcs(c, eventName, details)], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'celebration-invite.ics';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    return true;
  } catch {
    return false;
  }
}

export function mapsViewUrl(c: InvitationConfig) {
  return c.venue.mapsUrl ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.venue.mapsQuery)}`;
}

export function mapsDirectionsUrl(c: InvitationConfig) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(c.venue.mapsQuery)}`;
}

/** Copy with a graceful fallback for frames/browsers that refuse the Clipboard API */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through */
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}

/** Smooth scroll that respects the fixed header height */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const header = document.querySelector<HTMLElement>('.site-header');
  const offset = (header?.offsetHeight ?? 0) + 8;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
  // Move focus for keyboard & screen-reader users without a second jump
  const heading = el.querySelector<HTMLElement>('h2, h1');
  if (heading) {
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
  }
}
