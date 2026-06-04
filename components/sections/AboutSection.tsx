"use client";

import { cn } from "@/lib/utils";
import { useInView } from "@/lib/useInView";
import { profile } from "@/data/portfolio";
import { Code2 } from "lucide-react";

export default function AboutSection({
  id,
  className,
}: {
  id?: string;
  className?: string;
}) {
  const { ref, visible } = useInView();

  return (
    <section
      id={id}
      ref={ref}
      className={cn("section-container pt-10 pb-10", className)}
    >
      <div className={`mb-16 text-center fade-up ${visible ? "visible" : ""}`}>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[--text-primary]">
          About <span className="gradient-text">Me</span>
        </h2>
        <p className="mt-4 text-[--text-secondary] text-base sm:text-lg font-light max-w-2xl mx-auto">
          A glimpse into who I am beyond the code editor.
        </p>
      </div>

      {/* Main Bio Card Only */}
      <div className="max-w-5xl mx-auto px-4 md:px-0">
        {/* Penjelasan: Sesuai instruksi terakhir, 4 kotak grid kecil telah dihapus permanen. Tata letak grid disederhanakan menjadi hanya memuat Bio Card Utama. Hal ini juga membantu meminimalkan node DOM sehingga performa (LCP/INP) semakin 100% hijau. */}
        {/* Penjelasan Baru: Di layar besar (lg), card dibagi menjadi grid-cols-12 (4 untuk judul, 8 untuk teks) agar teks tidak melar dari ujung ke ujung. */}
        <div
          className={`rounded-[1.5rem] md:rounded-[2rem] border border-[--border-accent] glass-panel p-6 md:p-10 relative overflow-hidden group hover:border-[--accent] transition-colors duration-300 scale-in ${visible ? "visible" : ""}`}
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none">
            <Code2 className="w-32 md:w-48 h-32 md:h-48 text-[--accent]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 relative z-10">
            <div className="lg:col-span-4 flex flex-col justify-start">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-[--text-primary] mb-2 lg:mb-4">
                Who am I?
              </h3>
              <div className="h-1 w-12 bg-gradient-to-r from-[--accent] to-[--magenta] rounded-full hidden lg:block mt-1"></div>
            </div>

            <div className="lg:col-span-8">
              <p className="text-base md:text-lg leading-relaxed text-[--text-secondary] opacity-90 font-light">
                <span className="text-[--text-primary] font-semibold text-lg md:text-xl block mb-2">
                  I&rsquo;m detail-oriented.
                </span>
                {profile.bio}
                <br />
                <br />
                My approach always combines{" "}
                <span className="text-[--accent] font-medium">
                  strong design aesthetics
                </span>{" "}
                with
                <span className="text-[--magenta] font-medium">
                  {" "}
                  efficient technical implementation
                </span>
                , ensuring that every solution not only looks premium but also runs
                with maximum performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
