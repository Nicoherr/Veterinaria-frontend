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

Este repositorio incluye un `Dockerfile` para construir la aplicación React y servirla con Nginx. El Compose de AWS del repositorio backend lo utiliza automáticamente y recibe la URL de la API durante la compilación con `VITE_API_BASE_URL`.

Para desplegar ambos repositorios en una instancia EC2:

1. Abre en el grupo de seguridad el puerto TCP `80` desde los clientes que deban acceder al sitio. Para SSH, permite TCP `22` solo desde tu IP. El puerto `8080` debe abrirse si el navegador accederá directamente a la API, como hace la configuración AWS actual.
2. En la instancia instala Docker Engine y el complemento Docker Compose, y confirma que el usuario de despliegue pueda ejecutar Docker.
3. Clona este repositorio y `https://github.com/Nicoherr/Veterinaria-backend.git` en carpetas hermanas dentro de `~/vetsm-app/`, con los nombres `Veterinaria-frontend` y `Veterinaria-backend`.
4. En `~/vetsm-app/Veterinaria-backend`, crea `.env` a partir de `.env.example`. Define `PUBLIC_IP=54.196.172.207`, puertos `SPRING_PORT=8080` y `HTTP_PORT=80`, además de contraseñas nuevas para MySQL y un `JWT_SECRET` aleatorio y largo. No subas ni compartas ese archivo.
5. Desde `~/vetsm-app/Veterinaria-backend`, inicia los servicios:

   ```bash
   docker compose -f docker-compose.aws.yml up --build -d
   ```

El sitio queda en `http://54.196.172.207/` y la API en `http://54.196.172.207:8080/api`. Esta configuración es HTTP sin TLS y sirve para una demostración; no envíes credenciales reales por ella. Para producción, usa un dominio con HTTPS y limita la exposición de la API y de los puertos de administración. La IP pública puede cambiar si la instancia se detiene y se inicia de nuevo.
