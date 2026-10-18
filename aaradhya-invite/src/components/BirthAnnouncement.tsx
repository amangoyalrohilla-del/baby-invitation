import type { ReactNode } from 'react';
import { useInvitation } from '../lib/context';
import { scrollToId } from '../lib/actions';
import { hindiDate, hindiMonthYear, hindiWeekday } from '../lib/date';
import { LuxuryButton, Reveal, SectionHeading } from './ui';
import { CrescentMoon, Cloud } from './art/Nursery';
import { Sparkle } from './art/Ornaments';
import { ClockIcon, HeartIcon, HomeIcon, ScaleIcon, SparklesIcon, MoonIcon } from './art/Icons';

function Row({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="birth-row">
      <dt><span className="birth-row__icon">{icon}</span>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export default function BirthAnnouncement() {
  const { config, content } = useInvitation();
  const tz = config.timezone;

  if (content.shower) {
    return (
      <section id="announcement" className="section birth-section" aria-labelledby="birth-title">
        <div className="container narrow">
          <SectionHeading id="birth-title" script="Little One Is On The Way" title="नन्हे मेहमान का इंतज़ार" />
          <Reveal className="birth-card">
            <CrescentMoon className="birth-card__moon" />
            <Cloud className="birth-card__cloud" />
            <p className="birth-card__lead">हमारे परिवार में जल्द ही गूँजेगी एक नन्ही किलकारी</p>
            <dl className="birth-list">
              {config.dueMonth && (
                <Row icon={<MoonIcon size={18} />} label="अपेक्षित आगमन">
                  <span className="date-highlight">{hindiMonthYear(config.dueMonth, tz)}</span>
                </Row>
              )}
              <Row icon={<HeartIcon size={18} />} label="होने वाली माँ">{config.motherName}</Row>
              <Row icon={<HeartIcon size={18} />} label="होने वाले पिता">{config.fatherName}</Row>
            </dl>
            <div className="btn-row">
              <LuxuryButton onClick={() => scrollToId('gallery')} icon={<SparklesIcon size={18} />}>हमारी प्यारी यादें देखें</LuxuryButton>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="announcement" className="section birth-section" aria-labelledby="birth-title">
      <div className="container narrow">
        <SectionHeading id="birth-title" script="Welcome to the World" title="हमारी खुशियों का जन्मदिन" />
        <Reveal className="birth-card">
          <CrescentMoon className="birth-card__moon" />
          <Cloud className="birth-card__cloud" />
          <Sparkle className="birth-card__spark birth-card__spark--1" />
          <Sparkle className="birth-card__spark birth-card__spark--2" />
          {config.babyBirthDate && (
            <div className="birth-date">
              <span className="birth-date__weekday">{hindiWeekday(config.babyBirthDate, tz)}</span>
              <span className="birth-date__value date-highlight">{hindiDate(config.babyBirthDate, tz)}</span>
            </div>
          )}
          <dl className="birth-list">
            {config.babyName && <Row icon={<SparklesIcon size={18} />} label="नाम">{config.babyName}</Row>}
            {config.babyBirthDate && <Row icon={<MoonIcon size={18} />} label="जन्म तिथि">{hindiDate(config.babyBirthDate, tz)}</Row>}
            {config.birthTime && <Row icon={<ClockIcon size={18} />} label="जन्म समय">{config.birthTime}</Row>}
            {config.birthWeight && <Row icon={<ScaleIcon size={18} />} label="वज़न">{config.birthWeight}</Row>}
            {config.birthPlace && <Row icon={<HomeIcon size={18} />} label="जन्म स्थान">{config.birthPlace}</Row>}
            <Row icon={<HeartIcon size={18} />} label="माता">{config.motherName}</Row>
            <Row icon={<HeartIcon size={18} />} label="पिता">{config.fatherName}</Row>
          </dl>
          <div className="btn-row">
            <LuxuryButton onClick={() => scrollToId('gallery')} icon={<SparklesIcon size={18} />}>हमारी प्यारी यादें देखें</LuxuryButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
