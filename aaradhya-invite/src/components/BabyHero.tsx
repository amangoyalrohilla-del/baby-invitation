import { useInvitation } from '../lib/context';
import { scrollToId } from '../lib/actions';
import { hindiDate } from '../lib/date';
import { LuxuryButton, PhotoFrame } from './ui';
import { OrnamentDivider } from './art/Ornaments';
import { Cloud, StarField } from './art/Nursery';
import { CalendarIcon, ChevronDown, SparklesIcon } from './art/Icons';

export default function BabyHero({ entered }: { entered: boolean }) {
  const { config, content, openCalendar } = useInvitation();
  const portrait = content.shower && !config.heroPhoto.src ? { ...config.heroPhoto, placeholder: 'maternity' as const } : config.heroPhoto;

  return (
    <section id="top" className={`hero ${entered ? 'is-entered' : ''}`} aria-labelledby="hero-name">
      <div className="hero__bg" aria-hidden="true">
        <StarField count={26} seed={11} className="starfield--soft" />
      </div>
      <div className="hero__grid container">
        <div className="hero__portrait">
          <div className="hero__halo" aria-hidden="true" />
          <PhotoFrame photo={portrait} shape="oval" corners eager className="hero__frame" />
          <Cloud className="hero__cloud" />
        </div>

        <div className="hero__text">
          <p className="script-label hero__script" lang="en">{content.hero.script}</p>
          <p className="hero__headline">{content.hero.headline}</p>
          <h1 id="hero-name" className="hero__name">{content.hero.name}</h1>
          <OrnamentDivider className="hero__divider" />
          <p className="hero__statement">{content.hero.statement}</p>
          <p className="hero__date">
            <span className="hero__date-label">{content.eventName}</span>
            <span className="hero__date-value">{hindiDate(config.eventDateTime, config.timezone)}</span>
          </p>
          <div className="btn-row hero__ctas">
            <LuxuryButton onClick={() => scrollToId('details')} icon={<SparklesIcon size={18} />}>समारोह की जानकारी देखें</LuxuryButton>
            <LuxuryButton variant="ghost" onClick={openCalendar} icon={<CalendarIcon size={18} />}>तारीख सेव करें</LuxuryButton>
          </div>
        </div>
      </div>
      <button type="button" className="scroll-cue" onClick={() => scrollToId('reveal')} aria-label="नीचे स्क्रॉल करें">
        <span>नीचे देखें</span>
        <ChevronDown size={18} />
      </button>
    </section>
  );
}
