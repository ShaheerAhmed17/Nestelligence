import { Logo } from '@/components/logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-primary/20 bg-black">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Logo />
          <p className="text-sm text-gray-400 font-body mt-2">
            Automate, Engage, Close - with Nestelligence.
          </p>
        </div>
        <div className="flex items-center gap-x-4 text-sm text-gray-400 font-body">
          <p>&copy; {currentYear} Nestelligence. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
