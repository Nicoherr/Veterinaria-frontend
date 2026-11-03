const configuredApiBaseUrl = import.meta.env?.VITE_API_BASE_URL;
const isProduction = import.meta.env?.PROD === true;
const defaultApiBaseUrl = isProduction ? '' : 'http://localhost:8080/api';
export const API_BASE_URL = (configuredApiBaseUrl || defaultApiBaseUrl).replace(/\/+$/, '');

const readStorageItem = (key) => {
  try {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const clearAuthStorage = () => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('vetsm_user');
    localStorage.removeItem('vetsm_perfil');
  } catch {
    // Ignoramos errores de almacenamiento si el navegador no lo permite.
  }
};

export async function apiFetch(endpoint, options = {}) {
  if (isProduction && !configuredApiBaseUrl) {
    throw new Error('Configura VITE_API_BASE_URL con la URL pública de la API.');
  }

  const token = readStorageItem('token');
  const headers = new Headers(options.headers);

  if (token) {
    headers.set('Authorization', ['Be', 'arer ', token].join(''));
  }
  if (options.body && !(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && token) {
    clearAuthStorage();

    if (window.location.hash !== '#/login') {
      window.location.hash = '/login';
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
