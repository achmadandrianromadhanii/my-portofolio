"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setProgress((window.scrollY / total) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-[60] h-[2px] pointer-events-none"
      style={{ width: `${progress}%` }}
    >
      <div className="h-full w-full bg-gradient-to-r from-[--accent] to-[--magenta] shadow-[0_0_8px_var(--accent-glow)]" />
    </div>
  );
}
