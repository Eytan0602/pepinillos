<?php
$server = "localhost";
$user = "root";
$pass = "51Jairsiño)";
$db = "usuarios";

$conexion = new mysqli($server, $user, $pass, $db);
if ($conexion->connect_errno) {
    die("❌ Error en la conexión: " . $conexion->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['fullname'] ?? '';
    $gmail = $_POST['email'] ?? '';
    $contrasena = $_POST['password'] ?? '';

    if (!empty($nombre) && !empty($gmail) && !empty($contrasena)) {
        $contrasena_hash = password_hash($contrasena, PASSWORD_DEFAULT);

        $sql = "INSERT INTO registro (nombre, gmail, contraseña) VALUES (?, ?, ?)";
        $stmt = $conexion->prepare($sql);
        $stmt->bind_param("sss", $nombre, $gmail, $contrasena_hash);

        if ($stmt->execute()) {
            echo "<script>alert('✅ Registro exitoso'); window.location.href='sesion.php';</script>";
        } else {
            echo "❌ Error al guardar: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "<script>alert('⚠️ Todos los campos son obligatorios.');</script>";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
   <link rel="stylesheet" href="css/registro.css">
</head>
<body>
   <div class="container">
        <div class="form-side">
            <div class="logo">Nexium</span></div>
            <h2 class="form-title">Crear nueva cuenta</h2>
            
            <form class="form" id="register-form" action="registro.php" method="POST">
                <div class="social-container">
                    <button type="button" class="social-button google">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.4252 7.31358H16.7194H9.15299V10.5933H14.0517C13.5528 12.4854 11.9661 13.8731 9.15299 13.8731C5.80506 13.8731 3.09113 11.1592 3.09113 7.81126C3.09113 4.46334 5.80506 1.74941 9.15299 1.74941C10.7397 1.74941 12.1801 2.35182 13.2669 3.35204L15.5717 1.04722C13.9 -0.451382 11.6579 -1.41552 9.15299 -1.41552C4.10819 -1.41552 0 2.69266 0 7.81126C0 12.9299 4.10819 17.038 9.15299 17.038C13.7108 17.038 17.3 13.8731 17.3 7.81126C17.3 7.64753 17.3 7.48379 17.2724 7.31358H17.4252Z" fill="#4285F4"/>
                        </svg>
                        Google
                    </button>
                    <button type="button" class="social-button microsoft">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.54 0H0V8.54H8.54V0Z" fill="#F25022"/>
                            <path d="M18 0H9.46V8.54H18V0Z" fill="#7FBA00"/>
                            <path d="M8.54 9.46H0V18H8.54V9.46Z" fill="#00A4EF"/>
                            <path d="M18 9.46H9.46V18H18V9.46Z" fill="#FFB900"/>
                        </svg>
                        Microsoft
                    </button>
                </div>
                
                <div class="social-divider">O</div>
                
                <div class="form-group">
                    <input type="text" id="fullname" name="fullname" placeholder=" " required>
                    <label for="fullname">Nombre Completo</label>
                </div>
                
                <div class="form-group">
                    <input type="email" id="email" name="email" placeholder=" " required>
                    <label for="email">Correo Electrónico</label>
                </div>
                
                <div class="form-group">
                    <input type="password" id="password" name="password" placeholder=" " required>
                    <label for="password">Contraseña</label>
                    <span class="reveal-password" id="toggle-password">👁️</span>
                    <div class="validation-error" id="password-error">La contraseña debe tener al menos 8 caracteres.</div>
                </div>
                
                <div class="form-group">
                    <input type="password" id="confirm-password" name="confirm-password" placeholder=" " required>
                    <label for="confirm-password">Confirmar Contraseña</label>
                    <div class="validation-error" id="confirm-password-error">Las contraseñas no coinciden.</div>
                </div>
                
                <div class="password-requirements">
                    <h4>La contraseña debe contener:</h4>
                    <div class="requirement" id="req-length"><span></span> Al menos 8 caracteres</div>
                    <div class="requirement" id="req-uppercase"><span></span> Una letra mayúscula</div>
                    <div class="requirement" id="req-lowercase"><span></span> Una letra minúscula</div>
                    <div class="requirement" id="req-number"><span></span> Un número</div>
                    <div class="requirement" id="req-special"><span></span> Un carácter especial</div>
                </div>
                
                <div class="custom-checkbox">
                    <input type="checkbox" id="terms" name="terms" required>
                    <label for="terms">Acepto los Términos y Condiciones</label>
                </div>
                <button type="submit" class="submit-button">
                    Crear Cuenta
                    </button>

                
                <div class="login-link">
                    ¿Ya tienes una cuenta? <a href="sesion.php">Iniciar Sesión</a>
                </div>
            </form>
        </div>
        
        <div class="image-side">
            <div class="image-side-content">
                <h2>¡Bienvenido a Nexium!</h2>
                <p>Ahora eres un verdadero pavo, disfruta de nuestros servicios exclusivos.</p>
                   <img src="pavo.jpg" alt="Imagen personalizada" style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
            </div>
        </div>
    </div>
      <script src="js/registro.js"></script>

</body>
</html>