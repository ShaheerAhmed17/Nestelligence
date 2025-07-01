import Header from '@/components/landing/header';
import HeroSection from '@/components/landing/hero-section';
import ServicesSection from '@/components/landing/services-section';
import PricingSection from '@/components/landing/pricing-section';
import MarketInsightsSection from '@/components/landing/market-insights-section';
import BayutListingsSection from '@/components/landing/bayut-listings-section';

import ContactSection from '@/components/landing/contact-section';
import Footer from '@/components/landing/footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ServicesSection />
        <PricingSection />
        <MarketInsightsSection />
        <BayutListingsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
