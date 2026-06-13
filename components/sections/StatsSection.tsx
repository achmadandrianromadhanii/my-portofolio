"use client";

import { cn } from "@/lib/utils";
import { useInView } from "@/lib/useInView";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { stats } from "@/data/portfolio";
import { Briefcase, FolderGit2, Users, GitCommitHorizontal } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  "Years Experience": Briefcase,
  "Projects Completed": FolderGit2,
  "Happy Clients": Users,
  "GitHub Commits": GitCommitHorizontal,
};

export default function StatsSection({
  className,
}: {
  className?: string;
}) {
  const { ref, visible } = useInView("-40px");

  return (
    <section
      ref={ref}
      className={cn(
        "section-container pt-0 pb-0 md:pt-4 md:pb-4",
        className,
      )}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = iconMap[stat.label] || Briefcase;
          return (
            <SpotlightCard key={stat.label}>
              <div
                className={cn(
                  "relative flex flex-col items-center justify-center gap-2 md:gap-3 overflow-hidden rounded-xl md:rounded-2xl border border-[--border] glass-panel p-5 md:p-7 text-center transition-colors duration-300 hover:border-[--accent] group fade-up",
                  visible ? "visible" : "",
                )}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-[--accent-glow] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

                <div className="relative z-10 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-[--bg-base] border border-[--border] shadow-md transition-all duration-300 group-hover:border-[--accent] group-hover:shadow-[0_0_15px_var(--accent-glow)]">
                  <Icon className="h-5 w-5 md:h-6 md:w-6 text-[--accent]" strokeWidth={1.8} />
                </div>

                <div className="relative z-10">
                  <span className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold gradient-text block leading-none">
                    {visible ? (
                      <AnimatedCounter
                        target={stat.value}
                        delay={index * 0.15}
                        suffix={stat.suffix}
                      />
                    ) : (
                      <>0{stat.suffix}</>
                    )}
                  </span>
                  <span className="text-[10px] sm:text-xs text-[--text-secondary] font-medium mt-1 block">
                    {stat.label}
                  </span>
                </div>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
}
