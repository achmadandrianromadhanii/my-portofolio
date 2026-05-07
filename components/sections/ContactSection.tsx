"use client";

import { motion } from "motion/react";
import { Mail, Code2, User, ArrowUpRight } from "lucide-react";
import { profile, socialMedia } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export default function ContactSection({
  id,
  className,
}: {
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={cn("section-container", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 md:mb-16 text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight text-[--text-primary] sm:text-4xl">
          Get In <span className="text-[--accent]">Touch</span>
        </h2>
        <div className="mx-auto mt-2 h-1 w-20 bg-[--accent] rounded-full" />
      </motion.div>

      <div className="mx-auto max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 text-lg text-[--text-secondary]"
        >
          Saat ini saya terbuka untuk peluang baru. Apakah Anda memiliki
          pertanyaan atau hanya ingin menyapa, saya akan berusaha sebaik mungkin
          untuk membalas Anda!
      </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center gap-6"
        >
          <a
            href={socialMedia.email}
            className="group flex h-14 items-center gap-3 rounded-xl bg-[--accent] px-8 text-sm font-bold text-black transition-all hover:scale-105 hover:shadow-[0_0_20px_var(--accent-glow)]"
          >
            Say Hello
            <Mail className="h-5 w-5" />
          </a>

          <div className="mt-6 flex items-center justify-center gap-6 border-t border-[--border] pt-8 w-full max-w-xs">
            <a
              href={socialMedia.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-[--text-secondary] transition-colors hover:text-[--text-primary]"
            >
              <Code2 className="h-5 w-5" />
              GitHub
              <ArrowUpRight className="h-3 w-3 opacity-50" />
            </a>
            <a
              href={socialMedia.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-[--text-secondary] transition-colors hover:text-[--text-primary]"
            >
              <User className="h-5 w-5" />
              LinkedIn
              <ArrowUpRight className="h-3 w-3 opacity-50" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
