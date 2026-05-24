"use client";

import { useState, useRef, useEffect } from "react";
import { skills } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { useInView } from "@/lib/useInView";

type Category = "All" | "Frontend" | "Backend" | "Tools";
const categories: Category[] = ["All", "Frontend", "Backend", "Tools"];

const RADIUS = 36;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function ProgressRing({ level, delay, visible }: { level: number; delay: number; visible: boolean }) {
  const [currentOffset, setCurrentOffset] = useState(CIRCUMFERENCE);
  const targetOffset = CIRCUMFERENCE - (level / 100) * CIRCUMFERENCE;

  useEffect(() => {
    if (!visible) {
      setCurrentOffset(CIRCUMFERENCE);
      return;
    }
    
    // Wait for the grid item zoom-in delay, then trigger ring animation
    const timer = setTimeout(() => {
      setCurrentOffset(targetOffset);
    }, delay * 1000 + 50);

    return () => clearTimeout(timer);
  }, [targetOffset, delay, visible]);

  return (
    <svg width="90" height="90" viewBox="0 0 90 90" className="absolute inset-0 m-auto pointer-events-none">
      {/* Background circle */}
      <circle
        cx="45" cy="45" r={RADIUS}
        fill="none"
        stroke="var(--border)"
        strokeWidth="3"
      />
      {/* Progress circle */}
      <circle
        cx="45" cy="45" r={RADIUS}
        fill="none"
        stroke="url(#progressGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={currentOffset}
        className="progress-ring-circle"
      />
      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--magenta)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function AnimatedCounter({ targetValue, delay }: { targetValue: number; delay: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;
    const duration = 1200; // 1.2s animation

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // easeOutQuart curve for smooth deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * targetValue));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    // Wait for the grid item delay before starting counter
    const timeoutId = setTimeout(() => {
      animationFrameId = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [targetValue, delay]);

  return <>{count}%</>;
}

export default function SkillsSection({ id, className }: { id?: string; className?: string }) {
  const [active, setActive] = useState<Category>("All");
  const { ref, visible } = useInView();
  
  // Refs for sliding pill animation
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const activeIndex = categories.indexOf(active);
    const activeTab = tabsRef.current[activeIndex];
    
    if (activeTab) {
      setPillStyle({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
        opacity: 1,
      });
    }
  }, [active]);

  const filteredSkills = active === "All"
    ? skills
    : skills.filter(s => s.category === active);

  return (
    <section id={id} ref={ref} className={cn("section-container pt-10 pb-10", className)}>
      <div className={`mb-10 text-center flex flex-col items-center fade-up ${visible ? "visible" : ""}`}>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[--text-primary]">
          Tech <span className="gradient-text">Stack</span>
        </h2>
        <p className="mt-3 text-[--text-secondary] text-sm sm:text-base font-light max-w-2xl">
          Technologies I use to build web applications.
        </p>
      </div>

      {/* Filter Tabs with Sliding Pill Indicator */}
      <div className={`relative mb-8 md:mb-10 flex justify-center fade-up delay-1 ${visible ? "visible" : ""}`}>
        <div className="relative flex flex-wrap justify-center gap-1 sm:gap-2 p-1 rounded-full bg-[--bg-card] border border-[--border] shadow-inner">
          
          {/* Animated Background Pill */}
          <div 
            className="absolute top-1 bottom-1 rounded-full bg-[--accent] shadow-[0_0_15px_var(--accent-glow)] transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) z-0"
            style={{ 
              left: `${pillStyle.left}px`, 
              width: `${pillStyle.width}px`,
              opacity: pillStyle.opacity
            }}
          />

          {categories.map((cat, index) => (
            <button
              key={cat}
              ref={(el) => {
                tabsRef.current[index] = el;
              }}
              onClick={() => setActive(cat)}
              className={cn(
                "relative z-10 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold transition-colors duration-300 outline-none",
                active === cat
                  ? "text-[#0A1428]"
                  : "text-[--text-secondary] hover:text-[--text-primary]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid wrapper with key based on active category to trigger re-mount animation */}
      <div key={active} className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-4">
        {filteredSkills.map((skill, index) => (
          <div
            key={skill.name}
            className={`group relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-xl md:rounded-2xl border border-[--border] glass-panel p-3 md:p-5 text-center transition-all duration-300 hover:border-[--accent] hover:shadow-[0_0_20px_var(--accent-glow)] animate-zoom-in`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Hover gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[--accent-glow] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Icon with progress ring */}
            <div className="relative z-10 w-[90px] h-[90px] flex items-center justify-center">
              <ProgressRing level={skill.level} delay={index * 0.05} visible={visible} />
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[--bg-base] border border-[--border] shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:border-[--accent]">
                <img
                  src={skill.icon}
                  alt={skill.name}
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="relative z-10 w-full">
              <span className="text-[10px] sm:text-xs font-bold text-[--text-secondary] group-hover:text-[--text-primary] transition-colors block leading-tight">
                {skill.name}
              </span>
              <span className="text-[9px] sm:text-[10px] text-[--accent] font-mono block mt-0.5">
                <AnimatedCounter targetValue={skill.level} delay={index * 0.05} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
