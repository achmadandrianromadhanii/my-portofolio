"use client";

import { Mail, ArrowUpRight, Copy } from "lucide-react";
import { socialMedia, profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { useInView } from "@/lib/useInView";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import SectionLabel from "@/components/ui/SectionLabel";
import MagneticButton from "@/components/ui/MagneticButton";

function TypewriterText({
  text,
  visible,
}: {
  text: string;
  visible?: boolean;
}) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (visible === false) return;
    let currentText = "";
    let i = 0;
    let isDeleting = false;
    let timeout: number;

    const type = () => {
      if (!isDeleting && i <= text.length) {
        currentText = text.slice(0, i);
        setDisplayedText(currentText);
        i++;
        timeout = window.setTimeout(type, 50);
      } else if (isDeleting && i >= 0) {
        currentText = text.slice(0, i);
        setDisplayedText(currentText);
        i--;
        timeout = window.setTimeout(type, 20);
      } else if (i > text.length) {
        isDeleting = true;
        timeout = window.setTimeout(type, 3000);
      } else if (i < 0) {
        isDeleting = false;
        i = 0;
        timeout = window.setTimeout(type, 1000);
      }
    };

    timeout = window.setTimeout(type, 500);
    return () => window.clearTimeout(timeout);
  }, [text, visible]);

  return (
    <span className="inline">
      <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
        {displayedText}
      </span>
      <span className="inline-block w-[3px] h-[1em] ml-[2px] bg-[--accent] animate-pulse align-text-bottom" />
    </span>
  );
}

export default function ContactSection({
  id,
  className,
}: {
  id?: string;
  className?: string;
}) {
  const { ref, visible } = useInView();

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    toast.success("Email copied to clipboard!");
  };

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "section-container border-t border-[--border]",
        className,
      )}
    >
      <div className="mx-auto max-w-4xl text-center">
        <div className={`fade-up ${visible ? "visible" : ""}`}>
          <SectionLabel number={5} label="Contact" />
          <span className="mb-4 md:mb-6 inline-flex items-center rounded-full border border-[--border-accent] bg-[--accent-glow] px-4 py-1.5 text-[10px] sm:text-xs font-semibold text-[--accent] tracking-[0.15em] sm:tracking-[0.2em] uppercase">
            Let&rsquo;s Collaborate
          </span>
          <h2
            className="font-display font-bold tracking-tight text-[--text-primary] mb-6 md:mb-8"
            style={{ fontSize: "var(--heading-section)" }}
          >
            Get In <span className="gradient-text">Touch</span>
          </h2>

          <p className="mx-auto max-w-2xl text-sm sm:text-base md:text-lg text-[--text-secondary] font-light leading-relaxed mb-8 md:mb-12">
            I&rsquo;m currently open to new opportunities. Whether you have a
            question, a project offer, or just want to say hi, I&rsquo;ll try my
            best to get back to you as soon as possible.
          </p>

          {/* Unified CTA Card — Email + WhatsApp */}
          <div className="mx-auto max-w-xl rounded-2xl md:rounded-[2rem] border border-[--border-accent] glass-premium p-6 md:p-8">
            {/* Email row */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full sm:flex-1 inline-flex h-14 items-center justify-center gap-3 rounded-full border border-[--accent] bg-[--bg-card] px-6 text-sm font-bold text-[--text-primary] shadow-[0_0_20px_var(--accent-glow)] transition-all max-md:duration-75 md:duration-300 active:scale-95 hover:bg-[--accent] hover:text-[#0A1428] hover:shadow-[0_0_40px_var(--accent)] touch-manipulation will-change-transform"
              >
                <Mail className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-12" />
                Email Me
              </a>
              <button
                onClick={copyEmail}
                className="flex h-14 w-full sm:w-14 shrink-0 items-center justify-center rounded-full border border-[--border] bg-[--bg-card] text-[--text-secondary] transition-all duration-200 hover:border-[--accent] hover:text-[--accent] hover:shadow-[0_0_15px_var(--accent-glow)] active:scale-95"
                aria-label="Copy email"
              >
                <Copy className="h-5 w-5" />
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-5">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <span className="text-[10px] uppercase tracking-widest text-[--text-muted] font-medium">
                or
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/6285119744035"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] px-8 text-sm font-bold text-white transition-[transform,box-shadow] duration-300 active:scale-95 hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(37,211,102,0.4)] will-change-transform"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Hubungi WhatsApp
              </span>
              <div className="absolute inset-0 z-0 bg-white/20 translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
            </a>
          </div>

          {/* Typewriter text */}
          <div
            className={`mt-10 fade-up delay-1 ${visible ? "visible" : ""}`}
          >
            <div className="min-h-[80px] sm:min-h-[60px] md:min-h-[50px] flex items-center justify-center w-full max-w-2xl mx-auto">
              <p className="font-display text-[15px] sm:text-lg md:text-xl font-bold tracking-wider leading-loose md:leading-relaxed text-center text-[--accent-light]">
                <TypewriterText
                  text="Yang mau collabs project bisa hubungin WHATSAPP saya, Dan yang butuh jasa pembuatan website bisa juga hubungin saya."
                  visible={visible}
                />
              </p>
            </div>
          </div>
        </div>

        <div
          className={`mt-10 md:mt-12 flex items-center justify-center gap-8 md:gap-12 fade-up delay-2 ${visible ? "visible" : ""}`}
        >
          <MagneticButton href={socialMedia.github}>
            <div className="group flex flex-col items-center gap-3 md:gap-4 text-[--text-muted] transition-colors hover:text-[--text-primary]">
              <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full border border-[--border] md:glass-panel bg-[--bg-card] shadow-lg transition-[transform,border-color,box-shadow] duration-300 group-hover:scale-110 group-active:scale-95 group-hover:border-[--border-accent] group-hover:shadow-[0_0_30px_var(--accent-glow)] will-change-transform">
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 fill-[--text-secondary] transition-colors group-hover:fill-[--text-primary]"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </div>
              <span className="text-xs md:text-sm font-semibold tracking-wider flex items-center gap-1 uppercase">
                GitHub{" "}
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-[--accent]" />
              </span>
            </div>
          </MagneticButton>

          <MagneticButton href={socialMedia.linkedin}>
            <div className="group flex flex-col items-center gap-3 md:gap-4 text-[--text-muted] transition-colors hover:text-[--text-primary]">
              <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full border border-[--border] md:glass-panel bg-[--bg-card] shadow-lg transition-[transform,border-color,box-shadow] duration-300 group-hover:scale-110 group-active:scale-95 group-hover:border-[--border-accent] group-hover:shadow-[0_0_30px_var(--accent-glow)] will-change-transform">
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 fill-[--text-secondary] transition-colors group-hover:fill-[--text-primary]"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <span className="text-xs md:text-sm font-semibold tracking-wider flex items-center gap-1 uppercase">
                LinkedIn{" "}
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-[--accent]" />
              </span>
            </div>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
