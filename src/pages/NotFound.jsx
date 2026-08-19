import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo.jsx';

export default function NotFound() {
  return (
    <div className="notfound">
      <div className="notfound-bg" aria-hidden="true" />
      <div className="notfound-content">
        <Logo variant="light" />
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">Page Not Found</h2>
        <p className="notfound-text">The page you're looking for doesn't exist or has been moved.</p>
        <div className="notfound-actions">
          <Link to="/" className="btn btn-accent">
            <Home size={16} /> Back to Home
          </Link>
          <Link to="/products" className="btn btn-outline">
            <ArrowLeft size={16} /> View Products
          </Link>
        </div>
      </div>
    </div>
  );
}
