import { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, Loader2, MessageCircle } from 'lucide-react';
import PageBanner from '../components/PageBanner.jsx';
import { company } from '../data/company.js';
import { products } from '../data/products.js';
import { useReveal } from '../hooks/useReveal.js';
import './Quote.css';

const projectTypes = ['Residential', 'Commercial', 'Industrial', 'Architectural', 'Other'];

const INITIAL = {
  fullName: '',
  company: '',
  phone: '',
  email: '',
  product: '',
  projectType: '',
  quantity: '',
  message: '',
};

function validate(values) {
  const errors = {};
  if (!values.fullName.trim()) errors.fullName = 'Full name is required';
  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^[6-9]\d{9}$/.test(values.phone.replace(/[\s-]/g, ''))) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number';
  }
  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address';
  }
  if (!values.product) errors.product = 'Please select a product';
  if (!values.projectType) errors.projectType = 'Please select a project type';
  if (!values.message.trim()) errors.message = 'Please tell us about your requirement';
  return errors;
}

// Service placeholder — wire to backend/API later
async function submitEnquiry(data) {
  await new Promise((r) => setTimeout(r, 1200));
  // eslint-disable-next-line no-console
  console.log('Enquiry submitted:', data);
  return { ok: true };
}

export default function Quote() {
  const reveal = useReveal();
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (touched[name]) {
      setErrors(validate({ ...values, [name]: value }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate(values);
    setErrors(v);
    setTouched(Object.keys(INITIAL).reduce((a, k) => ({ ...a, [k]: true }), {}));
    if (Object.keys(v).length > 0) return;

    setStatus('loading');
    try {
      const res = await submitEnquiry(values);
      if (res.ok) {
        setStatus('success');
        setValues(INITIAL);
        setTouched({});
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const waLink = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(company.whatsappMessage)}`;

  return (
    <>
      <PageBanner
        title="Request a Quote"
        subtitle="Tell us about your project and glass requirements. Our team will get back to you with a tailored quote."
        image="https://images.pexels.com/photos/26241922/pexels-photo-26241922.jpeg?auto=compress&cs=tinysrgb&h=800&w=1600"
        crumbs={[{ label: 'Quote', to: '/quote' }]}
      />

      <section className="section quote-section">
        <div className="container">
          <div className="quote-grid">
            {/* Form */}
            <div className={`quote-form-wrap ${reveal.shown ? 'in' : ''}`} ref={reveal.ref}>
              {status === 'success' ? (
                <div className="quote-success">
                  <span className="quote-success-icon"><CheckCircle2 size={48} /></span>
                  <h2>Thank You!</h2>
                  <p>Your enquiry has been received. Our team will contact you shortly.</p>
                  <button className="btn btn-ghost" onClick={() => setStatus('idle')}>
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form className="quote-form" onSubmit={handleSubmit} noValidate>
                  <h2 className="quote-form-title">Enquiry Details</h2>
                  <p className="quote-form-sub">Fields marked with * are required.</p>

                  {status === 'error' && (
                    <div className="quote-alert error">
                      <AlertCircle size={18} />
                      Something went wrong. Please try again or call us directly.
                    </div>
                  )}

                  <div className="quote-row">
                    <div className="quote-field">
                      <label htmlFor="fullName">Full Name *</label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={values.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.fullName && touched.fullName ? 'invalid' : ''}
                        placeholder="Your full name"
                      />
                      {errors.fullName && touched.fullName && <span className="field-error">{errors.fullName}</span>}
                    </div>

                    <div className="quote-field">
                      <label htmlFor="company">Company Name</label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={values.company}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Company (optional)"
                      />
                    </div>
                  </div>

                  <div className="quote-row">
                    <div className="quote-field">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.phone && touched.phone ? 'invalid' : ''}
                        placeholder="10-digit mobile number"
                      />
                      {errors.phone && touched.phone && <span className="field-error">{errors.phone}</span>}
                    </div>

                    <div className="quote-field">
                      <label htmlFor="email">Email *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.email && touched.email ? 'invalid' : ''}
                        placeholder="you@example.com"
                      />
                      {errors.email && touched.email && <span className="field-error">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="quote-row">
                    <div className="quote-field">
                      <label htmlFor="product">Product *</label>
                      <select
                        id="product"
                        name="product"
                        value={values.product}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.product && touched.product ? 'invalid' : ''}
                      >
                        <option value="">Select a product</option>
                        {products.map((p) => <option key={p.slug} value={p.name}>{p.name}</option>)}
                        <option value="Other">Other</option>
                      </select>
                      {errors.product && touched.product && <span className="field-error">{errors.product}</span>}
                    </div>

                    <div className="quote-field">
                      <label htmlFor="projectType">Project Type *</label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={values.projectType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.projectType && touched.projectType ? 'invalid' : ''}
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {errors.projectType && touched.projectType && <span className="field-error">{errors.projectType}</span>}
                    </div>
                  </div>

                  <div className="quote-field">
                    <label htmlFor="quantity">Quantity / Requirement</label>
                    <input
                      id="quantity"
                      name="quantity"
                      type="text"
                      value={values.quantity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. 200 sq ft, 10 doors, etc."
                    />
                  </div>

                  <div className="quote-field">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.message && touched.message ? 'invalid' : ''}
                      placeholder="Describe your project and glass requirements..."
                    />
                    {errors.message && touched.message && <span className="field-error">{errors.message}</span>}
                  </div>

                  <button type="submit" className="btn btn-primary quote-submit" disabled={status === 'loading'}>
                    {status === 'loading' ? (
                      <><Loader2 size={18} className="spin" /> Submitting...</>
                    ) : (
                      <>Submit Enquiry <ArrowRight size={16} /></>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <aside className="quote-sidebar">
              <div className="quote-side-card">
                <h3>Prefer to Talk?</h3>
                <p className="quote-side-text">Contact us directly and our team will assist you immediately.</p>
                <div className="quote-side-phones">
                  {company.phones.map((p) => (
                    <a key={p} href={`tel:+91${p.replace(/^0/, '')}`} className="quote-side-phone">
                      <span className="phone-icon"><MessageCircle size={16} /></span>
                      {p}
                    </a>
                  ))}
                </div>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp quote-wa">
                  <MessageCircle size={16} /> Chat on WhatsApp
                </a>
              </div>

              <div className="quote-side-card quote-side-hours">
                <h3>Business Hours</h3>
                <ul className="quote-hours">
                  {company.hours.map((h) => (
                    <li key={h.day}>
                      <span>{h.day}</span>
                      <span>{h.closed ? 'Closed' : `${h.open} – ${h.close}`}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
