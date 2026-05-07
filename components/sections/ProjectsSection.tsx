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
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 md:mb-16"
      >
        <h2 className="text-3xl font-bold tracking-tight text-[--text-primary] sm:text-4xl">
          Featured <span className="text-[--accent]">Projects</span>
        </h2>
        <div className="mt-2 h-1 w-20 bg-[--accent] rounded-full" />
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-[--border] bg-[--bg-card] transition-all hover:border-[--border-accent]"
          >
            {/* Image Container */}
            <div className="relative aspect-video w-full overflow-hidden border-b border-[--border] bg-[--bg-elevated]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[--bg-card] to-transparent opacity-60" />
            </div>

            {/* Content Container */}
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-bold text-[--text-primary] group-hover:text-[--accent] transition-colors">
                {project.title}
              </h3>
              
              <p className="mt-3 flex-1 text-sm text-[--text-secondary] leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="mt-6 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-[--border] bg-[--bg-elevated] px-3 py-1 text-xs font-medium text-[--text-secondary]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="mt-6 flex items-center gap-4 pt-4 border-t border-[--border]">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-[--text-primary] transition-colors hover:text-[--accent]"
                  >
                    <Code2 className="h-4 w-4" />
                    Code
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-[--text-primary] transition-colors hover:text-[--accent]"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
