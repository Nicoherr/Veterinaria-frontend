import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../hooks/useAuth.jsx';
import NuevaMascota from './NuevaMascota.jsx';

describe('NuevaMascota', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('envía la edad como número compatible con el backend', async () => {
    const fetchSpy = spyOn(window, 'fetch').and.returnValue(Promise.resolve({
      ok: true,
      status: 201,
      text: () => Promise.resolve(''),
    }));

    render(
      <MemoryRouter>
        <AuthProvider>
          <NuevaMascota />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Nombre de la Mascota *'), {
      target: { value: 'Luna' },
    });
    fireEvent.change(screen.getByLabelText('Raza *'), {
      target: { value: 'Siamés' },
    });
    fireEvent.change(screen.getByLabelText('Edad *'), {
      target: { value: '3' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Guardar y Registrar' }));

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalled();
      const [, options] = fetchSpy.calls.mostRecent().args;
      expect(JSON.parse(options.body)).toEqual({
        nombre: 'Luna',
        tipo: 'Perro',
        raza: 'Siamés',
        edad: 3,
        microchip: '',
      });
    });
  });
});
