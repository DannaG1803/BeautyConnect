/**
 * BeautyConnect - auth.js
 * Funciones de autenticación para login y registro
 */

document.addEventListener('DOMContentLoaded', function() {
    // Formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Formularios de registro
    const professionalForm = document.getElementById('professionalForm');
    if (professionalForm) {
        professionalForm.addEventListener('submit', function(e) {
            handleRegister(e, 'professional');
        });
    }
    
    const businessForm = document.getElementById('businessForm');
    if (businessForm) {
        businessForm.addEventListener('submit', function(e) {
            handleRegister(e, 'business');
        });
    }
    
    // Botón de logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});

/**
 * Manejar inicio de sesión
 */
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe')?.checked || false;
    
    // En una aplicación real, aquí se haría una solicitud al servidor
    // Para este demo, simulamos un inicio de sesión exitoso
    
    // Determinar tipo de usuario basado en el correo (demo)
    const isCompany = email.includes('empresa') || email.includes('company') || email.includes('business');
    
    // Crear un objeto de usuario demo
    const user = {
        id: 1,
        name: isCompany ? 'Salón Belleza Total' : 'María Fernández',
        email: email,
        type: isCompany ? 'business' : 'professional',
        avatar: isCompany 
            ? 'https://via.placeholder.com/30?text=BT'
            : 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=30'
    };
    
    // Guardar en localStorage
    localStorage.setItem('beautyconnect_user', JSON.stringify(user));
    
    // Mostrar mensaje
    showLoginMessage(true, 'Inicio de sesión exitoso. Redirigiendo...');
    
    // Redireccionar
    setTimeout(() => {
        window.location.href = isCompany ? 'perfil-empresa.html' : 'perfil-profesional.html';
    }, 1500);
}

/**
 * Manejar registro de usuario
 */
function handleRegister(e, userType) {
    e.preventDefault();
    
    // En una aplicación real, aquí se haría una solicitud al servidor
    // Para este demo, simulamos un registro exitoso
    
    // Crear un objeto de usuario demo
    const user = {
        id: Math.floor(Math.random() * 100) + 1,
        name: userType === 'professional' ? 'Nuevo Profesional' : 'Nueva Empresa',
        email: 'nuevo@beautyconnect.co',
        type: userType,
        avatar: 'https://via.placeholder.com/30?text=NC'
    };
    
    // Guardar en localStorage
    localStorage.setItem('beautyconnect_user', JSON.stringify(user));
    
    // Mostrar mensaje
    showRegisterMessage(true, 'Registro exitoso. Redirigiendo a tu perfil...');
    
    // Redireccionar
    setTimeout(() => {
        window.location.href = userType === 'professional' ? 'perfil-profesional.html' : 'perfil-empresa.html';
    }, 1500);
}

/**
 * Manejar cierre de sesión
 */
function handleLogout(e) {
    e.preventDefault();
    
    // Eliminar información de usuario
    localStorage.removeItem('beautyconnect_user');
    
    // Redireccionar al inicio
    window.location.href = 'index.html';
}

/**
 * Mostrar mensaje en formulario de login
 */
function showLoginMessage(success, message) {
    const loginForm = document.getElementById('loginForm');
    
    // Crear elemento de mensaje si no existe
    let messageElement = document.getElementById('loginMessage');
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.id = 'loginMessage';
        messageElement.classList.add('auth-message');
        loginForm.prepend(messageElement);
    }
    
    // Configurar clase y mensaje
    messageElement.className = 'auth-message ' + (success ? 'success' : 'error');
    messageElement.textContent = message;
    messageElement.style.display = 'block';
}

/**
 * Mostrar mensaje en formulario de registro
 */
function showRegisterMessage(success, message) {
    const registerForm = document.querySelector('.tab-content.active');
    
    // Crear elemento de mensaje si no existe
    let messageElement = document.getElementById('registerMessage');
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.id = 'registerMessage';
        messageElement.classList.add('auth-message');
        registerForm.prepend(messageElement);
    }
    
    // Configurar clase y mensaje
    messageElement.className = 'auth-message ' + (success ? 'success' : 'error');
    messageElement.textContent = message;
    messageElement.style.display = 'block';
}

/**
 * Comprobar formato de email
 */
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Comprobar fortaleza de contraseña
 */
function isStrongPassword(password) {
    // Al menos 8 caracteres, una mayúscula, una minúscula y un número
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return re.test(password);
}

// Añadir estilos CSS para mensajes
const style = document.createElement('style');
style.textContent = `
    .auth-message {
        padding: 10px;
        border-radius: 4px;
        margin-bottom: 15px;
        text-align: center;
    }
    .auth-message.success {
        background-color: rgba(50, 205, 50, 0.2);
        color: #28a745;
    }
    .auth-message.error {
        background-color: rgba(255, 99, 71, 0.2);
        color: #dc3545;
    }
`;
document.head.appendChild(style);