import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MessageCircle, Phone, ArrowLeft, Sparkles } from 'lucide-react';
import PageBanner from '../components/PageBanner.jsx';
import CTASection from '../components/CTASection.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { useReveal } from '../hooks/useReveal.js';
import { products } from '../data/products.js';
import { company } from '../data/company.js';
import './ProductDetails.css';

export default function ProductDetails() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const reveal = useReveal();

  if (!product) return <Navigate to="/products" replace />;

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);
  const waText = `Hello Shaswat Glass Solution, I would like to enquire about ${product.name}.`;
  const waLink = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(waText)}`;

  return (
    <>
      <PageBanner
        title={product.name}
        subtitle={product.tagline}
        image={product.image}
        crumbs={[
          { label: 'Products', to: '/products' },
          { label: product.name },
        ]}
      />

      <section className="section pd-section">
        <div className="container">
          <Link to="/products" className="pd-back">
            <ArrowLeft size={16} /> Back to Products
          </Link>

          <div className="pd-grid">
            <div className={`pd-image-wrap ${reveal.shown ? 'in' : ''}`} ref={reveal.ref}>
              <img src={product.image} alt={product.name} className="pd-image" />
              <span className="pd-image-cat">{product.category}</span>
            </div>

            <div className={`pd-info ${reveal.shown ? 'in' : ''}`}>
              <span className="eyebrow">{product.category}</span>
              <h1 className="pd-title">{product.name}</h1>
              <p className="pd-intro">{product.short}</p>

              <div className="pd-actions">
                <Link to="/quote" className="btn btn-primary">
                  Request Quote <ArrowRight size={16} />
                </Link>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </div>

              <div className="pd-spec-note">
                <Sparkles size={18} />
                <span>Specifications available based on project requirements. Contact us for detailed technical specifications.</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="pd-body">
            <div className="pd-section-block">
              <h2 className="pd-block-title">Overview</h2>
              <p className="pd-block-text">{product.description}</p>
            </div>

            <div className="pd-columns">
              <div className="pd-column">
                <h3 className="pd-col-title">Key Features</h3>
                <ul className="pd-feature-list">
                  {product.features.map((f) => (
                    <li key={f}><CheckCircle2 size={18} /> {f}</li>
                  ))}
                </ul>
              </div>
              <div className="pd-column">
                <h3 className="pd-col-title">Benefits</h3>
                <ul className="pd-feature-list">
                  {product.benefits.map((b) => (
                    <li key={b}><CheckCircle2 size={18} /> {b}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pd-columns">
              <div className="pd-column">
                <h3 className="pd-col-title">Applications</h3>
                <div className="pd-tags">
                  {product.applications.map((a) => <span key={a} className="pd-tag">{a}</span>)}
                </div>
              </div>
              <div className="pd-column">
                <h3 className="pd-col-title">Suitable Industries</h3>
                <div className="pd-tags">
                  {product.industries.map((ind) => <span key={ind} className="pd-tag">{ind}</span>)}
                </div>
                <h3 className="pd-col-title" style={{ marginTop: 24 }}>Available Options</h3>
                <div className="pd-tags">
                  {product.options.map((o) => <span key={o} className="pd-tag">{o}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="section-sm pd-related">
        <div className="container">
          <h2 className="pd-related-title">Related Products</h2>
          <div className="pd-related-grid">
            {related.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
          </div>
        </div>
      </section>

      <CTASection
        title={`Interested in ${product.name}?`}
        text="Talk to our team about your project requirements. We'll help you choose the right specifications and deliver on time."
      />
    </>
  );
}
