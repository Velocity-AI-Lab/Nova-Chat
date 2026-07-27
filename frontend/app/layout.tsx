import type { Metadata } from "next";
import { Space_Grotesk, Inter, Bitcount_Grid_Double } from "next/font/google";
import "./globals.css";

const bitCountDouble = Bitcount_Grid_Double({
  variable: "--font-bitCountDouble",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nova AI",
  description:
    "Nova is your AI-powered health and fitness chat assistant — get instant answers on workouts, nutrition, recovery, and training plans.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${bitCountDouble.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
