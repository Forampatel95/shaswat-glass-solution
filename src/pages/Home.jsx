import { Link } from 'react-router-dom';
import {
  ArrowRight, ShieldCheck, Clock, Layers, Award, Headphones, Ruler,
  Home as HomeIcon, Building2, Building, Factory, Instagram, ChevronRight, CheckCircle2,
} from 'lucide-react';
import Hero from '../components/Hero.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import ProductCard from '../components/ProductCard.jsx';
import CTASection from '../components/CTASection.jsx';
import { useReveal } from '../hooks/useReveal.js';
import { useCountUp } from '../hooks/useCountUp.js';
import { company } from '../data/company.js';
import { products } from '../data/products.js';
import { projects } from '../data/projects.js';
import { galleryImages } from '../data/gallery.js';
import { applications, processSteps, whyChooseUs } from '../data/content.js';
import './Home.css';

const iconMap = { ShieldCheck, Clock, Layers, Award, Headphones, Ruler };
const appIconMap = { Home: HomeIcon, Building2, Building, Factory };

function StatItem({ stat }) {
  const { ref, value } = useCountUp(stat.value);
  return (
    <div className="stat-item" ref={ref}>
      <span className="stat-value">
        {value}
        <span className="stat-suffix">{stat.suffix}</span>
      </span>
      <span className="stat-label">{stat.label}</span>
    </div>
  );
}

export default function Home() {
  const introReveal = useReveal();
  const processReveal = useReveal();
  const instaReveal = useReveal();
  const previewImages = galleryImages.slice(0, 6);
  const featuredProjects = projects.slice(0, 4);

  return (
    <>
      <Hero />

      {/* Company Intro */}
      <section className="section intro-section" id="intro" ref={introReveal.ref}>
        <div className="container intro-grid">
          <div className={`intro-image ${introReveal.shown ? 'in' : ''}`}>
            <img
              src="https://images.pexels.com/photos/11861957/pexels-photo-11861957.jpeg?auto=compress&cs=tinysrgb&h=750&w=1000"
              alt="Modern curved glass facade building"
              loading="lazy"
            />
            <div className="intro-image-badge">
              <span className="badge-title">Glass Excellence</span>
              <span className="badge-sub">Crafting Excellence in Glass Processing</span>
            </div>
          </div>
          <div className={`intro-content ${introReveal.shown ? 'in' : ''}`}>
            <span className="eyebrow">About Shaswat Glass</span>
            <h2 className="section-title">Built on Glass. Driven by Excellence.</h2>
            <p className="intro-text">{company.intro}</p>
            <ul className="intro-list">
              <li><CheckCircle2 size={18} /> Quality &amp; precision in every unit</li>
              <li><CheckCircle2 size={18} /> Reliable, on-time project delivery</li>
              <li><CheckCircle2 size={18} /> Solutions for residential, commercial &amp; industrial</li>
              <li><CheckCircle2 size={18} /> Customer-focused professional service</li>
            </ul>
            <Link to="/about" className="btn btn-ghost">
              Learn More About Us <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <div className="container">
          <div className="stats-row">
            {company.stats.map((s) => <StatItem key={s.label} stat={s} />)}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section products-section">
        <div className="container">
          <SectionTitle
            eyebrow="Our Products"
            title="Smart Glass Solutions for Safer, Cooler and More Beautiful Spaces"
            sub="A comprehensive range of high-performance glass products engineered for modern architecture, safety and energy efficiency."
            center
          />
          <div className="products-grid">
            {products.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section why-section">
        <div className="container">
          <SectionTitle
            eyebrow="Why Choose Us"
            title="Why Choose Shaswat Glass Solution?"
            sub="Our commitment to quality, precision and reliability makes us a trusted glass processing partner."
            center
          />
          <div className="why-grid">
            {whyChooseUs.map((item, i) => {
              const Icon = iconMap[item.icon] || ShieldCheck;
              return (
                <div
                  key={item.number}
                  className="why-card"
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <span className="why-number">{item.number}</span>
                  <span className="why-icon"><Icon size={26} /></span>
                  <h3 className="why-title">{item.title}</h3>
                  <p className="why-desc">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="section apps-section">
        <div className="container">
          <SectionTitle
            eyebrow="Applications"
            title="Glass Solutions for Every Space"
            sub="From homes to high-rise facades, our glass products serve a wide range of applications."
            center
          />
          <div className="apps-grid">
            {applications.map((app, i) => {
              const Icon = appIconMap[app.icon] || Building;
              return (
                <Link to="/applications" key={app.category} className="app-card" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="app-card-image">
                    <img src={app.image} alt={app.category} loading="lazy" />
                  </div>
                  <div className="app-card-overlay" />
                  <div className="app-card-body">
                    <span className="app-card-icon"><Icon size={22} /></span>
                    <h3 className="app-card-title">{app.category}</h3>
                    <p className="app-card-desc">{app.description}</p>
                    <span className="app-card-link">Explore <ChevronRight size={16} /></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section projects-preview">
        <div className="container">
          <SectionTitle
            eyebrow="Our Work"
            title="Notable Projects"
            sub="A selection of glass installations and processing work across residential, commercial and architectural projects."
          />
          <div className="projects-grid">
            {featuredProjects.map((p) => (
              <Link to="/projects" key={p.id} className="project-card">
                <div className="project-card-image">
                  <img src={p.image} alt={p.name} loading="lazy" />
                </div>
                <div className="project-card-overlay" />
                <div className="project-card-body">
                  <span className="project-card-type">{p.type}</span>
                  <h3 className="project-card-name">{p.name}</h3>
                  <span className="project-card-loc">{p.location}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="projects-more">
            <Link to="/projects" className="btn btn-ghost">
              View All Projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section process-section" ref={processReveal.ref}>
        <div className="container">
          <SectionTitle
            eyebrow="Our Process"
            title="Our Glass Processing Approach"
            sub="A disciplined, step-by-step process that ensures consistent quality from requirement to delivery."
            center
          />
          <div className={`process-timeline ${processReveal.shown ? 'in' : ''}`}>
            {processSteps.map((step) => (
              <div className="process-step" key={step.number}>
                <span className="process-number">{step.number}</span>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-desc">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="section gallery-preview">
        <div className="container">
          <SectionTitle
            eyebrow="Gallery"
            title="A Glimpse of Our Work"
            sub="Architectural glass, interiors, facades and processing — explore our visual gallery."
          />
          <div className="gallery-grid">
            {previewImages.map((img) => (
              <div className="gallery-item" key={img.src}>
                <img src={img.src} alt={img.alt} loading="lazy" />
                <div className="gallery-item-overlay" />
              </div>
            ))}
          </div>
          <div className="gallery-more">
            <Link to="/gallery" className="btn btn-ghost">
              View Full Gallery <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="section-sm insta-section" ref={instaReveal.ref}>
        <div className="container">
          <div className={`insta-card ${instaReveal.shown ? 'in' : ''}`}>
            <div className="insta-text">
              <span className="eyebrow light center">Follow Our Work</span>
              <h2 className="insta-title">Follow Our Work on Instagram</h2>
              <p className="insta-desc">See our latest glass projects, products and installations.</p>
              <a
                href={company.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent"
              >
                <Instagram size={18} /> Follow {company.instagramHandle}
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
