import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        if (window.confirm('¿Cerrar sesión?')) {
            localStorage.removeItem('isAdmin');
            navigate('/login');
            setIsOpen(false);
        }
    };

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link to="/" className="navbar-logo">
                    <img src="/logo.jpg" alt="Testarudas" style={{ height: '50px' }} />
                    <span>Testarudas</span>
                </Link>
                <div className="navbar-toggle" onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
                <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
                    <li><Link to="/" onClick={toggleMenu}>Catálogo</Link></li>
                    {location.pathname === '/admin' && (
                        <li><button onClick={handleLogout} className="btn-link" style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', color: 'var(--color-text)' }}>Cerrar Sesión</button></li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
