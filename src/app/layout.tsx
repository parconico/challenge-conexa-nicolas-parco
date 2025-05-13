import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nicolas Parco Challenge - Rick and Morty Character Comparison ",
  description: "Compare episodes between Rick and Morty characters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  `}
      >
        <div className="relative min-h-screen bg-fixed bg-[url('/rickandmorty.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black opacity-25 z-0" />
          <main className="relative z-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
