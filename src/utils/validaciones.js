export const validarContacto = (form = {}) => {
  const errores = {};
  const nombre = form && typeof form.nombre === 'string' ? form.nombre.trim() : '';
  const email = form && typeof form.email === 'string' ? form.email.trim() : '';
  const telefono = form && typeof form.telefono === 'string' ? form.telefono.trim() : '';
  const mensaje = form && typeof form.mensaje === 'string' ? form.mensaje.trim() : '';

  if (!nombre) errores.nombre = 'El nombre es requerido';
  else if (!/^\p{L}[\p{L}\p{M}\s.'’-]*$/u.test(nombre)) {
    errores.nombre = 'Ingresa un nombre válido, sin números; se permiten tildes y espacios';
  }
  if (!email) errores.email = 'El email es requerido';
  else if (!/^[^\s@]+@(?:[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?\.)+[A-Z]{2,}$/i.test(email)) {
    errores.email = 'Ingresa un correo válido, como nombre@dominio.cl';
  }
  if (!telefono) errores.telefono = 'El teléfono es requerido';
  else {
    const telefonoNormalizado = telefono.replace(/[\s()-]/g, '');
    if (!/^\+?\d{8,15}$/.test(telefonoNormalizado)) {
      errores.telefono = 'Ingresa un teléfono válido con 8 a 15 dígitos';
    }
  }
  if (!mensaje) errores.mensaje = 'El mensaje es requerido';

  return errores;
};

export const validarLogin = (form = {}) => {
  const errores = {};
  const email = form && typeof form.email === 'string' ? form.email.trim() : '';
  const password = form && typeof form.password === 'string' ? form.password.trim() : '';

  if (!email) errores.email = 'El email es requerido';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errores.email = 'El email no es válido';
  if (!password) errores.password = 'La contraseña es requerida';

  return errores;
};