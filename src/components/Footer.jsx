import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, ArrowRight, Clock } from 'lucide-react';
import Logo from './Logo.jsx';
import { company, navLinks } from '../data/company.js';
import { products } from '../data/products.js';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  const companyLinks = navLinks.filter((l) => l.label !== 'Products' && l.label !== 'Home');
  companyLinks.unshift({ label: 'Home', to: '/' });

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">
          <div className="footer-col footer-brand">
            <Logo variant="light" />
            <p className="footer-about">
              Professional glass processing solutions engineered for safety, performance and
              architectural excellence. Based in Palanpur, Gujarat.
            </p>
            <a
              href={company.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
              aria-label="Follow on Instagram"
            >
              <Instagram size={18} />
              <span>{company.instagramHandle}</span>
            </a>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              {companyLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Products</h4>
            <ul className="footer-links">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link to={`/products/${p.slug}`}>{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-contact">
              <li>
                <MapPin size={16} />
                <span>{company.address.full}</span>
              </li>
              {company.phones.map((phone) => (
                <li key={phone}>
                  <Phone size={16} />
                  <a href={`tel:+91${phone.replace(/^0/, '')}`}>{phone}</a>
                </li>
              ))}
              <li>
                <Mail size={16} />
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </li>
              <li>
                <Clock size={16} />
                <span>Mon – Sat: 9 AM – 7 PM</span>
              </li>
            </ul>
            <Link to="/quote" className="btn btn-accent footer-cta">
              Request a Quote <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; {year} Shaswat Glass Solution. All Rights Reserved.</p>
          <p className="footer-tagline">{company.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
