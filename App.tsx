import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ImpactStats } from './components/ImpactStats';
import { LocationFinder } from './components/LocationFinder';
import { EventSection } from './components/EventSection';
import { GratitudeWall } from './components/GratitudeWall';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { DonationModal } from './components/DonationModal';

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [donationOpen, setDonationOpen] = useState(false);

  const openDonationModal = () => setDonationOpen(true);

  return (
    <div className="min-h-screen bg-white font-sans text-stone-800">
      <Navigation
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onDonateClick={openDonationModal}
      />

      <HeroSection onDonateClick={openDonationModal} />

      <ImpactStats />

      <main>
        <LocationFinder />
        <EventSection />
        <GratitudeWall />
      </main>

      <DonationModal isOpen={donationOpen} onClose={() => setDonationOpen(false)} />

      <CTASection onDonateClick={openDonationModal} />

      <Footer />
    </div>
  );
};

export default App;
