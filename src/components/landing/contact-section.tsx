'use client';

import { Card } from '@/components/ui/card';
import { Mail, MessageCircle } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4 animate-fade-in-up">
          Ready to Elevate Your Business?
        </h2>
        <p
          className="max-w-3xl mx-auto text-lg text-gray-300 mb-12 animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          Connect with us to discover how Nestelligence can transform your real estate ventures. Book a free consultation and see the future of real estate, today.
        </p>
        <div
          className="flex flex-col md:flex-row gap-8 justify-center animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          <a
            href="https://wa.me/923111283440"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="h-full bg-neutral-900 hover:bg-black transition-colors border-2 border-primary/20 hover:border-primary flex flex-col items-center justify-center p-8 text-center">
              <MessageCircle className="w-16 h-16 text-primary mb-4" />
              <h3 className="text-2xl font-bold font-headline text-primary">WhatsApp</h3>
              <p className="text-gray-400 mt-2">Chat with us directly</p>
            </Card>
          </a>
          <a href="mailto:nestelligence@gmail.com" className="block">
            <Card className="h-full bg-neutral-900 hover:bg-black transition-colors border-2 border-primary/20 hover:border-primary flex flex-col items-center justify-center p-8 text-center">
              <Mail className="w-16 h-16 text-primary mb-4" />
              <h3 className="text-2xl font-bold font-headline text-primary">Email Us</h3>
              <p className="text-gray-400 mt-2">Send us your inquiry</p>
            </Card>
          </a>
        </div>
      </div>
    </section>
  );
}
