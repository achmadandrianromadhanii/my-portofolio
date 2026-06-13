"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ExternalLink,
  Code2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { useInView } from "@/lib/useInView";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import TiltCard from "@/components/ui/TiltCard";
import SpotlightCard from "@/components/ui/SpotlightCard";

export default function ProjectsSection({
  id,
  className,
}: {
  id?: string;
  className?: string;
}) {
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(
    null,
  );
  const { ref, visible } = useInView();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Lock body scroll when modal is open (all devices)
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selected]);

  // Track active scroll index for dots
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const cardWidth = el.firstElementChild?.clientWidth || 1;
      const gap = 24;
      setActiveIndex(Math.round(scrollLeft / (cardWidth + gap)));
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id={id} ref={ref} className={cn("section-container", className)}>
      <div
        className={`mb-10 md:mb-14 text-center fade-up ${visible ? "visible" : ""}`}
      >
        <SectionLabel number={2} label="Projects" />
        <h2
          className="font-display font-extrabold tracking-tight text-[--text-primary]"
          style={{ fontSize: "var(--heading-section)" }}
        >
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className="mt-4 text-[--text-secondary] text-sm sm:text-base font-light max-w-2xl mx-auto">
          A selection of recent works I am proud of.
        </p>
      </div>

      {/* Scroll Controls */}
      <div className="relative">
        {/* Arrow Buttons — desktop only */}
        <button
          onClick={() => scroll("left")}
          className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-12 w-12 items-center justify-center rounded-full border border-[--border] glass-panel bg-[--bg-card]/90 text-[--text-secondary] transition-all duration-300 hover:border-[--accent] hover:text-[--accent] hover:shadow-[0_0_15px_var(--accent-glow)] active:scale-90"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-12 w-12 items-center justify-center rounded-full border border-[--border] glass-panel bg-[--bg-card]/90 text-[--text-secondary] transition-all duration-300 hover:border-[--accent] hover:text-[--accent] hover:shadow-[0_0_15px_var(--accent-glow)] active:scale-90"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 md:gap-8 pb-8 md:pb-12 px-2 snap-x snap-mandatory hide-scrollbar scroll-smooth"
        >
          {projects.map((project, index) => (
            <TiltCard key={project.id}>
              <SpotlightCard>
                <article
                  onClick={() => setSelected(project)}
                  className={`snap-center shrink-0 w-[min(85vw,340px)] md:w-[min(60vw,520px)] lg:w-[min(45vw,480px)] group flex flex-col h-full overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-[--border] bg-[--bg-card] md:glass-panel shadow-lg md:shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-pointer transition-[border-color] duration-300 active:scale-[0.98] hover:border-[--accent] animated-border slide-left will-change-transform ${visible ? "visible" : ""}`}
                  style={{ transitionDelay: `${index * 0.15}s` }}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[--border] bg-[--bg-base]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      sizes="(max-width: 768px) 85vw, 45vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[--bg-card] to-transparent opacity-60 pointer-events-none group-hover:opacity-40 transition-opacity" />

                    {/* Floating tech badges on hover */}
                    <div className="absolute top-3 left-3 md:top-4 md:left-4 flex flex-wrap gap-1.5 md:gap-2 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-[--bg-base]/80 backdrop-blur-md px-2.5 py-0.5 md:px-3 md:py-1 text-[9px] md:text-[10px] font-bold text-[--accent] border border-[--border-accent]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-1 flex-col p-5 md:p-8 justify-between bg-[--bg-card]">
                    <div>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-[--text-primary] mb-2 md:mb-4 group-hover:text-[--accent] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm md:text-base text-[--text-secondary] leading-relaxed font-light line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    <div className="mt-5 md:mt-8 flex items-center justify-between">
                      <span className="text-[--accent] text-xs md:text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                        View Details <ExternalLink size={14} />
                      </span>
                      <span className="text-[--text-muted] font-mono text-xs opacity-50">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </article>
              </SpotlightCard>
            </TiltCard>
          ))}
        </div>

        {/* Scroll indicator dots */}
        <div className="flex items-center justify-center gap-2 mt-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const el = scrollRef.current;
                if (!el) return;
                const card = el.children[i] as HTMLElement;
                if (card)
                  card.scrollIntoView({
                    behavior: "smooth",
                    inline: "center",
                    block: "nearest",
                  });
              }}
              aria-label={`Project ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300 border border-white/10",
                activeIndex === i
                  ? "w-6 bg-[--accent] shadow-[0_0_10px_var(--accent-glow)]"
                  : "w-2 bg-white/20 hover:bg-white/40",
              )}
            />
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[--bg-base]/95 max-md:bg-[#0A1428] md:bg-[--bg-base]/80 md:backdrop-blur-md p-3 sm:p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto rounded-[1.2rem] sm:rounded-[1.5rem] md:rounded-[2rem] border border-[--border-accent] bg-[--bg-card] max-md:bg-[#0A1428] shadow-[0_0_50px_var(--accent-glow)] overscroll-contain"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute right-3 top-3 md:right-6 md:top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[--bg-base]/80 backdrop-blur-md border border-[--border] text-[--text-secondary] transition-colors hover:border-[--accent] hover:text-[--accent]"
                onClick={() => setSelected(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Modal Image */}
              <div className="relative aspect-[16/9] w-full border-b border-[--border] overflow-hidden">
                <Image
                  src={selected.image}
                  alt={selected.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[--bg-card] to-transparent opacity-80" />
                <h3 className="absolute bottom-3 left-4 sm:bottom-4 sm:left-5 md:bottom-6 md:left-8 font-display text-xl sm:text-3xl md:text-4xl font-extrabold text-[--text-primary]">
                  {selected.title}
                </h3>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 md:p-8">
                <h4 className="text-sm sm:text-base md:text-lg font-bold text-[--text-primary] mb-2 md:mb-3">
                  Overview
                </h4>
                <p className="text-sm md:text-base text-[--text-secondary] leading-relaxed font-light mb-4 md:mb-8">
                  {selected.description}
                </p>

                <h4 className="text-sm sm:text-base md:text-lg font-bold text-[--text-primary] mb-2 md:mb-3">
                  Technologies Used
                </h4>
                <div className="mb-6 md:mb-8 flex flex-wrap gap-1.5 sm:gap-2">
                  {selected.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[--border-accent] bg-[--accent-glow] px-3 py-1 md:px-4 md:py-1.5 text-[10px] sm:text-xs md:text-sm font-medium text-[--text-primary]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Buttons — stack on mobile */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 sm:pt-6 border-t border-[--border]">
                  {selected.demoUrl && (
                    <a
                      href={selected.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full sm:w-auto h-12 items-center justify-center gap-2 rounded-full bg-[--accent] px-6 md:px-8 text-sm font-bold text-[--bg-base] shadow-[0_0_20px_var(--accent-glow)] transition-all max-md:duration-75 md:duration-300 active:scale-95 hover:shadow-[0_0_30px_var(--accent)] hover:brightness-110 touch-manipulation"
                    >
                      <ExternalLink size={16} /> Live Preview
                    </a>
                  )}
                  {selected.repoUrl && (
                    <a
                      href={selected.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full sm:w-auto h-12 items-center justify-center gap-2 rounded-full border-2 border-[--accent] bg-[--accent-glow] px-6 md:px-8 text-sm font-bold text-[--accent] transition-all max-md:duration-75 md:duration-300 active:scale-95 hover:bg-[--accent] hover:text-[--bg-base] hover:shadow-[0_0_20px_var(--accent-glow)] touch-manipulation"
                    >
                      <Code2 size={16} /> Source Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
