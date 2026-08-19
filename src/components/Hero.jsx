import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { company } from '../data/company.js';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-grid-lines" aria-hidden="true" />

      <div className="container hero-content">
        <span className="hero-label">SHASWAT GLASS SOLUTION</span>
        <h1 className="hero-title">
          Crafting Excellence in <span className="text-gradient">Glass Processing</span>
        </h1>
        <p className="hero-desc">
          Advanced glass processing solutions engineered for safety, performance, aesthetics and
          lasting architectural excellence.
        </p>
        <div className="hero-actions">
          <Link to="/products" className="btn btn-accent">
            Explore Our Products <ArrowRight size={18} />
          </Link>
          <Link to="/quote" className="btn btn-outline">
            Request a Quote <ArrowRight size={18} />
          </Link>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-value">6+</span>
            <span className="hero-stat-label">Glass Types</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">4</span>
            <span className="hero-stat-label">Applications</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">100%</span>
            <span className="hero-stat-label">Quality First</span>
          </div>
        </div>
      </div>

      <a href="#intro" className="hero-scroll" aria-label="Scroll down">
        <ChevronDown size={22} />
      </a>
    </section>
  );
}
