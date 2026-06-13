"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export default function MagneticButton({
  children,
  className,
  onClick,
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Disable magnetic effect on touch devices
    const checkTouch = () => {
      setIsMobile(
        window.matchMedia("(max-width: 768px)").matches ||
          "ontouchstart" in window,
      );
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const inner = (
    <motion.div
      className={cn(
        "relative flex items-center justify-center cursor-pointer",
        className,
      )}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={isMobile ? undefined : { x: position.x, y: position.y }}
      transition={
        isMobile
          ? undefined
          : { type: "spring", stiffness: 150, damping: 15, mass: 0.1 }
      }
      onClick={onClick}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block w-full sm:w-auto">
        {inner}
      </a>
    );
  }

  return inner;
}
