import { useInvitation } from '../lib/context';
import { copyText, mapsDirectionsUrl, mapsViewUrl, scrollToId, venueText } from '../lib/actions';
import { hindiDate, hindiTime, hindiWeekday } from '../lib/date';
import { LuxuryButton, PhotoFrame, Reveal, SectionHeading } from './ui';
import { LotusMotif, OrnamentDivider, FloralCorner } from './art/Ornaments';
import { CrescentMoon, Cloud, StarField, TeddyBear } from './art/Nursery';
import { CalendarIcon, ClockIcon, CopyIcon, NavigationIcon, PinIcon } from './art/Icons';

export function InvitationMessage() {
  const { content } = useInvitation();
  return (
    <section id="invitation" className="section invitation-section" aria-labelledby="invitation-title">
      <div className="container narrow">
        <Reveal className="invite-card">
          <LotusMotif className="invite-card__lotus" />
          <p className="script-label" lang="en">With Love</p>
          <h2 id="invitation-title" className="hindi-heading">स्नेहिल निमंत्रण</h2>
          <OrnamentDivider />
          <div className="invite-card__text">
            {content.invitation.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <LotusMotif className="invite-card__lotus invite-card__lotus--flip" />
          <div className="btn-row">
            <LuxuryButton variant="ghost" onClick={() => scrollToId('venue')} icon={<PinIcon size={18} />}>स्थान एवं समय देखें</LuxuryButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Illustrated map card used when no Google embed URL is configured */
function MapCard() {
  const { config } = useInvitation();
  return (
    <a className="map-card" href={mapsViewUrl(config)} target="_blank" rel="noopener noreferrer" aria-label={`${config.venue.name} को Google Maps पर खोलें`}>
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="400" height="240" style={{ fill: 'var(--cream)' }} />
        <path d="M0 160 C 80 140, 140 190, 220 170 S 360 120, 400 140" style={{ stroke: 'var(--lavender)' }} strokeWidth="18" fill="none" />
        <path d="M60 0 L 120 240 M 0 70 L 400 40 M 260 0 L 300 240 M 0 210 L 400 200" style={{ stroke: 'var(--ivory)' }} strokeWidth="9" fill="none" />
        <path d="M60 0 L 120 240 M 0 70 L 400 40 M 260 0 L 300 240" style={{ stroke: 'var(--beige)' }} strokeWidth="1.2" fill="none" />
        <rect x="150" y="80" width="80" height="54" rx="8" style={{ fill: 'var(--blush)' }} />
        <circle cx="330" cy="90" r="22" style={{ fill: 'var(--blush)' }} opacity=".7" />
        <circle cx="40" cy="120" r="16" style={{ fill: 'var(--peach)' }} />
        <g transform="translate(190 104)">
          <circle r="26" style={{ fill: 'var(--gold-light)' }} opacity=".45" className="map-pulse" />
          <path d="M0 6 C -12 -6, -14 -14, -14 -20 a14 14 0 0 1 28 0 c0 6 -2 14 -14 26z" transform="translate(0 -8)" style={{ fill: 'var(--gold-deep)' }} />
          <circle cx="0" cy="-28" r="5" fill="#fff" />
        </g>
      </svg>
      <span className="map-card__label"><PinIcon size={16} /> मानचित्र खोलें</span>
    </a>
  );
}

export function VenueDirections() {
  const { config, toast } = useInvitation();
  const tz = config.timezone;
  const address = venueText(config);

  const copy = async () => {
    const ok = await copyText(address);
    toast(ok ? 'पता कॉपी हो गया' : 'कॉपी नहीं हो सका — पता चुनकर कॉपी करें');
    if (!ok) {
      const el = document.getElementById('venue-address');
      if (el) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }
  };

  return (
    <section id="venue" className="section venue-section" aria-labelledby="venue-title">
      <div className="container">
        <SectionHeading id="venue-title" script="The Venue" title="समारोह स्थल" />
        <div className="venue-grid">
          <Reveal className="venue-visual">
            <PhotoFrame photo={config.venue.photo} shape="card" />
          </Reveal>
          <Reveal className="venue-card" delay={140}>
            <FloralCorner className="venue-card__corner" />
            <h3 className="venue-card__name" lang="en">{config.venue.name}</h3>
            <address id="venue-address" className="venue-card__address" lang="en">
              {config.venue.addressLines.map((l) => <span key={l}>{l}</span>)}
            </address>
            <ul className="venue-meta">
              <li><CalendarIcon size={18} /> {hindiWeekday(config.eventDateTime, tz)}, {hindiDate(config.eventDateTime, tz)}</li>
              <li><ClockIcon size={18} /> {hindiTime(config.eventDateTime, tz)} से</li>
            </ul>
            {config.venue.mapEmbedUrl ? (
              <div className="map-embed">
                <iframe title={`${config.venue.name} का नक्शा`} src={config.venue.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            ) : (
              <MapCard />
            )}
            <div className="btn-row">
              <LuxuryButton href={mapsDirectionsUrl(config)} icon={<NavigationIcon size={18} />}>Google Maps पर रास्ता देखें</LuxuryButton>
              <LuxuryButton variant="ghost" onClick={copy} icon={<CopyIcon size={18} />}>पता कॉपी करें</LuxuryButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function FinalInvitation() {
  const { config, content, openCalendar } = useInvitation();
  return (
    <section id="final" className="final-section" aria-labelledby="final-title">
      <div className="final-sky" aria-hidden="true">
        <StarField count={50} seed={77} />
        <CrescentMoon className="final-moon" />
        <Cloud className="final-cloud final-cloud--1" />
        <Cloud className="final-cloud final-cloud--2" />
        <TeddyBear className="final-teddy" withBalloons />
      </div>
      <div className="container narrow final-inner">
        <Reveal className="final-portrait">
          <PhotoFrame photo={config.heroPhoto} shape="oval" />
        </Reveal>
        <Reveal as="h2" id="final-title" className="final-heading">आपके आने से हमारी खुशियाँ दोगुनी हो जाएँगी</Reveal>
        <Reveal as="p" className="final-sub" delay={100}>{content.final.sub}</Reveal>
        <Reveal className="final-names" delay={180}>
          <span className="final-names__name">{content.hero.name}</span>
          <OrnamentDivider />
          <span className="final-names__date">{hindiDate(config.eventDateTime, config.timezone)}</span>
          <span className="final-names__from">{content.final.from}</span>
        </Reveal>
        <Reveal className="btn-row" delay={240}>
          <LuxuryButton onClick={openCalendar} icon={<CalendarIcon size={18} />}>कैलेंडर में सेव करें</LuxuryButton>
          <LuxuryButton variant="ghost" href={mapsViewUrl(config)} icon={<PinIcon size={18} />} className="lux-btn--on-dark">लोकेशन देखें</LuxuryButton>
        </Reveal>
      </div>
      <footer className="site-footer">
        <OrnamentDivider />
        <p className="site-footer__line">सस्नेह — {config.familySurname} परिवार</p>
        <p className="site-footer__small" lang="en">{content.shower ? 'Little One Is On The Way' : 'Welcome Little ' + (config.babyGender === 'boy' ? 'Prince' : 'Princess')}</p>
      </footer>
    </section>
  );
}
