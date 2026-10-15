import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Servicios({ darkMode }) {
  const { addToCart } = useCart();
  const [mensaje, setMensaje] = useState('');

  const servicios = [
    { 
      id: 1, 
      titulo: 'Consulta General', 
      desc: 'Evaluación física completa, diagnóstico y receta médica.', 
      imagenUrl: 'https://images.pexels.com/photos/6235228/pexels-photo-6235228.jpeg?auto=compress&cs=tinysrgb&w=600',
      precioNum: 25000, 
      precioTexto: '$25.000' 
    },
    { 
      id: 2, 
      titulo: 'Vacunación y Desparasitación', 
      desc: 'Vacunas óctuple, triple felina, antirrábica y desparasitación interna/externa.', 
      imagenUrl: 'https://images.pexels.com/photos/7469213/pexels-photo-7469213.jpeg?auto=compress&cs=tinysrgb&w=600', 
      precioNum: 18000, 
      precioTexto: '$18.000' 
    },
    { 
      id: 3, 
      titulo: 'Cirugía General', 
      desc: 'Esterilizaciones, limpieza dental por ultrasonido y cirugías de tejido blando.', 
      imagenUrl: 'https://images.pexels.com/photos/6235115/pexels-photo-6235115.jpeg?auto=compress&cs=tinysrgb&w=600', 
      precioNum: 60000, 
      precioTexto: 'Desde $60.000' 
    },
    { 
      id: 4, 
      titulo: 'Exámenes de Laboratorio', 
      desc: 'Hemogramas, perfil bioquímico, urianálisis y test de enfermedades infecciosas.', 
      imagenUrl: 'https://images.pexels.com/photos/7469224/pexels-photo-7469224.jpeg?auto=compress&cs=tinysrgb&w=600', 
      precioNum: 20000, 
      precioTexto: '$20.000' 
    },
  ];

  const cardClass = darkMode 
    ? 'bg-dark text-white border-secondary h-100 overflow-hidden shadow-sm' 
    : 'bg-white text-dark border-light-subtle h-100 overflow-hidden shadow-sm';

  const handleAgregarAlCarrito = (serv) => {
    addToCart({
      id: serv.id,
      nombre: serv.titulo,
      precio: serv.precioNum,
    });

    setMensaje(`¡"${serv.titulo}" se agregó al carrito! 🛒`);
    setTimeout(() => setMensaje(''), 3000);
  };

  return (
    <div className="py-2">
      <div className="text-center mb-4">
        <h1 className="fw-bold text-primary">Servicios Médicos</h1>
        <p className="text-secondary lead">Cuidado profesional adaptado a las necesidades de tu mascota.</p>
      </div>

      {mensaje && (
        <div className="alert alert-success alert-dismissible fade show text-center fw-semibold shadow-sm mb-4" role="alert">
          {mensaje}
        </div>
      )}

      <div className="row g-4">
        {servicios.map((s) => (
          <div key={s.id} className="col-md-6">
            <div className={`card ${cardClass}`}>
              <img 
                src={s.imagenUrl} 
                alt={s.titulo} 
                className="w-100" 
                style={{ height: '200px', objectFit: 'cover' }} 
              />
              <div className="card-body d-flex flex-column p-4">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h3 className="h5 fw-bold m-0">{s.titulo}</h3>
                  <span className="badge bg-primary fs-6">{s.precioTexto}</span>
                </div>

                <p className="text-secondary flex-grow-1">{s.desc}</p>

                <div className="d-flex gap-2 mt-3 pt-3 border-top border-secondary-subtle">
                  <button
                    onClick={() => handleAgregarAlCarrito(s)}
                    className="btn btn-primary btn-sm flex-fill fw-bold"
                  >
                    🛒 Añadir al Carrito
                  </button>

                  <Link to="/contacto" className="btn btn-outline-primary btn-sm flex-fill fw-semibold">
                    📅 Agendar Consulta
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}