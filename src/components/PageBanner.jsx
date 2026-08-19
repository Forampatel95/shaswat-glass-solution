import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal.js';
import './PageBanner.css';

export default function PageBanner({ title, subtitle, image, crumbs = [] }) {
  const { ref, shown } = useReveal();

  return (
    <section className="page-banner" ref={ref}>
      <div className="page-banner-bg" style={{ backgroundImage: `url(${image})` }} aria-hidden="true" />
      <div className="page-banner-overlay" aria-hidden="true" />
      <div className="container page-banner-content">
        <nav className="page-crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="page-crumb">
              <ChevronRight size={14} />
              {c.to ? <Link to={c.to}>{c.label}</Link> : <span>{c.label}</span>}
            </span>
          ))}
        </nav>
        <h1 className={`page-banner-title ${shown ? 'in' : ''}`}>{title}</h1>
        {subtitle && <p className={`page-banner-sub ${shown ? 'in' : ''}`}>{subtitle}</p>}
      </div>
    </section>
  );
}
