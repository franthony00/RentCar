// Initialize localStorage for users if not exists
if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify([]));
}

// Registration Form Handler
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    const errorDiv = document.getElementById('registerError');
    const successDiv = document.getElementById('registerSuccess');
    
    // Reset messages
    errorDiv.classList.remove('show');
    successDiv.classList.remove('show');
    
    // Validation
    if (!fullName || !email || !password || !confirmPassword) {
      errorDiv.textContent = 'Todos los campos son obligatorios';
      errorDiv.classList.add('show');
      return;
    }
    
    if (password.length < 6) {
      errorDiv.textContent = 'La contraseña debe tener al menos 6 caracteres';
      errorDiv.classList.add('show');
      return;
    }
    
    if (password !== confirmPassword) {
      errorDiv.textContent = 'Las contraseñas no coinciden';
      errorDiv.classList.add('show');
      return;
    }
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users'));
    
    // Check if email already exists
    if (users.find(user => user.email === email)) {
      errorDiv.textContent = 'Este correo ya está registrado';
      errorDiv.classList.add('show');
      return;
    }
    
    // Create new user
    const newUser = {
      id: Date.now(),
      fullName,
      email,
      password // In production, this should be hashed
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    successDiv.textContent = '¡Registro exitoso! Redirigiendo al inicio de sesión...';
    successDiv.classList.add('show');
    
    // Redirect to login after 2 seconds
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);
  });
}

// Login Form Handler
const loginForm = document.getElementById('loginForm');
const roleModal = document.getElementById('roleModal');

if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    const errorDiv = document.getElementById('loginError');
    errorDiv.classList.remove('show');
    
    // Validation
    if (!email || !password) {
      errorDiv.textContent = 'Por favor ingresa tu correo y contraseña';
      errorDiv.classList.add('show');
      return;
    }
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users'));
    
    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      errorDiv.textContent = 'Correo o contraseña incorrectos';
      errorDiv.classList.add('show');
      return;
    }
    
    // Save current user to sessionStorage (temporary session)
    sessionStorage.setItem('currentUser', JSON.stringify({
      id: user.id,
      fullName: user.fullName,
      email: user.email
    }));
    
    // Show role selection modal
    roleModal.classList.add('show');
  });
}

// Role Selection
const clientBtn = document.getElementById('clientBtn');
const developerBtn = document.getElementById('developerBtn');

if (clientBtn) {
  clientBtn.addEventListener('click', function() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    currentUser.role = 'client';
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    window.location.href = 'app.html';
  });
}

if (developerBtn) {
  developerBtn.addEventListener('click', function() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    currentUser.role = 'developer';
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    window.location.href = 'app.html';
  });
}
