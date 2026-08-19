import { useState, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import PageBanner from '../components/PageBanner.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import CTASection from '../components/CTASection.jsx';
import { projects, projectCategories } from '../data/projects.js';
import './Projects.css';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.type === filter)),
    [filter]
  );

  const closeLightbox = () => setLightbox(null);
  const showPrev = (e) => {
    e.stopPropagation();
    setLightbox((cur) => {
      if (!cur) return null;
      const idx = filtered.findIndex((p) => p.id === cur.id);
      return filtered[(idx - 1 + filtered.length) % filtered.length];
    });
  };
  const showNext = (e) => {
    e.stopPropagation();
    setLightbox((cur) => {
      if (!cur) return null;
      const idx = filtered.findIndex((p) => p.id === cur.id);
      return filtered[(idx + 1) % filtered.length];
    });
  };

  return (
    <>
      <PageBanner
        // title="Notable Projects"
        // subtitle="A showcase of our glass processing and installation work across residential, commercial, industrial and architectural projects."
        image="https://images.pexels.com/photos/1438037/pexels-photo-1438037.jpeg?auto=compress&cs=tinysrgb&h=800&w=1600"
        crumbs={[{ label: 'Projects', to: '/projects' }]}
      />

      <section className="section projects-page">
        <div className="container">
          <SectionTitle
            eyebrow="Our Work"
            title="Projects We've Delivered"
            sub="Each project reflects our commitment to quality, precision and timely delivery."
            center
          />

          <div className="projects-filters" role="tablist" aria-label="Project categories">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                className={`filter-chip ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
                role="tab"
                aria-selected={filter === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="projects-page-grid">
            {filtered.map((p) => (
              <button
                key={p.id}
                className="project-page-card"
                onClick={() => setLightbox(p)}
                aria-label={`View ${p.name}`}
              >
                <div className="project-page-image">
                  <img src={p.image} alt={p.name} loading="lazy" />
                </div>
                <div className="project-page-overlay" />
                <div className="project-page-body">
                  <span className="project-page-type">{p.type}</span>
                  <h3 className="project-page-name">{p.name}</h3>
                  <span className="project-page-loc"><MapPin size={13} /> {p.location}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="project-lightbox" onClick={closeLightbox} role="dialog" aria-modal="true">
          <button className="lb-close" onClick={closeLightbox} aria-label="Close"><X size={24} /></button>
          <button className="lb-nav lb-prev" onClick={showPrev} aria-label="Previous"><ChevronLeft size={28} /></button>
          <div className="lb-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.image} alt={lightbox.name} />
            <div className="lb-info">
              <span className="lb-type">{lightbox.type}</span>
              <h3 className="lb-name">{lightbox.name}</h3>
              <span className="lb-loc"><MapPin size={14} /> {lightbox.location}</span>
              <p className="lb-desc">{lightbox.description}</p>
            </div>
          </div>
          <button className="lb-nav lb-next" onClick={showNext} aria-label="Next"><ChevronRight size={28} /></button>
        </div>
      )}

      <CTASection />
    </>
  );
}
