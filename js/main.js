// Filtros de vehículos
import { initAuth, handleRegister, handleLogin } from './auth.js';

document.addEventListener("DOMContentLoaded", () => {
  // Sistema de autenticación
  const AUTH_KEY = "rentcar_user"

  initAuth();

  // Formulario de registro
  const registroForm = document.getElementById("registroForm")
  if (registroForm) {
    registroForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const nombre = document.getElementById("regNombre").value.trim()
      const cedula = document.getElementById("regCedula").value.trim()
      const telefono = document.getElementById("regTelefono").value.trim()
      const correo = document.getElementById("regCorreo").value.trim()
      const password = document.getElementById("regPassword").value
      const passwordConfirm = document.getElementById("regPasswordConfirm").value

      // Validaciones
      if (!nombre || !cedula || !telefono || !correo || !password || !passwordConfirm) {
        alert("Por favor, complete todos los campos.")
        return
      }

      // Validar formato de correo
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(correo)) {
        alert("Por favor, ingrese un correo electrónico válido.")
        return
      }

      // Validar longitud de contraseña
      if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.")
        return
      }

      // Validar que las contraseñas coincidan
      if (password !== passwordConfirm) {
        alert("Las contraseñas no coinciden.")
        return
      }

      const result = await handleRegister(nombre, cedula, telefono, correo, password)
      
      if (result.success) {
        alert(result.message)
        window.location.href = "index.html"
      } else {
        alert(result.message)
      }
    })
  }

  // Formulario de login
  const loginForm = document.getElementById("loginForm")
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const correo = document.getElementById("loginCorreo").value.trim()
      const password = document.getElementById("loginPassword").value

      // Validaciones
      if (!correo || !password) {
        alert("Por favor, complete todos los campos.")
        return
      }

      const result = await handleLogin(correo, password)
      
      if (result.success) {
        alert(result.message)
        window.location.href = "index.html"
      } else {
        alert(result.message)
      }
    })
  }

  // Filtros de vehículos
  const filterButtons = document.querySelectorAll(".filter-btn")
  const vehiculoCards = document.querySelectorAll(".vehiculo-card")

  if (filterButtons.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remover clase active de todos los botones
        filterButtons.forEach((btn) => btn.classList.remove("active"))
        // Agregar clase active al botón clickeado
        this.classList.add("active")

        const filter = this.getAttribute("data-filter")

        vehiculoCards.forEach((card) => {
          if (filter === "todos") {
            card.style.display = "block"
          } else {
            const categoria = card.getAttribute("data-categoria")
            if (categoria === filter) {
              card.style.display = "block"
            } else {
              card.style.display = "none"
            }
          }
        })
      })
    })
  }

  // Formulario de reserva
  const reservaForm = document.getElementById("reservaForm")
  if (reservaForm) {
    // Obtener vehículo de URL si existe
    const urlParams = new URLSearchParams(window.location.search)
    const vehiculoParam = urlParams.get("vehiculo")
    if (vehiculoParam) {
      document.getElementById("vehiculo").value = vehiculoParam
    }

    // Establecer fecha mínima como hoy
    const today = new Date().toISOString().split("T")[0]
    document.getElementById("fechaAlquiler").setAttribute("min", today)
    document.getElementById("fechaDevolucion").setAttribute("min", today)

    reservaForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Obtener valores del formulario
      const nombre = document.getElementById("nombre").value.trim()
      const cedula = document.getElementById("cedula").value.trim()
      const vehiculo = document.getElementById("vehiculo").value
      const fechaAlquiler = document.getElementById("fechaAlquiler").value
      const fechaDevolucion = document.getElementById("fechaDevolucion").value

      // Validaciones
      if (!nombre || !cedula || !vehiculo || !fechaAlquiler || !fechaDevolucion) {
        alert("Por favor, complete todos los campos.")
        return
      }

      // Validar que la fecha de devolución sea posterior a la de alquiler
      const dateAlquiler = new Date(fechaAlquiler)
      const dateDevolucion = new Date(fechaDevolucion)

      if (dateDevolucion <= dateAlquiler) {
        alert("La fecha de devolución debe ser posterior a la fecha de alquiler.")
        return
      }

      // Validar que las fechas no sean en el pasado
      const hoy = new Date()
      hoy.setHours(0, 0, 0, 0)

      if (dateAlquiler < hoy) {
        alert("La fecha de alquiler no puede ser en el pasado.")
        return
      }

      // Calcular días de alquiler
      const diffTime = Math.abs(dateDevolucion - dateAlquiler)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      // Obtener precio del vehículo
      const precios = {
        "Toyota Corolla": 45,
        "Honda Civic": 50,
        "Toyota RAV4": 75,
        "Nissan X-Trail": 80,
        "Mercedes-Benz C-Class": 150,
        "BMW Serie 3": 160,
      }

      const precioDia = precios[vehiculo] || 0
      const total = precioDia * diffDays

      // Formatear fechas
      const formatearFecha = (fecha) => {
        const date = new Date(fecha + "T00:00:00")
        return date.toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      }

      // Mostrar resumen
      document.getElementById("resumenNombre").textContent = nombre
      document.getElementById("resumenCedula").textContent = cedula
      document.getElementById("resumenVehiculo").textContent = vehiculo
      document.getElementById("resumenFechaAlquiler").textContent = formatearFecha(fechaAlquiler)
      document.getElementById("resumenFechaDevolucion").textContent = formatearFecha(fechaDevolucion)
      document.getElementById("resumenDias").textContent = diffDays
      document.getElementById("resumenTotal").textContent = total.toFixed(2)

      // Ocultar formulario y mostrar resumen
      reservaForm.style.display = "none"
      document.getElementById("resumenReserva").style.display = "block"

      // Scroll al resumen
      document.getElementById("resumenReserva").scrollIntoView({ behavior: "smooth" })
    })

    // Actualizar fecha mínima de devolución cuando cambia la fecha de alquiler
    document.getElementById("fechaAlquiler").addEventListener("change", function () {
      const fechaAlquiler = this.value
      if (fechaAlquiler) {
        const date = new Date(fechaAlquiler)
        date.setDate(date.getDate() + 1)
        const minDevolucion = date.toISOString().split("T")[0]
        document.getElementById("fechaDevolucion").setAttribute("min", minDevolucion)
      }
    })
  }

  // Formulario de contacto
  const contactoForm = document.getElementById("contactoForm")
  if (contactoForm) {
    contactoForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const nombre = document.getElementById("contactoNombre").value.trim()
      const correo = document.getElementById("contactoCorreo").value.trim()
      const mensaje = document.getElementById("contactoMensaje").value.trim()

      if (!nombre || !correo || !mensaje) {
        alert("Por favor, complete todos los campos.")
        return
      }

      // Validar formato de correo
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(correo)) {
        alert("Por favor, ingrese un correo electrónico válido.")
        return
      }

      // Simular envío exitoso
      contactoForm.style.display = "none"
      document.getElementById("mensajeExito").style.display = "block"

      // Reiniciar formulario después de 3 segundos
      setTimeout(() => {
        contactoForm.reset()
        contactoForm.style.display = "block"
        document.getElementById("mensajeExito").style.display = "none"
      }, 3000)
    })
  }
})
