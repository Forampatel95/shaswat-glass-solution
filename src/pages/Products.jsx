import { useState, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import PageBanner from '../components/PageBanner.jsx';
import ProductCard from '../components/ProductCard.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import CTASection from '../components/CTASection.jsx';
import { products, productCategories } from '../data/products.js';
import './Products.css';

export default function Products() {
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(
    () => (filter === 'All' ? products : products.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <>
      <PageBanner
        title="Our Product Offerings"
        subtitle="Smart glass solutions for safer, cooler and more beautiful spaces — engineered for modern architecture."
        image="https://images.pexels.com/photos/32613903/pexels-photo-32613903.jpeg?auto=compress&cs=tinysrgb&h=800&w=1600"
        crumbs={[{ label: 'Products', to: '/products' }]}
      />

      <section className="section products-page">
        <div className="container">
          <SectionTitle
            eyebrow="Product Range"
            title="Smart Glass Solutions for Safer, Cooler and More Beautiful Spaces"
            sub="Explore our comprehensive range of high-performance glass products, each designed for specific architectural and functional needs."
            center
          />

          <div className="products-filters" role="tablist" aria-label="Product categories">
            {productCategories.map((cat) => (
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

          <div className="products-page-grid">
            {filtered.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
