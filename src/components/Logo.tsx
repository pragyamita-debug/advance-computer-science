/** A small chip with a warm core — the brand mark in the nav, footer and upload screen. */
export function Logo({ size = 34, light = false }: { size?: number; light?: boolean }) {
  const pin = light ? '#8db7ff' : 'var(--accent-soft)';
  return (
    <svg className="logo" width={size} height={size} viewBox="0 0 40 40" aria-hidden>
      <rect x="1" y="1" width="38" height="38" rx="9" fill={light ? 'rgba(255,255,255,0.06)' : 'var(--navy)'} stroke="rgba(141,183,255,0.35)" />
      <rect x="12" y="12" width="16" height="16" rx="3" fill="none" stroke="#2f7bff" strokeWidth="2.4" />
      <path d="M16 7v5m8-5v5m-8 16v5m8-5v5M7 16h5m-5 8h5m16-8h5m-5 8h5" stroke={pin} strokeWidth="2" strokeLinecap="round" />
      <circle className="logo__core" cx="20" cy="20" r="3" fill="var(--warm)" />
    </svg>
  );
}
