import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/PropertyCard';
import { properties } from '@/data/properties';
import { ArrowRight, Shield, Award, Users, ChevronRight } from 'lucide-react';
import heroImage from '@/assets/hero-home.jpg';

const featuredProperties = properties.filter((p) => p.featured).slice(0, 3);

const stats = [
    { value: '500+', label: 'Properties Sold' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '15+', label: 'Years Experience' },
    { value: '50+', label: 'Expert Agents' },
];

const features = [
    {
        icon: Shield,
        title: 'Trusted Service',
        description: 'We prioritize transparency and integrity in every transaction.',
    },
    {
        icon: Award,
        title: 'Award Winning',
        description: 'Recognized as a top real estate agency for 5 consecutive years.',
    },
    {
        icon: Users,
        title: 'Expert Team',
        description: 'Our agents bring decades of combined real estate expertise.',
    },
];

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex items-center pt-20">
                <div className="absolute inset-0">
                    <Image
                        src={heroImage}
                        alt="Beautiful modern home at sunset"
                        fill
                        className="w-full h-full object-cover"
                        priority
                    />
                    <div className="absolute inset-0 hero-gradient" />
                </div>

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <div className="max-w-2xl animate-slide-up">
                        <span className="inline-block px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-primary-foreground text-sm font-medium mb-6">
                            Your Dream Home Awaits
                        </span>
                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                            Find Your Perfect Place to Call Home
                        </h1>
                        <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
                            Discover exceptional properties that match your lifestyle. From luxury estates to cozy apartments, we help you find the perfect space.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button variant="hero" size="xl" asChild>
                                <Link href="/properties">
                                    Browse Properties
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="heroOutline" size="xl" asChild>
                                <Link href="/contact">Contact Us</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-card border-y border-border">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="font-display text-3xl lg:text-4xl font-bold text-primary mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Properties */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="text-primary text-sm font-medium uppercase tracking-wider">
                            Featured Listings
                        </span>
                        <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-4">
                            Handpicked Properties for You
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Explore our curated selection of exceptional properties, chosen for their unique features and prime locations.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
                        {featuredProperties.map((property, index) => (
                            <div
                                key={property.id}
                                className="animate-slide-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <PropertyCard property={property} />
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Button variant="outline" size="lg" asChild>
                            <Link href="/properties">
                                View All Properties
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 lg:py-24 bg-muted">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="text-primary text-sm font-medium uppercase tracking-wider">
                            Why Choose Us
                        </span>
                        <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-4">
                            Your Trusted Real Estate Partner
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={feature.title}
                                className="bg-card rounded-xl p-8 card-shadow hover:card-shadow-hover transition-all duration-300 animate-slide-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                                    <feature.icon className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 lg:py-24 bg-primary">
                <div className="container mx-auto px-4 lg:px-8 text-center">
                    <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
                        Ready to Find Your Dream Home?
                    </h2>
                    <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
                        Let our expert agents guide you through the process. Contact us today to start your journey.
                    </p>
                    <Button variant="hero" size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
                        <Link href="/contact">
                            Get in Touch
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
