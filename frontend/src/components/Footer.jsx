import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <p>&copy; {new Date().getFullYear()} Testarudas Accesorios. Todos los derechos reservados.</p>
                <Link to="/login" className="footer-admin-link" title="Admin Access">
                    Administrar
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
