// ====================================================
// ROOT LAYOUT
// FILE: app/layout.tsx
// DESKRIPSI: Layout utama portfolio berisi font setup,
//             Navbar, Footer, Toaster, dan metadata SEO.
// ====================================================

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { profile } from "@/data/portfolio";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://yourportfolio.vercel.app";

const cleanBio = profile.bio.replace(/\s+/g, " ").trim();
const seoDescription =
  cleanBio.length > 155 ? `${cleanBio.substring(0, 152).trim()}...` : cleanBio;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: `${profile.name} | ${profile.role}`,
    template: `%s | ${profile.name}`,
  },

  description: seoDescription,

  keywords: [
    "portfolio",
    "developer",
    "web developer",
    "frontend developer",
    "Next.js",
    "React",
    "Tailwind CSS",
    profile.name,
    profile.location,
  ].filter(Boolean),

  authors: [{ name: profile.name }],
  creator: profile.name,
  publisher: profile.name,

  applicationName: `${profile.name} Portfolio`,

  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: `${profile.name} Portfolio`,
    title: `${profile.name} | ${profile.role}`,
    description: seoDescription,
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: `Portfolio ${profile.name}`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.role}`,
    description: seoDescription,
    images: ["/images/og.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: siteUrl,
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body>
        <div className="noise-bg"></div>
        <Navbar />
        <main id="main-content" className="relative z-10">
          {children}
        </main>
        <Footer />
        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: {
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-accent)",
              backdropFilter: "blur(16px)",
              color: "var(--text-primary)",
              fontSize: "13px",
            },
          }}
        />
      </body>
    </html>
  );
}
