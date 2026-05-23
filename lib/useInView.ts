"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Lightweight hook to detect when an element enters the viewport.
 * Uses native IntersectionObserver (zero JS during animation).
 * Fires once, then disconnects to save resources.
 */
export function useInView(margin = "-80px") {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin, threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return { ref, visible };
}
