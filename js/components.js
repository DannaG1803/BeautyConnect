// Componentes comunes para BeautyConnect

// Header y Navigation
const headerComponent = `
<header>
    <nav>
        <div class="logo">BeautyConnect</div>
        <ul class="nav-links">
            <li><a href="index.html" class="nav-home"><i class="fas fa-home"></i> Inicio</a></li>
            <li><a href="ofertas.html" class="nav-ofertas"><i class="fas fa-briefcase"></i> Ofertas</a></li>
            <li><a href="profesionales.html" class="nav-profesionales"><i class="fas fa-user-friends"></i> Profesionales</a></li>
            <li><a href="planes.html" class="nav-planes"><i class="fas fa-tags"></i> Planes</a></li>
            <li class="login-item"><a href="login.html" class="nav-login"><i class="fas fa-sign-in-alt"></i> Iniciar sesión</a></li>
            <li class="user-menu" style="display: none;">
                <div class="user-avatar">
                    <img src="https://via.placeholder.com/30" alt="Avatar" id="navAvatar">
                    <span id="navUsername">Usuario</span>
                </div>
                <div class="dropdown-menu">
                    <a href="#" id="profileLink"><i class="fas fa-user"></i> Mi Perfil</a>
                    <a href="#" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</a>
                </div>
            </li>
        </ul>
        <div class="menu-toggle">
            <i class="fas fa-bars"></i>
        </div>
    </nav>
</header>
`;

// Footer
const footerComponent = `
<footer>
    <div class="footer-content">
        <div class="footer-logo">
            <div class="logo">BeautyConnect</div>
            <p>Conectando talento y oportunidades en el mundo de la belleza.</p>
        </div>
        <div class="footer-links">
            <h4>Enlaces rápidos</h4>
            <ul>
                <li><a href="index.html">Inicio</a></li>
                <li><a href="ofertas.html">Ofertas</a></li>
                <li><a href="profesionales.html">Profesionales</a></li>
                <li><a href="planes.html">Planes</a></li>
                <li><a href="#">Sobre nosotros</a></li>
            </ul>
        </div>
        <div class="footer-contact">
            <h4>Contacto</h4>
            <p><i class="fas fa-map-marker-alt"></i> Chía, Cundinamarca, Colombia</p>
            <p><i class="fas fa-envelope"></i> info@beautyconnect.co</p>
            <p><i class="fas fa-phone"></i> +57 300 123 4567</p>
        </div>
    </div>
    <div class="footer-bottom">
        <p>&copy; 2025 BeautyConnect. Todos los derechos reservados.</p>
    </div>
</footer>
`;

// Función para insertar componentes
function loadComponents() {
    // Insertar header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerComponent;
    }

    // Insertar footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerComponent;
    }

    // Marcar el enlace activo según la página actual
    setActiveNavLink();
}

// Función para marcar el enlace activo
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComponents);
} else {
    loadComponents();
}
