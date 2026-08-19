import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown, ArrowRight } from 'lucide-react';
import Logo from './Logo.jsx';
import { company, navLinks } from '../data/company.js';
import { products } from '../data/products.js';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const location = useLocation();
  const onHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
    setMobileProductsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const solid = scrolled || !onHome;
  const isActive = (to) => location.pathname === to;

  return (
    <>
      <header className={`navbar ${solid ? 'navbar-solid' : 'navbar-transparent'}`}>
        <div className="container navbar-inner">
          <Link to="/" className="navbar-logo" aria-label="Shaswat Glass Solution home">
            <Logo variant={solid ? 'dark' : 'light'} />
          </Link>

          <nav className="navbar-nav" aria-label="Primary">
            {navLinks.map((link) =>
              link.label === 'Products' ? (
                <div
                  className="navbar-item navbar-dropdown"
                  key={link.label}
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <Link
                    to={link.to}
                    className={`navbar-link ${isActive(link.to) ? 'active' : ''}`}
                    aria-expanded={productsOpen}
                  >
                    Products
                    <ChevronDown size={15} className="navbar-caret" />
                  </Link>
                  <div className={`navbar-menu ${productsOpen ? 'open' : ''}`}>
                    {products.map((p) => (
                      <Link key={p.slug} to={`/products/${p.slug}`} className="navbar-menu-item">
                        <span className="navbar-menu-name">{p.name}</span>
                        <span className="navbar-menu-cat">{p.category}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`navbar-link ${isActive(link.to) ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="navbar-actions">
            <a href={`tel:+91${company.primaryPhone}`} className="navbar-phone">
              <Phone size={16} />
              <span>{company.phones[0]}</span>
            </a>
            <Link to="/quote" className="btn btn-accent navbar-cta">
              Request a Quote
              <ArrowRight size={16} />
            </Link>
            <button
              className="navbar-toggle"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-menu-body">
          {navLinks.map((link) =>
            link.label === 'Products' ? (
              <div className="mobile-item-group" key={link.label}>
                <button
                  className={`mobile-item ${isActive(link.to) ? 'active' : ''}`}
                  onClick={() => setMobileProductsOpen((v) => !v)}
                  aria-expanded={mobileProductsOpen}
                >
                  Products
                  <ChevronDown size={18} className={`mobile-caret ${mobileProductsOpen ? 'rotate' : ''}`} />
                </button>
                <div className={`mobile-submenu ${mobileProductsOpen ? 'open' : ''}`}>
                  <Link to="/products" className="mobile-sub-item">All Products</Link>
                  {products.map((p) => (
                    <Link key={p.slug} to={`/products/${p.slug}`} className="mobile-sub-item">
                      {p.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                className={`mobile-item ${isActive(link.to) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            )
          )}
          <Link to="/quote" className="btn btn-accent mobile-cta">
            Request a Quote
            <ArrowRight size={16} />
          </Link>
          <a href={`tel:+91${company.primaryPhone}`} className="mobile-call">
            <Phone size={16} /> {company.phones[0]}
          </a>
        </div>
      </div>
    </>
  );
}
