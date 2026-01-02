import { ContactForm } from '@/components/ContactForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const contactInfo = [
    {
        icon: MapPin,
        title: 'Visit Us',
        details: ['Karachi, Pakistan'],
    },
    {
        icon: Phone,
        title: 'Call Us',
        details: ['+92 311 1283440'],
    },
    {
        icon: Mail,
        title: 'Email Us',
        details: ['gettoknowshaheer798@gmail.com'],
    },
    {
        icon: Clock,
        title: 'Office Hours',
        details: ['Mon-Sat: 9:00 AM - 12:00 PM'],
    },
];

export default function Contact() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <section className="pt-28 lg:pt-32 pb-12 bg-muted">
                <div className="container mx-auto px-4 lg:px-8 text-center">
                    <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-3">
                        Get in Touch
                    </h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Have questions about a property or want to schedule a viewing? We're here to help you every step of the way.
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-12 lg:py-20">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Contact Form + ChatBot */}
                        <div>
                            <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                                Send Us a Message
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                Fill out the form below and we'll get back to you within 24 hours.
                            </p>

                            <div className="bg-card rounded-xl p-6 lg:p-8 card-shadow space-y-6">
                                {/* Contact Form */}
                                <ContactForm />
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                                Contact Information
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                Reach out through any of the following channels.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6">
                                {contactInfo.map((info) => (
                                    <div
                                        key={info.title}
                                        className="bg-card rounded-xl p-6 card-shadow hover:card-shadow-hover transition-all duration-300"
                                    >
                                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                            <info.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <h3 className="font-display font-semibold text-foreground mb-2">
                                            {info.title}
                                        </h3>
                                        <div className="space-y-1">
                                            {info.details.map((detail, idx) => (
                                                <p key={idx} className="text-sm text-muted-foreground">
                                                    {detail}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Map Placeholder */}
                            <div className="mt-8 rounded-xl overflow-hidden card-shadow h-64 bg-muted flex items-center justify-center">
                                <div className="text-center text-muted-foreground">
                                    <MapPin className="w-10 h-10 mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">Map integration available</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
