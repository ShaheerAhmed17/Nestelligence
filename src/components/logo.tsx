import { cn } from "@/lib/utils";
import Link from "next/link";

export const Logo = ({ className }: { className?: string }) => (
  <Link href="/" className={cn("flex items-center space-x-3 group", className)}>
    <div className="bg-primary/20 group-hover:bg-primary/30 transition-colors p-2 rounded-md">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary group-hover:scale-110 transition-transform"
      >
        <path d="M2.5 20C2.5 18.8954 3.39543 18 4.5 18H19.5C20.6046 18 21.5 18.8954 21.5 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 18V11L10 9V18H7Z" fill="currentColor"/>
        <path d="M10.5 18V6L13.5 4V18H10.5Z" fill="currentColor"/>
        <path d="M14 18V9L17 7V18H14Z" fill="currentColor"/>
        <rect x="15" y="10" width="1" height="1.5" fill="hsl(var(--background))" />
        <rect x="15" y="13" width="1" height="1.5" fill="hsl(var(--background))" />
      </svg>
    </div>
    <span className="text-xl font-bold font-headline text-foreground group-hover:text-primary transition-colors">
      Nestelligence
    </span>
  </Link>
);
