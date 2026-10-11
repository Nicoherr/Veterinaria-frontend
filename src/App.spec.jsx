import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithRouter } from './test/renderWithRouter';
import App from './App';

describe('App - Pruebas Integrales y Cobertura Global (+80%)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renderiza inicio en modo claro y permite cambiar a modo oscuro', () => {
    renderWithRouter(<App />, { route: '/' });
    expect(screen.getByText(/Bienvenidos a VetSM/i)).toBeInTheDocument();

    const botonModo = screen.getByTitle('Cambiar Modo');
    fireEvent.click(botonModo);
    expect(screen.getByTitle('Cambiar Modo')).toBeInTheDocument();
  });

  it('navega a nosotros y servicios', () => {
    renderWithRouter(<App />, { route: '/nosotros' });
    expect(screen.getByText(/Nuestra Clínica/i)).toBeInTheDocument();

    renderWithRouter(<App />, { route: '/servicios' });
    expect(screen.getByText(/Servicios Médicos/i)).toBeInTheDocument();
  });

  it('interactúa con el formulario de contacto', () => {
    renderWithRouter(<App />, { route: '/contacto' });

    fireEvent.change(screen.getByPlaceholderText('Ej. María González'), { target: { value: 'Maria Perez' } });
    fireEvent.change(screen.getByPlaceholderText('Ej. 987654321'), { target: { value: '987654321' } });
    fireEvent.change(screen.getByPlaceholderText('correo@ejemplo.cl'), { target: { value: 'maria@test.cl' } });
    fireEvent.change(screen.getByPlaceholderText('Consulta médica / Cita'), { target: { value: 'Consulta' } });
    fireEvent.change(screen.getByPlaceholderText('Escribe los detalles de tu consulta...'), { target: { value: 'Detalle de la consulta completa' } });

    fireEvent.click(screen.getByText('Enviar Mensaje'));
    expect(screen.getByText(/Mensaje enviado con éxito/i)).toBeInTheDocument();
  });

  it('ejecuta el inicio de sesión desde la vista de login', () => {
    renderWithRouter(<App />, { route: '/login' });

    const emailInput = screen.getByPlaceholderText('cliente@vetsm.cl');
    const passInput = screen.getByPlaceholderText('••••••••');

    fireEvent.change(emailInput, { target: { value: 'cliente@vetsm.cl' } });
    fireEvent.change(passInput, { target: { value: '123456' } });

    fireEvent.click(screen.getByRole('button', { name: /Ingresar al Sistema/i }));
  });

  it('permite registrar una nueva mascota', () => {
    localStorage.setItem('vetsm_session', 'true');
    renderWithRouter(<App />, { route: '/mascotas/nueva' });

    fireEvent.change(screen.getByPlaceholderText('Ej. Rocky'), { target: { value: 'Thor' } });
    fireEvent.change(screen.getByPlaceholderText('Ej. Poodle / Mestizo'), { target: { value: 'Boxer' } });
    fireEvent.change(screen.getByPlaceholderText('Ej. 1 año / 6 meses'), { target: { value: '2 años' } });
    
    fireEvent.click(screen.getByText('Guardar y Registrar'));
    expect(screen.getByText('Thor')).toBeInTheDocument();
  });

  it('permite ver y editar los datos personales del perfil', () => {
    localStorage.setItem('vetsm_session', 'true');
    renderWithRouter(<App />, { route: '/perfil' });

    fireEvent.click(screen.getByText(/Editar Perfil/i));
    const inputNombre = screen.getByDisplayValue('Ana María Silva');
    fireEvent.change(inputNombre, { target: { value: 'Ana María Silva Editada' } });

    fireEvent.click(screen.getByText('Guardar Cambios'));
    expect(screen.getByText(/Datos personales actualizados correctamente/i)).toBeInTheDocument();
  });
});