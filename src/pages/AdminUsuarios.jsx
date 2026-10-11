import React from 'react';

export default function AdminUsuarios({ darkMode }) {
  const cardClass = darkMode ? 'bg-dark text-white border-secondary' : 'bg-white text-dark border-light-subtle';
  const tableClass = darkMode ? 'table-dark' : 'table-light';

  const usuarios = [
    { id: 1, nombre: 'Dr. Roberto Gómez', email: 'roberto@vetsm.cl', rol: 'Veterinario', estado: 'Activo' },
    { id: 2, nombre: 'Ana María Silva', email: 'ana.silva@gmail.com', rol: 'Tutor / Cliente', estado: 'Activo' },
    { id: 3, nombre: 'Carlos Mendoza', email: 'carlos@vetsm.cl', rol: 'Recepcionista', estado: 'Inactivo' },
  ];

  return (
    <div className="py-2">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h1 className="h2 fw-bold text-primary mb-1">👥 Gestión de Usuarios</h1>
          <p className="text-secondary m-0">Administración de cuentas y roles del sistema.</p>
        </div>
        <button className="btn btn-primary fw-semibold">➕ Nuevo Usuario</button>
      </div>

      <div className={`card shadow-sm overflow-hidden ${cardClass}`}>
        <div className="table-responsive">
          <table className={`table table-hover align-middle m-0 ${tableClass}`}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Estado</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id}>
                  <td>#{u.id}</td>
                  <td className="fw-semibold">{u.nombre}</td>
                  <td>{u.email}</td>
                  <td><span className="badge bg-info text-dark">{u.rol}</span></td>
                  <td>
                    <span className={`badge ${u.estado === 'Activo' ? 'bg-success' : 'bg-secondary'}`}>
                      {u.estado}
                    </span>
                  </td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-primary me-2">Editar</button>
                    <button className="btn btn-sm btn-outline-danger">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}