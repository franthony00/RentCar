// Carousel functionality
let currentSlide = 0;
const carouselTrack = document.getElementById('carouselTrack');
const carouselImages = document.querySelectorAll('.carousel-image');
const carouselDots = document.getElementById('carouselDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Create dots
carouselImages.forEach((_, index) => {
  const dot = document.createElement('div');
  dot.classList.add('carousel-dot');
  if (index === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(index));
  carouselDots.appendChild(dot);
});

const dots = document.querySelectorAll('.carousel-dot');

function updateCarousel() {
  carouselImages.forEach((img, index) => {
    img.classList.remove('active');
    dots[index].classList.remove('active');
  });
  
  carouselImages[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % carouselImages.length;
  updateCarousel();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + carouselImages.length) % carouselImages.length;
  updateCarousel();
}

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Auto-advance carousel
setInterval(nextSlide, 5000);

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Toggle between login and register forms
const loginCard = document.getElementById('loginCard');
const registerCard = document.getElementById('registerCard');
const showRegisterBtn = document.getElementById('showRegister');
const showLoginBtn = document.getElementById('showLogin');

showRegisterBtn.addEventListener('click', () => {
  loginCard.style.display = 'none';
  registerCard.style.display = 'block';
});

showLoginBtn.addEventListener('click', () => {
  registerCard.style.display = 'none';
  loginCard.style.display = 'block';
});

// Register functionality
const registerForm = document.getElementById('registerForm');
const registerError = document.getElementById('registerError');
const registerSuccess = document.getElementById('registerSuccess');

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('registerConfirmPassword').value;
  
  registerError.classList.remove('show');
  registerSuccess.classList.remove('show');
  
  if (password !== confirmPassword) {
    registerError.textContent = 'Las contraseñas no coinciden';
    registerError.classList.add('show');
    return;
  }
  
  if (password.length < 6) {
    registerError.textContent = 'La contraseña debe tener al menos 6 caracteres';
    registerError.classList.add('show');
    return;
  }
  
  // Get existing users
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  // Check if email already exists
  if (users.some(user => user.email === email)) {
    registerError.textContent = 'Este correo ya está registrado';
    registerError.classList.add('show');
    return;
  }
  
  // Add new user
  users.push({ name, email, password });
  localStorage.setItem('users', JSON.stringify(users));
  
  registerSuccess.textContent = '¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.';
  registerSuccess.classList.add('show');
  
  // Reset form
  registerForm.reset();
  
  // Switch to login after 2 seconds
  setTimeout(() => {
    registerCard.style.display = 'none';
    loginCard.style.display = 'block';
    registerSuccess.classList.remove('show');
  }, 2000);
});

// Login functionality
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const roleModal = document.getElementById('roleModal');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  loginError.classList.remove('show');
  
  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    loginError.textContent = 'Correo o contraseña incorrectos';
    loginError.classList.add('show');
    return;
  }
  
  // Store current user
  localStorage.setItem('currentUser', JSON.stringify(user));
  
  // Show role selection modal
  roleModal.classList.add('show');
});

// Role selection
const clientBtn = document.getElementById('clientBtn');
const developerBtn = document.getElementById('developerBtn');

clientBtn.addEventListener('click', () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  user.role = 'client';
  localStorage.setItem('currentUser', JSON.stringify(user));
  window.location.href = 'app.html';
});

developerBtn.addEventListener('click', () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  user.role = 'developer';
  localStorage.setItem('currentUser', JSON.stringify(user));
  window.location.href = 'app.html';
});
