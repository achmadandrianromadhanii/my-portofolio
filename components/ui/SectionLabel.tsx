export default function SectionLabel({
  number,
  label,
}: {
  number: number;
  label: string;
}) {
  return (
    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
      <span className="font-mono text-[11px] text-[--accent] tracking-widest font-semibold">
        {String(number).padStart(2, "0")}
      </span>
      <div className="h-px w-8 bg-[--accent]/30" />
      <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[--text-muted] font-medium">
        {label}
      </span>
    </div>
  );
}
