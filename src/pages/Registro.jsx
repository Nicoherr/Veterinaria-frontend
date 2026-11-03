import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { apiFetch } from '../services/api.js';
import { validarRegistro } from '../utils/validaciones.js';

const initialForm = {
  nombre: '',
  email: '',
  password: '',
  confirmarPassword: '',
};

export default function Registro() {
  const { login, darkMode } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [errores, setErrores] = useState({});
  const [errorRegistro, setErrorRegistro] = useState('');
  const [enviando, setEnviando] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);
    setErrorRegistro('');

    const fieldErrors = validarRegistro(updatedForm);
    setErrores((current) => {
      const next = { ...current };
      if (fieldErrors[name]) next[name] = fieldErrors[name];
      else delete next[name];

      if (name === 'password' && updatedForm.confirmarPassword) {
        if (fieldErrors.confirmarPassword) next.confirmarPassword = fieldErrors.confirmarPassword;
        else delete next.confirmarPassword;
      }

      return next;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validarRegistro(formData);
    setErrores(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setEnviando(true);
    setErrorRegistro('');
    try {
      const data = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          nombre: formData.nombre.trim(),
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      if (!data?.token || !data?.email || !data?.nombre) {
        throw new Error('La respuesta del servidor no contiene los datos de sesión esperados.');
      }

      login(
        { email: data.email, nombre: data.nombre, rol: data.rol },
        data.token
      );
      navigate('/mascotas', { replace: true });
    } catch (error) {
      setErrorRegistro(
        error.status === 409
          ? 'Ya existe una cuenta con ese correo. Prueba iniciar sesión.'
          : error.message || 'No fue posible crear la cuenta. Inténtalo nuevamente.'
      );
    } finally {
      setEnviando(false);
    }
  };

  const inputTheme = darkMode ? 'bg-secondary text-white border-secondary' : '';

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">
          <div className={`card shadow-sm border-0 ${darkMode ? 'bg-dark text-white' : 'bg-white text-dark'}`}>
            <div className="card-body p-4 p-md-5">
              <h1 className="h2 auth-title text-center fw-bold mb-2">Crear cuenta</h1>
              <p className="text-secondary text-center mb-4">
                Regístrate para administrar tus mascotas y sus citas.
              </p>

              {errorRegistro && (
                <div className="alert alert-danger" role="alert">{errorRegistro}</div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label fw-semibold">Nombre completo</label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    className={`form-control ${inputTheme} ${errores.nombre ? 'is-invalid' : ''}`}
                    value={formData.nombre}
                    onChange={handleChange}
                    autoComplete="name"
                    maxLength={120}
                    required
                    aria-invalid={Boolean(errores.nombre)}
                    aria-describedby={errores.nombre ? 'nombre-error' : undefined}
                  />
                  {errores.nombre && <div className="invalid-feedback" id="nombre-error">{errores.nombre}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">Correo electrónico</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`form-control ${inputTheme} ${errores.email ? 'is-invalid' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    maxLength={180}
                    required
                    aria-invalid={Boolean(errores.email)}
                    aria-describedby={errores.email ? 'email-error' : undefined}
                  />
                  {errores.email && <div className="invalid-feedback" id="email-error">{errores.email}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-semibold">Contraseña</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className={`form-control ${inputTheme} ${errores.password ? 'is-invalid' : ''}`}
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    minLength={8}
                    maxLength={72}
                    required
                    aria-invalid={Boolean(errores.password)}
                    aria-describedby={errores.password ? 'password-error' : 'password-help'}
                  />
                  {errores.password
                    ? <div className="invalid-feedback" id="password-error">{errores.password}</div>
                    : <div className="form-text" id="password-help">Debe tener entre 8 y 72 caracteres.</div>}
                </div>

                <div className="mb-4">
                  <label htmlFor="confirmarPassword" className="form-label fw-semibold">Confirmar contraseña</label>
                  <input
                    id="confirmarPassword"
                    name="confirmarPassword"
                    type="password"
                    className={`form-control ${inputTheme} ${errores.confirmarPassword ? 'is-invalid' : ''}`}
                    value={formData.confirmarPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                    aria-invalid={Boolean(errores.confirmarPassword)}
                    aria-describedby={errores.confirmarPassword ? 'confirmarPassword-error' : undefined}
                  />
                  {errores.confirmarPassword && (
                    <div className="invalid-feedback" id="confirmarPassword-error">{errores.confirmarPassword}</div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary w-100 fw-bold py-2" disabled={enviando}>
                  {enviando ? 'Creando cuenta...' : 'Registrarme'}
                </button>
              </form>

              <p className="text-center mt-4 mb-0">
                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
