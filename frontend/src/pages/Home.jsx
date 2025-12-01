import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        fetch(`${apiUrl}/api/products`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="home-container">
            {/* Fixed Background Layers */}
            <div className="home-background"></div>
            <div className="home-overlay"></div>

            {/* Scrollable Content */}
            <div className="home-content">
                <header className="home-header">
                    <h1 className="home-title">Testarudas</h1>
                    <p className="home-tagline">
                        Somos Testarudas, creamos accesorios con actitud, color y brillo para mujeres que se animan a resaltar.
                    </p>
                </header>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>Cargando colección...</div>
                ) : products.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>No hay productos. ¡Volvé pronto!</div>
                ) : (
                    <div className="grid grid-cols-3">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
