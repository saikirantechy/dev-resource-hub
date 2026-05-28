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
  title: "Dev Resource Hub | The Open AI Developer Universe",
  description: "Discover AI tools, agents, prompts, compare frameworks, explore trending resources, and connect with 10,000+ developers building the future.",
  keywords: ["AI tools", "AI agents", "developer tools", "AI prompts", "Cursor", "Windsurf", "CrewAI", "LangGraph", "open source AI", "web development"],
  authors: [{ name: "Sai Kiran BK" }],
  openGraph: {
    title: "Dev Resource Hub — The Open AI Developer Universe",
    description: "Discover AI tools, agents, prompts, and connect with the global developer ecosystem.",
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
    title: "Dev Resource Hub — The Open AI Developer Universe",
    description: "Discover AI tools, agents, prompts, and connect with the global developer ecosystem.",
    images: ["https://saikirantechy.github.io/dev-resource-hub/og-image.png"],
  },
};

import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import PageTransition from "@/components/PageTransition";
import CursorGlow from "@/components/CursorGlow";
import { BookmarkProvider } from "@/context/BookmarkContext";
import { AuthProvider } from "@/context/AuthContext";

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var key='dev-resource-hub-theme';var stored=localStorage.getItem(key);var theme=stored==='light'||stored==='dark'?stored:(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;}catch(e){document.documentElement.dataset.theme='dark';document.documentElement.style.colorScheme='dark';}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-[#050508] relative transition-colors duration-300">
        <AuthProvider>
          <BookmarkProvider>
            <div className="gradient-mesh" />
            <CursorGlow />
            <CommandPalette />
            <PageTransition>
              {children}
            </PageTransition>
            <Footer />
          </BookmarkProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
