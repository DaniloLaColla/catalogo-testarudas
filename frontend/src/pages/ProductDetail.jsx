import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        fetch(`${apiUrl}/api/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching product:', err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Cargando...</div>;
    if (!product) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Producto no encontrado</div>;

    return (
        <div className="product-detail-container">
            <Link to="/" className="btn btn-outline" style={{ marginBottom: '2rem', display: 'inline-block' }}>&larr; Volver al Catálogo</Link>

            <div className="product-detail-content">
                <div className="product-detail-image-wrapper">
                    <img
                        src={product.image ? (product.image.startsWith('http') ? product.image : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${product.image}`) : 'https://via.placeholder.com/500'}
                        alt={product.name}
                        className="product-detail-image"
                    />
                </div>

                <div className="product-detail-info">
                    <h1 className="product-detail-title">{product.name}</h1>
                    <p className="product-detail-price">
                        ${product.price.toFixed(2)}
                    </p>
                    <div className="product-detail-description-card">
                        <h3 className="product-detail-description-title">Descripción</h3>
                        <p className="product-detail-description-text">
                            {product.description}
                        </p>
                    </div>
                    <button className="btn btn-primary btn-whatsapp">
                        Consultar por WhatsApp
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
