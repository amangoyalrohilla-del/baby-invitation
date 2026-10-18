/** Lightweight line icons (Lucide-style, drawn locally so the site has zero icon dependencies). */
import type { ReactNode, SVGProps } from 'react';

type P = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 20, children, ...rest }: P & { children: ReactNode }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...rest}
    >
      {children}
    </svg>
  );
}

export const CalendarIcon = (p: P) => (
  <Base {...p}><rect x="3" y="4.5" width="18" height="16" rx="2.5" /><path d="M3 9.5h18M8 2.5v4M16 2.5v4" /><path d="M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01" /></Base>
);
export const ClockIcon = (p: P) => (
  <Base {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.2 2" /></Base>
);
export const PinIcon = (p: P) => (
  <Base {...p}><path d="M12 21s-7-6.3-7-11.5a7 7 0 0 1 14 0C19 14.7 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></Base>
);
export const NavigationIcon = (p: P) => (
  <Base {...p}><path d="M3 11.5 21 3l-8.5 18-2-7.5Z" /></Base>
);
export const CopyIcon = (p: P) => (
  <Base {...p}><rect x="8.5" y="8.5" width="12" height="12" rx="2.5" /><path d="M15.5 8.5V6a2.5 2.5 0 0 0-2.5-2.5H6A2.5 2.5 0 0 0 3.5 6v7A2.5 2.5 0 0 0 6 15.5h2.5" /></Base>
);
export const CheckIcon = (p: P) => (
  <Base {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></Base>
);
export const ChevronLeft = (p: P) => (<Base {...p}><path d="m15 5-7 7 7 7" /></Base>);
export const ChevronRight = (p: P) => (<Base {...p}><path d="m9 5 7 7-7 7" /></Base>);
export const ChevronDown = (p: P) => (<Base {...p}><path d="m6 9 6 6 6-6" /></Base>);
export const CloseIcon = (p: P) => (<Base {...p}><path d="M6 6l12 12M18 6 6 18" /></Base>);
export const MenuIcon = (p: P) => (<Base {...p}><path d="M4 7h16M4 12h16M4 17h10" /></Base>);
export const ExternalIcon = (p: P) => (
  <Base {...p}><path d="M14 4h6v6M20 4l-9 9" /><path d="M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" /></Base>
);
export const DownloadIcon = (p: P) => (
  <Base {...p}><path d="M12 4v11M7 10.5l5 5 5-5" /><path d="M4.5 19.5h15" /></Base>
);
export const HeartIcon = (p: P) => (
  <Base {...p}><path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z" /></Base>
);
export const SparklesIcon = (p: P) => (
  <Base {...p}><path d="M12 3.5 13.6 9l5.4 1.6-5.4 1.6L12 17.7l-1.6-5.5L5 10.6 10.4 9Z" /><path d="M19 3v3M17.5 4.5h3M5 17v3M3.5 18.5h3" /></Base>
);
export const MoonIcon = (p: P) => (<Base {...p}><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" /></Base>);
export const ScaleIcon = (p: P) => (
  <Base {...p}><path d="M6 20h12l-1.5-11h-9Z" /><circle cx="12" cy="6" r="2.2" /><path d="M10.5 14.5 12 12.5" /></Base>
);
export const HomeIcon = (p: P) => (
  <Base {...p}><path d="M4 11 12 4l8 7" /><path d="M6 9.5V20h12V9.5" /><path d="M10 20v-5h4v5" /></Base>
);
export const MusicOnIcon = (p: P) => (
  <Base {...p}><path d="M5 9.5h3l4.5-4v13L8 14.5H5Z" /><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" /></Base>
);
export const MusicOffIcon = (p: P) => (
  <Base {...p}><path d="M5 9.5h3l4.5-4v13L8 14.5H5Z" /><path d="m16.5 9.5 5 5M21.5 9.5l-5 5" /></Base>
);
export const GiftIcon = (p: P) => (
  <Base {...p}><rect x="3.5" y="9" width="17" height="11.5" rx="1.5" /><path d="M2.5 9h19v-3h-19ZM12 6v14.5" /><path d="M12 6C10 2.5 6.5 3.5 7.5 6M12 6c2-3.5 5.5-2.5 4.5 0" /></Base>
);
