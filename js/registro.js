document.addEventListener('DOMContentLoaded', function() {
            const registerForm = document.getElementById('register-form');
            const passwordInput = document.getElementById('password');
            const confirmPasswordInput = document.getElementById('confirm-password');
            const passwordError = document.getElementById('password-error');
            const confirmPasswordError = document.getElementById('confirm-password-error');
            const togglePassword = document.getElementById('toggle-password');
            
            const reqLength = document.getElementById('req-length');
            const reqUppercase = document.getElementById('req-uppercase');
            const reqLowercase = document.getElementById('req-lowercase');
            const reqNumber = document.getElementById('req-number');
            const reqSpecial = document.getElementById('req-special');
            
            togglePassword.addEventListener('click', function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                togglePassword.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
            });
              
            // Validación de la contraseña

            passwordInput.addEventListener('input', function() {
                const password = this.value;
                
                const lengthValid = password.length >= 8;
                const uppercaseValid = /[A-Z]/.test(password);
                const lowercaseValid = /[a-z]/.test(password);
                const numberValid = /[0-9]/.test(password);
                const specialValid = /[^A-Za-z0-9]/.test(password);
                
                reqLength.classList.toggle('valid', lengthValid);
                reqUppercase.classList.toggle('valid', uppercaseValid);
                reqLowercase.classList.toggle('valid', lowercaseValid);
                reqNumber.classList.toggle('valid', numberValid);
                reqSpecial.classList.toggle('valid', specialValid);
                  // Validar que la contraseña cumpla con todos los requisitos
                if (lengthValid && uppercaseValid && lowercaseValid && numberValid && specialValid) {
                    passwordError.style.display = 'none';
                } else {
                    passwordError.style.display = 'block';
                }
                
                if (confirmPasswordInput.value) {
                    validatePasswordMatch();
                }
            });
            
            confirmPasswordInput.addEventListener('input', validatePasswordMatch);
            
            function validatePasswordMatch() {
                if (passwordInput.value !== confirmPasswordInput.value) {
                    confirmPasswordError.style.display = 'block';
                } else {
                    confirmPasswordError.style.display = 'none';
                }
            }
                       
            // Validación del formulario al enviar

            registerForm.addEventListener('submit', function(e) {                
                const fullname = document.getElementById('fullname').value;
                const email = document.getElementById('email').value;
                const password = passwordInput.value;
                const confirmPassword = confirmPasswordInput.value;
                const termsChecked = document.getElementById('terms').checked;
                
                if (!fullname || !email || !password || !confirmPassword) {
                    alert('Por favor, complete todos los campos obligatorios');
                    return;
                }
                
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('Por favor, ingrese un correo electrónico válido');
                    return;
                }
                              
                // Validar contraseña

                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
                if (!passwordRegex.test(password)) {
                    alert('La contraseña no cumple con los requisitos mínimos de seguridad');
                    return;
                }
                
                // Validar coincidencia de contraseñas

                if (password !== confirmPassword) {
                    confirmPasswordError.style.display = 'block';
                    return;
                }
                
                if (!termsChecked) {
                    alert('Debe aceptar los términos y condiciones para continuar');
                    return;
                }
                
                alert('¡Registro exitoso! Puede seguir con su compra.');
                
                window.location.href = 'verificar.html';
            });
            
            document.querySelector('.social-button.google').addEventListener('click', function() {
                alert('Redirigiendo a la autenticación de Google...');
            });
            
            document.querySelector('.social-button.microsoft').addEventListener('click', function() {
                alert('Redirigiendo a la autenticación de Microsoft...');
            });
        });

document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM relacionados con registro
    const registerForm = document.getElementById('register-form');
    const registerError = document.getElementById('register-error');
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    
    // Si estamos en una página que tiene el botón para cambiar a modo registro
    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            container.classList.add('active');
        });
    }
    
    // Obtener usuarios del localStorage
    function getUsers() {
        return JSON.parse(localStorage.getItem('users') || '[]');
    }
    
    // Manejo del formulario de registro
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            
            const name = document.getElementById('register-name').value.trim();
            const email = document.getElementById('register-email').value.trim();
            const password = document.getElementById('register-password').value.trim();
            const confirmPassword = document.getElementById('register-confirm-password').value.trim();
            
            // Validar datos
            if (name === '' || email === '' || password === '' || confirmPassword === '') {
                registerError.style.display = 'block';
                registerError.textContent = 'Todos los campos son obligatorios.';
                return;
            }
            
            if (password !== confirmPassword) {
                registerError.style.display = 'block';
                registerError.textContent = 'Las contraseñas no coinciden.';
                return;
            }
            
            if (password.length < 6) {
                registerError.style.display = 'block';
                registerError.textContent = 'La contraseña debe tener al menos 6 caracteres.';
                return;
            }
            
            // Verificar si el email ya está registrado
            const users = getUsers();
            if (users.some(u => u.email === email)) {
                registerError.style.display = 'block';
                registerError.textContent = 'Este correo ya está registrado.';
                return;
            }
            
            // Registrar nuevo usuario
            registerError.style.display = 'none';
            
            // Agregar nuevo usuario
            users.push({ name, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            
            // Mensaje de éxito y cambiar a panel de login
            alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
            container.classList.remove('active');
            
            // Opcional: limpiar el formulario
            registerForm.reset();
        });
    }
    
    // Efectos visuales para los campos de entrada - Esta parte se duplica en ambos archivos
    // pues ambos scripts pueden cargarse independientemente
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentNode.classList.add('focus');
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentNode.classList.remove('focus');
            }
        });
    });
    
    // Autenticación con proveedores externos - Registro
    const googleRegisterBtn = document.getElementById('google-register');
    if (googleRegisterBtn) {
        googleRegisterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            simulateExternalLogin('Google User', 'google_user@gmail.com');
            alert('Registrándose con Google...');
        });
    }
    
    const microsoftRegisterBtn = document.getElementById('microsoft-register');
    if (microsoftRegisterBtn) {
        microsoftRegisterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            simulateExternalLogin('Microsoft User', 'ms_user@outlook.com');
            alert('Registrándose con Microsoft...');
        });
    }
    
    // Simulación de registro con proveedor externo
    function simulateExternalLogin(name, email) {
        const currentUser = {
            name: name,
            email: email,
            lastLogin: new Date().toISOString()
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        window.location.href = 'index.html';
    }
});