import { validarContacto, validarLogin } from './validaciones.js';

describe('Pruebas unitarias de Validaciones', () => {
  it('validarLogin debe retornar errores cuando los campos están vacíos', () => {
    const errores = validarLogin('', '');
    expect(errores.email).toBeDefined();
    expect(errores.password).toBeDefined();
  });

  it('validarLogin no debe retornar errores si los datos son correctos', () => {
    const errores = validarLogin('test@vetsm.cl', '123456');
    expect(Object.keys(errores).length).toBe(0);
  });

  it('validarContacto debe detectar campos incompletos', () => {
    const errores = validarContacto({});
    expect(errores.nombre).toBeDefined();
    expect(errores.email).toBeDefined();
  });
});