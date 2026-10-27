import { apiFetch, API_BASE_URL } from './api.js';

describe('apiFetch', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('adjunta el token almacenado y devuelve el JSON de la API', async () => {
    localStorage.setItem('token', 'token-test');
    const response = {
      ok: true,
      status: 200,
      text: () => Promise.resolve('{"mascotas":[]}'),
    };
    spyOn(window, 'fetch').and.returnValue(Promise.resolve(response));

    const data = await apiFetch('/mascotas');

    expect(window.fetch).toHaveBeenCalledWith(
      `${API_BASE_URL}/mascotas`,
      jasmine.objectContaining({
        headers: jasmine.any(Headers),
      })
    );
    const [, options] = window.fetch.calls.mostRecent().args;
    expect(options.headers.get('Authorization')).toBe('Bearer token-test');
    expect(data).toEqual({ mascotas: [] });
  });

  it('agrega Content-Type JSON cuando el cuerpo de la petición es JSON', async () => {
    spyOn(window, 'fetch').and.returnValue(Promise.resolve({
      ok: true,
      status: 201,
      text: () => Promise.resolve(''),
    }));

    await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'tutor@vetsm.cl', password: 'secret' }),
    });

    const [, options] = window.fetch.calls.mostRecent().args;
    expect(options.headers.get('Content-Type')).toBe('application/json');
  });
});
