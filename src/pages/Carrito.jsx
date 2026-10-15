import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Carrito({ darkMode }) {
  const { cart, removeFromCart, updateCantidad, clearCart, totalPrecio } = useCart();
  const [comprado, setComprado] = useState(false);

  const cardClass = darkMode
    ? 'bg-dark text-white border-secondary'
    : 'bg-white text-dark border-light-subtle';

  const handlePagar = () => {
    setComprado(true);
    clearCart();
  };

  if (comprado) {
    return (
      <div className="py-5 text-center">
        <div className={`card p-5 shadow-sm max-w-md mx-auto ${cardClass}`}>
          <h2 className="text-success mb-3">🎉 ¡Compra Realizada con Éxito!</h2>
          <p className="text-secondary">
            Hemos registrado tu pedido y la reserva de servicios en nuestra clínica.
          </p>
          <Link to="/" className="btn btn-primary fw-bold mt-3">
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-2">
      <div className="mb-4">
        <h1 className="h2 fw-bold text-primary mb-1">🛒 Carrito de Compras</h1>
        <p className="text-secondary m-0">Revisa los servicios y productos seleccionados.</p>
      </div>

      {cart.length === 0 ? (
        <div className={`card p-5 text-center shadow-sm ${cardClass}`}>
          <h3 className="h5 text-secondary mb-3">Tu carrito está vacío 🐾</h3>
          <Link to="/servicios" className="btn btn-primary fw-bold mx-auto" style={{ maxWidth: '250px' }}>
            Ver Servicios Disponible
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {/* Lista de Productos */}
          <div className="col-lg-8">
            <div className={`card shadow-sm ${cardClass}`}>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className={`table align-middle mb-0 ${darkMode ? 'table-dark' : 'table-light'}`}>
                    <thead>
                      <tr>
                        <th>Producto / Servicio</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td className="fw-semibold">{item.nombre}</td>
                          <td>${item.precio.toLocaleString('es-CL')}</td>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => updateCantidad(item.id, item.cantidad - 1)}
                              >
                                -
                              </button>
                              <span className="fw-bold">{item.cantidad}</span>
                              <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => updateCantidad(item.id, item.cantidad + 1)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="fw-bold">
                            ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => removeFromCart(item.id)}
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Resumen de Pago */}
          <div className="col-lg-4">
            <div className={`card shadow-sm p-4 ${cardClass}`}>
              <h3 className="h4 fw-bold mb-3">Resumen del Pedido</h3>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">Subtotal</span>
                <span>${totalPrecio.toLocaleString('es-CL')}</span>
              </div>
              <div className="d-flex justify-content-between mb-3 fw-bold fs-5 text-primary border-top pt-2">
                <span>Total</span>
                <span>${totalPrecio.toLocaleString('es-CL')}</span>
              </div>
              <button
                className="btn btn-success w-100 fw-bold py-2"
                onClick={handlePagar}
              >
                💳 Confirmar y Pagar
              </button>
              <button
                className="btn btn-outline-secondary w-100 fw-semibold mt-2"
                onClick={clearCart}
              >
                Vaciar Carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}