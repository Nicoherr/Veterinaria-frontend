import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { darkMode } = useAuth();

  const cardClass = darkMode
    ? 'h-100 bg-dark text-white border border-secondary rounded-3 shadow-sm overflow-hidden'
    : 'h-100 bg-light text-dark border rounded-3 shadow-sm overflow-hidden';

  const sectionClass = darkMode
    ? 'p-4 border border-secondary rounded-3 bg-dark text-white shadow-sm my-4'
    : 'p-4 border rounded-3 bg-white text-dark shadow-sm my-4';

  return (
    <div className="container py-4">
      {/* Banner Principal / Hero */}
      <div 
        className="p-5 mb-4 text-white rounded-3 shadow-sm position-relative overflow-hidden"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/6235666/pexels-photo-6235666.jpeg?auto=compress&cs=tinysrgb&w=1200")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '380px'
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

        <div className="container-fluid py-3 position-relative" style={{ zIndex: 1 }}>
          <h1 className="display-4 fw-bold">Bienvenido a VetSM</h1>
          <p className="col-md-9 fs-4 text-light">
            Atención veterinaria integral, profesionales capacitados y la mejor tecnología para el cuidado y bienestar de tus mascotas.
          </p>
          <div className="d-flex gap-3 mt-4">
            <Link to="/servicios" className="btn btn-light btn-lg text-primary fw-semibold">
              Ver Servicios
            </Link>
            <Link to="/contacto" className="btn btn-outline-light btn-lg">
              Agendar Cita / Contacto
            </Link>
          </div>
        </div>
      </div>

      {/* Servicios Destacados con Imágenes Estables */}
      <div className="row align-items-md-stretch my-5">
        <div className="col-md-4 mb-3">
          <div className={cardClass}>
            <img 
              src="https://images.pexels.com/photos/6235228/pexels-photo-6235228.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Consultas Médicas" 
              className="w-100"
              style={{ height: '180px', objectFit: 'cover' }}
            />
            <div className="p-4">
              <h3 className="fw-bold">Consultas Médicas</h3>
              <p className={darkMode ? 'text-light-50 m-0' : 'text-muted m-0'}>
                Atención general y especializada para perros, gatos y especies pequeñas con diagnósticos precisos.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className={cardClass}>
            <img 
              src="https://images.pexels.com/photos/7469213/pexels-photo-7469213.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Vacunación y Desparasitación" 
              className="w-100"
              style={{ height: '180px', objectFit: 'cover' }}
            />
            <div className="p-4">
              <h3 className="fw-bold">Vacunación y Desparasitación</h3>
              <p className={darkMode ? 'text-light-50 m-0' : 'text-muted m-0'}>
                Planes de inmunización al día y control preventivo integral para mantener sana a tu mascota.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className={cardClass}>
            <img 
              src="https://images.pexels.com/photos/7469224/pexels-photo-7469224.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Urgencias 24/7" 
              className="w-100"
              style={{ height: '180px', objectFit: 'cover' }}
            />
            <div className="p-4">
              <h3 className="fw-bold">Urgencias 24/7</h3>
              <p className={darkMode ? 'text-light-50 m-0' : 'text-muted m-0'}>
                Equipo médico disponible las 24 horas para atender cualquier emergencia clínica de tu mascota.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ubicación y Mapa */}
      <div className={sectionClass}>
        <h2 className="mb-4 text-primary fw-bold">Nuestra Ubicación y Contacto</h2>
        <div className="row">
          <div className="col-md-5 mb-3">
            <h5 className="fw-bold">Centro Clínico VetSM</h5>
            <ul className="list-unstyled mt-3">
              <li className="mb-2"><strong>📍 Dirección:</strong> Av. Providencia 1234, Santiago, Chile</li>
              <li className="mb-2"><strong>📞 Teléfono:</strong> +56 2 2345 6789</li>
              <li className="mb-2"><strong>✉️ Email:</strong> contacto@vetsm.cl</li>
              <li className="mb-2">
                <strong>🕒 Horario de Atención:</strong><br />
                Lunes a Viernes: 09:00 - 20:00 hrs<br />
                Sábados y Domingos: 10:00 - 18:00 hrs (Urgencias 24/7)
              </li>
            </ul>
            <Link to="/contacto" className="btn btn-primary mt-2">
              Enviar un mensaje
            </Link>
          </div>
          <div className="col-md-7">
            <div className="ratio ratio-16x9 rounded overflow-hidden border">
              <iframe
                title="Ubicacion VetSM"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.845403234105!2d-70.6185!3d-33.4265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c59d9a0d8e87%3A0x8e87d8a0d9f0a0d0!2sAv.%20Providencia%2C%20Providencia%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1700000000000!5m2!1ses!2scl"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;