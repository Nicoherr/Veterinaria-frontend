import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useAuth, AuthProvider } from './useAuth.jsx';

describe('Pruebas del Custom Hook useAuth', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe cambiar a autenticado al llamar a login y actualizar localStorage', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.login('admin@vetsm.cl', '123456');
    });

    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.user.email).toBe('admin@vetsm.cl');
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