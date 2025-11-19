import { LandingHeader } from '@/components/landing/header';
import { LandingFooter } from '@/components/landing/footer';
import { HeroSection } from '@/components/landing/hero-section';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-1">
        <HeroSection />
      </main>
      <LandingFooter />
    </div>
  );
}
