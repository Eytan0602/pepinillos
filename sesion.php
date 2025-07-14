<?php
session_start();
$conexion = new mysqli("localhost", "root", "51Jairsiño)", "usuarios");

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

$modalMessage = "";
$redirect = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = $_POST["email"] ?? '';
    $password = $_POST["password"] ?? '';

    if ($email && $password) {
       $stmt = $conexion->prepare("SELECT contraseña FROM registro WHERE gmail = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    $fila = $resultado->fetch_assoc();
    $hashAlmacenado = $fila['contraseña'];

    if (password_verify($password, $hashAlmacenado)) {

    $stmtNombre = $conexion->prepare("SELECT nombre FROM registro WHERE gmail = ?");
    $stmtNombre->bind_param("s", $email);
    $stmtNombre->execute();
    $resNombre = $stmtNombre->get_result();
    $nombreUsuario = ($resNombre->num_rows > 0) ? $resNombre->fetch_assoc()['nombre'] : 'Usuario';
    $stmtNombre->close();

    $_SESSION['usuario'] = [
        'email' => $email,
        'name' => $nombreUsuario
    ];

    $modalMessage = "<strong>✅ Bienvenido</strong><br>Redirigiendo a inicio...";
    $redirect = "index.php";
} else {
        $modalMessage = "<strong>❌ Error</strong><br>Contraseña incorrecta.";
    }
} else {
    $modalMessage = "<strong>❌ Error</strong><br>Correo no registrado.";
}

        $stmt->close();
    } else {
        $modalMessage = "<strong>⚠ï¸ Atención</strong><br>Por favor, complete todos los campos.";
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Iniciar Sesión - Nexium Tech</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
  <link rel="stylesheet" href="css/sesion.css" />
</head>
<body>

  <div class="container" id="container">
    <div class="form-container login-container">
      <form class="form" id="login-form" action="sesion.php" method="POST">
        <div class="logo">Nexium</div>
        <h1 class="form-title">Iniciar Sesión</h1>
      <div class="social-container">
  <a href="#" class="social" id="google-login"><i class="fab fa-google"></i></a>
  <a href="#" class="social" id="microsoft-login"><i class="fab fa-microsoft"></i></a>
</div>
        <span>o usa tu correo y contraseña</span>
        <div class="form-group">
          <input type="email" name="email" placeholder="Correo electrónico" required />
        </div>
        <div class="form-group">
          <input type="password" name="password" placeholder="Contraseña" required />
        </div>
        <div class="checkbox-container">
          <input type="checkbox" id="remember-me" />
          <label for="remember-me">Recordar mi contraseña</label>
        </div>
        <a href="#" class="forgot-password">¿Olvidaste tu contraseña?</a>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
    <div class="form-container register-container">
      <div style="display: none;"></div>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left"></div>
        <div class="overlay-panel overlay-right">
          <h1>¡Hola, amigo!</h1>
          <p>Introduce tus datos personales y comienza tu viaje con nosotros</p>
          <a href="registro.php">
            <button class="ghost" id="register">Registrarse</button>
          </a>
        </div>
      </div>
    </div>
  </div>
<script src="js/sesion.js"></script>
  <?php if (!empty($modalMessage)): ?>
  <div class="modal" id="feedback-modal">
    <div class="modal-content">
      <?= $modalMessage ?>
    </div>
  </div>
  <script>
    document.getElementById("feedback-modal").style.display = "flex";
    <?php if ($redirect): ?>
      setTimeout(() => window.location.href = "<?= $redirect ?>", 2000);
    <?php endif; ?>
  </script>
  <?php endif; ?>

</body>
</html>