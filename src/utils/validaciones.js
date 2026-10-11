export function validarContacto(data) {
  const errores = {};
  if (!data.nombre || data.nombre.trim() === '') {
    errores.nombre = 'El nombre es obligatorio.';
  }
  if (!data.telefono || data.telefono.trim() === '') {
    errores.telefono = 'El teléfono es obligatorio.';
  }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errores.email = 'El correo electrónico no es válido.';
  }
  if (!data.asunto || data.asunto.trim() === '') {
    errores.asunto = 'El asunto es obligatorio.';
  }
  if (!data.mensaje || data.mensaje.trim() === '') {
    errores.mensaje = 'El mensaje es obligatorio.';
  }
  return errores;
}

export function validarLogin(email, password) {
  const errores = {};
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errores.email = 'El correo electrónico no es válido.';
  }
  if (!password || password.length < 4) {
    errores.password = 'La contraseña debe tener al menos 4 caracteres.';
  }
  return errores;
}