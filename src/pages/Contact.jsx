import { Phone, Mail, MapPin, Instagram, MessageCircle, Clock, ArrowRight } from 'lucide-react';
import PageBanner from '../components/PageBanner.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import Logo from '../components/Logo.jsx';
import { company } from '../data/company.js';
import { useReveal } from '../hooks/useReveal.js';
import './Contact.css';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function Contact() {
  const reveal = useReveal();
  const today = DAYS[new Date().getDay()];
  const waLink = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(company.whatsappMessage)}`;

  return (
    <>
      <PageBanner
        // title="Let's Build Better with Glass"
        // subtitle="Get in touch with Shaswat Glass Solution for your glass processing requirements. We're here to help."
        image="https://images.pexels.com/photos/934350/pexels-photo-934350.jpeg?auto=compress&cs=tinysrgb&h=800&w=1600"
        crumbs={[{ label: 'Contact', to: '/contact' }]}
      />

      <section className="section contact-section">
        <div className="container">
          <div className="contact-grid" ref={reveal.ref}>
            {/* Info column */}
            <div className={`contact-info ${reveal.shown ? 'in' : ''}`}>
              <span className="eyebrow">Get In Touch</span>
              <h2 className="section-title">Contact Shaswat Glass Solution</h2>
              <p className="contact-lead">
                Reach out to our team for product enquiries, project consultations, or quote requests.
                We respond promptly during business hours.
              </p>

              <div className="contact-cards">
                <div className="contact-card">
                  <span className="contact-card-icon"><MapPin size={20} /></span>
                  <div>
                    <h4 className="contact-card-title">Address</h4>
                    <p>{company.address.full}</p>
                  </div>
                </div>

                <div className="contact-card">
                  <span className="contact-card-icon"><Phone size={20} /></span>
                  <div>
                    <h4 className="contact-card-title">Phone</h4>
                    {company.phones.map((p) => (
                      <a key={p} href={`tel:+91${p.replace(/^0/, '')}`} className="contact-phone-link">{p}</a>
                    ))}
                  </div>
                </div>

                <div className="contact-card">
                  <span className="contact-card-icon"><Mail size={20} /></span>
                  <div>
                    <h4 className="contact-card-title">Email</h4>
                    <a href={`mailto:${company.email}`} className="contact-email-link">{company.email}</a>
                  </div>
                </div>

                <div className="contact-card">
                  <span className="contact-card-icon"><Instagram size={20} /></span>
                  <div>
                    <h4 className="contact-card-title">Instagram</h4>
                    <a href={company.instagram} target="_blank" rel="noopener noreferrer" className="contact-email-link">{company.instagramHandle}</a>
                  </div>
                </div>
              </div>

              <div className="contact-quick-actions">
                <a href={`tel:+91${company.primaryPhone}`} className="btn btn-primary">
                  <Phone size={16} /> Call Now
                </a>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </div>
            </div>

            {/* Map + hours column */}
            <div className={`contact-side ${reveal.shown ? 'in' : ''}`}>
              <div className="contact-map">
                <iframe
                  title="Shaswat Glass Solution location — Palanpur, Gujarat"
                  src="https://www.google.com/maps?q=Palanpur,Gujarat,India&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="contact-hours">
                <div className="contact-hours-header">
                  <Clock size={20} />
                  <h3>Business Hours</h3>
                </div>
                <ul className="hours-list">
                  {company.hours.map((h) => (
                    <li
                      key={h.day}
                      className={`hours-item ${h.day === today ? 'today' : ''} ${h.closed ? 'closed' : ''}`}
                    >
                      <span className="hours-day">{h.day}</span>
                      <span className="hours-time">
                        {h.closed ? 'Closed' : `${h.open} – ${h.close}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand strip */}
      <section className="section-sm contact-brand">
        <div className="container contact-brand-inner">
          <Logo variant="dark" />
          <div className="contact-brand-text">
            <h3>SHASWAT GLASS SOLUTION</h3>
            <p>{company.tagline} — {company.brandStatement}</p>
          </div>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
            Enquire Now <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </>
  );
}
