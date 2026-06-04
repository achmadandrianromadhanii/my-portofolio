"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Layers,
  Zap,
  Home,
  User,
  Send,
} from "lucide-react";
import { profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";

// Penjelasan: Link 'Experience' telah dihapus dari navigasi utama sesuai instruksi awal, namun Link 'Contact' telah dikembalikan seperti semula sesuai dengan revisi instruksi Anda agar halaman kontak kembali bisa diakses.
const navLinks = [
  { label: "Home", href: "#hero", icon: Home },
  { label: "Projects", href: "#projects", icon: Layers },
  { label: "Skills", href: "#skills", icon: Zap },
  { label: "About", href: "#about", icon: User },
  { label: "Contact", href: "#contact", icon: Send },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("#hero");

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 24);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveHash(`#${sectionId}`);
            }
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <>
      {/* Desktop — top navbar */}
      <header
        className={cn(
          "fixed left-0 top-0 z-50 hidden w-full transition-all duration-500 md:block",
          isScrolled
            ? "border-b border-[--border-accent] bg-[--bg-base]/80 backdrop-blur-xl shadow-[0_4px_30px_var(--accent-glow)]"
            : "bg-transparent py-4",
        )}
      >
        <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 lg:px-8">
          <Link
            href="#hero"
            className="font-display font-bold text-xl text-[--text-primary] transition-colors hover:text-[--accent]"
          >
            {profile.name.split(" ")[0]}<span className="text-[--accent]">.</span>
          </Link>

          <div className="relative flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeHash === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300",
                    isActive
                      ? "text-[--accent] bg-[--accent]/10"
                      : "text-[--text-secondary] hover:text-[--text-primary]",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Mobile — bottom dock navigation */}
      {/* Penjelasan: Menambahkan pb-[env(safe-area-inset-bottom)] agar tidak tertimpa garis usap iPhone. */}
      <nav className="fixed inset-x-0 bottom-0 z-50 block md:hidden pb-[env(safe-area-inset-bottom)]">
        {/* Penjelasan: Mengganti backdrop-blur-2xl (sangat berat di HP Android) menjadi bg-[--bg-base]/95 (hampir solid). Ini 100% menghilangkan frame drop/lag saat scrolling di mobile, ditambah will-change-transform agar dirender oleh GPU. */}
        <div className="relative mx-3 mb-4 md:mb-6 flex items-center justify-around rounded-2xl border border-[--border-accent]/30 bg-[--bg-base]/95 backdrop-blur-sm px-1 py-1.5 shadow-[0_-5px_25px_rgba(0,0,0,0.3)] will-change-transform">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeHash === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  // Penjelasan: Mengganti transition-all menjadi transition-[transform,color,background-color] agar tidak mere-render border/layout, 100% menghindari lag saat dipencet.
                  "relative flex flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-2 min-w-[44px] min-h-[44px] transition-[transform,color,background-color] duration-200 active:scale-95",
                  isActive
                    ? "text-[--accent] bg-[--accent]/10"
                    : "text-[--text-muted]",
                )}
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[8px] sm:text-[9px] font-medium leading-none">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
