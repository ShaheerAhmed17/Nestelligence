import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => (
  <a href="/" className={cn("flex items-center space-x-3 group", className)}>
    <div className="bg-primary/20 group-hover:bg-primary/30 transition-colors p-2 rounded-md">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary group-hover:scale-110 transition-transform"
      >
        <path
          d="M12 2L2 7V21H22V7L12 2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M15.5 21V15C15.5 13.5947 14.3053 12.0123 13.5 11.5C12.6947 10.9877 11.3053 10.9877 10.5 11.5C9.69474 12.0123 8.5 13.5947 8.5 15V21"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </div>
    <span className="text-xl font-bold font-headline text-foreground group-hover:text-primary transition-colors">
      Nestelligent AI
    </span>
  </a>
);
