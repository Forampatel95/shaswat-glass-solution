import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './ProductCard.css';

export default function ProductCard({ product, index = 0 }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="product-card"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="product-card-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="product-card-cat">{product.category}</span>
      </div>
      <div className="product-card-body">
        <h3 className="product-card-title">{product.name}</h3>
        <p className="product-card-desc">{product.short}</p>
        <span className="product-card-link">
          View Details <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}
