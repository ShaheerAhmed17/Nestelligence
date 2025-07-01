'use client';

import LeadCaptureForm from './lead-capture-form';

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
          className="animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          <LeadCaptureForm />
        </div>
      </div>
    </section>
  );
}
