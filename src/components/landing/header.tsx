import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Logo />
        <nav>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
            <a href="#contact">Book a Free Consultation</a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
