import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { agregarMascota } from '../services/mascotasService';

export default function NuevaMascota({ darkMode }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: 'Perro',
    raza: '',
    edad: '',
    microchip: ''
  });
  const [error, setError] = useState('');

  const cardClass = darkMode ? 'bg-dark text-white border-secondary' : 'bg-white text-dark border-light-subtle';
  const inputClass = darkMode ? 'bg-secondary text-white border-secondary' : '';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.raza.trim() || !formData.edad.trim()) {
      setError('Por favor completa todos los campos obligatorios.');
      return;
    }

    agregarMascota(formData);
    navigate('/mascotas');
  };

  return (
    <div className="container py-2" style={{ maxWidth: '650px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 fw-bold text-primary mb-1">🐾 Registrar Nueva Mascota</h1>
          <p className="text-secondary m-0">Ingresa los datos del nuevo paciente.</p>
        </div>
        <Link to="/mascotas" className="btn btn-outline-secondary btn-sm fw-semibold">
          ← Volver
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className={`card p-4 shadow ${cardClass}`}>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Nombre de la Mascota *</label>
            <input
              type="text"
              name="nombre"
              className={`form-control ${inputClass}`}
              placeholder="Ej. Rocky"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Especie / Tipo *</label>
            <select
              name="tipo"
              className={`form-select ${inputClass}`}
              value={formData.tipo}
              onChange={handleChange}
            >
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Exótico">Exótico / Otro</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Raza *</label>
            <input
              type="text"
              name="raza"
              className={`form-control ${inputClass}`}
              placeholder="Ej. Poodle / Mestizo"
              value={formData.raza}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Edad *</label>
            <input
              type="text"
              name="edad"
              className={`form-control ${inputClass}`}
              placeholder="Ej. 1 año / 6 meses"
              value={formData.edad}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold">Número de Microchip</label>
            <input
              type="text"
              name="microchip"
              className={`form-control ${inputClass}`}
              placeholder="Ej. 982000112233445 (Opcional)"
              value={formData.microchip}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
              Guardar y Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}