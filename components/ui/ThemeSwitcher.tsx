"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Palette, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const themes = [
  { id: "theme-purple", name: "Purple", color: "#8b5cf6" },
  { id: "theme-blue", name: "Blue", color: "#3b82f6" },
  { id: "theme-emerald", name: "Emerald", color: "#10b981" },
  { id: "theme-amber", name: "Amber", color: "#f59e0b" },
  { id: "theme-rose", name: "Rose", color: "#f43f5e" },
];

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState("theme-purple");
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Penjelasan: Menggunakan setTimeout untuk mendefer pengambilan tema dari localStorage
    // Ini mencegah React warning 'set-state-in-effect' (cascading renders) saat load awal.
    const timer = setTimeout(() => {
      const savedTheme = localStorage.getItem("portfolio-theme") || "theme-purple";
      setActiveTheme(savedTheme);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Handle klik di luar untuk menutup popover
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeTheme = (themeId: string) => {
    // Hapus semua class theme yang ada
    themes.forEach((t) => document.documentElement.classList.remove(t.id));

    // Tambah class theme baru
    document.documentElement.classList.add(themeId);
    localStorage.setItem("portfolio-theme", themeId);
    setActiveTheme(themeId);

    // Tutup popup setelah memilih dengan sedikit delay biar animasinya terlihat
    setTimeout(() => setIsOpen(false), 200);
  };

  return (
    <div className="relative inline-block z-50" ref={popoverRef}>
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[--border-accent] bg-[--bg-glass] text-[--accent-light] shadow-[0_0_15px_var(--accent-glow)] backdrop-blur-md transition-all hover:bg-[--accent]/20"
        aria-label="Pilih Tema"
      >
        <Palette className="h-5 w-5 animate-pulse" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 mt-3 flex -translate-x-1/2 gap-2 rounded-2xl border border-[--border-accent] bg-[--bg-card]/95 p-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:left-0 sm:translate-x-0"
          >
            {themes.map((theme) => {
              const isActive = activeTheme === theme.id;

              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => changeTheme(theme.id)}
                  className={cn(
                    "group relative flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-110",
                    isActive
                      ? "ring-2 ring-white/50 ring-offset-2 ring-offset-[--bg-card]"
                      : "",
                  )}
                  style={{ backgroundColor: theme.color }}
                  aria-label={`Pilih tema ${theme.name}`}
                >
                  {isActive && (
                    <Check className="h-4 w-4 text-white" strokeWidth={3} />
                  )}

                  {/* Tooltip sederhana saat hover di desktop */}
                  <span className="pointer-events-none absolute -bottom-8 scale-0 rounded bg-white px-2 py-1 text-[10px] font-bold text-black opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
                    {theme.name}
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
