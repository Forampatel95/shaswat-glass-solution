import { useEffect, useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';
import { company } from '../data/company.js';
import './FloatingContact.css';

export default function FloatingContact() {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const waLink = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(company.whatsappMessage)}`;

  return (
    <div className={`floating-contact ${visible ? 'visible' : ''}`}>
      {expanded && (
        <div className="floating-panel">
          <button
            className="floating-option"
            onClick={() => window.open(waLink, '_blank', 'noopener')
            }
          >
            <span className="floating-icon wa"><MessageCircle size={18} /></span>
            <span className="floating-label">WhatsApp</span>
          </button>
          <a className="floating-option" href={`tel:+91${company.primaryPhone}`}>
            <span className="floating-icon call"><Phone size={18} /></span>
            <span className="floating-label">Call Us</span>
          </a>
        </div>
      )}
      <button
        className="floating-toggle wa"
        onClick={() => setExpanded((v) => !v)}
        aria-label="Contact options"
        aria-expanded={expanded}
      >
        {expanded ? <X size={22} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
