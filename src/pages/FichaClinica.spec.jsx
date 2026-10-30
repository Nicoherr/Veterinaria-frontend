import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import FichaClinica from './FichaClinica.jsx';

describe('FichaClinica', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('carga y muestra los datos de la mascota indicada en la ruta', async () => {
    const fetchSpy = spyOn(window, 'fetch').and.returnValue(Promise.resolve({
      ok: true,
      status: 200,
      text: () => Promise.resolve(JSON.stringify({
        id: 7,
        nombre: 'Luna',
        tipo: 'Gato',
        raza: 'Siamés',
        edad: 3,
        microchip: 'ABC123',
        usuario: { nombre: 'Tutor' },
      })),
    }));

    render(
      <MemoryRouter initialEntries={['/mascotas/7/ficha']}>
        <Routes>
          <Route path="/mascotas/:id/ficha" element={<FichaClinica />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText('🐾 Paciente: Luna')).toBeTruthy();
    expect(screen.getByText('Gato', { exact: false })).toBeTruthy();
    expect(screen.getByText('Siamés', { exact: false })).toBeTruthy();
    expect(screen.getByText('ABC123', { exact: false })).toBeTruthy();
    expect(screen.getByText('Tutor', { exact: true })).toBeTruthy();
    expect(fetchSpy.calls.mostRecent().args[0]).toMatch(/\/mascotas\/7$/);
    expect(screen.getByText(/todavía no dispone de registros/)).toBeTruthy();
  });
});
