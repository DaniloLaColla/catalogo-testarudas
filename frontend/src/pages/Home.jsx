import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        setLoading(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });

        fetch(`${apiUrl}/api/products?page=${page}&limit=9`)
            .then(res => res.json())
            .then(data => {
                if (data.products && Array.isArray(data.products)) {
                    setProducts(data.products);
                    setTotalPages(data.totalPages);
                } else if (Array.isArray(data)) {
                    // Fallback for backward compatibility if backend not updated
                    setProducts(data);
                } else {
                    console.error('API returned unexpected format:', data);
                    setProducts([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setLoading(false);
            });
    }, [page]);

    const handlePrevPage = () => {
        if (page > 1) setPage(prev => prev - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(prev => prev + 1);
    };

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
                    <>
                        <div className="grid grid-cols-3">
                            {products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem', paddingBottom: '2rem' }}>
                            <button
                                onClick={handlePrevPage}
                                disabled={page === 1}
                                className="btn btn-secondary"
                                style={{ opacity: page === 1 ? 0.5 : 1 }}
                            >
                                Anterior
                            </button>
                            <span style={{ alignSelf: 'center', fontWeight: 'bold' }}>
                                Página {page} de {totalPages}
                            </span>
                            <button
                                onClick={handleNextPage}
                                disabled={page === totalPages}
                                className="btn btn-secondary"
                                style={{ opacity: page === totalPages ? 0.5 : 1 }}
                            >
                                Siguiente
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
