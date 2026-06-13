"use client";

import Image from "next/image";
import { ArrowRight, Mail, ChevronDown } from "lucide-react";
import { profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { useInView } from "@/lib/useInView";
import MagneticButton from "@/components/ui/MagneticButton";
import AnimatedText from "@/components/ui/AnimatedText";

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

      {/* Floating decorative elements */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute top-[15%] right-[10%] w-20 h-20 border border-[--accent]/10 rounded-full hidden md:block"
          style={{ animation: "float 6s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-[30%] left-[8%] w-3 h-3 bg-[--magenta]/20 rounded-full hidden md:block"
          style={{ animation: "float 4s ease-in-out infinite 1s" }}
        />
        <div
          className="absolute top-[40%] right-[25%] w-2 h-2 bg-[--accent]/15 rounded-full hidden md:block"
          style={{ animation: "float 5s ease-in-out infinite 2s" }}
        />
        <div className="absolute top-[30%] left-[15%] w-px h-20 bg-gradient-to-b from-[--accent]/10 to-transparent rotate-[30deg] hidden lg:block" />
      </div>

      <div className="mx-auto flex w-full flex-col items-center gap-10 md:gap-14 md:flex-row-reverse md:justify-between text-center md:text-left relative z-10 px-4">
        {/* Right side: Photo */}
        <div
          className={`relative flex flex-col items-center md:w-5/12 fade-up ${visible ? "visible" : ""}`}
        >
          {/* === Animated Photo Background Effects === */}

          {/* Layer 1: Rotating gradient ring */}
          <div
            className="absolute inset-[-15px] sm:inset-[-40px] md:inset-[-60px] -z-10 rounded-full opacity-20 sm:opacity-30 will-change-transform"
            style={{
              background:
                "conic-gradient(from 0deg, var(--accent), transparent 30%, var(--magenta), transparent 60%, var(--accent))",
              filter: "blur(30px)",
              animation: "heroRingSpin 12s linear infinite",
            }}
          />

          {/* Layer 2: Pulsing soft glow */}
          <div
            className="absolute inset-[-10px] sm:inset-[-30px] md:inset-[-50px] -z-10 rounded-full will-change-transform"
            style={{
              background:
                "radial-gradient(circle, var(--accent) 0%, transparent 65%)",
              animation: "heroGlowPulse 4s ease-in-out infinite",
            }}
          />

          {/* Layer 3: Outer dashed orbit ring */}
          <div
            className="absolute inset-[-35px] sm:inset-[-50px] md:inset-[-75px] -z-10 rounded-full border border-dashed border-[--accent]/15 will-change-transform hidden sm:block"
            style={{
              animation: "heroRingSpin 25s linear infinite reverse",
            }}
          />

          {/* Layer 4: Orbiting particle dots */}
          <div
            className="absolute inset-[-35px] sm:inset-[-50px] md:inset-[-75px] -z-10 will-change-transform hidden sm:block"
            style={{ animation: "heroRingSpin 8s linear infinite" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[--accent] shadow-[0_0_10px_var(--accent),0_0_20px_var(--accent-glow)]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[--magenta] shadow-[0_0_8px_var(--magenta)]" />
          </div>

          <div
            className="absolute inset-[-25px] sm:inset-[-35px] md:inset-[-55px] -z-10 will-change-transform hidden md:block"
            style={{ animation: "heroRingSpin 15s linear infinite reverse" }}
          >
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[--accent]/60 shadow-[0_0_6px_var(--accent)]" />
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1 h-1 rounded-full bg-[--magenta]/40 shadow-[0_0_4px_var(--magenta)]" />
          </div>

          {/* Layer 5: Inner subtle shimmer ring */}
          <div
            className="absolute inset-[-5px] sm:inset-[-12px] md:inset-[-16px] -z-10 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] will-change-transform"
            style={{
              background:
                "conic-gradient(from 180deg, transparent 0%, var(--accent) 10%, transparent 20%, transparent 100%)",
              opacity: 0.2,
              filter: "blur(4px)",
              animation: "heroRingSpin 6s linear infinite",
            }}
          />

          {/* Profile Photo — fluid sizing with aspect-ratio */}
          <div className="w-full max-w-[180px] sm:max-w-[220px] md:max-w-[300px] aspect-[3/4] rounded-[1.5rem] md:rounded-[2rem] border border-[--border-accent] glass-panel p-1.5 shadow-[0_0_25px_var(--accent-glow)] overflow-hidden relative z-10">
            <div className="relative w-full h-full rounded-[1.2rem] md:rounded-[1.5rem] overflow-hidden">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                sizes="(max-width: 768px) 180px, 300px"
                preload
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
          <span className="mb-3 md:mb-5 flex items-center gap-2 rounded-full border border-[--border-accent] bg-[--accent-glow] px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-medium text-[--accent] tracking-[0.15em] sm:tracking-[0.2em] uppercase md:backdrop-blur-md">
            <span
              className="inline-block h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[--accent]"
              style={{ animation: "neonPulse 2s infinite" }}
            />
            Available for work
          </span>

          <h1
            className="font-display leading-[1.1] font-extrabold"
            style={{ fontSize: "var(--heading-hero)" }}
          >
            <AnimatedText text="Hello, I'm" />
            <br className="hidden md:block" />
            <span
              className="gradient-text block mt-1"
              style={{ fontSize: "calc(var(--heading-hero) * 1.15)" }}
            >
              {profile.name.split(" ")[0]}
            </span>
          </h1>

          <div className="mt-2 md:mt-3 h-[26px] sm:h-[40px] md:h-[50px] flex items-center justify-center md:justify-start w-full">
            {/* Typing effect — visible on sm+ only, static on very small screens */}
            <span className="gradient-text text-lg sm:text-2xl md:text-3xl lg:text-4xl hidden sm:inline-block typing-effect whitespace-nowrap overflow-hidden pr-2 font-semibold">
              {profile.role}
            </span>
            <span className="gradient-text text-lg font-semibold sm:hidden">
              {profile.role}
            </span>
          </div>

          <p className="mt-2 md:mt-3 max-w-xl text-sm md:text-base leading-relaxed text-[--text-secondary] font-light">
            I craft{" "}
            <span className="text-[--accent] font-medium">modern</span>,{" "}
            <span className="text-[--magenta] font-medium">performant</span> &
            beautiful web experiences.
          </p>

          <div className="mt-8 md:mt-12 flex w-full flex-col justify-center gap-4 sm:flex-row md:justify-start px-2 sm:px-0">
            <MagneticButton href="#projects">
              <span className="group flex w-full sm:w-auto h-12 items-center justify-center gap-2 rounded-full bg-[--accent] px-7 text-sm font-semibold text-[#0A1428] transition-[transform,background-color,box-shadow] duration-200 active:scale-95 hover:bg-[--accent-light] hover:shadow-[0_0_20px_var(--accent)] will-change-transform">
                Explore My Works
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </MagneticButton>

            <MagneticButton href="#contact">
              <span className="group flex w-full sm:w-auto h-12 items-center justify-center gap-2 rounded-full border border-[--border-accent] bg-[--bg-card] md:glass-panel px-7 text-sm font-semibold text-[--text-primary] transition-[transform,background-color,box-shadow] duration-200 active:scale-95 hover:bg-[--accent-glow] hover:shadow-[0_0_15px_var(--accent-glow)] will-change-transform">
                Contact Me
                <Mail className="h-4 w-4 transition-transform group-hover:scale-110 text-[--accent]" />
              </span>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex">
        <MagneticButton>
          <div
            className="flex flex-col items-center gap-2 cursor-pointer"
            style={{ animation: "float 2s ease-in-out infinite" }}
          >
            <span className="text-[10px] uppercase tracking-widest text-[--text-muted]">
              Scroll
            </span>
            <ChevronDown className="h-4 w-4 text-[--accent]" />
          </div>
        </MagneticButton>
      </div>
    </section>
  );
}
