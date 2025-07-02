import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import ChatbotEmbed from '@/components/ChatbotEmbed';
import VisitorTracker from '@/components/VisitorTracker';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nestelligence',
  description:
    'Smarter Real Estate with AI. Leverage cutting-edge technology to automate tasks, accelerate sales, and dominate the luxury market.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <VisitorTracker />
        <ChatbotEmbed />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
