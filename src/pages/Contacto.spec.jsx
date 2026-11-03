import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { AuthProvider } from '../hooks/useAuth.jsx';
import Contacto from './Contacto.jsx';

describe('Contacto', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('valida nombre, correo y teléfono mientras se ingresan', () => {
    render(
      <AuthProvider>
        <Contacto />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText('Nombre Completo'), {
      target: { name: 'nombre', value: 'Juan 123' },
    });
    expect(screen.getByText('Ingresa un nombre válido, sin números; se permiten tildes y espacios')).toBeTruthy();

    fireEvent.change(screen.getByLabelText('Correo Electrónico'), {
      target: { name: 'email', value: 'juan@dominio' },
    });
    expect(screen.getByText('Ingresa un correo válido, como nombre@dominio.cl')).toBeTruthy();

    fireEvent.change(screen.getByLabelText('Teléfono de Contacto'), {
      target: { name: 'telefono', value: 'teléfono' },
    });
    expect(screen.getByText('Ingresa un teléfono válido con 8 a 15 dígitos')).toBeTruthy();
  });

  it('solo muestra la confirmación informativa cuando todos los campos son válidos', () => {
    render(
      <AuthProvider>
        <Contacto />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText('Nombre Completo'), {
      target: { name: 'nombre', value: 'María Pérez' },
    });
    fireEvent.change(screen.getByLabelText('Correo Electrónico'), {
      target: { name: 'email', value: 'maria@vetsm.cl' },
    });
    fireEvent.change(screen.getByLabelText('Teléfono de Contacto'), {
      target: { name: 'telefono', value: '+56 9 1234-5678' },
    });
    fireEvent.change(screen.getByLabelText('Mensaje o Consulta'), {
      target: { name: 'mensaje', value: 'Consulta por control preventivo.' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Enviar Mensaje' }));

    expect(screen.getByText(/El formulario aún no está conectado/)).toBeTruthy();
    expect(screen.queryByText(/Ingresa un/)).toBeNull();
  });
});
