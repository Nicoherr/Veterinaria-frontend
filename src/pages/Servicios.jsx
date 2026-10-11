import React from 'react';
import { Link } from 'react-router-dom';

export default function Servicios({ darkMode }) {
  const servicios = [
    { id: 1, titulo: 'Consulta General', desc: 'Evaluación física completa, diagnóstico y receta médica.', icono: '🩺', precio: '$25.000' },
    { id: 2, titulo: 'Vacunación y Desparasitación', desc: 'Vacunas óctuple, triple felina, antirrábica y desparasitación interna/externa.', icono: '💉', precio: '$18.000' },
    { id: 3, titulo: 'Cirugía General', desc: 'Esterilizaciones, limpieza dental por ultrasonido y cirugías de tejido blando.', icono: '✂️', precio: 'Desde $60.000' },
    { id: 4, titulo: 'Exámenes de Laboratorio', desc: 'Hemogramas, perfil bioquímico, urianálisis y test de enfermedades infecciosas.', icono: '🔬', precio: '$20.000' },
  ];

  const cardClass = darkMode ? 'bg-dark text-white border-secondary h-100' : 'bg-white text-dark border-light-subtle h-100';

  return (
    <div className="py-2">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">Servicios Médicos</h1>
        <p className="text-secondary lead">Cuidado profesional adaptado a las necesidades de tu mascota.</p>
      </div>

      <div className="row g-4">
        {servicios.map((s) => (
          <div key={s.id} className="col-md-6">
            <div className={`card p-4 shadow-sm ${cardClass}`}>
              <div className="d-flex align-items-center mb-3">
                <span className="fs-2 me-3">{s.icono}</span>
                <div>
                  <h3 className="h5 fw-bold m-0">{s.titulo}</h3>
                  <span className="badge bg-primary mt-1">{s.precio}</span>
                </div>
              </div>
              <p className="text-secondary flex-grow-1">{s.desc}</p>
              <Link to="/contacto" className="btn btn-outline-primary btn-sm w-100 mt-2 fw-semibold">
                Agendar este Servicio
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}