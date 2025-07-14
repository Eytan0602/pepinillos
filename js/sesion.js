document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    // Botones para cambiar entre registro/inicio
    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            container.classList.add('active');
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            container.classList.remove('active');
        });
    }

    // Efectos visuales en los inputs
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('focus', () => input.parentNode.classList.add('focus'));
        input.addEventListener('blur', () => {
            if (!input.value) input.parentNode.classList.remove('focus');
        });
    });

    // Olvidé mi contraseña
    const forgotPassword = document.querySelector('.forgot-password');
    if (forgotPassword) {
        forgotPassword.addEventListener('click', function (e) {
            e.preventDefault();
            const emailInput = document.querySelector('input[name="email"]');
            const email = emailInput ? emailInput.value.trim() : '';
            alert(email
                ? `Se enviará un enlace de recuperación a: ${email}`
                : 'Se enviará un enlace de recuperación a tu correo electrónico.');
        });
    }

    // Desactivar botones sociales (Google, Microsoft)
    ['google-login', 'microsoft-login', 'google-register', 'microsoft-register'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', e => {
                e.preventDefault();
                alert('Esta opción está deshabilitada.');
            });
        }
    });
});
