import { auth, db } from './firebase-config.js';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
  doc, 
  setDoc, 
  getDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Verificar estado de autenticación
export function initAuth() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Usuario logueado
      const userDoc = await getDoc(doc(db, "usuarios", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        updateUserMenu(userData.nombre);
      } else {
        updateUserMenu(user.email);
      }
    } else {
      // Usuario no logueado
      updateUserMenu(null);
    }
  });
}

// Actualizar menú de usuario
function updateUserMenu(userName) {
  const userMenus = document.querySelectorAll(".user-menu");
  
  userMenus.forEach((userMenu) => {
    if (userName) {
      // Usuario logueado
      userMenu.innerHTML = `
        <div class="user-info">Hola, <span>${userName}</span></div>
        <button class="btn-logout" id="logoutBtn">Cerrar Sesión</button>
      `;
      
      const logoutBtn = userMenu.querySelector("#logoutBtn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", handleLogout);
      }
    } else {
      // Usuario no logueado
      userMenu.innerHTML = `
        <a href="login.html" class="btn-login">Iniciar Sesión</a>
        <a href="registro.html" class="btn-register">Registrarse</a>
      `;
    }
  });
}

// Registrar usuario
export async function handleRegister(nombre, cedula, telefono, correo, password) {
  try {
    // Crear usuario en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, correo, password);
    const user = userCredential.user;
    
    // Guardar información adicional en Firestore
    await setDoc(doc(db, "usuarios", user.uid), {
      nombre: nombre,
      cedula: cedula,
      telefono: telefono,
      correo: correo,
      fechaRegistro: new Date().toISOString()
    });
    
    return { success: true, message: "¡Registro exitoso! Bienvenido a RentCar Express." };
  } catch (error) {
    let errorMessage = "Error al registrar usuario.";
    
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = "Este correo electrónico ya está registrado.";
    } else if (error.code === 'auth/weak-password') {
      errorMessage = "La contraseña debe tener al menos 6 caracteres.";
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = "Por favor, ingrese un correo electrónico válido.";
    }
    
    return { success: false, message: errorMessage };
  }
}

// Iniciar sesión
export async function handleLogin(correo, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, correo, password);
    const user = userCredential.user;
    
    // Obtener datos del usuario desde Firestore
    const userDoc = await getDoc(doc(db, "usuarios", user.uid));
    let nombreUsuario = user.email;
    
    if (userDoc.exists()) {
      nombreUsuario = userDoc.data().nombre;
    }
    
    return { 
      success: true, 
      message: `¡Bienvenido de nuevo, ${nombreUsuario}!` 
    };
  } catch (error) {
    let errorMessage = "Error al iniciar sesión.";
    
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      errorMessage = "Correo o contraseña incorrectos.";
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = "Por favor, ingrese un correo electrónico válido.";
    }
    
    return { success: false, message: errorMessage };
  }
}

export async function handleLogout() {
  try {
    await signOut(auth);
    window.location.href = "index.html";
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    alert("Error al cerrar sesión. Por favor, intente nuevamente.");
  }
}

// Obtener usuario actual
export function getCurrentUser() {
  return auth.currentUser;
}
