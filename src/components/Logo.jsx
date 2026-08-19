import logoImage from "../images/shaswat-logo.png"

export default function Logo({ variant = 'dark', className = '' }) {
  return (
    <div
      className={`logo ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <img
        src={logoImage}
        alt="Shaswat Glass Solution"
        style={{
          width: '120px',
          height: '120px',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  );
}