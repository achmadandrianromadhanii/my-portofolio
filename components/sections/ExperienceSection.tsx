"use client";

import { experience } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { useInView } from "@/lib/useInView";

export default function ExperienceSection({ id, className }: { id?: string; className?: string }) {
  const { ref, visible } = useInView();

  return (
    <section id={id} ref={ref} className={cn("section-container relative pt-10 pb-10", className)}>
      <div className={`mb-12 md:mb-24 text-center fade-up ${visible ? "visible" : ""}`}>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[--text-primary]">
          My <span className="gradient-text">Experience</span>
        </h2>
        <p className="mt-4 text-[--text-secondary] text-base sm:text-lg font-light max-w-2xl mx-auto">
          The journey so far.
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Static Timeline Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[--border-accent] -translate-x-1/2">
          <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-[--accent] to-transparent opacity-50" />
        </div>

        <div className="space-y-8 md:space-y-12">
          {experience.map((exp, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={exp.id}
                className={cn(
                  `relative flex flex-col md:flex-row items-center fade-up ${visible ? "visible" : ""}`,
                  isEven ? "md:flex-row-reverse" : ""
                )}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-[--bg-base] border-2 border-[--accent] shadow-[0_0_15px_var(--accent-glow)] -translate-x-1/2 z-10" />

                {/* Content Card */}
                <div className={cn(
                  "ml-10 md:ml-0 md:w-1/2",
                  isEven ? "md:pr-12 text-left md:text-right" : "md:pl-12 text-left"
                )}>
                  <div className="p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-[--border] glass-panel bg-[--bg-card] transition-all duration-300 hover:border-[--accent] hover:shadow-[0_0_30px_var(--accent-glow)] group">
                    <span className="inline-block py-1 px-3 rounded-full bg-[--bg-base] border border-[--border-accent] text-[10px] md:text-xs font-mono text-[--accent] mb-3 md:mb-4">
                      {exp.period}
                    </span>
                    <h3 className="font-display text-lg md:text-2xl font-bold text-[--text-primary] mb-1 group-hover:text-[--accent] transition-colors">
                      {exp.role}
                    </h3>
                    <h4 className="text-base md:text-lg text-[--text-muted] mb-3 md:mb-4">{exp.company}</h4>
                    <p className="text-sm md:text-base text-[--text-secondary] font-light leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
