"use client";

import { motion } from "motion/react";
import { ExternalLink, Code2 } from "lucide-react";
import { projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function ProjectsSection({ id, className }: { id?: string; className?: string }) {
  return (
    <section id={id} className={cn("section-container", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 md:mb-24 text-center"
      >
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[--text-primary]">
          Karya <span className="text-[--text-muted] italic font-light">Pilihan</span>
        </h2>
        <div className="mt-6 mx-auto h-[1px] w-24 bg-gradient-to-r from-transparent via-[--accent] to-transparent" />
      </motion.div>

      {/* Symmetrical Uniform Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group flex flex-col h-full overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-[--border] glass-panel bg-[--bg-card] shadow-2xl transition-all duration-500 hover:border-[--border-accent] hover:-translate-y-2"
          >
            {/* Image Container - Fixed Aspect Ratio for perfect uniformity */}
            <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[--border] bg-[--bg-base]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[--bg-card] to-transparent opacity-60 pointer-events-none" />
            </div>

            {/* Content Container */}
            <div className="flex flex-1 flex-col p-8 sm:p-10 justify-between bg-[--bg-card]">
              <div>
                <div className="mb-4 inline-flex items-center rounded-full border border-[--border] bg-[--bg-base] px-4 py-1.5 text-xs font-semibold text-[--text-secondary] uppercase tracking-wider">
                  Project {String(index + 1).padStart(2, '0')}
                </div>

                <h3 className="font-display text-3xl sm:text-4xl font-bold text-[--text-primary] mb-6">
                  {project.title}
                </h3>

                <p className="text-base sm:text-lg text-[--text-secondary] leading-relaxed mb-8 font-light line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech Stack */}
                <div className="mb-8 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[--border-accent] bg-[--accent-glow] px-4 py-1.5 text-xs font-medium text-[--text-primary] backdrop-blur-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-6 pt-6 border-t border-[--border] mt-auto">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link flex items-center gap-2 text-sm font-bold text-[--text-primary] transition-colors hover:text-[--accent]"
                    >
                      <Code2 className="h-5 w-5 transition-transform group-hover/link:-translate-y-1" />
                      Source Code
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link flex items-center gap-2 text-sm font-bold text-[--text-primary] transition-colors hover:text-[--accent]"
                    >
                      <ExternalLink className="h-5 w-5 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1" />
                      Live Preview
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
