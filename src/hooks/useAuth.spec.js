import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useAuth, AuthProvider } from './useAuth.jsx';

describe('Pruebas del Custom Hook useAuth', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe cambiar a autenticado al llamar a login y guardar la sesión', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.login({ email: 'admin@vetsm.cl', nombre: 'Admin' }, 'token-test');
    });

    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.user.email).toBe('admin@vetsm.cl');
    expect(localStorage.getItem('token')).toBe('token-test');
    expect(JSON.parse(localStorage.getItem('usuario')).email).toBe('admin@vetsm.cl');
  });

  it('debe restaurar la sesión guardada después de montar el proveedor', () => {
    localStorage.setItem('token', 'token-test');
    localStorage.setItem('usuario', JSON.stringify({ email: 'tutor@vetsm.cl' }));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.user.email).toBe('tutor@vetsm.cl');
  });

  it('debe alternar el modo oscuro correctamente', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.toggleDarkMode();
    });

    expect(result.current.darkMode).toBe(true);
  });
});