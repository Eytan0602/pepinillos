<?php
session_start();
$user = $_SESSION['usuario'] ?? null;
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Zona Baby</title>
  <link rel="preconnect" href="gamepad.jpg">
  <link rel="preconnect" href="gamepad.jpg" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/index.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body class="dark-theme">
  <div id="modalComingSoon" class="modal" style="display: none;">
    <div class="modal-content">
      <span class="close-btn">&times;</span>
      <h2>Próximamente</h2>
      <p>No está disponible, pronto subiremos más productos 😊</p>
    </div>
  </div>

  <header>
    <nav>
      <a href="index.php" class="logo">Nexium Tech</a>
      <div class="nav-controls">
        <input id="search-input" type="text" placeholder="Buscar productos...">
        <a href="#" class="nav-icon" id="wishlist-icon" aria-label="Lista de deseos">
          <i class="far fa-heart"></i>
          <span class="counter" id="wishlist-counter">0</span>
        </a>
        <a href="cart.html" class="nav-icon" id="cart-icon" aria-label="Carrito de compras">
          <i class="fas fa-shopping-cart"></i>
          <span class="counter" id="cart-counter">0</span>
        </a>
        <a href="sesion.php" class="nav-icon" id="login-icon">
          <i class="far fa-user"></i>
          <span class="user-label">Iniciar Sesión</span>
        </a>
        <div class="hamburger-menu" onclick="toggleSidebar()">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
      </div>
    </nav>
  </header>


<!-- Barra lateral -->
<div id="sidebar" class="side-menu">
  <div class="side-menu-header">
    <h2>Menú</h2>
    <div class="close-menu" onclick="toggleSidebar()">
      <i class="fas fa-times"></i>
    </div>
  </div>
  
  <div class="user-info">
    <div class="user-avatar">
      <i class="fas fa-user"></i>
    </div>
    <div class="user-details">
      <h4>Mi Cuenta</h4>
      <p id="sidebar-username">usuario@email.com</p>
    </div>
  </div>
  
  <div class="theme-switch">
    <span>Modo Oscuro</span>
    <label class="switch">
      <input type="checkbox" id="theme-switch" checked>
      <span class="slider"></span>
    </label>
  </div>
  
  <ul class="menu-items">
    <li class="menu-item">
      <i class="fas fa-user-circle"></i>
      <span class="menu-item-text">Mi Perfil</span>
    </li>
    <li class="menu-item">
      <i class="fas fa-shopping-bag"></i>
      <span class="menu-item-text">Mis Pedidos</span>
    </li>
    <li class="menu-item">
      <i class="fas fa-heart"></i>
      <span class="menu-item-text">Lista de Deseos</span>
    </li>
    <li class="menu-item">
      <i class="fas fa-address-book"></i>
      <span class="menu-item-text">Actualizar Datos</span>
    </li>
    <li class="menu-item">
      <i class="fas fa-cog"></i>
      <span class="menu-item-text">Configuración</span>
    </li>
    <li class="menu-item" id="logout-btn">
      <i class="fas fa-sign-out-alt"></i>
      <span class="menu-item-text">Cerrar Sesión</span>
    </li>
  </ul>
</div>

<!-- Fondo oscuro cuando se abre la barra lateral -->
<div id="sidebar-overlay" class="sidebar-overlay" onclick="toggleSidebar()"></div>


  
  <div id="wishlistModal" class="modal">
    <div class="wishlist-modal-content">
      <span class="close-wishlist">&times;</span>
      <h2>Mis Favoritos</h2>
      <div class="wishlist-items" id="wishlist-items-container">
      </div>
    </div>
  </div>

  

<div class="carousel-container">
  <div class="carousel">
    <div class="slide">
      <video src="VideoIndex.mp4" autoplay loop muted></video>
      <div class="slide-content">
        <h3>Bienvenido a Nexium Tech</h3>
        <p>Donde la tecnología cobra vida. Descubre nuestros productos innovadores.</p>
      </div>
    </div>
    
    <div class="slide">
      <img src="iPhone-17-Air.jpg" alt="Iphone de última generación">
      <div class="slide-content">
        <h3>Iphone 17 pro </h3>
        <p>Tecnología de punta con cámara profesional de 108MP y batería de larga duración</p>
        <p><span class="old-price">S/1299</span> <span class="price">S/999</span></p>
      </div>
      <div class="label offer">OFERTA</div>
    </div>
    
    <div class="slide">
      <img src="wa.png" alt="Laptop gaming">
      <div class="slide-content">
        <h3>Gaming Laptop Pro X</h3>
        <p>Juega sin límites con gráficos de última generación y refrigeración avanzada</p>
        <p><span class="price">Próximo lanzamiento</span></p>
      </div>
      <div class="label new">Reserva Ahora</div>
    </div>
    
    <div class="slide">
      <img src="ll.webp" alt="HTC Vive">
      <div class="slide-content">
        <h3>HTC Vive</h3>
        <p> Ofrece una alta resolución por ojo y una tasa de refresco de 90Hz</p>
        <p><span class="price">Reserva ahora</span></p>
      </div>
      <div class="label new">Próximo lanzamiento</div>
    </div>
  </div>
  
  <div class="controls">
    <button class="control-btn prev">&#10094;</button>
    <button class="control-btn next">&#10095;</button>
  </div>
  
  <div class="indicators"></div>
</div>

<div class="quienes-somos">
  <div class="texto">
    <h1>¿QUIÉNES SOMOS?</h1>
    <p>En Nexium Tech no solo vendemos tecnología: la vivimos, la respiramos y la compartimos contigo. Gadgets, computadoras, accesorios y mucho más... todo en un solo lugar.</p>
    <p>Fundada en el año 2021 por un equipo de apasionados: Eytan, Luis, Sebastián y Angelo. Desde entonces, hemos crecido hasta convertirnos en una de las tiendas en línea preferidas por estudiantes, creativos y fanáticos de lo último en tecnología.</p>
    <p>Buscas rendimiento, estilo y precios que te cierren... nosotros te damos todo eso y más. Envíos rápidos, compras sin complicaciones y un catálogo que no para de crecer.</p>
    <p>La tecnología no tiene que ser aburrida. En Nexium Tech, es una experiencia. Nos mueve la pasión por lo digital, por eso seleccionamos lo mejor del mercado para que lo vivas como nunca antes. No esperes más... encuentra lo que te gusta y llévalo hoy.</p>
  </div>
</div>

  <section>
    <h2 class="section-title">Nuestros Productos</h2>
    <div class="products-grid">
  
      <div class="product-card"
           data-product-id="1"
           data-product-title="HAVIT HV-G92 Gamepad"
           data-product-price="120"
           data-product-image="gamepad.jpg">
        <span class="discount-badge">-40%</span>
        <img src="gamepad.jpg" alt="Gamepad">
        <div class="wishlist-icon" onclick="toggleWishlist(event)">❤</div>
        <div class="product-info">
          <div class="title">HAVIT HV-G92 Gamepad</div>
          <div><span class="price">S/ 120</span> <del>S/ 160</del></div>
          <div class="stars-rating" data-rating="0">
            <span class="star" data-value="1">★</span>
            <span class="star" data-value="2">★</span>
            <span class="star" data-value="3">★</span>
            <span class="star" data-value="4">★</span>
            <span class="star" data-value="5">★</span>
          </div>
        </div>
        <button onclick="addToCart(event)">Seleccionar</button>
      </div>
  
      <div class="product-card"
           data-product-id="2"
           data-product-title="AK-900 Wired Keyboard"
           data-product-price="160"
           data-product-image="descarga.jpg">
        <span class="discount-badge">-35%</span>
        <img src="descarga.jpg" alt="Teclado RGB">
        <div class="wishlist-icon" onclick="toggleWishlist(event)">❤</div>
        <div class="product-info">
          <div class="title">AK-900 Wired Keyboard</div>
          <div><span class="price">S/ 160</span> <del>S/ 180</del></div>
          <div class="stars-rating" data-rating="0">
            <span class="star" data-value="1">★</span>
            <span class="star" data-value="2">★</span>
            <span class="star" data-value="3">★</span>
            <span class="star" data-value="4">★</span>
            <span class="star" data-value="5">★</span>
          </div>
        </div>
        <button onclick="addToCart(event)">Seleccionar</button>
      </div>
  
      <div class="product-card"
           data-product-id="3"
           data-product-title="IPS LCD Gaming Monitor"
           data-product-price="370"
           data-product-image="monitor-teros-te-2766g-27-va-curvo-180-hz-1920x1080-fhd-hdmi-dp-freesync-vesa-smart-business-1.webp">
        <span class="discount-badge">-30%</span>
        <img src="monitor-teros-te-2766g-27-va-curvo-180-hz-1920x1080-fhd-hdmi-dp-freesync-vesa-smart-business-1.webp" alt="Monitor">
        <div class="wishlist-icon" onclick="toggleWishlist(event)">❤</div>
        <div class="product-info">
          <div class="title">IPS LCD Gaming Monitor</div>
          <div><span class="price">S/ 370</span> <del>S/ 400</del></div>
          <div class="stars-rating" data-rating="0">
            <span class="star" data-value="1">★</span>
            <span class="star" data-value="2">★</span>
            <span class="star" data-value="3">★</span>
            <span class="star" data-value="4">★</span>
            <span class="star" data-value="5">★</span>
          </div>
        </div>
        <button onclick="addToCart(event)">Seleccionar</button>
      </div>
      <div class="product-card"
      data-product-id="4"
      data-product-title="Teclado Mecánico Redragon K552"
      data-product-price="220"
      data-product-image="k552.jpg">
      <span class="discount-badge">-25%</span>
      <img src="k552.jpg" alt="Redragon K552">
      <div class="wishlist-icon" onclick="toggleWishlist(event)">❤</div>
      <div class="product-info">
      <div class="title">Teclado Mecánico Redragon K552</div>
      <div><span class="price">S/ 220</span> <del>S/ 290</del></div>
      <div class="stars-rating" data-rating="0">
        <span class="star" data-value="1">★</span>
        <span class="star" data-value="2">★</span>
        <span class="star" data-value="3">★</span>
        <span class="star" data-value="4">★</span>
        <span class="star" data-value="5">★</span>
      </div>
      </div>
      <button onclick="addToCart(event)">Seleccionar</button>
      </div>
      
      <div class="product-card"
      data-product-id="5"
      data-product-title="Logitech G Pro Wireless"
      data-product-price="499"
      data-product-image="wireles.jpg">
      <span class="discount-badge">-15%</span>
      <img src="wireles.jpg" alt="Mouse Logitech G Pro">
      <div class="wishlist-icon" onclick="toggleWishlist(event)">❤</div>
      <div class="product-info">
      <div class="title">Logitech G Pro Wireless</div>
      <div><span class="price">S/ 499</span> <del>S/ 590</del></div>
      <div class="stars-rating" data-rating="0">
        <span class="star" data-value="1">★</span>
        <span class="star" data-value="2">★</span>
        <span class="star" data-value="3">★</span>
        <span class="star" data-value="4">★</span>
        <span class="star" data-value="5">★</span>
      </div></div>
      <button onclick="addToCart(event)">Seleccionar</button>
      </div>
      
      <div class="product-card"
      data-product-id="6"
      data-product-title="Sony WH-1000XM5"
      data-product-price="950"
      data-product-image="sony.avif">
      <img src="sony.avif" alt="Sony WH-1000XM5">
      <div class="wishlist-icon" onclick="toggleWishlist(event)">❤</div>
      <div class="product-info">
      <div class="title">Sony WH-1000XM5</div>
      <div><span class="price">S/ 950</span> <del>S/ 1180</del></div>
      <div class="stars-rating" data-rating="0">
        <span class="star" data-value="1">★</span>
        <span class="star" data-value="2">★</span>
        <span class="star" data-value="3">★</span>
        <span class="star" data-value="4">★</span>
        <span class="star" data-value="5">★</span>
      </div></div>
      <button onclick="addToCart(event)">Seleccionar</button>
      </div>
      
      <div class="product-card oculto" data-product-id="7"
      data-product-title="Xiaomi Redmi Note 13"
      data-product-price="750"
      data-product-image="redmi 13.webp">
      <span class="discount-badge">-10%</span>
      <img src="redmi 13.webp" alt="Redmi Note 13">
      <div class="wishlist-icon" onclick="toggleWishlist(event)">❤</div>
      <div class="product-info">
      <div class="title">Xiaomi Redmi Note 13</div>
      <div><span class="price">S/ 750</span> <del>S/ 830</del></div>
      <div class="stars-rating" data-rating="0">
        <span class="star" data-value="1">★</span>
        <span class="star" data-value="2">★</span>
        <span class="star" data-value="3">★</span>
        <span class="star" data-value="4">★</span>
        <span class="star" data-value="5">★</span>
      </div></div>
      <button onclick="addToCart(event)">Seleccionar</button>
      </div>
      
      <div class="product-card oculto" data-product-id="8"
      data-product-title="Lenovo Ideapad 3 Ryzen 5"
      data-product-price="1450"
      data-product-image="lenovo ideapad.jpg">
      <span class="discount-badge">-18%</span>
      <img src="lenovo ideapad.jpg" alt="Lenovo Ideapad 3">
      <div class="wishlist-icon" onclick="toggleWishlist(event)">❤</div>
      <div class="product-info">
      <div class="title">Lenovo Ideapad 3 Ryzen 5</div>
      <div><span class="price">S/ 1450</span> <del>S/ 1760</del></div>
      <div class="stars-rating" data-rating="0">
        <span class="star" data-value="1">★</span>
        <span class="star" data-value="2">★</span>
        <span class="star" data-value="3">★</span>
        <span class="star" data-value="4">★</span>
        <span class="star" data-value="5">★</span>
      </div></div>
      <button onclick="addToCart(event)">Seleccionar</button>
      </div>
      
      <div class="product-card oculto" data-product-id="9"
      data-product-title="Nintendo Switch OLED"
      data-product-price="1750"
      data-product-image="ns.webp">
      <span class="discount-badge">-10%</span>
      <img src="ns.webp" alt="Nintendo Switch OLED">
      <div class="wishlist-icon" onclick="toggleWishlist(event)">❤</div>
      <div class="product-info">
      <div class="title">Nintendo Switch OLED</div>
      <div><span class="price">S/ 1750</span> <del>S/ 1950</del></div>
      <div class="stars-rating" data-rating="0">
        <span class="star" data-value="1">★</span>
        <span class="star" data-value="2">★</span>
        <span class="star" data-value="3">★</span>
        <span class="star" data-value="4">★</span>
        <span class="star" data-value="5">★</span>
      </div></div>
      <button onclick="addToCart(event)">Seleccionar</button>
      </div>
      
      <div class="product-card oculto" data-product-id="10"
      data-product-title="Parlante Cybertel RGB"
      data-product-price="450"
      data-product-image="CYBERTEL.webp">
      <span class="discount-badge">-12%</span>
      <img src="CYBERTEL.webp" alt="Parlante Cybertel RGB">
      <div class="wishlist-icon" onclick="toggleWishlist(event)">❤</div>
      <div class="product-info">
      <div class="title">Parlante Cybertel RGB</div>
      <div><span class="price">S/ 450</span> <del>S/ 450</del></div>
      <div class="stars-rating" data-rating="0">
        <span class="star" data-value="1">★</span>
        <span class="star" data-value="2">★</span>
        <span class="star" data-value="3">★</span>
        <span class="star" data-value="4">★</span>
        <span class="star" data-value="5">★</span>
      </div></div>
      <button onclick="addToCart(event)">Seleccionar</button>
      </div>
      
      <div class="product-card oculto" data-product-id="11"
      data-product-title="Monitor LG UltraGear 27''"
      data-product-price="1190"
      data-product-image="lg.jpg">
      <span class="discount-badge">-15%</span>
      <img src="lg.jpg" alt="Monitor LG UltraGear">
      <div class="wishlist-icon" onclick="toggleWishlist(event)">❤</div>
      <div class="product-info">
      <div class="title">Monitor LG UltraGear 27"</div>
      <div><span class="price">S/ 1190</span> <del>S/ 1390</del></div>
      <div class="stars-rating" data-rating="0">
        <span class="star" data-value="1">★</span>
        <span class="star" data-value="2">★</span>
        <span class="star" data-value="3">★</span>
        <span class="star" data-value="4">★</span>
        <span class="star" data-value="5">★</span>
      </div></div>
      <button onclick="addToCart(event)">Seleccionar</button>
      </div>
      
      <div class="product-card oculto" data-product-id="12" data-product-title="Silla Gamer Cougar Armor One"data-product-price="890"
      data-product-image="sgamer.webp">
      <span class="discount-badge">-20%</span>
      <img src="sgamer.webp" alt="Silla Cougar">
      <div class="wishlist-icon" onclick="toggleWishlist(event)">❤</div>
      <div class="product-info">
      <div class="title">Silla Gamer Cougar Armor One</div>
      <div><span class="price">S/ 890</span> <del>S/ 1110</del></div>
      <div class="stars-rating" data-rating="0">
                  <span class="star" data-value="1">★</span>
                  <span class="star" data-value="2">★</span>
                  <span class="star" data-value="3">★</span>
                  <span class="star" data-value="4">★</span>
                  <span class="star" data-value="5">★</span>
                </div></div>
      <button onclick="addToCart(event)">Seleccionar</button>
      </div>
      
    </div>
  
    <section>
      <button class="show-more-btn" onclick="showMore()">Ver más productos</button>
    </section>
  </section>

  <section>
    <h2 class="section-title">Buscar por Categorías</h2>
    <div class="categories-grid">
  
      <a href="celulares.html">
        <div class="category-card">
          <img src="telefono-inteligente.png" alt="Celulares">
          <p>Celulares</p>
        </div>
      </a>
  
      <a href="audifonos.html">
        <div class="category-card">
          <img src="audifonos-inalambricos.png" alt="Audífonos">
          <p>Audífonos</p>
        </div>
      </a>
  
      <a href="computadoras.html">
        <div class="category-card">
          <img src="pantalla-del-ordenador.png" alt="Computadoras">
          <p>Computadoras</p>
        </div>
      </a>
  
      <a href="gaming.html">
        <div class="category-card">
          <img src="controlador-de-juego.png" alt="Gaming">
          <p>Gaming</p>
        </div>
      </a>
  
    </div>
  </section>


  <footer class="footer">
    <div class="footer-content">
      <div>
        <strong>Soporte</strong>
        <a href="#">AV Tupac Amaru</a>
        <a href="mailto:tienda.online@gmail.com">tienda.online@gmail.com</a>
        <a href="tel:+51984470555">984 470 555</a>
      </div>
      <div>
        <strong>Ayuda</strong>
        <a href="#">Garantía</a>
        <a href="#">Envíos y devoluciones</a>
        <a href="#">Carrito</a>
        <a href="#">Lista de deseos</a>
        <a href="#">TPreguntas frecuentes</a>
      </div>
      <div>
        <strong>Políticas</strong>
        <a href="#">Política de privacidad</a>
        <a href="#">Términos de uso</a>
        <a href="#">Política de cookies</a>
        <a href="#">Contacto</a>
      </div>
    </div>
    <p>&copy; 2025 Nexium Tech - Todos los derechos reservados</p>
    <div class="redes-sociales">
    <a href="https://wa.me/+51982424192" target="_blank" class="icon whatsapp"><i class="fab fa-whatsapp"></i></a>
    <a href="https://www.instagram.com/gawebon.zip?igsh=dGozeGZkbTZqaGky" target="_blank" class="icon instagram"><i class="fab fa-instagram"></i></a>
    <a href="https://www.facebook.com/share/1fyuXccLZU/" target="_blank" class="icon facebook"><i class="fab fa-facebook-f"></i></a>
  </div>
  <p class="footer-text">&copy; 2025 Tu Sitio Web. Todos los derechos reservados.</p>
  </footer>

  <!-- Sonido de la campana -->
  <audio id="bell-sound" src="-226232.mp3"></audio>
  <script src="js/index.js"></script>
 <script>
  const user = <?= json_encode($user) ?>;
  document.addEventListener("DOMContentLoaded", function () {
    updateUserDisplay(user);
  });
</script>
  
  <!-- Botón flotante de lanzar chat -->
<div id="chatLauncher" class="chat-launcher" onclick="toggleChatWindow()">
  <img src="https://cdn-icons-png.flaticon.com/512/2462/2462719.png" width="50">
</div>

<!-- Contenedor de la ventana de chat -->
<div id="chatContainer" class="chat-container" style="display: none;">
  <div id="chatWindow" class="chat-window">
    <button id="closeChatBtn" onclick="toggleChatWindow()" class="close-chat">✖</button>

    <div id="chatMessages" class="chat-messages">
      <div class="chat-message agent">
        <div class="message-content">
          Hola mi nombre es KingPidgeot ¿En qué puedo ayudarte hoy?
        </div>
        <small class="text-muted">11:32</small>
      </div>
    </div>

    <div class="typing-indicator d-none">Escribiendo...</div>

    <div class="chat-input">
      <input type="text" id="messageInput" placeholder="Escribe tu mensaje...">
      <button onclick="sendMessage()">
        <img src="https://cdn-icons-png.flaticon.com/512/724/724715.png" width="24">
      </button>
    </div>

    <div class="quick-buttons">
      <button onclick="quickReply('Categorías')">Categorías</button>
      <button onclick="quickReply('Envíos')">Envíos</button>
      
    </div>
  </div>
</div>
</body>
</html>
