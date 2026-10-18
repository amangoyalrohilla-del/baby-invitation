/** Hindi date/time formatting in the event's timezone (Western digits, as on printed cards). */

const parse = (iso: string) => new Date(/^\d{4}-\d{2}-\d{2}$/.test(iso) ? `${iso}T12:00:00+05:30` : iso);

export function hindiDate(iso: string, tz: string) {
  return new Intl.DateTimeFormat('hi-IN-u-nu-latn', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: tz,
  }).format(parse(iso));
}

export function hindiWeekday(iso: string, tz: string) {
  return new Intl.DateTimeFormat('hi-IN-u-nu-latn', { weekday: 'long', timeZone: tz }).format(parse(iso));
}

export function hindiMonthYear(ym: string, tz: string) {
  return new Intl.DateTimeFormat('hi-IN-u-nu-latn', { month: 'long', year: 'numeric', timeZone: tz })
    .format(parse(`${ym}-15`));
}

/** '2026-12-20T17:00:00+05:30' → 'शाम 5:00 बजे' */
export function hindiTime(iso: string, tz: string) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: tz,
  }).formatToParts(parse(iso));
  const h = Number(parts.find((p) => p.type === 'hour')?.value ?? 0);
  const m = parts.find((p) => p.type === 'minute')?.value ?? '00';
  const period = h < 4 ? 'रात' : h < 12 ? 'सुबह' : h < 16 ? 'दोपहर' : h < 20 ? 'शाम' : 'रात';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${period} ${h12}:${m} बजे`;
}

export const toDate = parse;
