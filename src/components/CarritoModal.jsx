import React from 'react';
import { useCart } from '../context/CartContext';

export default function CarritoModal({ isOpen, onClose }) {
  const { cart, removeFromCart, clearCart, total } = useCart();

  if (!isOpen) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Carrito de Servicios / Productos</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {cart.length === 0 ? (
              <p>El carrito está vacío.</p>
            ) : (
              <ul className="list-group">
                {cart.map((item) => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{item.nombre}</strong> - ${item.precio.toLocaleString('es-CL')} x {item.cantidad}
                    </div>
                    <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <hr />
            <div className="d-flex justify-content-between">
              <strong>Total:</strong>
              <span>${total.toLocaleString('es-CL')} CLP</span>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={clearCart}>Vaciar</button>
            <button className="btn btn-primary" onClick={onClose}>Confirmar Selección</button>
          </div>
        </div>
      </div>
    </div>
  );
}