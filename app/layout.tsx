import type { Metadata } from "next";
import "../src/index.css";
import Providers from "@/components/Providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";

export const metadata: Metadata = {
    title: "Nestelligence",
    description: "Nestelligence",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <div className="flex flex-col min-h-screen">
                        <Navbar />
                        <main className="flex-grow">{children}</main>
                        <ChatBot />
                        <Footer />
                    </div>
                </Providers>
            </body>
        </html>
    );
}
