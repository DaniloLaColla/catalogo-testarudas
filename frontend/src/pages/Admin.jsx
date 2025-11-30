import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        type: '',
        description: '',
        price: '',
        uploadedBy: '',
        image: null
    });
    const navigate = useNavigate();

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (!isAdmin) {
            navigate('/login');
            return;
        }
        fetchProducts();
    }, [navigate]);

    const fetchProducts = () => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        fetch(`${apiUrl}/api/products`)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error(err));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setFormData(prev => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('type', formData.type);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('uploadedBy', formData.uploadedBy);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const res = await fetch(`${apiUrl}/api/products`, {
                method: 'POST',
                body: data
            });
            if (res.ok) {
                fetchProducts();
                setFormData({ type: '', description: '', price: '', uploadedBy: '', image: null });
                document.getElementById('imageInput').value = '';
            } else {
                alert('Error al agregar producto');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de que querés eliminar este producto?')) return;
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const res = await fetch(`${apiUrl}/api/products/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                fetchProducts();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/login');
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1 className="admin-title">Panel de Administración</h1>
            </div>

            {/* Add Product Form Section */}
            <div className="admin-form-card">
                <h3 className="admin-form-title">Agregar Nuevo Producto</h3>
                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="form-group">
                        <label className="form-label">Tipo de Producto</label>
                        <input
                            type="text"
                            name="type"
                            className="form-input"
                            value={formData.type}
                            onChange={handleInputChange}
                            required
                            placeholder="Ej: Collar, Anillo, Pulsera"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Precio</label>
                        <input
                            type="number"
                            name="price"
                            className="form-input"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                            step="0.01"
                            placeholder="0.00"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Cargado Por</label>
                        <input
                            type="text"
                            name="uploadedBy"
                            className="form-input"
                            value={formData.uploadedBy}
                            onChange={handleInputChange}
                            required
                            placeholder="Nombre del responsable"
                        />
                    </div>

                    <div className="form-group form-full-width">
                        <label className="form-label">Descripción (Opcional)</label>
                        <textarea
                            name="description"
                            className="form-textarea"
                            rows="3"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Detalles del producto..."
                        ></textarea>
                    </div>

                    <div className="form-group form-full-width">
                        <label className="form-label">Imagen del Producto</label>
                        <input
                            type="file"
                            id="imageInput"
                            className="form-input"
                            onChange={handleImageChange}
                            accept="image/*"
                            required
                        />
                    </div>

                    <div className="form-full-width">
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                            Agregar Producto
                        </button>
                    </div>
                </form>
            </div>

            {/* Product List Section */}
            <div>
                <h3 className="admin-list-title">Inventario ({products.length})</h3>
                {products.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>No hay productos cargados todavía.</p>
                ) : (
                    <div className="admin-products-grid">
                        {products.map(product => (
                            <div key={product.id} className="admin-product-card">
                                <img
                                    src={product.image ? (product.image.startsWith('http') ? product.image : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${product.image}`) : 'https://via.placeholder.com/300'}
                                    alt={product.type || product.name}
                                    className="admin-product-image"
                                />
                                <div className="admin-product-info">
                                    <h4 className="admin-product-name">{product.type || product.name} #{product.id}</h4>
                                    <p className="admin-product-price">${product.price.toFixed(2)}</p>
                                    {product.uploadedBy && (
                                        <p style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.5rem' }}>
                                            Por: {product.uploadedBy}
                                        </p>
                                    )}
                                </div>
                                <div className="admin-product-actions">
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="btn-delete"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
