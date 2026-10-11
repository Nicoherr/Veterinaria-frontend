import { useAuth } from './useAuth.js';
import { renderHook, act } from '@testing-library/react';

describe('Pruebas del Custom Hook useAuth', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe iniciar con estado no autenticado por defecto', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.isLoggedIn).toBeFalse();
  });

  it('debe cambiar a autenticado al llamar a login y actualizar localStorage', () => {
    const { result } = renderHook(() => useAuth());
    act(() => {
      result.current.login();
    });
    expect(result.current.isLoggedIn).toBeTrue();
    expect(localStorage.getItem('vetsm_session')).toBe('true');
  });

  it('debe alternar el modo oscuro correctamente', () => {
    const { result } = renderHook(() => useAuth());
    act(() => {
      result.current.toggleDarkMode();
    });
    expect(result.current.darkMode).toBeTrue();
    expect(localStorage.getItem('vetsm_theme')).toBe('dark');
  });
});