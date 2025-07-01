'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const packages = [
  {
    name: 'Basic',
    price: '$99',
    features: [
      'AI chatbot + setup',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Standard',
    price: '$199',
    features: [
      'AI chatbot + setup',
      'Lead form integration',
      'Market insights access',
    ],
    cta: 'Choose Standard',
    popular: true,
  },
  {
    name: 'Premium',
    price: '$399+',
    features: [
      'Everything in Standard',
      'Email automation setup',
      '1-on-1 onboarding session',
    ],
    cta: 'Contact Sales',
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary tracking-tight animate-fade-in-up">
            Find the Perfect Plan
          </h2>
          <p
            className="mt-4 max-w-2xl mx-auto text-lg text-gray-300 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            Choose the package that best fits your business needs and start leveraging the power of AI today.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={pkg.name}
              className="animate-fade-in-up"
              style={{ animationDelay: `${0.4 + index * 0.2}s` }}
            >
              <Card className={`h-full flex flex-col bg-neutral-900 border-primary/10 hover:border-primary transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 transform hover:-translate-y-2 ${pkg.popular ? 'border-primary' : ''}`}>
                <CardHeader className="items-center text-center">
                  <CardTitle className="font-headline text-2xl text-primary">
                    {pkg.name}
                  </CardTitle>
                  <CardDescription className="text-4xl font-bold text-white">{pkg.price}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow text-center">
                  <ul className="space-y-4 text-gray-300">
                    {pkg.features.map(feature => (
                      <li key={feature} className="flex items-center justify-center gap-2">
                        <Check className="w-5 h-5 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="justify-center">
                  <Button
                    asChild
                    className={`w-full ${pkg.popular ? 'bg-primary text-primary-foreground hover:bg-accent' : 'bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground'}`}
                  >
                    <a href="#contact">{pkg.cta}</a>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
