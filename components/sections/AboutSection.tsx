"use client";

import { cn } from "@/lib/utils";
import { useInView } from "@/lib/useInView";
import { profile } from "@/data/portfolio";
import { Coffee, Gamepad2, Sparkles, Code2 } from "lucide-react";

const bentoItems = [
  {
    icon: Coffee,
    title: "Coffee Driven",
    desc: "Fueled by caffeine and curiosity",
  },
  { icon: Gamepad2, title: "Gamer Soul", desc: "RPG & Strategy enthusiast" },
  { icon: Sparkles, title: "Pixel Perfect", desc: "Obsessed with UI details" },
  { icon: Code2, title: "Clean Code", desc: "Writing readable, scalable code" },
];

export default function AboutSection({
  id,
  className,
}: {
  id?: string;
  className?: string;
}) {
  const { ref, visible } = useInView();

  return (
    <section
      id={id}
      ref={ref}
      className={cn("section-container mt-12 pt-24 pb-24", className)}
    >
      <div className={`mb-16 text-center fade-up ${visible ? "visible" : ""}`}>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[--text-primary]">
          About <span className="gradient-text">Me</span>
        </h2>
        <p className="mt-4 text-[--text-secondary] text-base sm:text-lg font-light max-w-2xl mx-auto">
          A glimpse into who I am beyond the code editor.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
        {/* Main Bio Card */}
        <div
          className={`md:col-span-2 rounded-[1.5rem] md:rounded-[2rem] border border-[--border-accent] glass-panel p-6 md:p-10 relative overflow-hidden group hover:border-[--accent] transition-colors scale-in ${visible ? "visible" : ""}`}
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Code2 className="w-24 md:w-32 h-24 md:h-32 text-[--accent]" />
          </div>
          <h3 className="font-display text-xl md:text-2xl font-bold text-[--text-primary] mb-4 md:mb-6">
            Who am I?
          </h3>
          <p className="text-base md:text-lg leading-relaxed text-[--text-secondary] font-light relative z-10">
            <span className="text-[--text-primary] font-medium">
              I&rsquo;m detail-oriented.
            </span>{" "}
            {profile.bio}
            <br />
            <br />
            My approach always combines{" "}
            <span className="text-[--accent] font-medium">
              strong design aesthetics
            </span>{" "}
            with
            <span className="text-[--magenta] font-medium">
              {" "}
              efficient technical implementation
            </span>
            , ensuring that every solution not only looks premium but also runs
            with maximum performance.
          </p>
        </div>

        {/* Profile Card */}
        <div
          className={`rounded-[1.5rem] md:rounded-[2rem] border border-[--border] glass-panel flex items-center justify-center p-6 relative overflow-hidden group hover:border-[--magenta] transition-colors shadow-[0_0_20px_var(--magenta-glow)] min-h-[200px] md:min-h-0 scale-in delay-1 ${visible ? "visible" : ""}`}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[--magenta-glow] to-transparent opacity-50" />
          <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-[--magenta] flex items-center justify-center bg-[--bg-base] shadow-[0_0_30px_var(--magenta-glow)]">
            <span className="text-5xl md:text-6xl animate-pulse-slow">🧑‍💻</span>
          </div>
          <div className="absolute bottom-4 md:bottom-6 left-0 right-0 text-center z-10">
            <p className="font-mono text-xs text-[--magenta] tracking-widest uppercase">
              Frontend Dev
            </p>
          </div>
        </div>

        {/* 4 Small Bento Cards */}
        {bentoItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className={`rounded-[1.5rem] md:rounded-[2rem] border border-[--border] glass-panel p-5 md:p-6 flex flex-col items-start justify-center group hover:border-[--accent] transition-all relative overflow-hidden fade-up delay-${Math.min(index + 1, 4)} ${visible ? "visible" : ""}`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[--accent-glow] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="p-2.5 md:p-3 rounded-xl bg-[--bg-base] border border-[--border-accent] mb-3 md:mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_var(--accent-glow)]">
                <Icon className="w-5 h-5 md:w-6 md:h-6 text-[--accent]" />
              </div>
              <h4 className="font-display font-bold text-[--text-primary] text-base md:text-lg">
                {item.title}
              </h4>
              <p className="text-xs md:text-sm text-[--text-secondary] mt-1">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
