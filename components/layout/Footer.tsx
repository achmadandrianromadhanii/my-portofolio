import Link from "next/link";
import { ArrowUpRight, Heart, Mail, MapPin } from "lucide-react";
import { profile, socialMedia } from "@/data/portfolio";



const socialLinks = [
  { label: "GitHub", url: socialMedia.github },
  { label: "LinkedIn", url: socialMedia.linkedin },
].filter((item) => item.url !== "");

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[--border] bg-[--bg-card] overflow-hidden">
      <div className="absolute left-1/2 top-0 h-32 w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[--accent-glow] blur-[80px] opacity-40 pointer-events-none" />

      <div className="relative z-10 mx-auto grid max-w-5xl gap-8 px-6 py-12 sm:grid-cols-2 md:grid-cols-[2fr_1fr] lg:px-8">
        <div>
          <Link
            href="#hero"
            className="font-bold text-lg text-[--text-primary] transition-colors hover:text-[--accent]"
          >
            {profile.name}
          </Link>

          <p className="mt-2 max-w-xs text-sm text-[--text-secondary]">
            {profile.role}
          </p>

          <div className="mt-6 space-y-3 text-sm text-[--text-secondary]">
            {profile.location && (
              <div className="flex items-center gap-2 group cursor-default">
                <MapPin className="h-4 w-4" />
                <span className="transition-colors group-hover:text-[--text-primary]">
                  {profile.location}
                </span>
              </div>
            )}

            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 group transition-colors hover:text-[--text-primary]"
              >
                <Mail className="h-4 w-4" />
                <span>{profile.email}</span>
              </a>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-[--text-primary]">
            Social
          </h2>

          <div className="mt-4 grid gap-2.5">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-[--text-secondary] transition-colors hover:text-[--text-primary] hover:translate-x-1"
              >
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-[--border] bg-[--bg-base]/50 px-4 py-6">
        <p className="mx-auto flex max-w-5xl items-center justify-center gap-1.5 text-center text-xs font-medium text-[--text-muted]">
          © {currentYear} {profile.name}. Crafted with
          <Heart className="h-3.5 w-3.5 text-[--accent]" />
          Next.js & Tailwind.
        </p>
      </div>
    </footer>
  );
}
