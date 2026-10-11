import React from 'react';

export default function AdminReportes({ darkMode }) {
  const cardClass = darkMode ? 'bg-dark text-white border-secondary' : 'bg-white text-dark border-light-subtle';

  return (
    <div className="py-2">
      <div className="mb-4">
        <h1 className="h2 fw-bold text-primary">📊 Panel de Reportes y Estadísticas</h1>
        <p className="text-secondary">Métricas operacionales y clínicas de VetSM.</p>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className={`card p-3 shadow-sm ${cardClass}`}>
            <span className="text-secondary small fw-semibold">Atenciones del Mes</span>
            <h2 className="display-6 fw-bold text-info my-1">142</h2>
            <small className="text-success">↑ 12% vs mes anterior</small>
          </div>
        </div>
        <div className="col-md-3">
          <div className={`card p-3 shadow-sm ${cardClass}`}>
            <span className="text-secondary small fw-semibold">Vacunas Aplicadas</span>
            <h2 className="display-6 fw-bold text-primary my-1">89</h2>
            <small className="text-success">↑ 8% vs mes anterior</small>
          </div>
        </div>
        <div className="col-md-3">
          <div className={`card p-3 shadow-sm ${cardClass}`}>
            <span className="text-secondary small fw-semibold">Mascotas Activas</span>
            <h2 className="display-6 fw-bold text-warning my-1">310</h2>
            <small className="text-secondary">Pacientes registrados</small>
          </div>
        </div>
        <div className="col-md-3">
          <div className={`card p-3 shadow-sm ${cardClass}`}>
            <span className="text-secondary small fw-semibold">Efectividad Citas</span>
            <h2 className="display-6 fw-bold text-success my-1">96%</h2>
            <small className="text-secondary">Asistencia confirmada</small>
          </div>
        </div>
      </div>

      <div className={`card p-4 shadow-sm ${cardClass}`}>
        <h3 className="h5 fw-bold mb-3">📈 Resumen de Consultas por Especie</h3>
        <div className="progress mb-3" style={{ height: '25px' }}>
          <div className="progress-bar bg-primary" role="progressbar" style={{ width: '65%' }}>Caninos (65%)</div>
          <div className="progress-bar bg-info" role="progressbar" style={{ width: '30%' }}>Felinos (30%)</div>
          <div className="progress-bar bg-warning" role="progressbar" style={{ width: '5%' }}>Otros (5%)</div>
        </div>
      </div>
    </div>
  );
}