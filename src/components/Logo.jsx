export default function Logo({ variant = 'dark', className = '', showText = true }) {
  const stroke = variant === 'light' ? '#38bdf8' : '#2d6a9f';
  const fill = variant === 'light' ? '#38bdf8' : '#0a1e3f';
  const textColor = variant === 'light' ? '#ffffff' : '#0a1e3f';
  const subColor = variant === 'light' ? 'rgba(255,255,255,0.65)' : '#7b8aa6';

  return (
    <div className={`logo ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <svg
        width="38"
        height="38"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="64" height="64" rx="12" fill={fill} />
        <path
          d="M20 14 L44 14 L38 50 L26 50 Z"
          fill="none"
          stroke={stroke}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M32 14 L32 50" stroke={stroke} strokeWidth="2" opacity="0.5" />
        <circle cx="32" cy="32" r="3.5" fill={stroke} />
      </svg>
      {showText && (
        <div className="logo-text" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span
            className="logo-name"
            style={{
              fontFamily: 'Sora, sans-serif',
              fontWeight: 800,
              fontSize: '1.15rem',
              letterSpacing: '0.04em',
              color: textColor,
            }}
          >
            SHASWAT
          </span>
          <span
            className="logo-sub"
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 500,
              fontSize: '0.62rem',
              letterSpacing: '0.22em',
              color: subColor,
              textTransform: 'uppercase',
              marginTop: '2px',
            }}
          >
            Glass Solution
          </span>
        </div>
      )}
    </div>
  );
}
