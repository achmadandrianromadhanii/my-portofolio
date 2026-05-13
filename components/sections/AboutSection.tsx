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
    <section id={id} className={cn("section-container border-t border-[--border] mt-12 pt-24 pb-24", className)}>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] items-start">

        {/* Left Side: Title */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-5xl md:text-6xl font-bold tracking-tight text-[--text-primary] lg:sticky lg:top-32">
            Tentang <br className="hidden lg:block" />
            <span className="text-[--text-muted] italic font-light">Saya</span>
          </h2>
          <div className="mt-6 h-[1px] w-24 bg-gradient-to-r from-[--accent] to-transparent" />
        </motion.div>

        {/* Right Side: Content */}
        <div className="flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl leading-relaxed text-[--text-secondary] font-light"
          >
            <p className="mb-6">
              <span className="text-[--text-primary] font-medium">Saya berfokus pada detail.</span> {profile.bio}
            </p>
            <p>
              Pendekatan saya selalu menggabungkan <span className="text-[--text-primary]">estetika desain yang kuat</span> dengan
              <span className="text-[--text-primary]"> implementasi teknis yang efisien</span>, memastikan
              setiap solusi tidak hanya terlihat mewah, tetapi juga berjalan dengan performa maksimal.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[2rem] border border-[--border] glass-panel p-8 md:p-10"
          >
            <h3 className="mb-8 font-display text-2xl font-bold text-[--text-primary]">
              Fokus Utama
            </h3>
            <ul className="space-y-6">
              {highlights.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 text-base md:text-lg text-[--text-secondary]"
                >
                  <div className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[--accent] shadow-[0_0_10px_var(--accent)]" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
