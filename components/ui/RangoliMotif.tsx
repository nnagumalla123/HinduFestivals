import { cn } from "@/lib/utils/cn";

/**
 * A quiet rangoli-style motif: concentric rings with a ring of dots. Purely decorative (hidden
 * from screen readers). Position it with `className` inside a `relative overflow-hidden` parent.
 */
export function RangoliMotif({ className }: { className?: string }) {
  const dots = Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * Math.PI * 2;
    return { x: (100 + 90 * Math.cos(angle)).toFixed(1), y: (100 + 90 * Math.sin(angle)).toFixed(1) };
  });
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 200 200"
      className={cn("pointer-events-none absolute text-gold opacity-30", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      {[18, 38, 58, 78].map((r) => (
        <circle key={r} cx="100" cy="100" r={r} />
      ))}
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="3" fill="currentColor" stroke="none" />
      ))}
    </svg>
  );
}
