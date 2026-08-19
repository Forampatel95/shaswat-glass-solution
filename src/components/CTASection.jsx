import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { company } from '../data/company.js';
import { useReveal } from '../hooks/useReveal.js';
import './CTASection.css';

export default function CTASection({
  title = 'Need the Right Glass for Your Project?',
  text = 'Talk to our team about your glass requirements. We will help you choose the right product for your application.',
}) {
  const { ref, shown } = useReveal();
  return (
    <section className="section cta-section" ref={ref}>
      <div className="container">
        <div className={`cta-card ${shown ? 'in' : ''}`}>
          <div className="cta-bg" aria-hidden="true" />
          <div className="cta-content">
            <h2 className="cta-title">{title}</h2>
            <p className="cta-text">{text}</p>
            <div className="cta-actions">
              <Link to="/quote" className="btn btn-accent">
                Request a Quote <ArrowRight size={16} />
              </Link>
              <a href={`tel:+91${company.primaryPhone}`} className="btn btn-outline">
                <Phone size={16} /> Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
