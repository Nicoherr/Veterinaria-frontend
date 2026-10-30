const configuredApiBaseUrl = import.meta.env?.VITE_API_BASE_URL;
export const API_BASE_URL = (configuredApiBaseUrl || 'http://localhost:8080/api').replace(/\/+$/, '');

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = new Headers(options.headers);

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  if (options.body && !(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && token) {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('vetsm_user');
    localStorage.removeItem('vetsm_perfil');

    if (window.location.pathname !== '/login') {
      window.location.assign('/login');
    }
  }

  const responseText = response.status === 204 ? '' : await response.text();
  let data = null;
  if (responseText) {
    try {
      data = JSON.parse(responseText);
    } catch {
      data = responseText;
    }
  }

  if (!response.ok) {
    const message = typeof data === 'string'
      ? data
      : data?.message || data?.mensaje || `Error HTTP ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return data;
}
