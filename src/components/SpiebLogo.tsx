export function SpiebLogo({ size = 22 }: { size?: number }) {
  const s = size;
  return (
    <div className="flex items-center gap-2">
      <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden>
        <rect x="3" y="3" width="8" height="18" rx="1.5" fill="var(--accent)" />
        <rect x="3" y="14" width="18" height="7" rx="1.5" fill="var(--accent)" />
      </svg>
      <span className="font-bold tracking-tight text-foreground" style={{ fontSize: s * 0.95 }}>
        SpieB<span style={{ color: "var(--accent)" }}>.ai</span>
      </span>
    </div>
  );
}
