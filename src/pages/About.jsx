import { Link } from 'react-router-dom';
import { Target, Eye, CheckCircle2, ArrowRight, ShieldCheck, Clock, Layers, Award, Headphones, Ruler } from 'lucide-react';
import PageBanner from '../components/PageBanner.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import CTASection from '../components/CTASection.jsx';
import { useReveal } from '../hooks/useReveal.js';
import { useCountUp } from '../hooks/useCountUp.js';
import { company } from '../data/company.js';
import { whyChooseUs } from '../data/content.js';
import './About.css';

const iconMap = { ShieldCheck, Clock, Layers, Award, Headphones, Ruler };

function AboutStat({ stat }) {
  const { ref, value } = useCountUp(stat.value);
  return (
    <div className="about-stat" ref={ref}>
      <span className="about-stat-value">{value}<span className="suffix">{stat.suffix}</span></span>
      <span className="about-stat-label">{stat.label}</span>
    </div>
  );
}

export default function About() {
  const storyReveal = useReveal();
  const missionReveal = useReveal();
  const whyReveal = useReveal();

  return (
    <>
      <PageBanner
        // title="About Shaswat Glass Solution"
        // subtitle="A professional glass processing company dedicated to quality, performance and architectural excellence."
        image="https://images.pexels.com/photos/11861957/pexels-photo-11861957.jpeg?auto=compress&cs=tinysrgb&h=800&w=1600"
        crumbs={[{ label: 'About', to: '/about' }]}
      />

      {/* Story */}
      <section className="section about-story" ref={storyReveal.ref}>
        <div className="container about-story-grid">
          <div className={`about-story-image ${storyReveal.shown ? 'in' : ''}`}>
            <img
              src="https://images.pexels.com/photos/5483051/pexels-photo-5483051.jpeg?auto=compress&cs=tinysrgb&h=750&w=1000"
              alt="Modern office with glass walls"
              loading="lazy"
            />
          </div>
          <div className={`about-story-content ${storyReveal.shown ? 'in' : ''}`}>
            <span className="eyebrow">Our Story</span>
            <h2 className="section-title">Leading Glass Processing in Palanpur, Gujarat</h2>
            <p className="about-text">{company.about}</p>
            <p className="about-text">
              From toughened safety glass to high-performance insulated units, our advanced
              processing capabilities allow us to serve a diverse range of residential, commercial
              and industrial projects with consistent quality and precision.
            </p>
            <ul className="about-list">
              <li><CheckCircle2 size={18} /> Glass processing for architectural applications</li>
              <li><CheckCircle2 size={18} /> Residential, commercial &amp; industrial projects</li>
              <li><CheckCircle2 size={18} /> Quality standards and precision in every unit</li>
              <li><CheckCircle2 size={18} /> Professional, customer-focused service</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section about-mv" ref={missionReveal.ref}>
        <div className="container about-mv-grid">
          <div className={`about-mv-card mission ${missionReveal.shown ? 'in' : ''}`}>
            <span className="about-mv-icon"><Target size={28} /></span>
            <h3 className="about-mv-title">Our Mission</h3>
            <p className="about-mv-text">{company.mission}</p>
          </div>
          <div className={`about-mv-card vision ${missionReveal.shown ? 'in' : ''}`}>
            <span className="about-mv-icon"><Eye size={28} /></span>
            <h3 className="about-mv-title">Our Vision</h3>
            <p className="about-mv-text">{company.vision}</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-sm about-stats-section">
        <div className="container">
          <div className="about-stats-row">
            {company.stats.map((s) => <AboutStat key={s.label} stat={s} />)}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section about-why" ref={whyReveal.ref}>
        <div className="container">
          <SectionTitle
            eyebrow="Why Choose Us"
            title="Why Choose Shaswat Glass Solution?"
            center
          />
          <div className={`about-why-grid ${whyReveal.shown ? 'in' : ''}`}>
            {whyChooseUs.map((item) => {
              const Icon = iconMap[item.icon] || ShieldCheck;
              return (
                <div className="about-why-card" key={item.number}>
                  <span className="about-why-number">{item.number}</span>
                  <span className="about-why-icon"><Icon size={24} /></span>
                  <h3 className="about-why-title">{item.title}</h3>
                  <p className="about-why-desc">{item.description}</p>
                </div>
              );
            })}
          </div>
          <div className="about-why-cta">
            <Link to="/products" className="btn btn-primary">
              Explore Our Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
