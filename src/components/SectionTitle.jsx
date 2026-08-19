import { useReveal } from '../hooks/useReveal.js';

export default function SectionTitle({ eyebrow, title, sub, center = false, light = false }) {
  const { ref, shown } = useReveal();
  return (
    <div ref={ref} className={`section-title-wrap ${center ? 'center' : ''} ${shown ? 'in' : ''}`}>
      {eyebrow && <span className={`eyebrow ${center ? 'center' : ''} ${light ? 'light' : ''}`}>{eyebrow}</span>}
      <h2 className={`section-title ${center ? 'center' : ''} ${light ? 'light' : ''}`}>{title}</h2>
      {sub && <p className={`section-sub ${center ? 'center' : ''} ${light ? 'light' : ''}`}>{sub}</p>}
    </div>
  );
}
