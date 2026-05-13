"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Briefcase,
  Code2,
  Home,
  User,
  MessageCircle,
} from "lucide-react";
import { profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "#hero", icon: Home },
  { label: "Projects", href: "#projects", icon: Briefcase },
  { label: "Skills", href: "#skills", icon: Code2 },
  { label: "About", href: "#about", icon: User },
  { label: "Contact", href: "#contact", icon: MessageCircle },
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
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={cn(
          "fixed left-0 top-0 z-50 hidden w-full transition-all duration-500 md:block",
          isScrolled
            ? "border-b border-[--border] bg-[--bg-base]/80 backdrop-blur-xl shadow-sm"
            : "bg-transparent py-4",
        )}
      >
        <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 lg:px-8">
          <Link
            href="#hero"
            className="font-bold text-[--text-primary] transition-colors hover:text-[--accent]"
          >
            {profile.name.split(" ")[0]}.
          </Link>

          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeHash === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300",
                    isActive
                      ? "text-[--accent]"
                      : "text-[--text-secondary] hover:text-[--text-primary]",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-[--accent]/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </motion.header>

      {/* Mobile — bottom dock navigation */}
      <motion.nav
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
        className="fixed inset-x-0 bottom-0 z-50 block md:hidden"
      >
        <div className="mx-4 mb-6 flex items-center justify-around rounded-2xl border border-[--border] glass-panel bg-[--bg-card]/90 px-2 py-2 shadow-2xl">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeHash === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition-all duration-300",
                  isActive
                    ? "text-[--accent]"
                    : "text-[--text-muted] hover:text-[--text-primary]",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="mobile-nav-active"
                    className="absolute inset-0 rounded-xl bg-[--accent]/10"
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  />
                )}
                <span className="relative z-10">
                  <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
                </span>
                <span className="relative z-10 text-[10px] font-medium">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
}
