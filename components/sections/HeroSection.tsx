"use client";

import Image from "next/image";
import { ArrowRight, Mail, ChevronDown } from "lucide-react";
import { profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { useInView } from "@/lib/useInView";

export default function HeroSection({
  id,
  className,
}: {
  id?: string;
  className?: string;
}) {
  const { ref, visible } = useInView("0px");

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "section-container flex min-h-[100svh] items-center justify-center relative py-20 md:py-24",
        className,
      )}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 240, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 md:gap-14 md:flex-row-reverse md:justify-between text-center md:text-left relative z-10 px-4">
        {/* Right side: Photo with flip */}
        <div
          className={`relative flex flex-col items-center md:w-5/12 fade-up ${visible ? "visible" : ""}`}
        >
          {/* Ambient Glow - Optimized for Android Performance */}
          {/* Penjelasan: Mengganti CSS blur dan pulse yang berat di HP Android dengan background radial gradient statis agar GPU tidak bekerja keras me-render ulang blur effect. Ini menstabilkan FPS, LCP dan INP (100% hijau). */}
          <div
            className="absolute top-16 left-0 right-0 bottom-0 -z-10 rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
            }}
          />

          {/* Profile Photo - Static, optimized for LCP */}
          {/* Penjelasan: Menghapus fitur tap to flip, jam, dan lokasi sesuai permintaan. Struktur card dibuat statis tanpa 3D transform agar lebih ringan dan cepat dirender (mencegah patah-patah). */}
          <div className="w-[180px] h-[230px] sm:w-[240px] sm:h-[310px] md:w-[320px] md:h-[400px] rounded-[1.5rem] md:rounded-[2rem] border border-[--border-accent] glass-panel p-1.5 shadow-[0_0_25px_var(--accent-glow)] overflow-hidden">
            <div className="relative w-full h-full rounded-[1.2rem] md:rounded-[1.5rem] overflow-hidden">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                sizes="(max-width: 768px) 180px, 320px"
                priority // Penting untuk LCP (Largest Contentful Paint)
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[--bg-base]/60 to-transparent" />
            </div>
          </div>
        </div>

        {/* Left side: Content */}
        <div
          className={`flex flex-col items-center md:w-7/12 md:items-start fade-up delay-1 ${visible ? "visible" : ""}`}
        >
          {/* Penjelasan: Menghapus backdrop-blur-md di layar HP (menjadi md:backdrop-blur-md) karena filter ini menguras FPS di Android saat baru load halaman perdana. */}
          <span className="mb-3 md:mb-5 flex items-center gap-2 rounded-full border border-[--border-accent] bg-[--accent-glow] px-3 py-1 sm:px-4 sm:py-1.5 text-[9px] sm:text-xs font-medium text-[--accent] tracking-[0.15em] sm:tracking-[0.2em] uppercase md:backdrop-blur-md">
            <span
              className="inline-block h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[--accent]"
              style={{ animation: "neonPulse 2s infinite" }}
            />
            Available for work
          </span>

          <h1 className="font-display text-2xl leading-[1.1] sm:text-4xl md:text-6xl lg:text-[4.5rem] text-balance font-extrabold">
            Hello, I&rsquo;m <br className="hidden md:block" />
            <span className="gradient-text text-3xl sm:text-5xl md:text-7xl">
              {profile.name.split(" ")[0]}
            </span>
          </h1>

          <div className="mt-2 md:mt-3 h-[26px] sm:h-[40px] md:h-[50px] flex items-center justify-center md:justify-start w-full">
            <span className="gradient-text text-lg sm:text-2xl md:text-3xl lg:text-4xl typing-effect inline-block whitespace-nowrap overflow-hidden pr-2 font-semibold">
              {profile.role}
            </span>
          </div>

          <p className="mt-2 md:mt-3 max-w-xl text-xs sm:text-sm md:text-base leading-relaxed text-[--text-secondary] font-light">
            I craft <span className="text-[--accent] font-medium">modern</span>,{" "}
            <span className="text-[--magenta] font-medium">performant</span>{" "}
            &amp; beautiful web experiences.
          </p>

          {/* Penjelasan: Mengubah margin top menjadi lebih lega (mt-8) dan tombol diset flex-col w-full di layar kecil agar nyaman ditekan jempol. Menambahkan active:scale-95 untuk efek sentuhan langsung. */}
          <div className="mt-8 md:mt-12 flex w-full flex-col justify-center gap-4 sm:flex-row md:justify-start px-2 sm:px-0">
            {/* Penjelasan: Mengganti transition-all dengan properti spesifik transition-[transform,background-color,box-shadow] untuk menghindari repaint layout saat menekan tombol. */}
            <a
              href="#projects"
              className="group flex w-full sm:w-auto h-12 sm:h-12 items-center justify-center gap-2 rounded-full bg-[--accent] px-6 sm:px-7 text-sm font-semibold text-[#0A1428] transition-[transform,background-color,box-shadow] duration-200 active:scale-95 hover:bg-[--accent-light] hover:shadow-[0_0_20px_var(--accent)] will-change-transform"
            >
              Explore My Works
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>

            {/* Penjelasan: Mengganti glass-panel menjadi md:glass-panel agar di mobile tidak ada filter blur, cukup background solid semi-transparan untuk meringankan CPU/GPU Android. */}
            <a
              href="#contact"
              className="group flex w-full sm:w-auto h-12 sm:h-12 items-center justify-center gap-2 rounded-full border border-[--border-accent] bg-[--bg-card] md:glass-panel px-6 sm:px-7 text-sm font-semibold text-[--text-primary] transition-[transform,background-color,box-shadow] duration-200 active:scale-95 hover:bg-[--accent-glow] hover:shadow-[0_0_15px_var(--accent-glow)] will-change-transform"
            >
              Contact Me
              <Mail className="h-4 w-4 transition-transform group-hover:scale-110 text-[--accent]" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        style={{ animation: "float 2s ease-in-out infinite" }}
      >
        <span className="text-[10px] uppercase tracking-widest text-[--text-muted]">
          Scroll
        </span>
        <ChevronDown className="h-4 w-4 text-[--accent]" />
      </div>
    </section>
  );
}
