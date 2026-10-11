import React from 'react';

export default function Nosotros({ darkMode }) {
  const cardClass = darkMode ? 'bg-dark text-white border-secondary' : 'bg-white text-dark border-light-subtle';

  return (
    <div className="py-2">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">Nuestra Clínica</h1>
        <p className="text-secondary lead">Conoce más sobre nuestra trayectoria y equipo profesional.</p>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-6">
          <div className={`card p-4 h-100 ${cardClass}`}>
            <h2 className="h4 text-info fw-bold mb-3">🎯 Misión</h2>
            <p className="text-secondary m-0">
              Proporcionar servicios veterinarios preventivos y curativos con excelencia técnica, calidez humana y responsabilidad ética, promoviendo el bienestar animal y la tranquilidad de sus familias.
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div className={`card p-4 h-100 ${cardClass}`}>
            <h2 className="h4 text-info fw-bold mb-3">🚀 Visión</h2>
            <p className="text-secondary m-0">
              Ser la clínica veterinaria referente en la región, destacada por la modernización de nuestros procesos, la digitalización de fichas médicas y la atención multidisciplinaria de mascotas.
            </p>
          </div>
        </div>
      </div>

      <div className={`card p-4 shadow-sm ${cardClass}`}>
        <h3 className="h5 fw-bold mb-3">🏢 Infraestructura San Marcos</h3>
        <p className="text-secondary mb-0">
          Contamos con pabellones quirúrgicos equipados, salas de hospitalización separadas para caninos y felinos, y un sistema en la nube para que tutores consulten el historial de sus mascotas desde cualquier dispositivo.
        </p>
      </div>
    </div>
  );
}