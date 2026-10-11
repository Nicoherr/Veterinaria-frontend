import { obtenerMascotas, agregarMascota, buscarMascotaPorId, filtrarMascotasPorTipo } from './mascotasService.js';

describe('Pruebas unitarias de MascotasService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe retornar el listado completo de mascotas', () => {
    const mascotas = obtenerMascotas();
    expect(mascotas.length).toBeGreaterThan(0);
  });

  it('debe encontrar una mascota existente por ID', () => {
    const mascota = buscarMascotaPorId(1);
    expect(mascota).not.toBeNull();
    expect(mascota.nombre).toBe('Max');
  });

  it('debe retornar null si la mascota no existe', () => {
    const mascota = buscarMascotaPorId(999);
    expect(mascota).toBeNull();
  });

  it('debe filtrar mascotas por tipo correctamente', () => {
    const perros = filtrarMascotasPorTipo('Perro');
    expect(perros.every(m => m.tipo === 'Perro')).toBeTrue();

    const todas = filtrarMascotasPorTipo('');
    expect(todas.length).toBeGreaterThan(0);
  });

  it('debe permitir agregar una nueva mascota', () => {
    const nueva = agregarMascota({ nombre: 'Tobías', tipo: 'Perro', raza: 'Beagle', edad: '1 año' });
    expect(nueva.id).toBeDefined();
    expect(obtenerMascotas().length).toBe(3);
  });
});