import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import Carrito from './Carrito.jsx';

describe('Carrito', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('muestra el estado vacío y permite volver a servicios', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <Carrito />
        </CartProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Tu carrito está vacío 🐾')).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Ver Servicios Disponible' }).getAttribute('href')).toBe('/servicios');
  });

  it('actualiza cantidades y confirma un pedido de demostración sin procesar pagos', async () => {
    localStorage.setItem('vetsm_cart', JSON.stringify([
      { id: 1, nombre: 'Consulta General', precio: 25000, cantidad: 2 },
    ]));

    render(
      <MemoryRouter>
        <CartProvider>
          <Carrito />
        </CartProvider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Agregar una unidad de Consulta General' }));
    expect(screen.getAllByText('$75.000').length).toBe(3);

    fireEvent.click(screen.getByRole('button', { name: 'Simular pedido' }));

    expect(screen.getByRole('heading', { name: 'Pedido de prueba confirmado' })).toBeTruthy();
    expect(screen.getByText('No se realizó ningún pago ni se creó una reserva real.')).toBeTruthy();
    expect(screen.getByText('Consulta General × 3')).toBeTruthy();
    expect(screen.getByText('$75.000 CLP')).toBeTruthy();
    expect(screen.getByText(/^DEMO-/)).toBeTruthy();
    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem('vetsm_cart'))).toEqual([]);
    });
  });
});
