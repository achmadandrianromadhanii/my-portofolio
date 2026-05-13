"use client";

import { motion } from "motion/react";
import { skills } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export default function SkillsSection({ id, className }: { id?: string; className?: string }) {
  return (
    <section id={id} className={cn("section-container", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 md:mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-6"
      >
        <div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[--text-primary]">
            Teknologi <span className="italic text-[--text-muted] font-light">&</span><br className="hidden md:block" /> Keahlian
          </h2>
          <div className="mt-6 h-[1px] w-full max-w-sm bg-gradient-to-r from-[--accent] to-transparent" />
        </div>
        <p className="text-[--text-secondary] max-w-md text-sm sm:text-base leading-relaxed">
          Menggunakan stack teknologi modern yang teruji untuk membangun aplikasi yang cepat, responsif, dan mudah diskalakan.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
            className="group relative flex h-[140px] sm:h-[180px] flex-col items-center justify-center gap-4 overflow-hidden rounded-[2rem] border border-[--border] glass-panel p-4 text-center transition-all duration-500 hover:border-[--border-accent] hover:shadow-[0_0_30px_rgba(0,255,178,0.1)]"
          >
            {/* Background Gradient Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-[--accent-glow] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative z-10 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-[--bg-base] border border-[--border] shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:border-[--border-accent]">
              <img
                src={skill.icon}
                alt={skill.name}
                width={32}
                height={32}
                className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
                loading="lazy"
              />
            </div>

            <div className="relative z-10">
              <span className="text-sm sm:text-lg font-bold text-[--text-secondary] group-hover:text-[--text-primary] transition-colors line-clamp-2">
                {skill.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
