const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (!currentUser) {
  window.location.href = 'index.html';
}

// Initialize vehicles in localStorage if not exists
if (!localStorage.getItem('vehicles')) {
  const defaultVehicles = [
    { id: 1, name: 'Toyota Corolla', year: 2023, price: 45, category: 'economico', image: 'img/toyota-corolla-sedan.jpg' },
    { id: 2, name: 'Hyundai Tucson', year: 2024, price: 70, category: 'suv', image: 'img/hyundai-tucson-suv.png' },
    { id: 3, name: 'Kia Rio', year: 2022, price: 40, category: 'economico', image: 'img/kia-rio-hatchback.jpg' },
    { id: 4, name: 'Chevrolet Tracker', year: 2023, price: 65, category: 'suv', image: 'img/chevrolet-tracker-suv.jpg' },
    { id: 5, name: 'Nissan Versa', year: 2024, price: 42, category: 'economico', image: 'img/nissan-versa-sedan.jpg' },
    { id: 6, name: 'Ford Escape', year: 2023, price: 75, category: 'suv', image: 'img/ford-escape-suv.jpg' },
    { id: 7, name: 'Jeep Renegade', year: 2024, price: 68, category: 'suv', image: 'img/jeep-renegade-compact.jpg' },
    { id: 8, name: 'Honda Civic', year: 2023, price: 48, category: 'economico', image: 'img/honda-civic-sedan.jpg' },
    { id: 9, name: 'Mazda 3', year: 2022, price: 52, category: 'economico', image: 'img/mazda-3-sedan.jpg' },
    { id: 10, name: 'Mercedes-Benz C-Class', year: 2024, price: 120, category: 'lujo', image: 'img/mercedes-c-class.jpg' },
    { id: 11, name: 'BMW X5', year: 2024, price: 135, category: 'lujo', image: 'img/bmw-x5.jpg' },
    { id: 12, name: 'Audi A6', year: 2023, price: 125, category: 'lujo', image: 'img/audi-a6.jpg' }
  ];
  localStorage.setItem('vehicles', JSON.stringify(defaultVehicles));
}

document.getElementById('userName').textContent = currentUser.name;
if (document.getElementById('userNameDev')) {
  document.getElementById('userNameDev').textContent = currentUser.name;
}
if (document.getElementById('userRole')) {
  document.getElementById('userRole').textContent = currentUser.role === 'client' ? 'Cliente' : 'Desarrollador';
}

// Show appropriate view based on role
const clientView = document.getElementById('clientView');
const developerView = document.getElementById('developerView');
const clientNav = document.getElementById('clientNav');
const developerNav = document.getElementById('developerNav');

let currentFilter = 'todos';

function setupFilterButtons() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentFilter = this.getAttribute('data-filter');
      displayVehiclesGrid();
    });
  });
}

// Display vehicles in grid (Client View)
function displayVehiclesGrid() {
  const vehicles = JSON.parse(localStorage.getItem('vehicles'));
  const grid = document.getElementById('vehicleGrid');
  grid.innerHTML = '';
  
  // Filter vehicles based on current filter
  const filteredVehicles = currentFilter === 'todos' 
    ? vehicles 
    : vehicles.filter(v => v.category === currentFilter);
  
  filteredVehicles.forEach(vehicle => {
    const card = document.createElement('div');
    card.className = 'vehicle-card';
    card.innerHTML = `
      <img src="${vehicle.image}" alt="${vehicle.name}" class="vehicle-image">
      <div class="vehicle-info">
        <span class="vehicle-category">${vehicle.year}</span>
        <h3 class="vehicle-name">${vehicle.name} ${getCategoryLabel(vehicle.category)}</h3>
        <p class="vehicle-price">$${vehicle.price}<span>/día</span></p>
        <button class="btn-reserve" data-id="${vehicle.id}">Reservar</button>
      </div>
    `;
    grid.appendChild(card);
  });
  
  // Add event listeners to reserve buttons
  document.querySelectorAll('.btn-reserve').forEach(btn => {
    btn.addEventListener('click', function() {
      const vehicleId = parseInt(this.getAttribute('data-id'));
      showReservationModal(vehicleId);
    });
  });
}

// Display vehicles in table (Developer View)
function displayVehiclesTable() {
  const vehicles = JSON.parse(localStorage.getItem('vehicles'));
  const tableDiv = document.getElementById('vehicleTable');
  
  let tableHTML = `
    <table>
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Vehículo</th>
          <th>Año</th>
          <th>Precio/día</th>
          <th>Categoría</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
  `;
  
  vehicles.forEach(vehicle => {
    tableHTML += `
      <tr>
        <td><img src="${vehicle.image}" alt="${vehicle.name}" class="table-image"></td>
        <td>${vehicle.name}</td>
        <td>${vehicle.year || 'N/A'}</td>
        <td>$${vehicle.price}</td>
        <td>${getCategoryLabel(vehicle.category)}</td>
        <td class="table-actions">
          <button class="btn-edit" data-id="${vehicle.id}">Editar</button>
          <button class="btn-delete" data-id="${vehicle.id}">Eliminar</button>
        </td>
      </tr>
    `;
  });
  
  tableHTML += `
      </tbody>
    </table>
  `;
  
  tableDiv.innerHTML = tableHTML;
  
  // Add event listeners
  document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', function() {
      const vehicleId = parseInt(this.getAttribute('data-id'));
      editVehicle(vehicleId);
    });
  });
  
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', function() {
      const vehicleId = parseInt(this.getAttribute('data-id'));
      deleteVehicle(vehicleId);
    });
  });
}

// Add Vehicle Button
const addVehicleBtn = document.getElementById('addVehicleBtn');
const vehicleModal = document.getElementById('vehicleModal');
const vehicleForm = document.getElementById('vehicleForm');
const modalTitle = document.getElementById('modalTitle');
const cancelBtn = document.getElementById('cancelBtn');
const closeModalBtns = document.querySelectorAll('.close');

let editingVehicleId = null;

if (addVehicleBtn) {
  addVehicleBtn.addEventListener('click', function() {
    editingVehicleId = null;
    modalTitle.textContent = 'Agregar Vehículo';
    vehicleForm.reset();
    vehicleModal.classList.add('show');
  });
}

// Close modal handlers
closeModalBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    vehicleModal.classList.remove('show');
    document.getElementById('reservationModal').classList.remove('show');
  });
});

if (cancelBtn) {
  cancelBtn.addEventListener('click', function() {
    vehicleModal.classList.remove('show');
  });
}

// Vehicle Form Submit
if (vehicleForm) {
  vehicleForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('vehicleName').value.trim();
    const year = parseInt(document.getElementById('vehicleYear').value);
    const price = parseInt(document.getElementById('vehiclePrice').value);
    const category = document.getElementById('vehicleCategory').value;
    const image = document.getElementById('vehicleImage').value.trim();
    
    const vehicles = JSON.parse(localStorage.getItem('vehicles'));
    
    if (editingVehicleId) {
      const index = vehicles.findIndex(v => v.id === editingVehicleId);
      vehicles[index] = { id: editingVehicleId, name, year, price, category, image };
    } else {
      const newVehicle = {
        id: Date.now(),
        name,
        year,
        price,
        category,
        image
      };
      vehicles.push(newVehicle);
    }
    
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
    vehicleModal.classList.remove('show');
    displayVehiclesTable();
  });
}

// Edit Vehicle
function editVehicle(id) {
  const vehicles = JSON.parse(localStorage.getItem('vehicles'));
  const vehicle = vehicles.find(v => v.id === id);
  
  if (vehicle) {
    editingVehicleId = id;
    modalTitle.textContent = 'Editar Vehículo';
    document.getElementById('vehicleName').value = vehicle.name;
    document.getElementById('vehicleYear').value = vehicle.year || 2024;
    document.getElementById('vehiclePrice').value = vehicle.price;
    document.getElementById('vehicleCategory').value = vehicle.category;
    document.getElementById('vehicleImage').value = vehicle.image;
    vehicleModal.classList.add('show');
  }
}

// Delete Vehicle
function deleteVehicle(id) {
  if (confirm('¿Estás seguro que deseas eliminar este vehículo?')) {
    let vehicles = JSON.parse(localStorage.getItem('vehicles'));
    vehicles = vehicles.filter(v => v.id !== id);
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
    displayVehiclesTable();
  }
}

// Show Reservation Modal
function showReservationModal(vehicleId) {
  const vehicles = JSON.parse(localStorage.getItem('vehicles'));
  const vehicle = vehicles.find(v => v.id === vehicleId);
  
  if (vehicle) {
    // Pre-fill the reservation form and scroll to it
    document.getElementById('selectedVehicle').value = vehicleId;
    
    // Scroll to reservation form
    const reservationSection = document.getElementById('reserva');
    if (reservationSection) {
      reservationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
  if (event.target === vehicleModal) {
    vehicleModal.classList.remove('show');
  }
  if (event.target === document.getElementById('reservationModal')) {
    document.getElementById('reservationModal').classList.remove('show');
  }
});

// Helper function for category labels
function getCategoryLabel(category) {
  const labels = {
    'economico': 'Económico',
    'suv': 'SUV',
    'lujo': 'Lujo'
  };
  return labels[category] || category;
}

function populateVehicleSelect() {
  const vehicles = JSON.parse(localStorage.getItem('vehicles'));
  const select = document.getElementById('selectedVehicle');
  
  vehicles.forEach(vehicle => {
    const option = document.createElement('option');
    option.value = vehicle.id;
    option.textContent = `${vehicle.name} ${vehicle.year} - $${vehicle.price}/día`;
    select.appendChild(option);
  });
}

if (currentUser.role === 'client') {
  clientView.style.display = 'block';
  clientNav.style.display = 'flex';
  populateVehicleSelect();
  displayVehiclesGrid();
  setupFilterButtons();
  
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
  
  // Reservation form handler
  document.getElementById('reservationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const clientName = document.getElementById('clientName').value;
    const clientId = document.getElementById('clientId').value;
    const pickupDate = document.getElementById('pickupDate').value;
    const returnDate = document.getElementById('returnDate').value;
    const selectedVehicleId = parseInt(document.getElementById('selectedVehicle').value);
    
    const vehicles = JSON.parse(localStorage.getItem('vehicles'));
    const vehicle = vehicles.find(v => v.id === selectedVehicleId);
    
    // Calculate days
    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);
    const days = Math.ceil((returnD - pickup) / (1000 * 60 * 60 * 24));
    
    if (days <= 0) {
      alert('La fecha de devolución debe ser posterior a la fecha de alquiler');
      return;
    }
    
    const total = days * vehicle.price;
    
    showReservationSummary({
      clientName,
      clientId,
      vehicle: vehicle.name,
      pickupDate,
      returnDate,
      days,
      total
    });
  });
  
  // Contact form handler
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;
    
    alert(`¡Mensaje enviado con éxito!\n\nNos pondremos en contacto contigo pronto, ${name}.`);
    this.reset();
  });
  
  document.getElementById('logoutBtnNav').addEventListener('click', function() {
    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
      localStorage.removeItem('currentUser');
      window.location.href = 'index.html';
    }
  });
} else {
  developerView.style.display = 'block';
  developerNav.style.display = 'flex';
  displayVehiclesTable();
  
  document.getElementById('logoutBtnNavDev').addEventListener('click', function() {
    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
      localStorage.removeItem('currentUser');
      window.location.href = 'index.html';
    }
  });
}

function showReservationSummary(data) {
  const modal = document.getElementById('reservationModal');
  const summary = document.getElementById('reservationSummary');
  
  summary.innerHTML = `
    <div class="summary-item">
      <strong>Nombre:</strong> ${data.clientName}
    </div>
    <div class="summary-item">
      <strong>Cédula:</strong> ${data.clientId}
    </div>
    <div class="summary-item">
      <strong>Vehículo:</strong> ${data.vehicle}
    </div>
    <div class="summary-item">
      <strong>Fecha de Alquiler:</strong> ${formatDate(data.pickupDate)}
    </div>
    <div class="summary-item">
      <strong>Fecha de Devolución:</strong> ${formatDate(data.returnDate)}
    </div>
    <div class="summary-item">
      <strong>Días de alquiler:</strong> ${data.days}
    </div>
    <div class="summary-divider"></div>
    <div class="summary-total">
      <strong>Total a pagar:</strong> $${data.total.toFixed(2)}
    </div>
  `;
  
  modal.classList.add('show');
  
  document.getElementById('newReservationBtn').onclick = function() {
    modal.classList.remove('show');
    document.getElementById('reservationForm').reset();
  };
}

function formatDate(dateString) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + 1);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('es-ES', options);
}

document.getElementById('logoutBtn').addEventListener('click', function() {
  if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
  }
});

document.getElementById('logoutBtnDev').addEventListener('click', function() {
  if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
  }
});
