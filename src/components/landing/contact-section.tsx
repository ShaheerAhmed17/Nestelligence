'use client';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">
          Ready to Elevate Your Business?
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-foreground/80 mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Connect with us to discover how Nestelligent AI can transform your real estate ventures. Book a free consultation and see the future of real estate, today.
        </p>
        <div className="flex flex-col md:flex-row gap-8 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <a href="https://wa.me/923111283440" target="_blank" rel="noopener noreferrer" className="block">
            <Card className="h-full bg-background/50 hover:bg-background transition-colors border-2 border-transparent hover:border-primary flex flex-col items-center justify-center p-8 text-center">
                <MessageCircle className="w-16 h-16 text-primary mb-4" />
                <h3 className="text-2xl font-bold font-headline">WhatsApp</h3>
                <p className="text-foreground/70 mt-2">Chat with us directly</p>
            </Card>
          </a>
          <a href="mailto:nestelligence@gmail.com" className="block">
            <Card className="h-full bg-background/50 hover:bg-background transition-colors border-2 border-transparent hover:border-primary flex flex-col items-center justify-center p-8 text-center">
                <Mail className="w-16 h-16 text-primary mb-4" />
                <h3 className="text-2xl font-bold font-headline">Email Us</h3>
                <p className="text-foreground/70 mt-2">Send us your inquiry</p>
            </Card>
          </a>
        </div>
      </div>
    </section>
  );
}
