import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../hooks/useAuth.jsx';
import Registro from './Registro.jsx';

describe('Registro', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('registra una cuenta con el backend, guarda el token y navega a mascotas', async () => {
    const fetchSpy = spyOn(window, 'fetch').and.returnValue(Promise.resolve({
      ok: true,
      status: 201,
      text: () => Promise.resolve(JSON.stringify({
        token: 'jwt-registro',
        tokenType: 'Bearer',
        email: 'tutor@vetsm.cl',
        nombre: 'Tutor',
        rol: 'ROLE_USER',
      })),
    }));

    render(
      <MemoryRouter initialEntries={['/registro']}>
        <AuthProvider>
          <Routes>
            <Route path="/registro" element={<Registro />} />
            <Route path="/mascotas" element={<p>Panel de mascotas</p>} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Nombre completo'), {
      target: { value: ' Tutor ', name: 'nombre' },
    });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), {
      target: { value: ' tutor@vetsm.cl ', name: 'email' },
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'clave-segura', name: 'password' },
    });
    fireEvent.change(screen.getByLabelText('Confirmar contraseña'), {
      target: { value: 'clave-segura', name: 'confirmarPassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Registrarme' }));

    expect(await screen.findByText('Panel de mascotas')).toBeTruthy();
    const [url, options] = fetchSpy.calls.mostRecent().args;
    expect(url).toBe('http://localhost:8080/api/auth/register');
    expect(JSON.parse(options.body)).toEqual({
      nombre: 'Tutor',
      email: 'tutor@vetsm.cl',
      password: 'clave-segura',
    });
    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('jwt-registro');
      expect(JSON.parse(localStorage.getItem('usuario'))).toEqual({
        email: 'tutor@vetsm.cl',
        nombre: 'Tutor',
        rol: 'ROLE_USER',
      });
    });
  });

  it('no envía el formulario cuando la contraseña no cumple las reglas', () => {
    const fetchSpy = spyOn(window, 'fetch');

    render(
      <MemoryRouter initialEntries={['/registro']}>
        <AuthProvider>
          <Registro />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Nombre completo'), {
      target: { value: 'Tutor', name: 'nombre' },
    });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), {
      target: { value: 'tutor@vetsm.cl', name: 'email' },
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'corta', name: 'password' },
    });
    fireEvent.change(screen.getByLabelText('Confirmar contraseña'), {
      target: { value: 'corta', name: 'confirmarPassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Registrarme' }));

    expect(screen.getByText('La contraseña debe tener al menos 8 caracteres')).toBeTruthy();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('indica cuando el correo ya está registrado', async () => {
    spyOn(window, 'fetch').and.returnValue(Promise.resolve({
      ok: false,
      status: 409,
      text: () => Promise.resolve('{"message":"El correo ya está registrado"}'),
    }));

    render(
      <MemoryRouter initialEntries={['/registro']}>
        <AuthProvider>
          <Registro />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Nombre completo'), {
      target: { value: 'Tutor', name: 'nombre' },
    });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), {
      target: { value: 'tutor@vetsm.cl', name: 'email' },
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'clave-segura', name: 'password' },
    });
    fireEvent.change(screen.getByLabelText('Confirmar contraseña'), {
      target: { value: 'clave-segura', name: 'confirmarPassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Registrarme' }));

    expect((await screen.findByRole('alert')).textContent).toContain(
      'Ya existe una cuenta con ese correo. Prueba iniciar sesión.'
    );
    expect(localStorage.getItem('token')).toBeNull();
  });
});
