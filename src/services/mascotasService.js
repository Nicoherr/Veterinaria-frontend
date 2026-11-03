export const MASCOTAS_INICIALES = [
  {
    id: 1,
    nombre: 'Max',
    tipo: 'Perro',
    raza: 'Golden Retriever',
    edad: '3 años',
    microchip: '982000123456789',
    imagen: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80',
    vacunas: ['Octúpule (Al día)', 'Antirrábica (Al día)'],
    historial: [
      { fecha: '10/01/2026', detalle: 'Consulta general' },
      { fecha: '15/05/2026', detalle: 'Vacunación' }
    ]
  },
  {
    id: 2,
    nombre: 'Luna',
    tipo: 'Gato',
    raza: 'Siamés',
    edad: '2 años',
    microchip: '982000987654321',
    imagen: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80',
    vacunas: ['Triple Felina (Al día)'],
    historial: [
      { fecha: '20/02/2026', detalle: 'Desparasitación' }
    ]
  }
];

const leerMascotasGuardadas = () => {
  try {
    if (typeof window === 'undefined') return null;
    const guardadas = window.localStorage.getItem('vetsm_mascotas');
    if (!guardadas) return null;

    const parsed = JSON.parse(guardadas);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

export function obtenerMascotas() {
  const guardadas = leerMascotasGuardadas();

  if (!guardadas) {
    try {
      window.localStorage.setItem('vetsm_mascotas', JSON.stringify(MASCOTAS_INICIALES));
    } catch {
      // Ignoramos errores de almacenamiento si el navegador no lo permite.
    }
    return MASCOTAS_INICIALES;
  }

  return guardadas;
}

export function agregarMascota(nuevaMascota) {
  const mascotas = obtenerMascotas();
  const mascotaConId = {
    ...nuevaMascota,
    id: Date.now(),
    vacunas: nuevaMascota.vacunas || ['Pendiente registro'],
    historial: nuevaMascota.historial || [{ fecha: new Date().toLocaleDateString('es-CL'), detalle: 'Registro inicial de la mascota' }],
    imagen: nuevaMascota.imagen || (nuevaMascota.tipo?.toLowerCase() === 'gato' 
      ? 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=400&q=80' 
      : 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80')
  };

  const listaActualizada = [...mascotas, mascotaConId];
  try {
    window.localStorage.setItem('vetsm_mascotas', JSON.stringify(listaActualizada));
  } catch {
    // Ignoramos errores de almacenamiento si el navegador no lo permite.
  }
  return mascotaConId;
}

export function buscarMascotaPorId(id) {
  const mascotas = obtenerMascotas();
  return mascotas.find((m) => m.id === Number(id)) || null;
}

export function filtrarMascotasPorTipo(tipo) {
  const mascotas = obtenerMascotas();
  if (!tipo) return mascotas;
  return mascotas.filter((m) => m.tipo.toLowerCase() === tipo.toLowerCase());
}