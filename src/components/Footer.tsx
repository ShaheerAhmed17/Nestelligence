import Link from 'next/link';
import { Building, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Building className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-semibold">
                <span className="text-primary">Nestelligence</span>
              </span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed">
              Finding your perfect home is our passion. Let us guide you through your real estate journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Properties', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="font-display font-semibold mb-4">Property Types</h4>
            <ul className="space-y-2">
              {['Houses', 'Apartments', 'Condos', 'Townhouses'].map((type) => (
                <li key={type}>
                  <Link
                    href="/properties"
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {type}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-background/70">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                Karachi, Pakistan
              </li>
              <li className="flex items-center gap-3 text-sm text-background/70">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                +92 311 1283440
              </li>
              <li className="flex items-center gap-3 text-sm text-background/70">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                gettoknowshaheer798
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 text-center">
          <p className="text-background/50 text-sm">
            © {new Date().getFullYear()} Nestelligence. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
