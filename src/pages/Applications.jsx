import { Link } from 'react-router-dom';
import { ChevronRight, Home, Building2, Building, Factory } from 'lucide-react';
import PageBanner from '../components/PageBanner.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import CTASection from '../components/CTASection.jsx';
import { useReveal } from '../hooks/useReveal.js';
import { applications } from '../data/content.js';
import { products } from '../data/products.js';
import './Applications.css';

const appIconMap = { Home, Building2, Building, Factory };

function AppRow({ app, index }) {
  const reveal = useReveal();
  const Icon = appIconMap[app.icon] || Building;
  return (
    <div
      className={`app-page-row ${index % 2 === 1 ? 'reverse' : ''} ${reveal.shown ? 'in' : ''}`}
      ref={reveal.ref}
    >
      <div className="app-page-image">
        <img src={app.image} alt={app.category} loading="lazy" />
        <div className="app-page-image-overlay" />
        <span className="app-page-icon"><Icon size={28} /></span>
      </div>
      <div className="app-page-content">
        <span className="eyebrow">0{index + 1}</span>
        <h3 className="app-page-title">{app.category}</h3>
        <p className="app-page-desc">{app.description}</p>
        <ul className="app-page-items">
          {app.items.map((item) => (
            <li key={item}><ChevronRight size={16} /> {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Applications() {
  return (
    <>
      <PageBanner
        title="Glass Solutions for Every Space"
        subtitle="From residential interiors to large-scale architectural facades, our glass products serve diverse applications across multiple sectors."
        image="https://images.pexels.com/photos/37320179/pexels-photo-37320179.jpeg?auto=compress&cs=tinysrgb&h=800&w=1600"
        crumbs={[{ label: 'Applications', to: '/applications' }]}
      />

      <section className="section apps-page">
        <div className="container">
          <SectionTitle
            eyebrow="Applications"
            title="Where Our Glass Makes a Difference"
            sub="Explore the spaces and sectors where Shaswat Glass Solution products deliver performance, safety and aesthetic value."
            center
          />
          <div className="apps-page-list">
            {applications.map((app, i) => <AppRow key={app.category} app={app} index={i} />)}
          </div>
        </div>
      </section>

      <section className="section-sm apps-products">
        <div className="container">
          <SectionTitle eyebrow="Products" title="Recommended Glass Products" center />
          <div className="apps-products-grid">
            {products.slice(0, 3).map((p) => (
              <Link to={`/products/${p.slug}`} key={p.slug} className="apps-product-link">
                {p.name} <ChevronRight size={16} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
