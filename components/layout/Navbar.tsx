"use client";

import { useEffect, useState, useRef } from "react";
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
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

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

  // Sliding pill refs
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 24);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Update pill position when activeHash changes
  useEffect(() => {
    const activeIndex = navLinks.findIndex((l) => l.href === activeHash);
    const activeEl = linksRef.current[activeIndex];
    if (activeEl) {
      setPillStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
        opacity: 1,
      });
    }
  }, [activeHash]);

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
        <nav className="mx-auto flex h-16 max-w-[70rem] items-center justify-between px-6 lg:px-8">
          <Link
            href="#hero"
            className="font-display font-bold text-xl text-[--text-primary] transition-colors hover:text-[--accent]"
          >
            {profile.name.split(" ")[0]}
            <span className="text-[--accent]">.</span>
          </Link>

          <div className="relative flex items-center gap-1">
            {/* Sliding pill indicator */}
            <div
              className="absolute top-0 bottom-0 rounded-lg bg-[--accent]/10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"
              style={{
                left: `${pillStyle.left}px`,
                width: `${pillStyle.width}px`,
                opacity: pillStyle.opacity,
              }}
            />
            {navLinks.map((link, i) => {
              const isActive = activeHash === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={(el) => {
                    linksRef.current[i] = el;
                  }}
                  className={cn(
                    "relative z-10 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-300",
                    isActive
                      ? "text-[--accent]"
                      : "text-[--text-secondary] hover:text-[--text-primary]",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <ThemeSwitcher />
        </nav>
      </header>

      {/* Mobile — bottom dock navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-50 block md:hidden pb-[env(safe-area-inset-bottom)]">
        <div className="relative mx-3 mb-5 flex items-center justify-around rounded-2xl border border-[--border-accent]/30 bg-[--bg-base]/95 backdrop-blur-sm px-1 py-1.5 shadow-[0_-5px_25px_rgba(0,0,0,0.3)] will-change-transform">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeHash === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-2 min-w-[48px] min-h-[48px] transition-[transform,color,background-color] duration-200 active:scale-95",
                  isActive
                    ? "text-[--accent] bg-[--accent]/10"
                    : "text-[--text-muted]",
                )}
              >
                <Icon
                  className="h-5 w-5"
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {/* Active dot indicator */}
                {isActive && (
                  <span className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-[--accent] shadow-[0_0_6px_var(--accent)]" />
                )}
                <span className="text-[10px] sm:text-[11px] font-medium leading-none">
                  {link.label}
                </span>
              </Link>
            );
          })}

          {/* Theme Switcher — mobile dock */}
          <div className="flex items-center justify-center min-w-[48px] min-h-[48px]">
            <ThemeSwitcher />
          </div>
        </div>
      </nav>
    </>
  );
}
