# 🐾 VetSM - Plataforma Web Veterinaria San Marcos

Sistema web frontend desarrollado en React para la gestión integral de citas, mascotas, fichas clínicas y consultas médicas de la clínica veterinaria VetSM.

---

## 🛠️ Tech Stack & Arquitectura Frontend (IE2.1.1 / IE2.1.3)

- **Framework principal:** React 18 + Vite (Javascript SPA).
- **Enrutamiento:** React Router v6 con rutas públicas y privadas (`ProtectedRoute`).
- **Diseño Responsivo:** Bootstrap 5 (CDN) integrado mediante componentes modulares y clases nativas (`container`, `row`, `col-md-*`, `form-control`, `navbar`).
- **Gestión de Estado:** `useState` global en `App.jsx` para el manejo centralizado de **Modo Oscuro / Claro** (`darkMode`) y **Autenticación** (`isLoggedIn`).
- **Validaciones:** Expresiones regulares (Regex) para control de tipos de texto, longitud de números y formato de correo electrónico.

---

## 🔒 Rutas y Control de Acceso

| Ruta | Acceso | Descripción |
| :--- | :--- | :--- |
| `/` | Público | Portada principal, instalaciones, horarios y mapa interactivo. |
| `/nosotros` | Público | Misión, visión y valores institucionales. |
| `/servicios` | Público | Listado de atención médica y especialidades. |
| `/contacto` | Público | Formulario de contacto con validación estricta de inputs. |
| `/login` | Público | Autenticación tradicional con correo electrónico y contraseña. |
| `/mascotas` | **Protegido** | Panel privado para visualizar mascotas registradas, vacunas e historial. |

---

## 🧪 Pruebas Unitarias y Cobertura (IE2.2.1 / IE2.3.1 / IE2.3.2)

El proyecto cuenta con un entorno de testing automatizado configurado con **Jasmine** y el ejecutor **Karma**, garantizando la calidad del código mediante pruebas de renderizado y lógica de componentes.

### Ejecución de Pruebas
Para correr el conjunto de pruebas unitarias y generar el informe de cobertura:

```bash
npm test
```

### URL del backend

En desarrollo, el frontend usa `http://localhost:8080/api` por defecto. Para despliegues, configura la variable de repositorio `VITE_API_BASE_URL` en **Settings → Secrets and variables → Actions → Variables** con la URL pública de la API, incluyendo `/api` (por ejemplo `https://api.ejemplo.cl/api`). El workflow de GitHub Pages no publica el sitio si falta esa variable.

El sitio se publica en `https://nicoherr.github.io/Veterinaria-frontend/` y usa rutas con hash para que la navegación siga funcionando al recargar una página en GitHub Pages. El workflow intenta habilitar Pages; si GitHub rechaza el permiso, habilítalo en **Settings → Pages → Build and deployment → GitHub Actions**.

En producción, configura en el backend `CORS_ALLOWED_ORIGINS=https://nicoherr.github.io`; el valor es el origen del sitio y no incluye la ruta `/Veterinaria-frontend/`.

## Despliegue en EC2 con Docker

Este repositorio incluye un `Dockerfile` que compila React y sirve los archivos estáticos con Nginx en el puerto 80. El Compose de EC2 está en el repositorio backend, en `docker-compose.aws.yml`; recibe `VITE_API_BASE_URL` durante la compilación y apunta a la API pública.

Clona ambos repositorios como carpetas hermanas dentro de `~/vetsm-app/`, con los nombres `Veterinaria-backend` y `Veterinaria-frontend`. Dentro de `Veterinaria-backend`, crea `.env` desde `.env.example`, define la IP pública de EC2 y establece secretos nuevos para MySQL y JWT. Luego inicia el despliegue desde ese directorio:

```bash
docker compose -f docker-compose.aws.yml up --build -d
```

El sitio queda en `http://<PUBLIC_IP>/` y la API en `http://<PUBLIC_IP>:8080/api`. La API debe estar accesible desde el navegador para este despliegue; no abras el puerto MySQL `3306` ni el puerto de desarrollo Vite `5173`. La configuración HTTP es solo para demostración: para producción, usa un dominio con HTTPS y restringe los puertos a los clientes necesarios. La IP pública puede cambiar si la instancia se detiene y se inicia de nuevo.
