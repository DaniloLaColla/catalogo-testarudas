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
            .then(res => {
                if (!res.ok) {
                    throw new Error('Product not found');
                }
                return res.json();
            })
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching product:', err);
                setProduct(null);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Cargando...</div>;
    if (!product) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Producto no encontrado</div>;

    return (
        <div className="product-detail-container">
            <Link to="/" className="btn btn-outline btn-back">&larr; Catálogo</Link>

            <div className="product-detail-content">
                <div className="product-detail-image-wrapper">
                    <img
                        src={product.image ? (product.image.startsWith('http') ? product.image : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${product.image}`) : 'https://via.placeholder.com/500'}
                        alt={product.name}
                        className="product-detail-image"
                    />
                </div>

                <div className="product-detail-info">
                    <h1 className="product-detail-title">{product.type || product.name}</h1>
                    <p className="product-detail-price">
                        $ {product.price.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </p>
                    <div className="product-detail-description-card">
                        <h3 className="product-detail-description-title">Descripción</h3>
                        <p className="product-detail-description-text">
                            {product.description}
                        </p>
                        <p className="product-detail-id" style={{ color: '#666', fontSize: '0.9rem', marginTop: '1rem' }}>
                            id = {product.numericId || product.id}
                        </p>
                    </div>
                    <a
                        href={`https://wa.me/5492984654991?text=Hola! Me interesa el producto "${product.type || product.name}" (ID: ${product.numericId || product.id}) que vi en el catálogo: ${window.location.href}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-whatsapp"
                        style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
                    >
                        Consultar por WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
