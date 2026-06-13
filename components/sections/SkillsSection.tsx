"use client";

import { useState, useRef, useEffect } from "react";
import { skills } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { useInView } from "@/lib/useInView";
import SectionLabel from "@/components/ui/SectionLabel";
import SpotlightCard from "@/components/ui/SpotlightCard";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

type Category = "All" | "Frontend" | "Backend" | "Tools" | "Database";
const categories: Category[] = [
  "All",
  "Frontend",
  "Backend",
  "Tools",
  "Database",
];

const RADIUS = 36;
const RADIUS_SM = 28;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const CIRCUMFERENCE_SM = 2 * Math.PI * RADIUS_SM;

function ProgressRing({
  level,
  delay,
  visible,
  skillName,
}: {
  level: number;
  delay: number;
  visible: boolean;
  skillName: string;
}) {
  const [currentOffset, setCurrentOffset] = useState(CIRCUMFERENCE);
  const [currentOffsetSm, setCurrentOffsetSm] = useState(CIRCUMFERENCE_SM);
  const targetOffset = CIRCUMFERENCE - (level / 100) * CIRCUMFERENCE;
  const targetOffsetSm = CIRCUMFERENCE_SM - (level / 100) * CIRCUMFERENCE_SM;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (visible) {
      timer = setTimeout(() => {
        setCurrentOffset(targetOffset);
        setCurrentOffsetSm(targetOffsetSm);
      }, delay * 1000 + 50);
    } else {
      timer = setTimeout(() => {
        setCurrentOffset(CIRCUMFERENCE);
        setCurrentOffsetSm(CIRCUMFERENCE_SM);
      }, 0);
    }
    return () => clearTimeout(timer);
  }, [targetOffset, targetOffsetSm, delay, visible]);

  const gradientId = `grad-${skillName.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <>
      {/* Desktop ring */}
      <svg
        width="90"
        height="90"
        viewBox="0 0 90 90"
        className="absolute inset-0 m-auto pointer-events-none hidden md:block"
      >
        <circle
          cx="45"
          cy="45"
          r={RADIUS}
          fill="none"
          stroke="var(--border)"
          strokeWidth="3"
        />
        <circle
          cx="45"
          cy="45"
          r={RADIUS}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={currentOffset}
          className="progress-ring-circle"
        />
        <defs>
          <linearGradient
            id={gradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--magenta)" />
          </linearGradient>
        </defs>
      </svg>
      {/* Mobile ring */}
      <svg
        width="70"
        height="70"
        viewBox="0 0 70 70"
        className="absolute inset-0 m-auto pointer-events-none md:hidden"
      >
        <circle
          cx="35"
          cy="35"
          r={RADIUS_SM}
          fill="none"
          stroke="var(--border)"
          strokeWidth="2.5"
        />
        <circle
          cx="35"
          cy="35"
          r={RADIUS_SM}
          fill="none"
          stroke={`url(#${gradientId}-sm)`}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE_SM}
          strokeDashoffset={currentOffsetSm}
          className="progress-ring-circle"
        />
        <defs>
          <linearGradient
            id={`${gradientId}-sm`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--magenta)" />
          </linearGradient>
        </defs>
      </svg>
    </>
  );
}

export default function SkillsSection({
  id,
  className,
}: {
  id?: string;
  className?: string;
}) {
  const [active, setActive] = useState<Category>("All");
  const { ref, visible } = useInView();
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const itemsPerPage = 4;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    setCurrentPage(1);
  }, [active]);

  const filteredSkills =
    active === "All" ? skills : skills.filter((s) => s.category === active);
  const isPaginationActive = isMobile && active === "All";
  const totalPages = isPaginationActive
    ? Math.ceil(filteredSkills.length / itemsPerPage)
    : 1;
  const displayedSkills = isPaginationActive
    ? filteredSkills.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
      )
    : filteredSkills;

  return (
    <section id={id} ref={ref} className={cn("section-container", className)}>
      <div
        className={`mb-10 text-center flex flex-col items-center fade-up ${visible ? "visible" : ""}`}
      >
        <SectionLabel number={3} label="Skills" />
        <h2
          className="font-display font-extrabold tracking-tight text-[--text-primary]"
          style={{ fontSize: "var(--heading-section)" }}
        >
          Tech <span className="gradient-text">Stack</span>
        </h2>
        <p className="mt-3 text-[--text-secondary] text-sm sm:text-base font-light max-w-2xl">
          Technologies I use to build web applications.
        </p>
      </div>

      {/* Filter Tabs with mask fade edges */}
      <div
        className={`relative mb-8 md:mb-10 w-full max-w-full overflow-x-auto scrollbar-hide px-2 py-1 mask-fade-edges fade-up delay-1 ${visible ? "visible" : ""}`}
      >
        <div className="relative flex w-max mx-auto flex-nowrap justify-center gap-1 sm:gap-2 p-1 rounded-full bg-[--bg-card] border border-[--border] shadow-inner">
          <div
            className="absolute top-1 bottom-1 rounded-full bg-[--accent] shadow-[0_0_15px_var(--accent-glow)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"
            style={{
              left: `${pillStyle.left}px`,
              width: `${pillStyle.width}px`,
              opacity: pillStyle.opacity,
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
                  : "text-[--text-secondary] hover:text-[--text-primary]",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div
        key={active}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
      >
        {displayedSkills.map((skill, index) => (
          <SpotlightCard key={skill.name}>
            <div
              className="group relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-xl md:rounded-2xl border border-[--border] glass-panel p-4 md:p-5 text-center transition-all duration-200 active:scale-95 hover:border-[--accent] hover:shadow-[0_0_20px_var(--accent-glow)] animate-zoom-in"
              style={{
                animationDelay: `${(index % itemsPerPage) * 0.05}s`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[--accent-glow] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10 w-[70px] h-[70px] md:w-[90px] md:h-[90px] flex items-center justify-center">
                <ProgressRing
                  level={skill.level}
                  delay={(index % itemsPerPage) * 0.05}
                  visible={visible}
                  skillName={skill.name}
                />
                <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-xl bg-[--bg-base] border border-[--border] shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:border-[--accent]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    width={24}
                    height={24}
                    className="h-5 w-5 md:h-6 md:w-6 object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="relative z-10 w-full">
                <span className="text-[10px] sm:text-xs font-bold text-[--text-secondary] group-hover:text-[--text-primary] transition-colors block leading-tight">
                  {skill.name}
                </span>
                <span className="text-[9px] sm:text-[10px] text-[--accent] font-mono block mt-0.5">
                  <AnimatedCounter
                    target={skill.level}
                    delay={(index % itemsPerPage) * 0.05}
                    suffix="%"
                  />
                </span>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Pagination Dots — Mobile only, "All" category */}
      {isPaginationActive && totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2 md:hidden z-20 relative">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              aria-label={`Page ${i + 1}`}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300 touch-manipulation border border-white/10",
                currentPage === i + 1
                  ? "w-8 shadow-[0_0_15px_var(--accent)]"
                  : "w-2.5 bg-white/30 hover:bg-white/50",
              )}
              style={
                currentPage === i + 1
                  ? { backgroundColor: "var(--accent)" }
                  : {}
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}
