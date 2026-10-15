import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import NuevaMascota from './NuevaMascota';
import MisCitas from './MisCitas';

export default function MiPerfil() {
  const { user, darkMode } = useAuth();
  const [activeTab, setActiveTab] = useState('mascotas');

  const nombreUsuario = user?.nombre || user?.name || user?.usuario || 'nico';
  const emailUsuario = user?.email || user?.correo || 'nico@duocuc.cl';

  return (
    <div className="container py-4">
      {/* 🛠️ TARJETA DE USUARIO CON SOBREESCRITURA TOTAL DE COLOR DE TEXTO */}
      <div 
        className={`card shadow-sm mb-4 p-4 ${
          darkMode ? 'bg-dark border-secondary' : 'bg-white border-light-subtle'
        }`}
        style={{
          backgroundColor: darkMode ? '#212529' : '#ffffff',
          color: darkMode ? '#ffffff' : '#212529'
        }}
      >
        <div className="d-flex align-items-center gap-3">
          <div
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold fs-3 shadow-sm"
            style={{ width: '60px', height: '60px', minWidth: '60px' }}
          >
            {nombreUsuario.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 
              className="h4 fw-bold m-0" 
              style={{ color: darkMode ? '#ffffff !important' : '#212529 !important' }}
            >
              {nombreUsuario}
            </h2>
            <p 
              className="m-0 fs-6 fw-semibold" 
              style={{ color: darkMode ? '#e0e0e0 !important' : '#6c757d !important' }}
            >
              {emailUsuario}
            </p>
          </div>
        </div>
      </div>

      {/* Pestañas de Navegación */}
      <ul className="nav nav-tabs mb-4 border-bottom border-secondary-subtle">
        <li className="nav-item">
          <button
            className={`nav-link fw-semibold ${
              activeTab === 'mascotas'
                ? 'active text-primary fw-bold'
                : darkMode
                ? 'text-light'
                : 'text-secondary'
            }`}
            onClick={() => setActiveTab('mascotas')}
          >
            🐾 Mis Mascotas
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link fw-semibold ${
              activeTab === 'citas'
                ? 'active text-primary fw-bold'
                : darkMode
                ? 'text-light'
                : 'text-secondary'
            }`}
            onClick={() => setActiveTab('citas')}
          >
            📅 Mis Citas
          </button>
        </li>
      </ul>

      {/* Contenido Dinámico */}
      <div>
        {activeTab === 'mascotas' && <NuevaMascota />}
        {activeTab === 'citas' && <MisCitas />}
      </div>
    </div>
  );
}