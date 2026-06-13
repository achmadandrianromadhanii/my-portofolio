import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";
import { profile } from "@/data/portfolio";

export default function NotFoundPage() {
  return (
    <section className="relative flex min-h-[calc(100svh-56px)] items-center overflow-hidden px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-24 h-48 w-48 -translate-x-1/2 rounded-full bg-[--accent-glow] blur-[80px] md:h-72 md:w-72" />
        <div className="absolute bottom-10 right-0 h-40 w-40 rounded-full bg-[--magenta-glow] blur-[60px] md:h-56 md:w-56" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[--bg-base] to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[--border-accent] bg-[--accent-glow] text-[--accent] shadow-[0_0_20px_var(--accent-glow)]">
          <SearchX className="h-8 w-8" />
        </div>

        <p className="mt-6 font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-[--accent]">
          404 — Halaman Tidak Ditemukan
        </p>

        <h1 className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-tight text-[--text-primary] sm:text-3xl md:text-4xl">
          Halaman yang kamu cari tidak tersedia.
        </h1>

        <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-[--text-secondary] sm:text-sm">
          Link mungkin salah, halaman sudah dipindahkan, atau route tersebut
          belum dibuat. Kembali ke halaman utama untuk melihat portfolio{" "}
          <span className="font-semibold text-[--accent]">
            {profile.name}
          </span>
          .
        </p>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[--accent] px-6 py-2 text-xs font-semibold text-[#0A1428] shadow-[0_0_16px_var(--accent-glow)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_24px_var(--accent-glow)] sm:text-sm"
          >
            <Home className="h-3.5 w-3.5" />
            Kembali ke Home
          </Link>

          <Link
            href="/#projects"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[--border-accent] bg-[--bg-card] px-6 py-2 text-xs font-semibold text-[--text-primary] transition-all duration-300 hover:-translate-y-0.5 hover:border-[--accent] sm:text-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Lihat Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
