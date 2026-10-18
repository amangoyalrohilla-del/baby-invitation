import { useInvitation } from '../lib/context';
import { mapsViewUrl } from '../lib/actions';
import { hindiDate, hindiTime, hindiWeekday } from '../lib/date';
import { useNow } from '../lib/hooks';
import { LuxuryButton, Reveal, SectionHeading } from './ui';
import { FloatingBalloons } from './art/Nursery';
import { FloralCorner, Sparkle } from './art/Ornaments';
import { CalendarIcon, ClockIcon, PinIcon } from './art/Icons';

export function CelebrationDetails() {
  const { config, content, openCalendar } = useInvitation();
  const tz = config.timezone;
  return (
    <section id="details" className="section details-section" aria-labelledby="details-title">
      <FloatingBalloons />
      <div className="container narrow">
        <SectionHeading id="details-title" script="The Celebration" title="खुशियों के इस उत्सव में आपका स्वागत है" />
        <Reveal className="details-card">
          <FloralCorner className="details-card__corner details-card__corner--tl" />
          <FloralCorner className="details-card__corner details-card__corner--tr" />
          <FloralCorner className="details-card__corner details-card__corner--bl" />
          <FloralCorner className="details-card__corner details-card__corner--br" />
          <p className="details-card__event">{content.eventName}</p>
          <ul className="details-list">
            <li>
              <span className="details-icon"><CalendarIcon size={22} /></span>
              <span className="details-label">दिनांक</span>
              <span className="details-value">{hindiWeekday(config.eventDateTime, tz)}, {hindiDate(config.eventDateTime, tz)}</span>
            </li>
            <li>
              <span className="details-icon"><ClockIcon size={22} /></span>
              <span className="details-label">समय</span>
              <span className="details-value">{hindiTime(config.eventDateTime, tz)} से</span>
            </li>
            <li>
              <span className="details-icon"><PinIcon size={22} /></span>
              <span className="details-label">स्थान</span>
              <span className="details-value" lang="en">{config.venue.name}, {config.venue.addressLines.join(', ')}</span>
            </li>
          </ul>
          <div className="btn-row">
            <LuxuryButton onClick={openCalendar} icon={<CalendarIcon size={18} />}>कैलेंडर में सेव करें</LuxuryButton>
            <LuxuryButton variant="ghost" href={mapsViewUrl(config)} icon={<PinIcon size={18} />}>स्थान देखें</LuxuryButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const UNITS = [
  { key: 'd', label: 'दिन', ms: 86400000 },
  { key: 'h', label: 'घंटे', ms: 3600000 },
  { key: 'm', label: 'मिनट', ms: 60000 },
  { key: 's', label: 'सेकंड', ms: 1000 },
] as const;

export function EventCountdown() {
  const { config, openCalendar } = useInvitation();
  const now = useNow(1000);
  const start = new Date(config.eventDateTime).getTime();
  const end = new Date(config.eventEndDateTime).getTime();
  const state = now < start ? 'before' : now < end ? 'live' : 'after';

  let rest = Math.max(0, start - now);
  const values = UNITS.map((u) => {
    const n = Math.floor(rest / u.ms);
    rest -= n * u.ms;
    return { ...u, n };
  });

  return (
    <section id="countdown" className="section countdown-section" aria-labelledby="countdown-title">
      <Sparkle className="cd-spark cd-spark--1" />
      <Sparkle className="cd-spark cd-spark--2" />
      <Sparkle className="cd-spark cd-spark--3" />
      <div className="container narrow">
        <SectionHeading id="countdown-title" script="Counting the Moments" title="नन्ही खुशियों के उत्सव का इंतज़ार" />
        {state === 'before' && (
          <Reveal className="countdown" >
            <div className="countdown__grid" role="timer" aria-label={`समारोह में ${values[0].n} दिन, ${values[1].n} घंटे और ${values[2].n} मिनट बाकी`}>
              {values.map((u) => (
                <div key={u.key} className="cd-tile" aria-hidden="true">
                  <span className="cd-tile__num">{String(u.n).padStart(2, '0')}</span>
                  <span className="cd-tile__label">{u.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        )}
        {state === 'live' && (
          <Reveal className="countdown-message">
            <p className="countdown-message__big">आज है खुशियों का खास दिन!</p>
            <p className="body-copy centered">समारोह {hindiTime(config.eventDateTime, config.timezone)} से आरंभ हो चुका है। आपका इंतज़ार है।</p>
          </Reveal>
        )}
        {state === 'after' && (
          <Reveal className="countdown-message">
            <p className="countdown-message__big">समारोह सानंद सम्पन्न हुआ</p>
            <p className="body-copy centered">आपके स्नेह और आशीर्वाद के लिए हृदय से धन्यवाद।</p>
          </Reveal>
        )}
        {state === 'before' && (
          <Reveal className="btn-row centered-row">
            <LuxuryButton variant="ghost" onClick={openCalendar} icon={<CalendarIcon size={18} />}>तारीख याद रखें</LuxuryButton>
          </Reveal>
        )}
      </div>
    </section>
  );
}
