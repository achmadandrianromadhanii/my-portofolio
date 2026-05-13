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
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-16 md:flex-row-reverse md:justify-between text-center md:text-left relative z-10 mt-16 md:mt-0">

        {/* Right side: Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center md:w-5/12"
        >
          {/* Ambient Glow behind image */}
          <div className="absolute inset-0 -z-10 rounded-full bg-[--accent] opacity-20 blur-[80px]" />

          <div className="relative z-10 overflow-hidden rounded-[2rem] border border-[--border] glass-panel p-2 transition-transform duration-700 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
            <div className="relative overflow-hidden rounded-[1.5rem] h-[320px] w-[260px] sm:h-[400px] sm:w-[320px] md:h-[480px] md:w-[380px]">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                sizes="(max-width: 768px) 320px, 380px"
                priority
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>
          </div>
        </motion.div>

        {/* Left side: Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex flex-col items-center md:w-7/12 md:items-start"
        >
          <span className="mb-6 inline-flex items-center rounded-full border border-[--border-accent] bg-[--accent-glow] px-5 py-2 text-xs font-medium text-[--accent] tracking-[0.2em] uppercase backdrop-blur-md">
            {profile.location}
          </span>

          <h1 className="font-display text-4xl leading-[1.1] sm:text-6xl md:text-7xl lg:text-[5rem] text-balance">
            {profile.name.split(' ')[0]} <br className="hidden md:block" />
            <span className="text-[--text-muted] text-3xl sm:text-5xl md:text-6xl lg:text-7xl">{profile.name.split(' ').slice(1).join(' ')}</span>
            <br />
            <span className="gradient-text text-2xl sm:text-4xl md:text-5xl lg:text-6xl block mt-2">{profile.role}</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[--text-secondary] font-light">
            {profile.bio}
          </p>

          <div className="mt-12 flex w-full flex-col justify-center gap-5 sm:flex-row md:justify-start">
            <Link
              href="#projects"
              className="group flex h-14 items-center justify-center gap-3 rounded-full bg-[--accent] px-8 text-sm font-semibold text-[#030404] transition-all duration-300 hover:brightness-110 hover:scale-105 hover:shadow-[0_0_30px_var(--accent-glow)]"
            >
              Lihat Project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href={`mailto:${profile.email}`}
              className="group flex h-14 items-center justify-center gap-3 rounded-full border border-[--border] glass-panel px-8 text-sm font-semibold text-[--text-primary] transition-all duration-300 hover:border-[--border-accent] hover:bg-[--accent-glow] hover:shadow-[0_0_20px_rgba(0,255,178,0.1)]"
            >
              Hubungi Saya
              <Mail className="h-4 w-4 transition-transform group-hover:scale-110 text-[--accent]" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
