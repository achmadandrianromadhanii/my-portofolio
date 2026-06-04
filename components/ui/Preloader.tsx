"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";

export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  if (done) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[--bg-base] px-4"
      style={{ animation: "preloaderFade 4s ease-in-out forwards" }}
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[--accent]/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-[--magenta]/5 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Glitch Logo */}
        <div
          style={{
            animation: "preloaderScale 1s ease forwards, glitch 3s infinite",
          }}
          className="mb-8"
        >
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter text-[--text-primary] relative">
            {profile.name.split(" ")[0]}
            <span className="text-[--accent]">.</span>
          </h1>
        </div>

        {/* Typing text */}
        <div
          className="h-8"
          style={{ animation: "preloaderScale 1.5s ease forwards" }}
        >
          <div className="font-mono text-sm md:text-base text-[--accent-light] uppercase tracking-widest typing-effect inline-block whitespace-nowrap overflow-hidden">
            Crafting Digital Experiences
          </div>
        </div>

        {/* Loading Bar */}
        <div className="mt-12 h-1 w-48 md:w-64 rounded-full bg-[--bg-elevated] overflow-hidden relative">
          <div
            className="absolute top-0 bottom-0 w-1/2 rounded-full bg-gradient-to-r from-transparent via-[--accent] to-transparent"
            style={{ animation: "loadingBar 1.5s linear infinite" }}
          />
        </div>
      </div>
    </div>
  );
}
