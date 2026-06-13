"use client";

export default function AnimatedBackground() {
  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Aurora mesh gradient — slowly shifting color bands */}
      <div className="absolute inset-0 opacity-[0.07] aurora-mesh" />

      {/* Floating orb 1 — large accent, top-left orbit */}
      <div
        className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          opacity: 0.06,
          filter: "blur(80px)",
          animation: "orbFloat1 25s ease-in-out infinite",
        }}
      />

      {/* Floating orb 2 — magenta, bottom-right orbit */}
      <div
        className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(circle, var(--magenta) 0%, transparent 70%)",
          opacity: 0.05,
          filter: "blur(80px)",
          animation: "orbFloat2 30s ease-in-out infinite",
        }}
      />

      {/* Floating orb 3 — accent/magenta mix, center drift */}
      <div
        className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full will-change-transform hidden md:block"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 50%, var(--magenta)) 0%, transparent 70%)",
          opacity: 0.04,
          filter: "blur(100px)",
          animation: "orbFloat3 35s ease-in-out infinite",
        }}
      />

      {/* Subtle star field dots */}
      <div className="absolute inset-0 star-field opacity-[0.15] hidden md:block" />

      {/* Animated scan line — very subtle horizontal sweep */}
      <div
        className="absolute left-0 w-full h-[1px] will-change-transform"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--accent) 50%, transparent 100%)",
          opacity: 0.06,
          animation: "scanLine 8s ease-in-out infinite",
        }}
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 40%, var(--bg-base) 100%)",
        }}
      />
    </div>
  );
}
