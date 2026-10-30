import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Citas from './Citas.jsx';

const jsonResponse = (status, data) => ({
  ok: status >= 200 && status < 300,
  status,
  text: () => Promise.resolve(data == null ? '' : JSON.stringify(data)),
});

describe('Citas', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('envía el id de una mascota propia con el formato esperado por la API', async () => {
    const fetchSpy = spyOn(window, 'fetch').and.callFake((url, options = {}) => {
      if (options.method === 'POST' && url.endsWith('/citas')) {
        return Promise.resolve(jsonResponse(201, { id: 12 }));
      }
      if (url.endsWith('/mascotas')) {
        return Promise.resolve(jsonResponse(200, [{ id: 7, nombre: 'Luna' }]));
      }
      return Promise.resolve(jsonResponse(200, []));
    });

    render(
      <MemoryRouter>
        <Citas />
      </MemoryRouter>
    );

    const mascotaSelect = await screen.findByLabelText('Mascota *');
    await screen.findByRole('option', { name: 'Luna' });
    await waitFor(() => expect(screen.getByRole('button', { name: 'Confirmar Reserva' }).disabled).toBe(false));
    fireEvent.change(mascotaSelect, {
      target: { value: '7' },
    });
    expect(mascotaSelect.value).toBe('7');
    fireEvent.change(screen.getByLabelText('Fecha de Consulta *'), {
      target: { value: '2030-01-15' },
    });
    fireEvent.change(screen.getByLabelText('Hora de Atención *'), {
      target: { value: '10:30' },
    });
    fireEvent.change(screen.getByLabelText('Motivo de la Consulta'), {
      target: { value: 'Control' },
    });
    fireEvent.submit(mascotaSelect.closest('form'));

    await screen.findByText('🎉 ¡Cita agendada exitosamente!');
    await waitFor(() => {
      const postCall = fetchSpy.calls.allArgs().find(([url, options]) =>
        url.endsWith('/citas') && options.method === 'POST');
      expect(postCall).toBeDefined();
      expect(JSON.parse(postCall[1].body)).toEqual({
        mascotaId: 7,
        fecha: '2030-01-15',
        hora: '10:30',
        motivo: 'Control',
      });
    });
  });
});
