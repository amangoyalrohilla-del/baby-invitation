import { useInvitation } from '../lib/context';
import { scrollToId } from '../lib/actions';
import { LuxuryButton, PhotoFrame, Reveal, SectionHeading } from './ui';
import { FloralCorner } from './art/Ornaments';
import { HeartIcon, CalendarIcon } from './art/Icons';
import { StarField } from './art/Nursery';

export function ParentsIntroduction() {
  const { config, content } = useInvitation();
  return (
    <section id="parents" className="section parents-section" aria-labelledby="parents-title">
      <StarField count={18} seed={31} className="starfield--soft" />
      <div className="container parents-grid">
        <Reveal className="parents-photo">
          <PhotoFrame photo={config.parentsPhoto} shape="arch" corners />
        </Reveal>
        <div className="parents-text">
          <SectionHeading id="parents-title" script="Proud Parents" title={content.parents.heading} />
          <Reveal className="parents-names" delay={120}>
            <span className="person-name">{config.fatherName}</span>
            <span className="names-and">एवं</span>
            <span className="person-name">{config.motherName}</span>
          </Reveal>
          <Reveal as="p" className="body-copy parents-message" delay={220}>{content.parents.message}</Reveal>
          <Reveal className="btn-row" delay={300}>
            <LuxuryButton variant="ghost" onClick={() => scrollToId('family')} icon={<HeartIcon size={18} />}>परिवार से मिलें</LuxuryButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function FamilyBlessings() {
  const { config, content } = useInvitation();
  const elders = [
    config.grandfatherName && { relation: 'दादा जी', name: config.grandfatherName },
    config.grandmotherName && { relation: 'दादी जी', name: config.grandmotherName },
  ].filter(Boolean) as { relation: string; name: string }[];
  const members = [...elders, ...config.familyMembers];

  return (
    <section id="family" className="section family-section" aria-labelledby="family-title">
      <div className="container">
        <SectionHeading id="family-title" script="With Love & Blessings" title="दादा-दादी का प्यार और आशीर्वाद" />
        <div className={`family-layout ${config.familyPhoto ? 'has-photo' : ''}`}>
          {config.familyPhoto && (
            <Reveal className="family-photo">
              <PhotoFrame photo={config.familyPhoto} shape="rect" />
            </Reveal>
          )}
          <div className="family-cards">
            {members.map((m, i) => (
              <Reveal key={`${m.relation}-${i}`} className="elder-card" delay={i * 120}>
                <FloralCorner className="elder-card__corner elder-card__corner--tl" />
                <FloralCorner className="elder-card__corner elder-card__corner--br" />
                <span className="elder-card__relation">{m.relation}</span>
                <span className="elder-card__name">{m.name}</span>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal as="p" className="body-copy centered family-text">{content.family.text}</Reveal>
        <Reveal className="btn-row centered-row">
          <LuxuryButton onClick={() => scrollToId('details')} icon={<CalendarIcon size={18} />}>समारोह का कार्यक्रम देखें</LuxuryButton>
        </Reveal>
      </div>
    </section>
  );
}
