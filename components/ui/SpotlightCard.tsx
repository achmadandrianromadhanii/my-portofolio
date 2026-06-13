"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--spotlight-x", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--spotlight-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn("relative group", className)}
    >
      {/* Spotlight overlay — desktop only, hidden on touch devices */}
      <div
        className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 hidden md:block"
        style={{
          background:
            "radial-gradient(350px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(0,240,255,0.06), transparent 60%)",
        }}
      />
      {children}
    </div>
  );
}
