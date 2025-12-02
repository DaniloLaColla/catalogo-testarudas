import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    // Use a placeholder if no image is provided, or ensure the path is correct
    // Assuming backend serves images at /uploads/...
    const imageUrl = product.image
        ? (product.image.startsWith('http') ? product.image : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${product.image}`)
        : 'https://via.placeholder.com/300x300?text=No+Image';

    return (
        <Link to={`/product/${product.numericId || product.id}`} className="product-card" style={{ textDecoration: 'none' }}>
            <div className="product-image-container">
                <img src={imageUrl} alt={product.type || product.name} className="product-image" />
            </div>
            <div className="product-info">
                <h3 className="product-name">{product.type || product.name}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>

            </div>
        </Link>
    );
};

export default ProductCard;
