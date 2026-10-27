import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import MisMascotas from './MisMascotas';
import Citas from './Citas';

export default function MiPerfil() {
  const { user, darkMode } = useAuth();
  const [activeTab, setActiveTab] = useState('mascotas');
  const nombre = user?.nombre || user?.name || user?.usuario || '';
  const email = user?.email || user?.correo || '';
  const cardClass = darkMode ? 'bg-dark text-white border-secondary' : 'bg-white text-dark border-light-subtle';

  return (
    <div className="container py-4">
      <div className={`card shadow-sm mb-4 p-4 ${cardClass}`}>
        <div className="d-flex align-items-center gap-3">
          <div
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold fs-3 shadow-sm"
            style={{ width: '60px', height: '60px', minWidth: '60px' }}
          >
            {nombre.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="h4 fw-bold m-0">{nombre || 'Mi Perfil'}</h1>
            <p className="m-0 fs-6 text-secondary">{email}</p>
            {user?.rut && <p className="m-0 small text-secondary">RUT: {user.rut}</p>}
            {(user?.telefono || user?.phone) && (
              <p className="m-0 small text-secondary">Teléfono: {user.telefono || user.phone}</p>
            )}
          </div>
        </div>
      </div>

      <ul className="nav nav-tabs mb-4 border-bottom border-secondary-subtle">
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link fw-semibold ${activeTab === 'mascotas' ? 'active text-primary fw-bold' : darkMode ? 'text-light' : 'text-secondary'}`}
            onClick={() => setActiveTab('mascotas')}
          >
            🐾 Mis Mascotas
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link fw-semibold ${activeTab === 'citas' ? 'active text-primary fw-bold' : darkMode ? 'text-light' : 'text-secondary'}`}
            onClick={() => setActiveTab('citas')}
          >
            📅 Mis Citas
          </button>
        </li>
        <li className="nav-item ms-auto align-self-center">
          <Link to="/mascotas/nueva" className="btn btn-primary btn-sm">Registrar mascota</Link>
        </li>
      </ul>

      {activeTab === 'mascotas' && <MisMascotas darkMode={darkMode} />}
      {activeTab === 'citas' && <Citas darkMode={darkMode} />}
    </div>
  );
}
