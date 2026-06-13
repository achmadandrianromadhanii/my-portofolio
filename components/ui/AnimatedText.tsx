"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function AnimatedText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");

  return (
    <span className={cn("inline", className)}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            delay: delay + i * 0.06,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block mr-[0.3em] will-change-transform"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
