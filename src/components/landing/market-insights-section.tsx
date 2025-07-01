'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export default function MarketInsightsSection() {
  return (
    <section
      className="py-20 md:py-32 bg-background text-white"
      id="market-insights"
    >
      <div className="container mx-auto px-4 text-center">
        <BarChart3 className="w-16 h-16 text-primary mx-auto mb-6" />
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4 animate-fade-in-up">
          Unlock Powerful Market Insights
        </h2>
        <p
          className="max-w-3xl mx-auto text-lg text-gray-300 mb-12 animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          Go beyond simple listings. Our AI-driven analytics platform allows you to compare market trends, average prices, and property statistics across different cities in real-time. Make informed investment decisions with data you can trust.
        </p>
        <div
          className="animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          <Button
            size="lg"
            asChild
            className="bg-primary text-primary-foreground hover:bg-accent shadow-md hover:shadow-primary/30 transition-shadow font-bold"
          >
            <a href="/market-analysis">Launch Comparison Tool</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
