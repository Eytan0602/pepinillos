function cargarCarrito() {
  const carritoItems = document.getElementById('lista-carrito');
  const carritoVacio = document.getElementById('carrito-vacio');
  const carritoContenido = document.getElementById('carrito-contenido');

  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  if (carrito.length === 0) {
    carritoVacio.style.display = 'block';
    carritoContenido.style.display = 'none';
    return;
  }

  carritoVacio.style.display = 'none';
  carritoContenido.style.display = 'grid';

  carritoItems.innerHTML = '';

  let subtotal = 0;

  carrito.forEach((producto, index) => {
    const precioNumerico = parseFloat(producto.precio.replace(/[^0-9.-]+/g, ''));
    const precioTotal = precioNumerico * producto.cantidad;
    subtotal += precioTotal;

    const itemCarrito = document.createElement('div');
    itemCarrito.className = 'carrito-item';
    itemCarrito.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.titulo}">
      <div class="item-info">
        <h3>${producto.titulo}</h3>
        <p class="item-detalles">Color: ${traducirColor(producto.color)} | Tamaño: ${producto.tamanio}</p>
        <p class="item-precio">${precioNumerico.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' })}</p>
      </div>
      <div class="item-acciones">
        <div class="control-cantidad">
          <button class="btn-disminuir" data-index="${index}">-</button>
          <input type="text" value="${producto.cantidad}" class="input-cantidad" data-index="${index}" readonly>
          <button class="btn-aumentar" data-index="${index}">+</button>
        </div>
        <button class="eliminar-item" data-index="${index}">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
    carritoItems.appendChild(itemCarrito);
  });

  actualizarResumen(subtotal);
  añadirEventListeners();
}

function traducirColor(color) {
  const colores = {
    'black': 'Negro',
    'white': 'Blanco',
    'red': 'Rojo',
    'blue': 'Azul'
  };
  return colores[color] || color;
}

function actualizarResumen(subtotal) {
  const formatoMoneda = subtotal.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' });
  document.getElementById('subtotal').textContent = formatoMoneda;
  document.getElementById('total').textContent = formatoMoneda;
}

function añadirEventListeners() {
  document.querySelectorAll('.btn-disminuir').forEach(btn => {
    btn.addEventListener('click', function () {
      const index = this.getAttribute('data-index');
      actualizarCantidad(index, -1);
    });
  });

  document.querySelectorAll('.btn-aumentar').forEach(btn => {
    btn.addEventListener('click', function () {
      const index = this.getAttribute('data-index');
      actualizarCantidad(index, 1);
    });
  });

  document.querySelectorAll('.eliminar-item').forEach(btn => {
    btn.addEventListener('click', function () {
      const index = this.getAttribute('data-index');
      eliminarItem(index);
    });
  });

  document.getElementById('btn-proceder-pago').addEventListener('click', mostrarModalRegistro);
}

function actualizarCantidad(index, cambio) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  carrito[index].cantidad += cambio;
  if (carrito[index].cantidad < 1) {
    carrito[index].cantidad = 1;
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  cargarCarrito();
}

function eliminarItem(index) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  cargarCarrito();
}



window.addEventListener('DOMContentLoaded', cargarCarrito);


