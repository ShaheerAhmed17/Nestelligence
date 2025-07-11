'use client';

import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden bg-black text-white">
      {/* Radial Golden Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black/80 z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(212,175,55,0.15),transparent)] z-0"></div>

      <div className="relative z-10 text-center px-4">
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter mb-4 animate-fade-in-up bg-clip-text text-transparent bg-gradient-to-b from-accent to-primary">
          Smarter Real Estate with <span className="text-primary">AI</span>
        </h1>

        <p
          className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-8 animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          Leverage cutting-edge AI to automate listings, nurture leads, and unlock premium insights for agents and investors.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          <Button
            size="lg"
            asChild
            className="bg-primary text-primary-foreground hover:bg-accent shadow-md hover:shadow-primary/30 transition-shadow font-bold"
          >
            <a href="#services">Explore Services</a>
          </Button>

          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-primary text-primary hover:bg-primary/10 hover:text-accent transition-colors font-semibold"
          >
            <a href="#contact">💬 Try The Demo</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
