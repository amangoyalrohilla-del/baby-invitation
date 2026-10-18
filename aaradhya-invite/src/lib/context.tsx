import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { invitation, type InvitationConfig } from '../config/invitation';
import { buildContent, type Content } from '../config/content';

interface Ctx {
  config: InvitationConfig;
  content: Content;
  openCalendar: () => void;
  closeCalendar: () => void;
  calendarOpen: boolean;
  toast: (msg: string) => void;
  toastMsg: string | null;
}

const InvitationContext = createContext<Ctx | null>(null);

export function InvitationProvider({ children }: { children: ReactNode }) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const content = useMemo(() => buildContent(invitation), []);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => setToastMsg((m) => (m === msg ? null : m)), 2800);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      config: invitation,
      content,
      calendarOpen,
      openCalendar: () => setCalendarOpen(true),
      closeCalendar: () => setCalendarOpen(false),
      toast,
      toastMsg,
    }),
    [content, calendarOpen, toast, toastMsg],
  );

  return <InvitationContext.Provider value={value}>{children}</InvitationContext.Provider>;
}

export function useInvitation() {
  const ctx = useContext(InvitationContext);
  if (!ctx) throw new Error('useInvitation must be used inside <InvitationProvider>');
  return ctx;
}
