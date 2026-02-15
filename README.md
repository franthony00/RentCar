# RentCar Express (RencardExpress) 🚗💼
Sistema web para **renta de vehículos** con una experiencia clara y moderna: landing informativa, autenticación, selección de rol y un flujo sencillo de **reserva** desde catálogo filtrable.

🌐 **Demo en vivo:** https://v0-personal-portfolio-website-nine-hazel.vercel.app/

---

## 🎯 Objetivo del sistema
Facilitar el proceso de alquiler desde la web:
1) El usuario entra a la plataforma  
2) Ve beneficios y catálogo de vehículos  
3) Inicia sesión / se registra  
4) Selecciona su rol (Cliente / Desarrollador)  
5) Realiza una **reserva** completando un formulario (datos personales + fechas + vehículo)

---

## 🧱 Tecnologías usadas

### Frontend
- **HTML5**: estructura de páginas y formularios
- **CSS3**: estilos visuales (interfaz limpia tipo “corporativa”)
- **JavaScript (ES6+)**: interacción, navegación y lógica del sistema

### Servicios
- **Firebase** *(si está habilitado en tu proyecto)*: autenticación y configuración del sistema (`firebase-config.js`)

---

## 🧩 Pantallas / Módulos visibles en la app
✅ **Landing (Inicio):**
- Hero “Renta el Vehículo Perfecto…”
- Botón “Comienza Ahora”
- Navegación superior (Inicio, Beneficios, Iniciar Sesión)

 **Beneficios:**
- Rapidez
- Variedad de Vehículos
- Atención Personalizada

 **Autenticación:**
- Formulario de inicio de sesión

 **Selección de rol:**
- Cliente (explorar y reservar)
- Desarrollador (administrar catálogo)

 **Catálogo de vehículos:**
- Sección “Nuestros Vehículos”
- Filtros por categoría: **Todos / Económico / SUV / Lujo**
- Cards con año, modelo, precio por día y botón **Reservar**

 **Formulario de reserva:**
- Nombre completo
- Cédula
- Fecha de alquiler
- Fecha de devolución
- Seleccionar vehículo
- Botón **Confirmar Reserva**

---

## 📂 Estructura del proyecto
> Basada en lo que tienes en el repositorio.

- `index.html` → Landing + beneficios + acceso a login  
- `app.html` → Interfaz principal del sistema (reserva + catálogo)  
- `register.html` → Registro de usuarios  
- `styles.css` → Estilos globales  
- `landing.js` → Lógica de la landing y navegación  
- `auth.js` → Lógica de autenticación  
- `app.js` → Lógica de reservas / catálogo / eventos  
- `firebase-config.js` → Configuración Firebase  
- `public/` → Recursos públicos (logos, imágenes de vehículos)  
- `img/` → Recursos adicionales  
- `package.json` → Configuración del proyecto

---

## 🛠️ Cómo ejecutar
### Opción 1: VS Code (recomendado)
1. Instala **Live Server**
2. Click derecho a `index.html`
3. **Open with Live Server**

### Opción 2: Abrir directo
- Abre `index.html` en el navegador *(puede fallar alguna ruta si no usas servidor local)*

---

## ✨ Funcionalidades destacadas
- Diseño limpio y profesional
- Flujo de reserva claro (datos + fechas + vehículo)
- Catálogo filtrable por tipo de vehículo
- Estructura modular por archivos JS (auth / landing / app)
- Preparado para extender a:
  - Cotizaciones formales
  - Pagos
  - Facturación PDF
  - Panel de administración

---

## 📌 Autor
**Franthony Sánchez**  
Proyecto académico: **Ingeniería de Software II**
