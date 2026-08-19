import logoImage from "../images/shaswat-logo.jpg"

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
          width: '38px',
          height: '38px',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  );
}