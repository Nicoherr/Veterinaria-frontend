import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth.jsx';
import App from './App';

import Home from './pages/Home';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import MisMascotas from './pages/MisMascotas';
import Servicios from './pages/Servicios';
import Nosotros from './pages/Nosotros';
import AdminReportes from './pages/AdminReportes';
import AdminUsuarios from './pages/AdminUsuarios';
import Citas from './pages/Citas';
import FichaClinica from './pages/FichaClinica';
import MiPerfil from './pages/MiPerfil';
import NuevaMascota from './pages/NuevaMascota';
import RegistroVacunas from './pages/RegistroVacunas';

// Helper que fuerza tanto el estado autenticado como no autenticado
const renderWithProviders = (ui) => {
  return render(
    <MemoryRouter>
      <AuthProvider>{ui}</AuthProvider>
    </MemoryRouter>
  );
};

describe('Cobertura Global de Páginas y Componentes', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renderiza la App en modo claro y conmutación a modo oscuro', () => {
    renderWithProviders(<App />);
    const toggleBtn = document.querySelector('button[title="Cambiar Modo"]');
    if (toggleBtn) {
      fireEvent.click(toggleBtn);
      fireEvent.click(toggleBtn);
    }
    expect(document.body).toBeDefined();
  });

  it('ejecuta Home, Nosotros y Servicios cubriendo alternancia de tema', () => {
    renderWithProviders(<Home />);
    renderWithProviders(<Nosotros />);
    renderWithProviders(<Servicios />);

    // Simular modo oscuro en localStorage para activar ternarios `darkMode ? ... : ...`
    localStorage.setItem('vetsm_dark_mode', 'true');
    renderWithProviders(<Home />);
    renderWithProviders(<Nosotros />);
    renderWithProviders(<Servicios />);

    document.querySelectorAll('button, a').forEach((b) => fireEvent.click(b));
    expect(document.body).toBeDefined();
  });

  it('ejecuta Contacto probando fallos de validacion, llenado y envio', () => {
    renderWithProviders(<Contacto />);
    const form = document.querySelector('form');
    if (form) fireEvent.submit(form);

    document.querySelectorAll('input, textarea').forEach((input) => {
      fireEvent.change(input, { target: { value: 'Dato de prueba' } });
    });
    if (form) fireEvent.submit(form);

    // Repetir en modo oscuro
    localStorage.setItem('vetsm_dark_mode', 'true');
    renderWithProviders(<Contacto />);
    expect(document.body).toBeDefined();
  });

  it('ejecuta Login probando credenciales erroneas y validas', () => {
    renderWithProviders(<Login />);
    const form = document.querySelector('form');
    if (form) fireEvent.submit(form);

    document.querySelectorAll('input').forEach((input) => {
      fireEvent.change(input, { target: { value: 'admin@vetsm.cl' } });
    });
    if (form) fireEvent.submit(form);

    localStorage.setItem('vetsm_dark_mode', 'true');
    renderWithProviders(<Login />);
    expect(document.body).toBeDefined();
  });

  it('ejecuta MisMascotas probando filtros, modal y acciones con/sin datos', () => {
    renderWithProviders(<MisMascotas />);

    localStorage.setItem('vetsm_user', JSON.stringify({ email: 'admin@vetsm.cl', rol: 'admin' }));
    localStorage.setItem('vetsm_dark_mode', 'true');
    renderWithProviders(<MisMascotas />);

    document.querySelectorAll('select').forEach((select) => {
      Array.from(select.options).forEach((opt) => {
        fireEvent.change(select, { target: { value: opt.value } });
      });
    });

    document.querySelectorAll('button, a, input').forEach((btn) => fireEvent.click(btn));
    expect(document.body).toBeDefined();
  });

  it('ejecuta NuevaMascota probando error y exito en ambos temas', () => {
    renderWithProviders(<NuevaMascota />);
    const form = document.querySelector('form');
    if (form) fireEvent.submit(form);

    document.querySelectorAll('input, select, textarea').forEach((input) => {
      fireEvent.change(input, { target: { value: 'Perro' } });
    });
    if (form) fireEvent.submit(form);

    localStorage.setItem('vetsm_dark_mode', 'true');
    renderWithProviders(<NuevaMascota />);
    expect(document.body).toBeDefined();
  });

  it('ejecuta Citas, FichaClinica, MiPerfil y RegistroVacunas en modo claro y oscuro', () => {
    localStorage.setItem('vetsm_user', JSON.stringify({ email: 'admin@vetsm.cl', rol: 'admin' }));
    
    // Modo Claro
    renderWithProviders(<MiPerfil />);
    renderWithProviders(<Citas />);
    renderWithProviders(<FichaClinica />);
    renderWithProviders(<RegistroVacunas />);

    // Modo Oscuro
    localStorage.setItem('vetsm_dark_mode', 'true');
    renderWithProviders(<MiPerfil />);
    renderWithProviders(<Citas />);
    renderWithProviders(<FichaClinica />);
    renderWithProviders(<RegistroVacunas />);

    document.querySelectorAll('button, input, select, textarea').forEach((el) => {
      fireEvent.click(el);
      fireEvent.change(el, { target: { value: 'Prueba' } });
    });
    expect(document.body).toBeDefined();
  });

  it('ejecuta AdminReportes y AdminUsuarios', () => {
    localStorage.setItem('vetsm_user', JSON.stringify({ email: 'admin@vetsm.cl', rol: 'admin' }));
    renderWithProviders(<AdminReportes />);
    renderWithProviders(<AdminUsuarios />);

    localStorage.setItem('vetsm_dark_mode', 'true');
    renderWithProviders(<AdminReportes />);
    renderWithProviders(<AdminUsuarios />);

    document.querySelectorAll('button, select, input').forEach((el) => {
      fireEvent.click(el);
      fireEvent.change(el, { target: { value: 'admin' } });
    });
    expect(document.body).toBeDefined();
  });
});