export const validarContacto = (form = {}) => {
  const errores = {};
  const nombre = form && typeof form.nombre === 'string' ? form.nombre.trim() : '';
  const email = form && typeof form.email === 'string' ? form.email.trim() : '';
  const telefono = form && typeof form.telefono === 'string' ? form.telefono.trim() : '';
  const mensaje = form && typeof form.mensaje === 'string' ? form.mensaje.trim() : '';

  if (!nombre) errores.nombre = 'El nombre es requerido';
  if (!email) errores.email = 'El email es requerido';
  if (!telefono) errores.telefono = 'El teléfono es requerido';
  if (!mensaje) errores.mensaje = 'El mensaje es requerido';

  return errores;
};

export const validarLogin = (form = {}) => {
  const errores = {};
  const email = form && typeof form.email === 'string' ? form.email.trim() : '';
  const password = form && typeof form.password === 'string' ? form.password.trim() : '';

  if (!email) errores.email = 'El email es requerido';
  if (!password) errores.password = 'La contraseña es requerida';

  return errores;
};