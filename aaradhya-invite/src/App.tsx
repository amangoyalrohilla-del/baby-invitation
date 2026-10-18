import { useEffect, useState } from 'react';
import { InvitationProvider, useInvitation } from './lib/context';
import { applyTheme } from './config/themes';
import MagicalOpening from './components/MagicalOpening';
import BabyHero from './components/BabyHero';
import BabyPhotoReveal from './components/BabyPhotoReveal';
import BirthAnnouncement from './components/BirthAnnouncement';
import { ParentsIntroduction, FamilyBlessings } from './components/FamilySections';
import { CelebrationDetails, EventCountdown } from './components/Celebration';
import BabyGallery from './components/BabyGallery';
import { InvitationMessage, VenueDirections, FinalInvitation } from './components/Closing';
import { Header, CalendarSheet, Toast } from './components/Chrome';

function Invitation() {
  const { config } = useInvitation();
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => applyTheme(config.theme), [config.theme]);

  // Preload the hero photo while the opening scene plays
  useEffect(() => {
    if (!config.heroPhoto.src) return;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = config.heroPhoto.src;
    document.head.appendChild(link);
    return () => link.remove();
  }, [config.heroPhoto.src]);

  return (
    <>
      {!introDone && <MagicalOpening onDone={() => { setIntroDone(true); window.scrollTo(0, 0); }} />}
      <div className="site" aria-hidden={!introDone} inert={!introDone}>
        <a className="skip-link" href="#details">समारोह की जानकारी पर जाएँ</a>
        <Header />
        <main>
          <BabyHero entered={introDone} />
          <BabyPhotoReveal />
          <BirthAnnouncement />
          <ParentsIntroduction />
          <FamilyBlessings />
          <CelebrationDetails />
          <EventCountdown />
          <BabyGallery />
          <InvitationMessage />
          <VenueDirections />
          <FinalInvitation />
        </main>
      </div>
      <CalendarSheet />
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <InvitationProvider>
      <Invitation />
    </InvitationProvider>
  );
}
