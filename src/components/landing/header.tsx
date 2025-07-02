
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-primary/20">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <Button
            variant="link"
            asChild
            className="text-foreground hover:text-primary"
          >
            <Link href="/market-analysis">Market Analysis</Link>
          </Button>
          <Button
            variant="link"
            asChild
            className="text-foreground hover:text-primary"
          >
            <a href="#pricing">Pricing</a>
          </Button>
          <Button
            variant="link"
            asChild
            className="text-foreground hover:text-primary"
          >
            <Link href="/admin">Admin</Link>
          </Button>
          <Button
            asChild
            className="bg-primary hover:bg-accent text-primary-foreground font-semibold px-6 py-2 rounded-md shadow-md hover:shadow-lg transition"
          >
            <a href="#contact">Book a Free Consultation</a>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-black border-l border-primary/20 text-white w-full p-0"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b border-primary/20">
                  <Logo />
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col items-center justify-center flex-grow gap-8 text-xl">
                  <SheetClose asChild>
                    <Link
                      href="/market-analysis"
                      className="hover:text-primary transition-colors"
                    >
                      Market Analysis
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <a
                      href="#pricing"
                      className="hover:text-primary transition-colors"
                    >
                      Pricing
                    </a>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/admin"
                      className="hover:text-primary transition-colors"
                    >
                      Admin
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      asChild
                      className="bg-primary hover:bg-accent text-primary-foreground font-semibold px-8 py-3 rounded-md shadow-md hover:shadow-lg transition text-lg mt-4"
                    >
                      <a href="#contact">Book a Free Consultation</a>
                    </Button>
                  </SheetClose>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
