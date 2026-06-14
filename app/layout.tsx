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
  title: "Dev Resource Hub | AI Operating System for Students, Developers, Founders & AI Agencies",
  description: "The AI Operating System — discover AI tools, agents, prompts, compare frameworks, explore trending resources, and connect with a global community of students, developers, founders, and AI agencies.",
  keywords: ["AI tools", "AI agents", "developer tools", "AI prompts", "Cursor", "Windsurf", "CrewAI", "LangGraph", "open source AI", "web development", "AI agencies", "AI startup tools"],
  authors: [{ name: "Sai Kiran BK" }],
  openGraph: {
    title: "Dev Resource Hub — AI Operating System for Students, Developers, Founders & AI Agencies",
    description: "The AI Operating System — discover AI tools, agents, prompts, and connect with a global community of students, developers, founders, and AI agencies.",
    url: "https://saikirantechy.github.io/dev-resource-hub/",
    siteName: "Dev Resource Hub",
    images: [
      {
        url: "https://saikirantechy.github.io/dev-resource-hub/og-image.svg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev Resource Hub — AI Operating System for Students, Developers, Founders & AI Agencies",
    description: "The AI Operating System — discover AI tools, agents, prompts, and connect with a global community of students, developers, founders, and AI agencies.",
    images: ["https://saikirantechy.github.io/dev-resource-hub/og-image.svg"],
  },
};

import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import PageTransition from "@/components/PageTransition";
import CursorGlow from "@/components/CursorGlow";
import { BookmarkProvider } from "@/context/BookmarkContext";
import { AuthProvider } from "@/context/AuthContext";
import { getAllBlogs } from "@/lib/blogs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const blogs = getAllBlogs();
  
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Dev Resource Hub",
              url: "https://saikirantechy.github.io/dev-resource-hub/",
              description: "The AI Operating System for Students, Developers, Founders & AI Agencies — discover AI tools, agents, prompts, compare frameworks, explore trending resources, and connect with the global AI community.",
              author: {
                "@type": "Person",
                name: "Sai Kiran BK",
              },
              about: {
                "@type": "Thing",
                name: "AI Developer Tools",
                description: "Curated marketplace of AI coding tools, agent frameworks, prompts, and developer resources.",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "AI Resource Collection",
              description: "A curated collection of AI developer tools, agents, and prompts.",
              url: "https://saikirantechy.github.io/dev-resource-hub/",
              isPartOf: {
                "@type": "WebSite",
                name: "Dev Resource Hub",
                url: "https://saikirantechy.github.io/dev-resource-hub/",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#050508] relative transition-colors duration-300">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <AuthProvider>
          <BookmarkProvider>
            <div className="gradient-mesh" />
            <CursorGlow />
            <CommandPalette initialBlogs={blogs} />
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
