import { useState, useMemo, useCallback, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import PageBanner from '../components/PageBanner.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import CTASection from '../components/CTASection.jsx';
import { galleryImages, galleryCategories } from '../data/gallery.js';
import './Gallery.css';

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = useMemo(
    () => (filter === 'All' ? galleryImages : galleryImages.filter((g) => g.category === filter)),
    [filter]
  );

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const showPrev = useCallback(
    (e) => {
      e.stopPropagation();
      setLightbox((cur) => {
        if (!cur) return null;
        const idx = filtered.findIndex((img) => img.src === cur.src);
        return filtered[(idx - 1 + filtered.length) % filtered.length];
      });
    },
    [filtered]
  );

  const showNext = useCallback(
    (e) => {
      e.stopPropagation();
      setLightbox((cur) => {
        if (!cur) return null;
        const idx = filtered.findIndex((img) => img.src === cur.src);
        return filtered[(idx + 1) % filtered.length];
      });
    },
    [filtered]
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev(e);
      if (e.key === 'ArrowRight') showNext(e);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox, closeLightbox, showPrev, showNext]);

  return (
    <>
      <PageBanner
        title="Gallery"
        subtitle="A visual showcase of architectural glass, interiors, facades, products and our processing work."
        image="https://images.pexels.com/photos/21937726/pexels-photo-21937726.jpeg?auto=compress&cs=tinysrgb&h=800&w=1600"
        crumbs={[{ label: 'Gallery', to: '/gallery' }]}
      />

      <section className="section gallery-page">
        <div className="container">
          <SectionTitle
            eyebrow="Gallery"
            title="Explore Our Glass World"
            sub="Browse through our collection of glass applications across architecture, interiors and processing."
            center
          />

          <div className="gallery-filters" role="tablist" aria-label="Gallery categories">
            {galleryCategories.map((cat) => (
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

          <div className="gallery-masonry">
            {filtered.map((img) => (
              <button
                key={img.src}
                className="gallery-masonry-item"
                onClick={() => setLightbox(img)}
                aria-label={`View ${img.alt}`}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
                <div className="gallery-masonry-overlay">
                  <span className="gallery-zoom"><ZoomIn size={22} /></span>
                  <span className="gallery-masonry-cat">{img.category}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="gallery-lightbox" onClick={closeLightbox} role="dialog" aria-modal="true">
          <button className="lb-close" onClick={closeLightbox} aria-label="Close"><X size={24} /></button>
          <button className="lb-nav lb-prev" onClick={showPrev} aria-label="Previous"><ChevronLeft size={28} /></button>
          <div className="gallery-lb-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.alt} />
            <p className="gallery-lb-caption">{lightbox.alt}</p>
          </div>
          <button className="lb-nav lb-next" onClick={showNext} aria-label="Next"><ChevronRight size={28} /></button>
        </div>
      )}

      <CTASection />
    </>
  );
}
