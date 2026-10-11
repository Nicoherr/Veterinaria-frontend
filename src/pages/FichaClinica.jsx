import React from 'react';

export default function FichaClinica({ darkMode }) {
  const cardClass = darkMode ? 'bg-dark text-white border-secondary' : 'bg-white text-dark border-light-subtle';

  return (
    <div className="py-2" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h1 className="h2 fw-bold text-primary mb-1">📋 Ficha Clínica Veterinaria</h1>
          <p className="text-secondary m-0">Expediente médico #FC-9820001</p>
        </div>
        <button className="btn btn-outline-primary fw-semibold" onClick={() => window.print()}>
          🖨️ Imprimir Ficha
        </button>
      </div>

      <div className={`card p-4 shadow-sm mb-4 ${cardClass}`}>
        <h2 className="h5 text-info fw-bold border-bottom pb-2 mb-3">🐶 Paciente: Max</h2>
        <div className="row g-3 text-secondary">
          <div className="col-md-4"><strong>Especie:</strong> Canino</div>
          <div className="col-md-4"><strong>Raza:</strong> Golden Retriever</div>
          <div className="col-md-4"><strong>Edad:</strong> 3 Años</div>
          <div className="col-md-4"><strong>Peso:</strong> 28.5 kg</div>
          <div className="col-md-4"><strong>Microchip:</strong> 982000123456789</div>
          <div className="col-md-4"><strong>Tutor:</strong> Ana Silva</div>
        </div>
      </div>

      <div className={`card p-4 shadow-sm ${cardClass}`}>
        <h3 className="h5 text-info fw-bold border-bottom pb-2 mb-3">🩺 Historial de Diagnósticos</h3>
        <div className="timeline">
          <div className="mb-3">
            <span className="badge bg-primary">10/01/2026</span>
            <h4 className="h6 fw-bold mt-2">Consulta Control Anual</h4>
            <p className="text-secondary small m-0">
              Paciente en excelente estado de salud. Frecuencia cardíaca normal. Se recomienda mantener alimento superfondo.
            </p>
          </div>
          <hr />
          <div>
            <span className="badge bg-secondary">15/05/2026</span>
            <h4 className="h6 fw-bold mt-2">Refuerzo Vacunación</h4>
            <p className="text-secondary small m-0">
              Aplicación de vacuna Óctuple y Antirrábica sin reacciones adversas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}