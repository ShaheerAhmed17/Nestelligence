'use client';

import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background/80 z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,215,0,0.1),rgba(255,255,255,0))] z-0"></div>
      
      <div className="relative z-10 text-center px-4">
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter mb-4 animate-fade-in-up bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">
          Smarter Real Estate with <span className="text-primary">AI</span>
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-foreground/80 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Leverage cutting-edge AI to automate tasks, accelerate sales, and dominate the luxury market.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
            <a href="#services">Explore Services</a>
          </Button>
          <Button size="lg" variant="outline" asChild className="border-primary/50 hover:bg-primary/10 hover:text-primary transition-colors">
            <a href="#contact">Try The Demo</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
