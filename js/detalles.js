// Función para cargar los productos del carrito y mostrarlos en la tabla
function cargarDetalles() {
    const detalleProductos = document.getElementById('detalle-productos');
    const detalleVacio = document.getElementById('detalle-vacio');
    const detalleContenido = document.getElementById('detalle-contenido');
    
    // Obtener el carrito del localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Verificar si el carrito está vacío
    if (carrito.length === 0) {
      detalleVacio.style.display = 'block';
      detalleContenido.style.display = 'none';
      return;
    }
    
    detalleVacio.style.display = 'none';
    detalleContenido.style.display = 'block';
    
    // Limpiar el contenido previo
    detalleProductos.innerHTML = '';
    
    // Añadir cada producto a la tabla
    let total = 0;
    
    carrito.forEach(producto => {
      // Calcular precio total del item
      const precioNumerico = parseFloat(producto.precio.replace(/[^0-9.-]+/g, ''));
      const subtotal = precioNumerico * producto.cantidad;
      total += subtotal;
      
      // Crear fila para el producto
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td data-label="Producto">
          <div class="producto-info">
            <img src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
              <h4>${producto.titulo}</h4>
              <p>Color: ${traducirColor(producto.color)} | Tamaño: ${producto.tamanio}</p>
            </div>
          </div>
        </td>
        <td data-label="Precio Unitario">${producto.precio}</td>
        <td data-label="Cantidad">${producto.cantidad}</td>
        <td data-label="Subtotal">$${subtotal.toFixed(2)}</td>
      `;
      
      detalleProductos.appendChild(fila);
    });
    
    // Añadir fila de total
    const filaTotal = document.createElement('tr');
    filaTotal.className = 'fila-total';
    filaTotal.innerHTML = `
      <td colspan="3" style="text-align: right;">Total</td>
      <td>$${total.toFixed(2)}</td>
    `;
    
    detalleProductos.appendChild(filaTotal);
  }
  
  // Función para traducir el color del inglés al español
  function traducirColor(color) {
    const colores = {
      'black': 'Negro',
      'white': 'Blanco',
      'red': 'Rojo',
      'blue': 'Azul'
    };
    
    return colores[color] || color;
  }
  
  // Función para seleccionar método de pago
  function inicializarOpcionesPago() {
    const opcionesPago = document.querySelectorAll('.opcion-pago');
    const detallesTarjeta = document.getElementById('detalles-tarjeta');
    
    opcionesPago.forEach(opcion => {
      opcion.addEventListener('click', function() {
        // Quitar la clase seleccionado de todas las opciones
        opcionesPago.forEach(op => op.classList.remove('seleccionado'));
        
        // Añadir la clase seleccionado a la opción clickeada
        this.classList.add('seleccionado');
        
        // Mostrar/ocultar detalles de tarjeta según la opción seleccionada
        if (this.getAttribute('data-metodo') === 'tarjeta') {
          detallesTarjeta.style.display = 'block';
        } else {
          detallesTarjeta.style.display = 'none';
        }
      });
    });
  }
  
  // Función para manejar la finalización de la compra
  function inicializarBotonCompra() {
    const btnFinalizar = document.getElementById('btn-finalizar');
    const modalConfirmacion = document.getElementById('modal-confirmacion');
    
    btnFinalizar.addEventListener('click', function() {
      // Verificar si se ha seleccionado un método de pago
      const metodoPagoSeleccionado = document.querySelector('.opcion-pago.seleccionado');
      
      if (!metodoPagoSeleccionado) {
        alert('Por favor selecciona un método de pago');
        return;
      }
      
      // Si se seleccionó tarjeta, validar los campos
      if (metodoPagoSeleccionado.getAttribute('data-metodo') === 'tarjeta') {
        const inputs = document.querySelectorAll('#detalles-tarjeta input');
        let todosCompletos = true;
        
        inputs.forEach(input => {
          if (!input.value.trim()) {
            todosCompletos = false;
          }
        });
        
        if (!todosCompletos) {
          alert('Por favor completa todos los campos de la tarjeta');
          return;
        }
      }
      
      // Mostrar modal de confirmación
      modalConfirmacion.style.display = 'flex';
      
      // Limpiar el carrito
      localStorage.removeItem('carrito');
    });
  }
  
  // Función para redirigir al inicio después de la compra
  function irAInicio() {
    window.location.href = 'index.html';
  }
  
  // Cargar la página
  window.addEventListener('DOMContentLoaded', function() {
    cargarDetalles();
    inicializarOpcionesPago();
    inicializarBotonCompra();
  });
  
  // Funcionalidad para el menú hamburguesa en versión móvil
  const menuToggle = document.querySelector('.menu-toggle');
  const navRight = document.querySelector('nav .right');
  
  menuToggle.addEventListener('click', function() {
    navRight.style.display = navRight.style.display === 'flex' ? 'none' : 'flex';
  });