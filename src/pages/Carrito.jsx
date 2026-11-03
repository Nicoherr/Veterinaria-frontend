import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Carrito({ darkMode }) {
  const { cart, removeFromCart, updateCantidad, clearCart, totalPrecio } = useCart();
  const [pedidoDemo, setPedidoDemo] = useState(null);

  const cardClass = darkMode
    ? 'bg-dark text-white border-secondary'
    : 'bg-white text-dark border-light-subtle';

  const simularPedido = () => {
    if (cart.length === 0) return;

    setPedidoDemo({
      codigo: `DEMO-${Date.now().toString().slice(-6)}`,
      items: cart.map((item) => ({ ...item })),
      total: totalPrecio,
    });
    clearCart();
  };

  if (pedidoDemo) {
    return (
      <div className="py-2">
        <div className={`card p-4 p-md-5 shadow-sm ${cardClass}`}>
          <div className="text-center mb-4">
            <p className="text-success fw-semibold mb-2">Simulación completada</p>
            <h1 className="h2 fw-bold text-primary">Pedido de prueba confirmado</h1>
            <p className="text-secondary mb-0">
              No se realizó ningún pago ni se creó una reserva real.
            </p>
          </div>

          <div className="mx-auto w-100" style={{ maxWidth: '640px' }}>
            <p className="mb-3">
              Código de demostración: <strong>{pedidoDemo.codigo}</strong>
            </p>
            <ul className="list-group mb-3">
              {pedidoDemo.items.map((item) => (
                <li
                  className="list-group-item d-flex justify-content-between gap-3"
                  key={item.id}
                >
                  <span>{item.nombre} × {item.cantidad}</span>
                  <strong>${(item.precio * item.cantidad).toLocaleString('es-CL')}</strong>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-between border-top pt-3 mb-4 fs-5">
              <strong>Total estimado</strong>
              <strong>${pedidoDemo.total.toLocaleString('es-CL')} CLP</strong>
            </div>
            <Link to="/servicios" className="btn btn-primary d-block">
              Volver a servicios
            </Link>
          </div>
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
                          <td>
                            ${item.precio.toLocaleString('es-CL')}
                            {item.precioReferencial && (
                              <small className="d-block text-secondary">Precio base referencial</small>
                            )}
                          </td>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => updateCantidad(item.id, item.cantidad - 1)}
                                aria-label={`Quitar una unidad de ${item.nombre}`}
                              >
                                -
                              </button>
                              <span className="fw-bold">{item.cantidad}</span>
                              <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => updateCantidad(item.id, item.cantidad + 1)}
                                aria-label={`Agregar una unidad de ${item.nombre}`}
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
                              aria-label={`Eliminar ${item.nombre} del carrito`}
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
              <div className="alert alert-info" role="status">
                Modo evaluación: puedes simular la confirmación del pedido. No se realizará ningún pago ni reserva real.
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">Subtotal estimado</span>
                <span>${totalPrecio.toLocaleString('es-CL')}</span>
              </div>
              <div className="d-flex justify-content-between mb-3 fw-bold fs-5 text-primary border-top pt-2">
                <span>Total estimado</span>
                <span>${totalPrecio.toLocaleString('es-CL')}</span>
              </div>
              <button
                className="btn btn-primary w-100 fw-bold py-2"
                onClick={simularPedido}
              >
                Simular pedido
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