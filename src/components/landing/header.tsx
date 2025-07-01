import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-primary/20">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Logo />
        <nav>
          <Button
            asChild
            className="bg-primary hover:bg-accent text-primary-foreground font-semibold px-6 py-2 rounded-md shadow-md hover:shadow-lg transition"
          >
            <a href="#contact">Book a Free Consultation</a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
