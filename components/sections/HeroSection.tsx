// ====================================================
// KOMPONEN: HeroSection
// FILE: components/sections/HeroSection.tsx
// DESKRIPSI: Section pembuka dengan avatar, tema, nama,
//             bio, dan tombol aksi bergaya premium.
// ====================================================

"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, Mail, Download } from "lucide-react";
import { profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function HeroSection({
  id,
  className,
}: {
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "section-container flex min-h-[90vh] items-center",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 md:flex-row-reverse md:justify-between text-center md:text-left relative z-10 mt-10 md:mt-0">
        {/* Right side: Photo */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex justify-center md:w-1/2"
        >
          <div className="relative z-10 rounded-full border border-[--border-accent] bg-[--bg-card] p-2 shadow-[0_0_30px_var(--accent-glow)]">
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={350}
              height={350}
              priority
              className="h-56 w-56 sm:h-72 sm:w-72 md:h-80 md:w-80 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </motion.div>

        {/* Left side: Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col items-center md:w-1/2 md:items-start"
        >
          <span className="mb-4 inline-flex items-center rounded-full border border-[--border] bg-[--bg-elevated] px-4 py-1.5 text-xs font-semibold text-[--accent] tracking-wider uppercase">
            {profile.location}
          </span>

          <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            {profile.name} <br />
            <span className="gradient-text">{profile.role}</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-[--text-secondary] sm:text-lg">
            {profile.bio}
          </p>

          <div className="mt-10 flex w-full flex-col justify-center gap-4 sm:flex-row md:justify-start">
            <Link
              href="#projects"
              className="group flex h-12 items-center justify-center gap-2 rounded-xl bg-[--accent] px-6 text-sm font-bold text-black transition-all hover:scale-105 hover:shadow-[0_0_20px_var(--accent-glow)]"
            >
              Lihat Project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="#contact"
              className="group flex h-12 items-center justify-center gap-2 rounded-xl border border-[--border-accent] bg-[--bg-card] px-6 text-sm font-bold text-[--text-primary] transition-all hover:bg-[--border]"
            >
              Hubungi Saya
              <Mail className="h-4 w-4" />
            </Link>

            {profile.cvUrl && profile.cvUrl !== "#" && (
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-12 items-center justify-center gap-2 rounded-xl border border-[--border] bg-transparent px-6 text-sm font-bold text-[--text-primary] transition-all hover:border-[--text-muted]"
              >
                Download CV
                <Download className="h-4 w-4" />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
