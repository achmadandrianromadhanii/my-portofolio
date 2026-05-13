"use client";

import { motion } from "motion/react";
import { Mail, Code2, User, ArrowUpRight } from "lucide-react";
import { socialMedia } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export default function ContactSection({
  id,
  className,
}: {
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={cn("section-container border-t border-[--border] py-32", className)}>
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mb-6 inline-flex items-center rounded-full border border-[--border-accent] bg-[--accent-glow] px-4 py-1.5 text-xs font-semibold text-[--accent] tracking-[0.2em] uppercase">
            Mari Berkolaborasi
          </span>
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-[--text-primary] mb-8">
            Hubungi <span className="text-[--text-muted] italic font-light">Saya</span>
          </h2>

          <p className="mx-auto max-w-2xl text-lg md:text-xl text-[--text-secondary] font-light leading-relaxed mb-12">
            Saat ini saya terbuka untuk peluang baru. Baik Anda memiliki pertanyaan, tawaran proyek,
            atau hanya ingin menyapa, saya akan berusaha sebaik mungkin untuk membalas Anda sesegera mungkin.
          </p>

          <a
            href={socialMedia.email}
            className="group relative inline-flex h-16 md:h-20 items-center justify-center gap-4 overflow-hidden rounded-full bg-[--accent] px-10 md:px-14 text-base md:text-lg font-bold text-[#030404] transition-all duration-500 hover:scale-105 hover:brightness-110 hover:shadow-[0_0_40px_var(--accent-glow)]"
          >
            Say Hello
            <Mail className="h-6 w-6 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-24 flex items-center justify-center gap-8 md:gap-12"
        >
          <a
            href={socialMedia.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-4 text-[--text-muted] transition-colors hover:text-[--text-primary]"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[--border] glass-panel bg-[--bg-card] shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:border-[--border-accent] group-hover:bg-[--bg-base] group-hover:shadow-[0_0_30px_rgba(0,255,178,0.15)]">
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 fill-[--text-secondary] transition-colors group-hover:fill-[--text-primary]">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-wider flex items-center gap-1 uppercase">
              GitHub <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-[--accent]" />
            </span>
          </a>

          <a
            href={socialMedia.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-4 text-[--text-muted] transition-colors hover:text-[--text-primary]"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[--border] glass-panel bg-[--bg-card] shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:border-[--border-accent] group-hover:bg-[--bg-base] group-hover:shadow-[0_0_30px_rgba(0,255,178,0.15)]">
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 fill-[--text-secondary] transition-colors group-hover:fill-[--text-primary]">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-wider flex items-center gap-1 uppercase">
              LinkedIn <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-[--accent]" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
