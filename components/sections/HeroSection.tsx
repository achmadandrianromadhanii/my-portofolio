"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Mail,
  ChevronDown,
  Clock,
  MapPin,
  Coffee,
  Code2,
} from "lucide-react";
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
  const [flipped, setFlipped] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    function updateTime() {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("id-ID", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      );
    }
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

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
          {/* Real-time clock badge */}
          <div className="flex items-center gap-2 mb-3 px-3 py-1 rounded-full border border-[--border] bg-[--bg-card]/50 backdrop-blur-sm">
            <Clock className="h-3 w-3 text-[--accent]" />
            <span className="text-[10px] font-mono text-[--text-secondary]">
              {time} WIB
            </span>
            <span className="text-[--border] mx-1">|</span>
            <MapPin className="h-3 w-3 text-[--magenta]" />
            <span className="text-[10px] font-mono text-[--text-secondary]">
              Malang, ID
            </span>
          </div>

          {/* Ambient Glow */}
          <div className="absolute top-16 left-0 right-0 bottom-0 -z-10 rounded-full bg-[--accent] opacity-20 blur-[100px] animate-pulse-slow" />

          {/* Flip Card */}
          <div
            className="flip-container cursor-pointer"
            onClick={() => setFlipped(!flipped)}
            role="button"
            tabIndex={0}
            aria-label="Flip profile card"
          >
            <div
              className={`flip-card w-[180px] h-[230px] sm:w-[240px] sm:h-[310px] md:w-[320px] md:h-[400px] ${flipped ? "flipped" : ""}`}
            >
              {/* Front — Photo */}
              <div className="flip-front w-full h-full rounded-[1.5rem] md:rounded-[2rem] border border-[--border-accent] glass-panel p-1.5 shadow-[0_0_25px_var(--accent-glow)] overflow-hidden">
                <div className="relative w-full h-full rounded-[1.2rem] md:rounded-[1.5rem] overflow-hidden">
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    fill
                    sizes="(max-width: 768px) 180px, 320px"
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[--bg-base]/60 to-transparent" />
                  <span className="absolute bottom-2 left-0 right-0 text-center text-[9px] text-[--text-muted] font-mono uppercase tracking-widest">
                    Tap to flip ↻
                  </span>
                </div>
              </div>

              {/* Back — Info Card */}
              <div className="flip-back w-full h-full rounded-[1.5rem] md:rounded-[2rem] border border-[--magenta] glass-panel p-4 sm:p-5 md:p-6 flex flex-col justify-center items-center text-center shadow-[0_0_25px_var(--magenta-glow)] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[--magenta-glow] to-transparent opacity-50" />
                <div className="relative z-10 flex flex-col items-center gap-2 sm:gap-3">
                  <span className="text-2xl sm:text-3xl md:text-4xl">👋</span>
                  <h3 className="font-display text-sm sm:text-lg md:text-xl font-bold text-[--text-primary]">
                    {profile.name.split(" ")[0]}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-[--magenta] font-mono uppercase tracking-widest">
                    {profile.role}
                  </p>
                  <div className="my-2 h-px w-12 bg-[--border-accent]" />
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[--text-secondary]">
                      <MapPin className="h-3 w-3 text-[--accent]" />
                      {profile.location}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[--text-secondary]">
                      <Coffee className="h-3 w-3 text-[--accent]" />
                      Coffee-driven developer
                    </div>
                    <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[--text-secondary]">
                      <Code2 className="h-3 w-3 text-[--accent]" />
                      Clean code enthusiast
                    </div>
                  </div>
                  <span className="mt-2 text-[9px] text-[--text-muted] font-mono">
                    Tap to flip back ↻
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Left side: Content */}
        <div
          className={`flex flex-col items-center md:w-7/12 md:items-start fade-up delay-1 ${visible ? "visible" : ""}`}
        >
          <span className="mb-3 md:mb-5 flex items-center gap-2 rounded-full border border-[--border-accent] bg-[--accent-glow] px-3 py-1 sm:px-4 sm:py-1.5 text-[9px] sm:text-xs font-medium text-[--accent] tracking-[0.15em] sm:tracking-[0.2em] uppercase backdrop-blur-md">
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

          <div className="mt-6 md:mt-10 flex w-full flex-col justify-center gap-3 sm:flex-row md:justify-start">
            <a
              href="#projects"
              className="group flex h-10 sm:h-12 items-center justify-center gap-2 rounded-full bg-[--accent] px-5 sm:px-7 text-xs sm:text-sm font-semibold text-[#0A1428] transition-all duration-300 hover:bg-[--accent-light] hover:shadow-[0_0_20px_var(--accent)]"
            >
              Explore My Works
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href={`mailto:${profile.email}`}
              className="group flex h-10 sm:h-12 items-center justify-center gap-2 rounded-full border border-[--border-accent] glass-panel px-5 sm:px-7 text-xs sm:text-sm font-semibold text-[--text-primary] transition-all duration-300 hover:bg-[--accent-glow] hover:shadow-[0_0_15px_var(--accent-glow)]"
            >
              Contact Me
              <Mail className="h-3.5 w-3.5 transition-transform group-hover:scale-110 text-[--accent]" />
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
