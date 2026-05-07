"use client";

import { motion } from "motion/react";
import { profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export default function AboutSection({
  id,
  className,
}: {
  id?: string;
  className?: string;
}) {
  const highlights = [
    "Berpengalaman membangun aplikasi web responsif dan modern.",
    "Fokus pada clean code dan arsitektur yang mudah di-maintain.",
    "Memahami prinsip UI/UX untuk pengalaman pengguna yang lebih baik.",
    "Selalu antusias mempelajari teknologi baru dan problem solving.",
  ];

  return (
    <section id={id} className={cn("section-container", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 md:mb-12"
      >
        <h2 className="text-3xl font-bold tracking-tight text-[--text-primary] sm:text-4xl">
          About <span className="text-[--accent]">Me</span>
        </h2>
        <div className="mt-2 h-1 w-20 bg-[--accent] rounded-full" />
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base leading-relaxed text-[--text-secondary]"
        >
          <p className="mb-4">{profile.bio}</p>
          <p>
            Saya selalu berusaha memberikan solusi terbaik dalam setiap proyek
            yang saya kerjakan, mulai dari desain antarmuka hingga implementasi
            logika sistem di belakangnya.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl border border-[--border] bg-[--bg-card] p-6 md:p-8"
        >
          <h3 className="mb-4 text-lg font-bold text-[--text-primary]">
            Highlights
          </h3>
          <ul className="space-y-4">
            {highlights.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-sm text-[--text-secondary]"
              >
                <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[--accent]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
