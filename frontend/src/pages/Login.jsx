import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple hardcoded password for MVP
        if (password === 'Imparables22') {
            localStorage.setItem('isAdmin', 'true');
            navigate('/admin');
        } else {
            setError('Contraseña incorrecta');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '400px', marginTop: '4rem' }}>
            <h2 style={{ textAlign: 'center' }}>Acceso Admin</h2>
            <form onSubmit={handleLogin} style={{ marginTop: '2rem' }}>
                <div className="form-group">
                    <label className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingresá la contraseña"
                    />
                </div>
                {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Ingresar
                </button>
            </form>
        </div>
    );
};

export default Login;
