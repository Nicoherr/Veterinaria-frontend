import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../hooks/useAuth.jsx';
import Login from './Login.jsx';

describe('Login', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('guarda la sesión y navega al panel con la respuesta real del backend', async () => {
    spyOn(window, 'fetch').and.returnValue(Promise.resolve({
      ok: true,
      status: 200,
      text: () => Promise.resolve(JSON.stringify({
        token: 'jwt-test',
        tokenType: 'Bearer',
        email: 'tutor@vetsm.cl',
        nombre: 'Tutor',
        rol: 'ROLE_USER',
      })),
    }));

    render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/mascotas" element={<p>Panel de mascotas</p>} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Correo Electrónico'), {
      target: { value: 'tutor@vetsm.cl' },
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'password-seguro' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }));

    expect(await screen.findByText('Panel de mascotas')).toBeTruthy();
    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('jwt-test');
      expect(JSON.parse(localStorage.getItem('usuario'))).toEqual({
        email: 'tutor@vetsm.cl',
        nombre: 'Tutor',
        rol: 'ROLE_USER',
      });
    });
  });

  it('muestra el error de credenciales inválidas sin crear una sesión', async () => {
    spyOn(window, 'fetch').and.returnValue(Promise.resolve({
      ok: false,
      status: 401,
      text: () => Promise.resolve('{"message":"Credenciales inválidas"}'),
    }));

    render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Correo Electrónico'), {
      target: { value: 'tutor@vetsm.cl' },
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'incorrecta' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }));

    expect((await screen.findByRole('alert')).textContent).toContain('Credenciales inválidas');
    expect(localStorage.getItem('token')).toBeNull();
  });
});
