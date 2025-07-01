'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Users, BarChart3 } from 'lucide-react';

const services = [
  {
    icon: MessageCircle,
    title: 'AI-Powered Chatbots',
    description:
      'Deploy intelligent chatbots that handle property listings, answer inquiries, and capture leads 24/7, ensuring you never miss an opportunity.',
    cta: 'Try the Demo',
  },
  {
    icon: Users,
    title: 'Automated Lead Nurturing',
    description:
      'Our AI sets up automated yet personalized follow-ups via email and text, keeping potential clients engaged and moving them through the sales funnel.',
    cta: 'Book a Free Consultation',
  },
  {
    icon: BarChart3,
    title: 'Market Insight Dashboards',
    description:
      'Gain a competitive edge with AI-generated, real-time property trends and forecasts, helping you make smarter, data-driven decisions.',
    cta: 'Explore Services',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-32 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary tracking-tight animate-fade-in-up">
            A New Paradigm in Real Estate
          </h2>
          <p
            className="mt-4 max-w-2xl mx-auto text-lg text-gray-300 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            Our suite of AI tools is designed to amplify your expertise with unmatched efficiency and intelligence.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="animate-fade-in-up"
              style={{ animationDelay: `${0.4 + index * 0.2}s` }}
            >
              <Card className="h-full flex flex-col bg-neutral-900 border-primary/10 hover:border-primary transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 transform hover:-translate-y-2">
                <CardHeader className="items-center text-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-2xl text-primary">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow text-center">
                  <CardDescription className="text-gray-300">
                    {service.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="justify-center">
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/30"
                  >
                    {service.cta}
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
