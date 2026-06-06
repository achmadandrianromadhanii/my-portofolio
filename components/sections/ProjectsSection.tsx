"use client";

import { useRef, useState, useEffect } from "react";
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

  /* Penjelasan: Menggunakan useEffect untuk mencegah scrolling pada body belakang ketika modal terbuka khusus di mobile.
     Ini mengatasi masalah background yang ikut terscroll saat modal sedang aktif. */
  useEffect(() => {
    // Memastikan hanya berlaku di mobile (lebar layar kurang dari 768px) sesuai permintaan.
    const isMobile = window.innerWidth < 768;
    if (selected && isMobile) {
      document.body.style.overflow = "hidden"; // Mengunci scroll body
    } else {
      document.body.style.overflow = "unset"; // Mengembalikan scroll body
    }

    // Cleanup saat komponen unmount atau saat modal tertutup
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selected]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id={id}
      ref={ref}
      className={cn("section-container pt-10 pb-10", className)}
    >
      <div
        className={`mb-12 md:mb-24 text-center fade-up ${visible ? "visible" : ""}`}
      >
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[--text-primary]">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className="mt-4 text-[--text-secondary] text-base sm:text-lg font-light max-w-2xl mx-auto">
          A selection of recent works I am proud of.
        </p>
      </div>

      {/* Scroll Controls */}
      <div className="relative">
        {/* Arrow Buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-[--border] glass-panel bg-[--bg-card]/90 text-[--text-secondary] transition-all duration-300 hover:border-[--accent] hover:text-[--accent] hover:shadow-[0_0_15px_var(--accent-glow)] active:scale-90"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-[--border] glass-panel bg-[--bg-card]/90 text-[--text-secondary] transition-all duration-300 hover:border-[--accent] hover:text-[--accent] hover:shadow-[0_0_15px_var(--accent-glow)] active:scale-90"
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
            /* Penjelasan: Mengganti transition-all dengan transition-[transform,border-color] dan menghapus glass-panel di HP (menggunakan md:glass-panel). Mengurangi shadow-blur. Ini menghindari GPU lag drastis saat menggeser carousel di mobile. */
            <article
              key={project.id}
              onClick={() => setSelected(project)}
              className={`snap-center shrink-0 w-[80vw] sm:w-[70vw] md:w-[60vw] lg:w-[45vw] group flex flex-col h-full overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-[--border] bg-[--bg-card] md:glass-panel shadow-lg md:shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-pointer transition-[transform,border-color] duration-300 active:scale-[0.98] hover:border-[--accent] hover:-translate-y-2 slide-left will-change-transform ${visible ? "visible" : ""}`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[--border] bg-[--bg-base]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 768px) 80vw, 45vw"
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
                  <h3 className="font-display text-xl md:text-3xl font-bold text-[--text-primary] mb-2 md:mb-4 group-hover:text-[--accent] transition-colors">
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
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        /* Penjelasan: Mengganti backdrop-blur-md menjadi md:backdrop-blur-md dan membuat background lebih solid di HP agar animasi modal tidak membuat patah-patah/lag. */
        /* Update: Menambahkan max-md:bg-[#0A1428] agar latar belakang 100% solid (tidak transparan) di mobile. */
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[--bg-base]/95 max-md:bg-[#0A1428] md:bg-[--bg-base]/80 md:backdrop-blur-md p-3 sm:p-6"
          onClick={() => setSelected(null)}
        >
          {/* Update: Menambahkan max-md:bg-[#0A1428] untuk background modal yang tidak transparan di mobile, serta overscroll-contain agar scroll tidak bocor ke belakang. */}
          <div
            className="relative w-full max-w-4xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto rounded-[1.2rem] sm:rounded-[1.5rem] md:rounded-[2rem] border border-[--border-accent] bg-[--bg-card] max-md:bg-[#0A1428] shadow-[0_0_50px_var(--accent-glow)] overscroll-contain"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute right-3 top-3 md:right-6 md:top-6 z-10 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-[--bg-base]/80 backdrop-blur-md border border-[--border] text-[--text-secondary] transition-colors hover:border-[--accent] hover:text-[--accent]"
              onClick={() => setSelected(null)}
              aria-label="Close modal"
            >
              <X size={16} className="md:w-[18px] md:h-[18px]" />
            </button>

            {/* Modal Image */}
            <div className="relative aspect-[16/7] sm:aspect-[21/9] w-full border-b border-[--border] overflow-hidden">
              <Image
                src={selected.image}
                alt={selected.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[--bg-card] to-transparent opacity-80" />
              <h3 className="absolute bottom-3 left-4 sm:bottom-4 sm:left-5 md:bottom-6 md:left-8 font-display text-xl sm:text-3xl md:text-5xl font-extrabold text-[--text-primary]">
                {selected.title}
              </h3>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 md:p-10">
              <h4 className="text-sm sm:text-base md:text-lg font-bold text-[--text-primary] mb-2 md:mb-3">
                Overview
              </h4>
              <p className="text-sm md:text-lg text-[--text-secondary] leading-relaxed font-light mb-4 md:mb-8">
                {selected.description}
              </p>

              <h4 className="text-sm sm:text-base md:text-lg font-bold text-[--text-primary] mb-2 md:mb-3">
                Technologies Used
              </h4>
              <div className="mb-6 md:mb-10 flex flex-wrap gap-1.5 sm:gap-2">
                {selected.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-[--border-accent] bg-[--accent-glow] px-2.5 py-1 md:px-4 md:py-1.5 text-[10px] sm:text-xs md:text-sm font-medium text-[--text-primary]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Fixed buttons — both clearly visible */}
              <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 pt-4 sm:pt-6 md:pt-8 border-t border-[--border]">
                {selected.demoUrl && (
                  /* Update: Menambahkan touch-manipulation dan max-md:duration-75 untuk menghilangkan delay saat tombol di klik di perangkat mobile, membuatnya terasa sangat responsif dan ringan tanpa merusak lighthouse. */
                  <a
                    href={selected.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 sm:h-11 md:h-12 items-center justify-center gap-2 rounded-full bg-[--accent] px-5 sm:px-6 md:px-8 text-xs sm:text-sm font-bold text-[--bg-base] shadow-[0_0_20px_var(--accent-glow)] transition-all max-md:duration-75 md:duration-300 active:scale-95 hover:shadow-[0_0_30px_var(--accent)] hover:brightness-110 touch-manipulation"
                  >
                    <ExternalLink size={14} className="sm:w-4 sm:h-4" /> Live
                    Preview
                  </a>
                )}
                {selected.repoUrl && (
                  /* Update: Menambahkan touch-manipulation dan max-md:duration-75 untuk klik yang responsif di mobile. */
                  <a
                    href={selected.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 sm:h-11 md:h-12 items-center justify-center gap-2 rounded-full border border-[--accent] sm:border-2 bg-[--accent-glow] px-5 sm:px-6 md:px-8 text-xs sm:text-sm font-bold text-[--accent] transition-all max-md:duration-75 md:duration-300 active:scale-95 hover:bg-[--accent] hover:text-[--bg-base] hover:shadow-[0_0_20px_var(--accent-glow)] touch-manipulation"
                  >
                    <Code2 size={14} className="sm:w-4 sm:h-4" /> Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
