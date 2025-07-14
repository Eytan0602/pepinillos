function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const contador = document.getElementById('cart-counter');
  contador.textContent = carrito.length;
}

actualizarContadorCarrito();

const miniaturas = document.querySelectorAll('.miniatura');
const imagenPrincipal = document.getElementById('imagen-principal');

miniaturas.forEach(miniatura => {
  miniatura.addEventListener('click', function() {
    miniaturas.forEach(m => m.classList.remove('active'));
    this.classList.add('active');
    imagenPrincipal.src = this.getAttribute('data-img');
  });
});

const colores = document.querySelectorAll('.color');

colores.forEach(color => {
  color.addEventListener('click', function() {
    colores.forEach(c => c.classList.remove('active'));
    this.classList.add('active');
    const colorSeleccionado = this.getAttribute('data-color');
    console.log(`Color seleccionado: ${colorSeleccionado}`);
  });
});

const tamanios = document.querySelectorAll('.tamanio');

tamanios.forEach(tamanio => {
  tamanio.addEventListener('click', function() {
    tamanios.forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    const tamanioSeleccionado = this.getAttribute('data-size');
    console.log(`Tamaño seleccionado: ${tamanioSeleccionado}`);
  });
});

const inputCantidad = document.getElementById('cantidad');
const btnDisminuir = document.getElementById('disminuir');
const btnAumentar = document.getElementById('aumentar');

btnDisminuir.addEventListener('click', function() {
  let valor = parseInt(inputCantidad.value);
  if (valor > 1) {
    inputCantidad.value = valor - 1;
  }
});

btnAumentar.addEventListener('click', function() {
  let valor = parseInt(inputCantidad.value);
  if (valor < 10) {
    inputCantidad.value = valor + 1;
  }
});

inputCantidad.addEventListener('input', function() {
  this.value = this.value.replace(/[^0-9]/g, '');
  
  if (this.value === '') {
    this.value = '1';
  } else {
    const valor = parseInt(this.value);
    if (valor < 1) {
      this.value = '1';
    } else if (valor > 10) {
      this.value = '10';
    }
  }
});

const btnAgregarCarrito = document.getElementById('btn-agregar-carrito');
const sonidoCampana = document.getElementById('notification-sound');

btnAgregarCarrito.addEventListener('click', function() {
  const cantidad = parseInt(document.getElementById('cantidad').value);
  const color = document.querySelector('.color.active').getAttribute('data-color');
  let tamanio = "";
  const tamanioActivo = document.querySelector('.tamanio.active');
  if (tamanioActivo) {
    tamanio = tamanioActivo.getAttribute('data-size');
  }
  const productoTitulo = document.getElementById('producto-titulo').textContent;
  const productoPrecio = document.getElementById('producto-precio').textContent;
  const productoImagen = document.getElementById('imagen-principal').src;
  
  const producto = {
    titulo: productoTitulo,
    precio: productoPrecio,
    color: color,
    tamanio: tamanio,
    cantidad: cantidad,
    imagen: productoImagen
  };
  
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.push(producto);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  
  actualizarContadorCarrito();
  
  // Reproducir sonido de campana cada vez que se agrega un producto
  sonidoCampana.currentTime = 0;
sonidoCampana.play();
});

const menuToggle = document.querySelector('.menu-toggle');
const navRight = document.querySelector('nav .right');

menuToggle.addEventListener('click', function() {
  navRight.style.display = navRight.style.display === 'flex' ? 'none' : 'flex';
});

// Nuevo código para el intercambio de imágenes entre producto principal y relacionados
const productosRelacionados = document.querySelectorAll('.producto');
const productoTitulo = document.getElementById('producto-titulo');
const productoPrecio = document.getElementById('producto-precio');
const productoReviews = document.getElementById('producto-reviews');

// Guardar la información del producto principal original
let productoPrincipal = {
  titulo: productoTitulo.textContent,
  precio: productoPrecio.textContent,
  reviews: productoReviews.textContent,
  imagen: imagenPrincipal.src,
  alt: imagenPrincipal.alt
};

productosRelacionados.forEach(producto => {
  producto.addEventListener('click', function() {
    // Quitar la clase selected de todos los productos
    productosRelacionados.forEach(p => p.classList.remove('selected'));
    
    // Añadir la clase selected al producto clickeado
    this.classList.add('selected');
    
    // Guardar información del producto principal actual antes de actualizarlo
    let productoAnterior = {
      titulo: productoTitulo.textContent,
      precio: productoPrecio.textContent,
      reviews: productoReviews.textContent,
      imagen: imagenPrincipal.src,
      alt: imagenPrincipal.alt
    };
    
    // Actualizar imagen principal y detalles con los del producto seleccionado
    const nuevoTitulo = this.getAttribute('data-title');
    const nuevoPrecio = this.getAttribute('data-price');
    const nuevasReviews = this.getAttribute('data-reviews');
    const nuevaImagen = this.getAttribute('data-img');
    
    // Actualizar producto principal
    productoTitulo.textContent = nuevoTitulo;
    productoPrecio.textContent = nuevoPrecio;
    productoReviews.textContent = `(${nuevasReviews} reseñas)`;
    imagenPrincipal.src = nuevaImagen;
    imagenPrincipal.alt = nuevoTitulo;
    
    // Actualizar el producto en la sección de relacionados con los datos del producto principal anterior
    const imgProducto = this.querySelector('img');
    const tituloProducto = this.querySelector('h3');
    const precioProducto = this.querySelector('.precio');
    const reviewsProducto = this.querySelector('.reviews');
    
    imgProducto.src = productoAnterior.imagen;
    imgProducto.alt = productoAnterior.titulo;
    tituloProducto.textContent = productoAnterior.titulo;
    precioProducto.textContent = productoAnterior.precio;
    reviewsProducto.textContent = productoAnterior.reviews;
    
    // Actualizar los data-attributes para mantener la consistencia
    this.setAttribute('data-title', productoAnterior.titulo);
    this.setAttribute('data-price', productoAnterior.precio);
    this.setAttribute('data-reviews', productoAnterior.reviews.replace(/[()reseñas\s]/g, ''));
    this.setAttribute('data-img', productoAnterior.imagen);
    
    // Resetear selecciones de color y tamaño
    if (document.querySelector('.color.active')) {
      document.querySelector('.color.active').classList.remove('active');
      document.querySelector('.color[data-color="black"]').classList.add('active');
    }
    
    if (document.querySelector('.tamanio.active')) {
      document.querySelector('.tamanio.active').classList.remove('active');
      const primerTamanio = document.querySelector('.tamanio');
      if (primerTamanio) primerTamanio.classList.add('active');
    }
    
    inputCantidad.value = '1';
  });
});

document.getElementById('cart-icon').addEventListener('click', function() {
  window.location.href = 'cart.html';
});



