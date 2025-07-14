
document.addEventListener('DOMContentLoaded', function() {
    const container     = document.getElementById('container');
    const registerBtn   = document.getElementById('register');
    const loginBtn      = document.getElementById('login');
    const loginForm     = document.getElementById('login-form');
    const registerForm  = document.getElementById('register-form');
    const loginError    = document.getElementById('login-error');
    const registerError = document.getElementById('register-error');

    // Solo estos usuarios pueden entrar:
    const users = [
        { name: 'Luis Webon',        email: 'luiswebon@ejemplo.com',      password: 'Contraseña123'        },
        { name: 'Franquito Library', email: 'franquito@hot.com',     password: 'Veranito1!'       },
        { name: 'Polux Morales',     email: 'cerebelo@gmail.com',    password: 'Policarpio12!'    },
        { name: 'Yeferson Farfan',   email: 'señito@tmre.com',       password: 'Maryteamo123!'    },
        { name: 'Gabo VOid',         email: 'gabrito@edu.com',       password: 'EducacionInicial1!'},
        {name:'Karol Villavicencio', email: 'enfermera@loquita.com', password:'Holamundo123!'}



    ];

    registerBtn.addEventListener('click', () => {
        container.classList.add('active');
    });
    loginBtn.addEventListener('click', () => {
        container.classList.remove('active');
    });

    // LOGIN
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        loginError.style.display = 'none';

        const email    = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();

        if (!email || !password) {
            loginError.textContent = 'Por favor completa todos los campos.';
            loginError.style.display = 'block';
            return;
        }

        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            // Guardar usuario y redirigir
            localStorage.setItem('currentUser', JSON.stringify({
                name:      user.name,
                email:     user.email,
                lastLogin: new Date().toISOString()
            }));
            window.location.href = 'index.html';
        } else {
            loginError.textContent = 'Usuario o contraseña incorrectos.';
            loginError.style.display = 'block';
        }
    });

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        registerError.style.display = 'block';
        registerError.textContent = 'El registro está deshabilitado. Usa un usuario existente.';
    });

    // Efectos visuales en inputs
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('focus', () =>  input.parentNode.classList.add('focus'));
        input.addEventListener('blur', () => {
            if (!input.value) input.parentNode.classList.remove('focus');
        });
    });

    ['google-login','microsoft-login','google-register','microsoft-register'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', e => {
            e.preventDefault();
            alert('Esta opción está deshabilitada.');
        });
    });

    // Olvidé contraseña
    document.querySelector('.forgot-password').addEventListener('click', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        alert(email
            ? `Se enviará un enlace de recuperación a: ${email}`
            : 'Se enviará un enlace de recuperación a tu correo electrónico.');
    });

    // Debug: lista de usuarios permitidos
    console.log('Usuarios válidos:', users);
});
