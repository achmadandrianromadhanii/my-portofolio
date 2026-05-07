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
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 md:mb-16"
      >
        <h2 className="text-3xl font-bold tracking-tight text-[--text-primary] sm:text-4xl">
          Core <span className="text-[--accent]">Skills</span>
        </h2>
        <div className="mt-2 h-1 w-20 bg-[--accent] rounded-full" />
      </motion.div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-[--border] bg-[--bg-card] p-6 transition-all hover:border-[--border-accent] hover:bg-[--bg-elevated]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[--bg-elevated] transition-transform group-hover:scale-110">
              <img
                src={skill.icon}
                alt={skill.name}
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
                loading="lazy"
              />
            </div>
            <span className="text-sm font-medium text-[--text-secondary] group-hover:text-[--text-primary] transition-colors">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
