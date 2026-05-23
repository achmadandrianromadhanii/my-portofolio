"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Layers,
  Zap,
  Home,
  User,
  Send,
} from "lucide-react";
import { profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "#hero", icon: Home },
  { label: "Experience", href: "#experience", icon: Briefcase },
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
      <nav className="fixed inset-x-0 bottom-0 z-50 block md:hidden">
        <div className="relative mx-3 mb-4 flex items-center justify-around rounded-2xl border border-[--border] glass-panel bg-[--bg-card]/90 px-1 py-1.5 shadow-2xl">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeHash === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative flex flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 transition-all duration-300",
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
