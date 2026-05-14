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
  title: "Dev Resource Hub | Premium Developer Ecosystem",
  description: "Discover the best developer tools, AI resources, and learning platforms in one community-curated hub.",
  keywords: ["developer tools", "AI resources", "web development", "open source", "devops", "learning resources"],
  authors: [{ name: "Sai Kiran BK" }],
  openGraph: {
    title: "Dev Resource Hub",
    description: "The ultimate community-curated hub for developers.",
    url: "https://saikirantechy.github.io/dev-resource-hub/",
    siteName: "Dev Resource Hub",
    images: [
      {
        url: "https://saikirantechy.github.io/dev-resource-hub/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev Resource Hub",
    description: "The ultimate community-curated hub for developers.",
    images: ["https://saikirantechy.github.io/dev-resource-hub/og-image.png"],
  },
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a]">
        <CommandPalette />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
