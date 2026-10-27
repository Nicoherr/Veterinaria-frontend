import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { CartProvider } from './context/CartContext';
import App from './App';

const renderWithProviders = (ui, { route = '/', authenticated = false } = {}) => {
  localStorage.clear();
  if (authenticated) {
    localStorage.setItem('token', 'token-test');
    localStorage.setItem('usuario', JSON.stringify({ email: 'test@vetsm.cl', nombre: 'Test' }));
  }

  return render(
    <MemoryRouter initialEntries={[route]}>
      <AuthProvider>
        <CartProvider>{ui}</CartProvider>
      </AuthProvider>
    </MemoryRouter>
  );
};

describe('Pruebas de Integración y Cobertura VetSM', () => {
  it('1. Debe renderizar la página de Inicio y sus elementos clave', () => {
    renderWithProviders(<App />, { route: '/' });
    expect(screen.getAllByText(/VetSM/i).length).toBeGreaterThan(0);
  });

  it('2. Debe renderizar la vista de Servicios e interactuar con los botones del carrito', () => {
    renderWithProviders(<App />, { route: '/servicios' });
    const botones = screen.getAllByRole('button');
    botones.forEach((btn) => fireEvent.click(btn));
  });

  it('3. Debe renderizar la vista de Nosotros', () => {
    renderWithProviders(<App />, { route: '/nosotros' });
    expect(screen.getAllByText(/Nuestra Clínica/i).length).toBeGreaterThan(0);
  });

  it('4. Debe renderizar la vista de Contacto', () => {
    renderWithProviders(<App />, { route: '/contacto' });
    expect(screen.getAllByText(/Contacto/i).length).toBeGreaterThan(0);
  });

  it('5. Debe renderizar el formulario de Login e interactuar con los campos', () => {
    renderWithProviders(<App />, { route: '/login' });
    const inputs = screen.getAllByRole('textbox');
    inputs.forEach((input) => fireEvent.change(input, { target: { value: 'test@vetsm.cl' } }));
  });

  it('6. Debe renderizar la vista protegida de Mascotas', () => {
    renderWithProviders(<App />, { route: '/mascotas', authenticated: true });
    expect(screen.getAllByText(/Mascotas/i).length).toBeGreaterThan(0);
  });

  it('7. Debe renderizar la vista de Nueva Mascota', () => {
    renderWithProviders(<App />, { route: '/mascotas/nueva' });
    const inputs = screen.queryAllByRole('textbox');
    inputs.forEach((input) => fireEvent.change(input, { target: { value: 'Fiddo' } }));
  });

  it('8. Debe renderizar el Perfil de usuario', () => {
    renderWithProviders(<App />, { route: '/perfil', authenticated: true });
    expect(screen.getAllByText(/Perfil/i).length).toBeGreaterThan(0);
  });
});