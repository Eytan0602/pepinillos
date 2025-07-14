 let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
 let cart = JSON.parse(localStorage.getItem('cart')) || [];
 
 document.addEventListener('DOMContentLoaded', function() {
   updateCounters();
   syncWishlistItems();
 });

 function playBellSound() {
   const bellSound = document.getElementById('bell-sound');
   bellSound.currentTime = 0;
   bellSound.play();
 }

 function updateCounters() {
   document.getElementById('wishlist-counter').textContent = wishlist.length;
   document.getElementById('cart-counter').textContent = cart.length;
   
   localStorage.setItem('wishlist', JSON.stringify(wishlist));
   localStorage.setItem('cart', JSON.stringify(cart));
 }

 function toggleWishlist(event) {
   const productCard = event.target.closest('.product-card');
   const productId = productCard.dataset.productId;
   const productTitle = productCard.dataset.productTitle;
   const productPrice = productCard.dataset.productPrice;
   const productImage = productCard.dataset.productImage;
   
   const existingIndex = wishlist.findIndex(item => item.id === productId);
   
   if (existingIndex >= 0) {
     wishlist.splice(existingIndex, 1);
     event.target.classList.remove('favorites-icon-active');
   } else {
     wishlist.push({ 
       id: productId, 
       title: productTitle, 
       price: productPrice,
       image: productImage
     });
     event.target.classList.add('favorites-icon-active');
   }
   
   updateCounters();
   syncWishlistItems();
 }

 // Función para agregar producto al carrito
 function addToCart(event) {
   const productCard = event.target.closest('.product-card');
   const productId = productCard.dataset.productId;
   const productTitle = productCard.dataset.productTitle;
   const productPrice = productCard.dataset.productPrice;
   const productImage = productCard.dataset.productImage;

   cart.push({ 
     id: productId, 
     title: productTitle, 
     price: productPrice,
     image: productImage,
     quantity: 1
   });
   
   // Reproducir sonido de campana
   playBellSound();
   
   // Actualizar contador y localStorage
   updateCounters();
 }
 
 // Función para mostrar el modal de "Próximamente"
 function showMore() {
   document.getElementById('modalComingSoon').style.display = 'flex';
 }
 
 document.querySelector('.close-btn').addEventListener('click', function() {
   document.getElementById('modalComingSoon').style.display = 'none';
 });
 
 // Cerrar modal cuando se hace clic fuera
 window.addEventListener('click', function(event) {
   const modalComingSoon = document.getElementById('modalComingSoon');
   const wishlistModal = document.getElementById('wishlistModal');
   
   if (event.target === modalComingSoon) {
     modalComingSoon.style.display = 'none';
   }
   
   if (event.target === wishlistModal) {
     wishlistModal.style.display = 'none';
   }
 });
 
 document.addEventListener('DOMContentLoaded', function () {
  const ratings = document.querySelectorAll('.stars-rating');

  ratings.forEach(rating => {
    const stars = rating.querySelectorAll('.star');

    stars.forEach(star => {
      star.addEventListener('mouseover', () => {
        const value = parseInt(star.dataset.value);
        highlightStars(rating, value);
      });

      star.addEventListener('mouseout', () => {
        const savedRating = parseInt(rating.dataset.rating);
        highlightStars(rating, savedRating);
      });

      star.addEventListener('click', () => {
        const value = parseInt(star.dataset.value);
        rating.dataset.rating = value;
        highlightStars(rating, value);
      });
    });
  });

  function highlightStars(ratingContainer, value) {
    const stars = ratingContainer.querySelectorAll('.star');
    stars.forEach(star => {
      const starValue = parseInt(star.dataset.value);
      star.textContent = starValue <= value ? '★' : '☆';
    });
  }
});

 
 // Abrir modal de favoritos
 document.getElementById("wishlist-icon").addEventListener("click", function(e) {
   e.preventDefault();  // Prevenir navegación a una página
   
   // Mostrar el modal de favoritos
   document.getElementById('wishlistModal').style.display = 'block';
   
   // Actualizar la lista de favoritos en el modal
   renderWishlistItems();
 });
 
 document.querySelector('.close-wishlist').addEventListener('click', function() {
   document.getElementById('wishlistModal').style.display = 'none';
 });
 
 function renderWishlistItems() {
   const container = document.getElementById('wishlist-items-container');
   container.innerHTML = '';
   
   if (wishlist.length === 0) {
     container.innerHTML = '<div class="empty-wishlist">No tienes productos en tu lista de favoritos</div>';
     return;
   }
   
   wishlist.forEach((item, index) => {
     const itemElement = document.createElement('div');
     itemElement.className = 'wishlist-item';
     itemElement.innerHTML = `
       <img src="${item.image}" alt="${item.title}">
       <div class="wishlist-item-info">
         <div class="wishlist-item-title">${item.title}</div>
         <div class="wishlist-item-price">S/ ${item.price}</div>
       </div>
       <button class="remove-wishlist" data-index="${index}">Eliminar</button>
     `;
     
     container.appendChild(itemElement);
   });
   
   // Agregar event listeners a los botones de eliminar
   document.querySelectorAll('.remove-wishlist').forEach(button => {
     button.addEventListener('click', function() {
       const index = parseInt(this.getAttribute('data-index'));
       wishlist.splice(index, 1);
       updateCounters();
       renderWishlistItems();
       syncWishlistItems();
     });
   });
 }
 
 // Sincronizar estado visual de los iconos de favoritos con los datos
 function syncWishlistItems() {
   // Primero resetear todos los iconos
   document.querySelectorAll('.wishlist-icon').forEach(icon => {
     icon.classList.remove('favorites-icon-active');
   });
   
   // Luego marcar solo los que están en la lista de favoritos
   wishlist.forEach(item => {
     const productCard = document.querySelector(`.product-card[data-product-id="${item.id}"]`);
     if (productCard) {
       const wishlistIcon = productCard.querySelector('.wishlist-icon');
       wishlistIcon.classList.add('favorites-icon-active');
     }
   });
 }
function addToCart(event) {
const productCard = event.target.closest('.product-card');
const productId = productCard.dataset.productId;
const productTitle = productCard.dataset.productTitle;
const productPrice = productCard.dataset.productPrice;
const productImage = productCard.dataset.productImage;

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const existingProductIndex = carrito.findIndex(item => item.id === productId);

if (existingProductIndex >= 0) {
 carrito[existingProductIndex].cantidad += 1;
} else {
 carrito.push({ 
   id: productId, 
   titulo: productTitle, 
   precio: `S/ ${productPrice}`,
   imagen: productImage,
   cantidad: 1,
   color: 'black', 
   tamanio: 'M'     
 });
}

playBellSound();

localStorage.setItem('carrito', JSON.stringify(carrito));

cart = carrito;
localStorage.setItem('cart', JSON.stringify(cart));

updateCounters();
}

function updateCounters() {
document.getElementById('wishlist-counter').textContent = wishlist.length;

const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
document.getElementById('cart-counter').textContent = carrito.length;

localStorage.setItem('wishlist', JSON.stringify(wishlist));
localStorage.setItem('cart', JSON.stringify(cart));   
}
function toggleChatWindow() {
  const chatContainer = document.getElementById('chatContainer');
  const chatLauncher = document.getElementById('chatLauncher');

  if (chatContainer.style.display === 'none' || chatContainer.style.display === '') {
    chatContainer.style.display = 'flex'; 
    chatLauncher.style.display = 'none'; 
  } else {
    chatContainer.style.display = 'none';
    chatLauncher.style.display = 'flex'; 
  }
}



function sendMessage() {
  const input = document.getElementById('messageInput');
  const message = input.value.trim();
  if (!message) return;

  const chat = document.getElementById('chatMessages');
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  chat.innerHTML += `
    <div class="chat-message user">
      <div class="message-content">${message}</div>
      <small class="text-muted">${time}</small>
    </div>
  `;
  input.value = '';
  chat.scrollTop = chat.scrollHeight;

  const typing = document.querySelector('.typing-indicator');
  typing.classList.remove('d-none');

  setTimeout(() => {
    typing.classList.add('d-none');
    const response = generateBotResponse(message.toLowerCase());
    chat.innerHTML += `
      <div class="chat-message agent">
        <div class="message-content">${response}</div>
        <small class="text-muted">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
      </div>
    `;
    chat.scrollTop = chat.scrollHeight;
  }, 1200);
}
function showCategoryButtons() {
  const chat = document.getElementById('chatMessages');
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const categoryMarkup = `
    <div class="chat-message agent">
      <div class="message-content">
        Estas son nuestras categorías 👇<br><br>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          <button onclick="simulateMessage('Audífonos')" style="padding: 6px 12px; background: #f1f1f1; border: none; border-radius: 12px; cursor: pointer;">🎧 Audífonos</button>
          <button onclick="simulateMessage('Celulares')" style="padding: 6px 12px; background: #f1f1f1; border: none; border-radius: 12px; cursor: pointer;">📱 Celulares</button>
          <button onclick="simulateMessage('Gaming')" style="padding: 6px 12px; background: #f1f1f1; border: none; border-radius: 12px; cursor: pointer;">🎮 Gaming</button>
          <button onclick="simulateMessage('Computadoras')" style="padding: 6px 12px; background: #f1f1f1; border: none; border-radius: 12px; cursor: pointer;">💻 Computadoras</button>
        </div>
      </div>
      <small class="text-muted">${time}</small>
    </div>
  `;

  chat.innerHTML += categoryMarkup;
  chat.scrollTop = chat.scrollHeight;
}

function simulateMessage(text) {
  document.getElementById('messageInput').value = text;
  sendMessage();
}

function generateBotResponse(message) {
  const lower = message.toLowerCase();
  if (lower.includes("hola") || lower.includes("buenos días") || lower.includes("buenas tardes") || lower.includes("holi")) {
    return "¡Hola! 😊 Qué gusto saludarte, ¿en qué puedo ayudarte hoy?";
  } 
  if (lower.includes("qué tal") || lower.includes("como estás") || lower.includes("cómo estás") || lower.includes("que tal") || lower.includes("como estas")) {
    return "¡Estoy muy bien! Gracias por preguntar. ¿En qué puedo ayudarte hoy?";
  }
  if (lower.includes("categoría") || lower.includes("categorias") || lower.includes("que venden") || lower.includes("qué venden") || lower.includes("productos") || lower.includes("ofrecen")) {
    setTimeout(showCategoryButtons, 300);
    return "¡Vendemos celulares, computadoras, audífonos y todo lo relacionado al mundo gamer! ¿Te gustaría ver una categoría específica?";
  }  
  if (lower.includes("celular") || lower.includes("celulares"|| lower.includes("fonos"))) {
    return " Tenemos celulares como el iPhone 11 Pro, Samsung Galaxy S23 y S24. ¿Te interesa alguno en especial?";
  }
  if (lower.includes("iphone")) {
    return "iPhone 11 Pro*: Pantalla OLED Super Retina XDR, triple cámara de 12MP, Face ID, y rendimiento potente con chip A13 Bionic. ¡Ideal para fotos increíbles y un uso fluido!";
  }
  if (lower.includes("s23")) {
    return "Samsung Galaxy S23*: Pantalla AMOLED 6.1'', cámara de 50MP, batería de larga duración, y chip Snapdragon 8 Gen 2. ¡Elegancia y potencia en tu mano!";
  }
  if (lower.includes("s24")) {
    return "Samsung Galaxy S24*: Nueva generación con pantalla 120Hz, IA integrada para fotos pro, y materiales eco-friendly. ¿Quieres conocer promociones?";
  }
  if (lower.includes("computadora") || lower.includes("laptop") || lower.includes("pc")) {
    return "Tenemos desde laptops hasta PC Gamer Ryzen y monitores ASUS. ¿Buscas algo específico?";
  }
  if (lower.includes("ryzen")) {
    return "PC Gamer Ryzen*: Procesador Ryzen 5, gráfica RTX 3060, 16GB RAM y SSD de 1TB. Rendimiento extremo para juegos y tareas pesadas.";
  }
  if (lower.includes("asus")) {
    return "ASUS XG258Q 24.5'*: Monitor Full HD con 240Hz y 1ms, ideal para eSports. Adaptive Sync y diseño gamer total. ¡Una joya visual!";
  }

  if (lower.includes("audífono") || lower.includes("audifono") || lower.includes("audifonos") || lower.includes("audífonos")) {
    return "Ofrecemos Apple AirPods MAX, Redragon Zeus y más. ¿Quieres saber más sobre alguno?";
  }
  if (lower.includes("airpods") || lower.includes("max")) {
    return "*Apple AirPods MAX*: Cancelación activa de ruido, sonido envolvente espacial, y diseño premium. Perfectos para música y productividad.";
  }
  if (lower.includes("redragon") || lower.includes("zeus")) {
    return "Redragon Zeus*: Audífonos gamer con sonido envolvente 7.1, micrófono con cancelación y luces RGB. ¡Para gamers de verdad!";
  }

  if (lower.includes("gaming") || lower.includes("gamer") || lower.includes("consola")) {
    return "Tenemos PlayStation 5, Nintendo Switch, Meta Quest 3 y más. ¿Te interesa alguna consola en especial?";
  }
  if (lower.includes("playstation") || lower.includes("ps5")) {
    return "PlayStation 5*: Velocidad ultrarrápida con SSD, gráficos en 4K, gatillos adaptativos y exclusivos como Spider-Man 2. ¡Inmersión total!";
  }
  if (lower.includes("nintendo")) {
    return "Nintendo Switch*: Consola híbrida para jugar en casa o portátil. Juegos como Zelda, Mario Kart y Animal Crossing. Diversión sin límites.";
  }
  if (lower.includes("meta") || lower.includes("quest")) {
    return "Meta Quest 3*: Realidad virtual sin cables, procesador potente y experiencias inmersivas en 3D. ¡Tu entrada al metaverso!";
  }

  if (lower.includes("envío") || lower.includes("envios") || lower.includes("envio")) {
    return " Realizamos envíos a todo el Perú. Lima: 24-48 horas. Provincias: 3-5 días hábiles.";
  }
  if (lower.includes("gracias") || lower.includes("muchas gracias")) {
    return "¡De nada! 😊 Siempre es un gusto ayudarte.";
  }
  if (lower.includes("adiós") || lower.includes("chau") || lower.includes("nos vemos")) {
    return "¡Hasta pronto! Fue un gusto ayudarte. 👋";
  }
  return "🤖 No entendí muy bien, pero estoy aquí para ayudarte con lo que necesites. Puedes preguntarme por celulares, computadoras, audífonos o productos gamer.";
}



function quickReply(text) {
  document.getElementById('messageInput').value = text;
  sendMessage();
};

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('modalComingSoon').style.display = 'none';
  
  updateCounters();
  syncWishlistItems();
});
function showMore() {
  const productosOcultos = document.querySelectorAll('.product-card.oculto');
  
  if (productosOcultos.length > 0) {
    productosOcultos.forEach(producto => {
      producto.classList.remove('oculto');
    });
  } else {
    document.getElementById('modalComingSoon').style.display = 'flex';
  }
}
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const indicatorsContainer = document.querySelector('.indicators');
  
  let currentIndex = 0;
  let interval;
  const slideCount = slides.length;
  
  // Crear indicadores
  slides.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    if (index === 0) {
      indicator.classList.add('active');
    }
    indicator.addEventListener('click', () => {
      goToSlide(index);
      resetInterval();
    });
    indicatorsContainer.appendChild(indicator);
  });
  
  const indicators = document.querySelectorAll('.indicator');
  
  // Funciones para el carrusel
  function updateIndicators() {
    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }
  
  function goToSlide(index) {
    currentIndex = index;
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateIndicators();
  }
  
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    goToSlide(currentIndex);
  }
  
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    goToSlide(currentIndex);
  }
  
  function resetInterval() {
    clearInterval(interval);
    startInterval();
  }
  
  function startInterval() {
    interval = setInterval(nextSlide, 100000); 
  }
  
  // Event listeners
  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval();
  });
  
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval();
  });
  
  
  let touchStartX = 0;
  let touchEndX = 0;
  
  carousel.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  carousel.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    resetInterval();
  });
  
  function handleSwipe() {
    if (touchStartX - touchEndX > 50) {
      nextSlide(); 
    } else if (touchEndX - touchStartX > 50) {
      prevSlide(); 
    }
  }
  
  // Pausar carrusel al pasar el mouse
  carousel.addEventListener('mouseenter', () => {
    clearInterval(interval);
  });
  
  carousel.addEventListener('mouseleave', () => {
    startInterval();
  });
  
  // Iniciar carrusel automático
  startInterval();
});


  function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('sidebar-overlay').classList.toggle('active');
    
    //  para el menú hamburguesa
    const bars = document.querySelectorAll('.hamburger-menu .bar');
    bars.forEach(bar => {
      bar.classList.toggle('active');
    });
  }

  // tema oscuro/claro
  document.getElementById('theme-switch').addEventListener('change', function() {
    document.body.classList.toggle('light-theme');
  });

  // Inicializar el carrusel
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const indicators = document.querySelector('.indicators');
  
  // Crear indicadores
  slides.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    if (index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToSlide(index));
    indicators.appendChild(indicator);
  });
  
  function showSlide(n) {
    if (n >= slides.length) currentSlide = 0;
    if (n < 0) currentSlide = slides.length - 1;
    
    document.querySelector('.carousel').style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Actualizar indicadores
    document.querySelectorAll('.indicator').forEach((ind, index) => {
      ind.classList.toggle('active', index === currentSlide);
    });
  }
  
  function nextSlide() {
    showSlide(currentSlide + 1);
    currentSlide++;
  }
  
  function prevSlide() {
    showSlide(currentSlide - 1);
    currentSlide--;
  }
  
  function goToSlide(n) {
    currentSlide = n;
    showSlide(currentSlide);
  }
  
  // Event Listeners
  document.querySelector('.next').addEventListener('click', nextSlide);
  document.querySelector('.prev').addEventListener('click', prevSlide);
  
  // Auto slide
  setInterval(nextSlide, 5000);
  
  // Modal de productos próximamente
  const modal = document.getElementById('modalComingSoon');
  const closeBtn = document.querySelector('.close-btn');
  
  function openModal() {
    modal.style.display = 'block';
  }
  
  function closeModal() {
    modal.style.display = 'none';
  }
  
  closeBtn.addEventListener('click', closeModal);
  
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeModal();
    }
  });
  
  // Agregar evento para los productos próximamente
  document.querySelectorAll('.coming-soon').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      openModal();
    });
  });
  document.addEventListener('DOMContentLoaded', function() {
  // Elementos del menú
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const sideMenu = document.querySelector('.side-menu');
  const sidebarOverlay = document.querySelector('.sidebar-overlay');
  const closeMenu = document.querySelector('.close-menu');
  
  // Verificar si los elementos existen antes de añadir eventos
  if (hamburgerMenu && sideMenu && sidebarOverlay && closeMenu) {
    // Abrir menú al hacer clic en hamburguesa
    hamburgerMenu.addEventListener('click', function() {
      console.log('Menú hamburguesa clickeado');
      sideMenu.classList.add('active');
      sidebarOverlay.classList.add('active');
    });
    
    // Cerrar menú al hacer clic en X
    closeMenu.addEventListener('click', function() {
      sideMenu.classList.remove('active');
      sidebarOverlay.classList.remove('active');
    });
    
    // Cerrar menú al hacer clic en el overlay
    sidebarOverlay.addEventListener('click', function() {
      sideMenu.classList.remove('active');
      sidebarOverlay.classList.remove('active');
    });
  } else {
    console.error('No se encontraron todos los elementos necesarios para el menú');
  }
});
document.addEventListener('DOMContentLoaded', function() {
  // Obtener el interruptor del tema
  const themeSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

  
  // Agregar evento al interruptor
  if (themeSwitch) {
    themeSwitch.addEventListener('change', switchTheme);
  }
});
//modo claro  noche
document.addEventListener('DOMContentLoaded', function () {
  const themeSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

  const currentTheme = localStorage.getItem('theme') || 'light';
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeSwitch.checked = true;
  }

  themeSwitch.addEventListener('change', function (e) {
    if (e.target.checked) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  });
});
 const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID",
    measurementId: "TU_MEASUREMENT_ID"
  };

document.addEventListener('DOMContentLoaded', function() {
  initSidebar();
  setupEventListeners();
});

// Inicialización de componentes del sidebar
function initSidebar() {
  // Verificar si hay un usuario logueado
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
  updateUserDisplay(currentUser);
  
  // Mostrar cantidad de items en la lista de deseos
  updateWishlistCounter();
}

// Actualizar información de usuario en el sidebar
function updateUserDisplay(user) {
  if (user && user.name) {
    const userLabel = document.querySelector('.user-label');
    const sidebarUsername = document.getElementById('sidebar-username');
    const accountTitle = document.querySelector('.user-details h4');

    if (userLabel) userLabel.textContent = user.name;
    if (sidebarUsername) sidebarUsername.textContent = user.email;
    if (accountTitle) accountTitle.textContent = "Hola " + user.name;
  }
}

function setupEventListeners() {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }
  
  const profileMenuItem = document.querySelector('.menu-item:nth-child(1)');
  if (profileMenuItem) {
    profileMenuItem.addEventListener('click', () => navigateTo('perfil.html'));
  }
  
  const ordersMenuItem = document.querySelector('.menu-item:nth-child(2)');
  if (ordersMenuItem) {
    ordersMenuItem.addEventListener('click', () => navigateTo('pedidos.html'));
  }
  
  const wishlistMenuItem = document.querySelector('.menu-item:nth-child(3)');
  if (wishlistMenuItem) {
    wishlistMenuItem.addEventListener('click', () => {
      if (localStorage.getItem('wishlist')) {
        navigateTo('wishlist.html');
      } else {
        showEmptyWishlistMessage();
      }
    });
  }
  
  const updateDataMenuItem = document.querySelector('.menu-item:nth-child(4)');
  if (updateDataMenuItem) {
    updateDataMenuItem.addEventListener('click', () => navigateTo('actualizar-datos.html'));
  }
  
  const settingsMenuItem = document.querySelector('.menu-item:nth-child(5)');
  if (settingsMenuItem) {
    settingsMenuItem.addEventListener('click', () => navigateTo('configuracion.html'));
  }
}

function handleLogout() {
  if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
    // Elimina del almacenamiento local (si usabas eso también)
    localStorage.removeItem('currentUser');

    // Redirige al archivo que cierra la sesión en el servidor
    window.location.href = 'logout.php';
  }
}

function navigateTo(page) {
  const restrictedPages = ['perfil.html', 'pedidos.html', 'actualizar-datos.html'];
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  if (restrictedPages.includes(page) && !currentUser) {
    alert('Necesitas iniciar sesión para acceder a esta sección');
    window.location.href = 'sesion.php';
    return;
  }
  
  window.location.href = page;
}

function showEmptyWishlistMessage() {
  alert('Tu lista de deseos está vacía. Añade productos para verlos aquí.');
}

function updateWishlistCounter() {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const wishlistCounter = document.getElementById('wishlist-counter');
  
  if (wishlistCounter) {
    wishlistCounter.textContent = wishlist.length;
  }
}

function simulateLogin(name, email) {
  const user = {
    name: name,
    email: email,
    lastLogin: new Date().toISOString()
  };
  
  localStorage.setItem('currentUser', JSON.stringify(user));
  updateUserDisplay(user);
}

function createPageIfNotExists(pageName, title) {
  console.log(`Página ${pageName} necesita ser creada`);
}
document.addEventListener('DOMContentLoaded', function() {
  const modalHTML = `
    <div id="modal-registro" class="modal" style="display: none;">
      <div class="modal-content">
        <span class="close-btn" onclick="cerrarModal()">&times;</span>
        <h2>Inicia sesión para continuar</h2>
        <p>Para continuar con tu compra, necesitas iniciar sesión o registrarte</p>
        <div class="modal-buttons">
          <button class="btn btn-secundario" onclick="cerrarModal()">Cancelar</button>
          <button class="btn btn-primario" id="btn-proceder-pago" onclick="irARegistro()">Registrarme</button>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  const modalStyles = document.createElement('style');
  modalStyles.textContent = `
    .modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      z-index: 1000;
      justify-content: center;
      align-items: center;
    }
    
    .modal-content {
      background-color: var(--bg-color, #fff);
      color: var(--text-color, #333);
      width: 90%;
      max-width: 400px;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      position: relative;
      animation: modalFadeIn 0.3s ease-out;
    }
    
    @keyframes modalFadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .close-btn {
      position: absolute;
      top: 10px;
      right: 15px;
      font-size: 24px;
      cursor: pointer;
      color: var(--text-color, #333);
    }
    
    .modal h2 {
      margin-top: 0;
      margin-bottom: 15px;
      font-size: 1.5rem;
    }
    
    .modal p {
      margin-bottom: 20px;
      line-height: 1.5;
    }
    
    .modal-buttons {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
    
    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      transition: background-color 0.2s;
    }
    
    .btn-primario {
      background-color: #4a6cf7;
      color: white;
    }
    
    .btn-primario:hover {
      background-color: #3a5ce5;
    }
    
    .btn-secundario {
      background-color: #e5e5e5;
      color: #333;
    }
    
    .btn-secundario:hover {
      background-color: #d5d5d5;
    }
    
    /* Modo oscuro */
    .dark-theme .modal-content {
      background-color: #1a1a1a;
      color: #f0f0f0;
    }
    
    .dark-theme .close-btn {
      color: #f0f0f0;
    }
    
    .dark-theme .btn-secundario {
      background-color: #333;
      color: #f0f0f0;
    }
    
    .dark-theme .btn-secundario:hover {
      background-color: #444;
    }
  `;
  document.head.appendChild(modalStyles);
  
  // modal después de 8 segundos si el usuario no está registrado
  setTimeout(function() {
    if (!verificarUsuario()) {
      document.getElementById('modal-registro').style.display = 'flex';
    }
  }, 8000); 
});


function verificarUsuario() {
  return user !== null;
}

function mostrarModalRegistro() {
  if (verificarUsuario()) {
    window.location.href = 'verificar.html';
  } else {
    document.getElementById('modal-registro').style.display = 'flex';
  }
}

function cerrarModal() {
  document.getElementById('modal-registro').style.display = 'none';
}

function irARegistro() {
  window.location.href = 'registro.php';
}
