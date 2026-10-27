import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CarritoModal from '../components/CarritoModal';

export default function Servicios() {
  const { addToCart, cart } = useCart();
  const [modalOpen, setModalOpen] = useState(false);

  const listaServicios = [
    { id: 'serv-1', nombre: 'Consulta Veterinaria General', precio: 25000 },
    { id: 'serv-2', nombre: 'Vacunación Antirrábica', precio: 18000 },
    { id: 'serv-3', nombre: 'Desparasitación Interna/Externa', precio: 15000 },
    { id: 'serv-4', nombre: 'Perfil Bioquímico / Exámenes', precio: 32000 }
  ];

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Servicios Médicos</h2>
        <button className="btn btn-outline-primary" onClick={() => setModalOpen(true)}>
          Ver Carrito ({cart.reduce((a, b) => a + b.cantidad, 0)})
        </button>
      </div>

      <div className="row">
        {listaServicios.map((serv) => (
          <div key={serv.id} className="col-md-6 col-lg-3 mb-3">
            <div className="card h-100 p-3 shadow-sm">
              <h5>{serv.nombre}</h5>
              <p className="text-muted">${serv.precio.toLocaleString('es-CL')} CLP</p>
              <button className="btn btn-primary mt-auto" onClick={() => addToCart(serv)}>
                Agregar al Carrito
              </button>
            </div>
          </div>
        ))}
      </div>

      <CarritoModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}