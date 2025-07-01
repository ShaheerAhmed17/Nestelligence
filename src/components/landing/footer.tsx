import { Logo } from '@/components/logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border/50 bg-background">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Logo />
          <p className="text-sm text-foreground/60 font-body mt-2">
            The Intelligent Path to Real Estate.
          </p>
        </div>
        <p className="text-sm text-foreground/60 font-body">
          &copy; {currentYear} Nestelligence. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
