import React from 'react';
import { Link } from 'react-router-dom';

const serviciosDestacados = [
  {
    titulo: 'Consultas médicas',
    descripcion: 'Atención general y especializada para perros, gatos y especies pequeñas con diagnósticos precisos.',
    imagen: 'https://images.pexels.com/photos/6235228/pexels-photo-6235228.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Profesional veterinaria atendiendo a una mascota',
  },
  {
    titulo: 'Vacunación y prevención',
    descripcion: 'Planes de inmunización al día y control preventivo integral para mantener sana a tu mascota.',
    imagen: 'https://images.pexels.com/photos/7469213/pexels-photo-7469213.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Atención preventiva para mascotas',
  },
  {
    titulo: 'Urgencias 24/7',
    descripcion: 'Equipo médico disponible las 24 horas para atender cualquier emergencia clínica de tu mascota.',
    imagen: 'https://images.pexels.com/photos/7469224/pexels-photo-7469224.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Equipo veterinario listo para atender',
  },
];

export default function Home() {
  return (
    <div>
      <section
        className="hero-panel"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/6235666/pexels-photo-6235666.jpeg?auto=compress&cs=tinysrgb&w=1600")',
        }}
        aria-labelledby="home-title"
      >
        <div className="hero-content">
          <p className="hero-eyebrow">Veterinaria San Marcos · Santiago</p>
          <h1 className="hero-title" id="home-title">Su bienestar, nuestra vocación.</h1>
          <p className="hero-description">
            Atención veterinaria cercana e integral para que cada etapa de la vida de tu mascota sea más saludable.
          </p>
          <div className="hero-actions">
            <Link to="/servicios" className="btn btn-light btn-lg text-success">
              Conoce nuestros servicios
            </Link>
            <Link to="/contacto" className="btn btn-outline-light btn-lg">
              Agenda una atención
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section" aria-labelledby="services-title">
        <div className="mb-4">
          <p className="section-eyebrow mb-2">Cuidado completo</p>
          <h2 className="section-title" id="services-title">Todo lo que necesita, en un solo lugar.</h2>
          <p className="section-description mb-0">
            Un equipo comprometido con la salud y tranquilidad de quienes más quieres.
          </p>
        </div>

        <div className="row g-4">
          {serviciosDestacados.map((servicio) => (
            <div className="col-md-6 col-xl-4" key={servicio.titulo}>
              <article className="service-card">
                <img src={servicio.imagen} alt={servicio.alt} loading="lazy" />
                <div className="service-card-body">
                  <h3>{servicio.titulo}</h3>
                  <p>{servicio.descripcion}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section pt-0" aria-labelledby="location-title">
        <div className="contact-panel row g-0">
          <div className="col-lg-5">
            <div className="contact-details">
              <p className="section-eyebrow mb-2">Estamos para ayudarte</p>
              <h2 className="section-title" id="location-title">Visítanos</h2>
              <p className="section-description">
                Ven a conocernos o comunícate con nuestro equipo para resolver tus dudas.
              </p>

              <ul className="contact-list">
                <li><span className="contact-icon" aria-hidden="true">⌖</span><span><strong>Dirección</strong><br />Av. Providencia 1234, Santiago, Chile</span></li>
                <li><span className="contact-icon" aria-hidden="true">☎</span><span><strong>Teléfono</strong><br />+56 2 2345 6789</span></li>
                <li><span className="contact-icon" aria-hidden="true">✉</span><span><strong>Correo</strong><br />contacto@vetsm.cl</span></li>
                <li><span className="contact-icon" aria-hidden="true">◷</span><span><strong>Horario</strong><br />Lun–Vie: 09:00–20:00 · Sáb–Dom: 10:00–18:00<br />Urgencias disponibles 24/7</span></li>
              </ul>

              <Link to="/contacto" className="btn btn-primary">
                Contactar a la clínica
              </Link>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="contact-map">
              <iframe
                title="Ubicación de Veterinaria San Marcos en Providencia"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.845403234105!2d-70.6185!3d-33.4265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c59d9a0d8e87%3A0x8e87d8a0d9f0a0d0!2sAv.%20Providencia%2C%20Providencia%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1700000000000!5m2!1ses!2scl"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
