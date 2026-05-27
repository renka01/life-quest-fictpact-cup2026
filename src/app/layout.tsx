import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daily Dungeon",
  description: "Gamified Finance & Task Manager",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-50 min-h-screen`}
      >
        <NextAuthProvider>
          {/* Berikan wrapper div utama di sini agar stacking context terkunci */}
          <div className="relative min-h-screen flex flex-col bg-zinc-950">
            {children}
          </div>
        </NextAuthProvider>
        
        {/* --- GLOBAL COMPONENTS LAYER --- */}
      </body>
    </html>
  );
}