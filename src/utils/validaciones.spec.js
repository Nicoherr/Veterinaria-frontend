import { validarLogin, validarContacto } from './validaciones.js';

describe('Pruebas unitarias de Validaciones', () => {
  it('validarLogin debe retornar errores cuando los campos están vacíos', () => {
    const errores = validarLogin({ email: '', password: '' });
    expect(errores.email).toBeDefined();
    expect(errores.password).toBeDefined();
  });

  it('validarLogin no debe retornar errores si los datos son correctos', () => {
    const errores = validarLogin({ email: 'admin@vetsm.cl', password: '123' });
    expect(Object.keys(errores).length).toBe(0);
  });

  it('validarLogin debe rechazar un correo con formato inválido', () => {
    expect(validarLogin({ email: 'no-es-correo', password: '123' }).email).toBe('El email no es válido');
  });

  it('validarContacto debe detectar campos incompletos', () => {
    const errores = validarContacto({});
    expect(errores.nombre).toBeDefined();
    expect(errores.email).toBeDefined();
  });

  it('validarContacto debe rechazar un correo con formato inválido', () => {
    expect(validarContacto({
      nombre: 'Tutor',
      email: 'no-es-correo',
      telefono: '123456789',
      mensaje: 'Consulta',
    }).email).toBe('Ingresa un correo válido, como nombre@dominio.cl');
  });

  it('validarContacto debe rechazar nombres con números y correos sin dominio válido', () => {
    const errores = validarContacto({
      nombre: 'Tutor 123',
      email: 'tutor@dominio.c',
      telefono: '+56912345678',
      mensaje: 'Consulta',
    });

    expect(errores.nombre).toBeDefined();
    expect(errores.email).toBe('Ingresa un correo válido, como nombre@dominio.cl');
  });

  it('validarContacto acepta nombres con acentos y teléfonos con formato habitual', () => {
    const errores = validarContacto({
      nombre: 'María José O’Connor',
      email: 'maria.jose@vetsm.cl',
      telefono: '+56 9 1234-5678',
      mensaje: 'Necesito información para mi mascota.',
    });

    expect(Object.keys(errores).length).toBe(0);
  });

  it('validarContacto rechaza teléfonos demasiado cortos o con letras', () => {
    expect(validarContacto({
      nombre: 'Tutor',
      email: 'tutor@vetsm.cl',
      telefono: '123-ABC',
      mensaje: 'Consulta',
    }).telefono).toBe('Ingresa un teléfono válido con 8 a 15 dígitos');
  });
});
