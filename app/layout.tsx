import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { profile } from "@/data/portfolio";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
  preload: false,
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
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
    "portfolio", "developer", "web developer", "frontend developer",
    "Next.js", "React", "Tailwind CSS", profile.name, profile.location,
  ].filter(Boolean),
  authors: [{ name: profile.name }],
  creator: profile.name,
  publisher: profile.name,
  applicationName: `${profile.name} Portfolio`,
  openGraph: {
    type: "website", locale: "id_ID", url: siteUrl,
    siteName: `${profile.name} Portfolio`,
    title: `${profile.name} | ${profile.role}`,
    description: seoDescription,
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: `Portfolio ${profile.name}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.role}`,
    description: seoDescription,
    images: ["/images/og.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${space.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <body className="bg-[--bg-base] text-[--text-primary] antialiased min-h-screen flex flex-col relative font-body">
        {/* Ambient background glows */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[--accent] opacity-[0.05] blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[--magenta] opacity-[0.05] blur-[120px]" />
        </div>
        <div className="noise-bg pointer-events-none fixed inset-0 z-[100] opacity-[0.03]" aria-hidden="true" />
        <Navbar />
        <main id="main-content" className="flex-1 relative z-10 w-full overflow-hidden">{children}</main>
        <Footer />
        <Toaster position="bottom-right" theme="dark" toastOptions={{
          style: {
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-accent)",
            backdropFilter: "blur(16px)",
            color: "var(--text-primary)",
            fontSize: "13px",
          },
        }} />
      </body>
    </html>
  );
}
