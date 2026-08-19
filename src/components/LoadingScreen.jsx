import { useEffect, useState } from 'react';
import Logo from './Logo.jsx';
import { company } from '../data/company.js';
import './LoadingScreen.css';

export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHidden(true), 1400);
    const t2 = setTimeout(() => setRemoved(true), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (removed) return null;

  return (
    <div className={`loading-screen ${hidden ? 'hidden' : ''}`}>
      <div className="loading-content">
        <div className="loading-logo">
          <Logo variant="light" showText={false} />
        </div>
        <h1 className="loading-name">SHASWAT</h1>
        <p className="loading-sub">GLASS SOLUTION</p>
        <p className="loading-tagline">{company.tagline}</p>
        <div className="loading-bar"><span /></div>
      </div>
    </div>
  );
}
