  // Función para cargar los productos del carrito y mostrarlos en la tabla
  function cargarDetalles() {
    const detalleProductos = document.getElementById('detalle-productos');
    const detalleVacio = document.getElementById('detalle-vacio');
    const detalleContenido = document.getElementById('detalle-contenido');
    
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (carrito.length === 0) {
      detalleVacio.style.display = 'block';
      detalleContenido.style.display = 'none';
      return;
    }

    detalleVacio.style.display = 'none';
    detalleContenido.style.display = 'block';
    detalleProductos.innerHTML = '';

    let total = 0;

    carrito.forEach(producto => {
      const precioNumerico = parseFloat(producto.precio.replace(/[^0-9.-]+/g, ''));
      const subtotal = precioNumerico * producto.cantidad;
      total += subtotal;

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
        <td data-label="Precio Unitario">${precioNumerico.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' })}</td>
        <td data-label="Cantidad">${producto.cantidad}</td>
        <td data-label="Subtotal">${subtotal.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' })}</td>
      `;
      detalleProductos.appendChild(fila);
    });

    const filaTotal = document.createElement('tr');
    filaTotal.className = 'fila-total';
    filaTotal.innerHTML = `
      <td colspan="3" style="text-align: right;">Total</td>
      <td>${total.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' })}</td>
    `;
    detalleProductos.appendChild(filaTotal);
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

  function inicializarOpcionesPago() {
    const opcionesPago = document.querySelectorAll('.opcion-pago');
    const detallesTarjeta = document.getElementById('detalles-tarjeta');
    opcionesPago.forEach(opcion => {
      opcion.addEventListener('click', function() {
        opcionesPago.forEach(op => op.classList.remove('seleccionado'));
        this.classList.add('seleccionado');
        detallesTarjeta.style.display = this.getAttribute('data-metodo') === 'tarjeta' ? 'block' : 'none';
      });
    });
  }

  function inicializarBotonCompra() {
    const btnFinalizar = document.getElementById('btn-finalizar');
    const modalConfirmacion = document.getElementById('modal-confirmacion');

    btnFinalizar.addEventListener('click', function() {
      const formulario = document.getElementById('form-datos');
      const inputs = formulario.querySelectorAll('input[required]');
      let formValido = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          formValido = false;
          input.style.borderColor = '#f44336';
        } else {
          input.style.borderColor = '#ddd';
        }
      });

      const email = document.getElementById('email').value;
      const emailConfirm = document.getElementById('email-confirm').value;

      if (email !== emailConfirm) {
        document.getElementById('email-confirm').style.borderColor = '#f44336';
        alert('Los correos electrónicos no coinciden');
        return;
      }

      if (!formValido) {
        alert('Por favor completa todos los campos requeridos');
        return;
      }

      const metodoPagoSeleccionado = document.querySelector('.opcion-pago.seleccionado');

      if (!metodoPagoSeleccionado) {
        alert('Por favor selecciona un método de pago');
        return;
      }

      if (metodoPagoSeleccionado.getAttribute('data-metodo') === 'tarjeta') {
        const inputsTarjeta = document.querySelectorAll('#detalles-tarjeta input');
        let todosCompletos = true;

        inputsTarjeta.forEach(input => {
          if (!input.value.trim()) {
            todosCompletos = false;
            input.style.borderColor = '#f44336';
          } else {
            input.style.borderColor = '#ddd';
          }
        });

        if (!todosCompletos) {
          alert('Por favor completa todos los campos de la tarjeta');
          return;
        }
      }

      if (document.getElementById('guardar-info').checked) {
        const datosUsuario = {
          nombre: document.getElementById('nombre').value,
          apellidos: document.getElementById('apellidos').value,
          email: document.getElementById('email').value,
          departamento: document.getElementById('departamento').value,
          ciudad: document.getElementById('ciudad').value,
          celular: document.getElementById('celular').value
        };
        localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));

        const mensajeGuardado = document.getElementById('mensaje-guardado');
        mensajeGuardado.style.display = 'block';
        setTimeout(() => mensajeGuardado.style.display = 'none', 3000);
      }

      modalConfirmacion.style.display = 'flex';
      localStorage.removeItem('carrito');
    });
  }

  function cargarDatosUsuario() {
    const datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
    if (datosUsuario) {
      document.getElementById('nombre').value = datosUsuario.nombre || '';
      document.getElementById('apellidos').value = datosUsuario.apellidos || '';
      document.getElementById('email').value = datosUsuario.email || '';
      document.getElementById('email-confirm').value = datosUsuario.email || '';
      document.getElementById('departamento').value = datosUsuario.departamento || '';
      document.getElementById('ciudad').value = datosUsuario.ciudad || '';
      document.getElementById('celular').value = datosUsuario.celular || '';
    }
  }

  function irAInicio() {
    window.location.href = 'index.php';
  }

  window.addEventListener('DOMContentLoaded', function() {
    cargarDetalles();
    cargarDatosUsuario();
    inicializarOpcionesPago();
    inicializarBotonCompra();
  });












  