/**
 * BeautyConnect - main.js
 * Funciones generales para todas las páginas
 */

document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Modales
    setupModals();
    
    // Inicializar la navegación según estado de autenticación
    updateNavigation();
});

/**
 * Configurar modales en la página
 */
function setupModals() {
    // Modal de contacto profesional
    setupModal('contactBtn', 'contactModal');
    
    // Modal de aplicar a oferta
    setupModal('job-apply', 'applyModal');
    
    // Modal de contacto en listado de profesionales
    const contactBtns = document.querySelectorAll('.contact-btn');
    if (contactBtns.length > 0) {
        contactBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const professionalId = this.getAttribute('data-id');
                const professionalName = this.closest('.professional-card').querySelector('h3').textContent;
                
                const modal = document.getElementById('contactModal');
                if (modal) {
                    const nameEl = modal.querySelector('#professionalName');
                    if (nameEl) nameEl.textContent = professionalName;
                    
                    modal.style.display = 'flex';
                }
            });
        });
    }
    
    // Cerrar modales con el botón X
    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Cerrar modales al hacer clic fuera
    window.addEventListener('click', function(e) {
        document.querySelectorAll('.modal').forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

/**
 * Configurar un modal específico
 */
function setupModal(triggerSelector, modalId) {
    const trigger = document.getElementById(triggerSelector) || document.querySelector('.' + triggerSelector);
    const modal = document.getElementById(modalId);
    
    if (trigger && modal) {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'flex';
        });
    }
}

/**
 * Actualizar navegación según estado de autenticación
 */
function updateNavigation() {
    const isLoggedIn = checkIfLoggedIn();
    const loginItem = document.querySelector('.login-item');
    const userMenu = document.querySelector('.user-menu');
    
    if (isLoggedIn) {
        // Usuario autenticado
        if (loginItem) loginItem.style.display = 'none';
        if (userMenu) {
            userMenu.style.display = 'list-item';
            
            // Actualizar información del usuario
            const user = getUserInfo();
            const navUsername = document.getElementById('navUsername');
            const navAvatar = document.getElementById('navAvatar');
            const profileLink = document.getElementById('profileLink');
            
            if (navUsername) navUsername.textContent = user.name;
            if (navAvatar) navAvatar.src = user.avatar || 'https://via.placeholder.com/30';
            
            // Actualizar enlace de perfil según tipo de usuario
            if (profileLink) {
                profileLink.href = user.type === 'professional' ? 'perfil-profesional.html' : 'perfil-empresa.html';
            }
        }
        
        // Elementos específicos por tipo de usuario
        const employerActionsLoggedOut = document.querySelector('.employer-actions.logged-out');
        const employerActionsLoggedIn = document.querySelector('.employer-actions.logged-in');
        
        if (employerActionsLoggedOut) employerActionsLoggedOut.style.display = 'none';
        if (employerActionsLoggedIn) employerActionsLoggedIn.style.display = 'block';
    } else {
        // Usuario no autenticado
        if (loginItem) loginItem.style.display = 'list-item';
        if (userMenu) userMenu.style.display = 'none';
    }
}

/**
 * Verificar si hay un usuario autenticado
 */
function checkIfLoggedIn() {
    return localStorage.getItem('beautyconnect_user') !== null;
}

/**
 * Obtener información del usuario actual
 */
function getUserInfo() {
    const userJson = localStorage.getItem('beautyconnect_user');
    return userJson ? JSON.parse(userJson) : null;
}

/**
 * Toggle tabs en formularios
 */
function setupTabs() {
    const tabs = document.querySelectorAll('.auth-tab');
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Desactivar todos los tabs
                document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                // Activar el tab seleccionado
                this.classList.add('active');
                const tabName = this.getAttribute('data-tab');
                const content = document.getElementById(tabName + 'Form');
                if (content) content.classList.add('active');
            });
        });
    }
}

// Inicializar tabs si existen
if (document.querySelector('.auth-tabs')) {
    setupTabs();
}

// Toggle para campos de contraseña
const togglePasswordButtons = document.querySelectorAll('.toggle-password');
if (togglePasswordButtons.length > 0) {
    togglePasswordButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                this.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });
}
function safeAddEventListener(selector, event, callback) {
    const element = typeof selector === 'string' 
        ? document.querySelector(selector) 
        : selector;
        
    if (element) {
        element.addEventListener(event, callback);
        return true;
    }
    return false;
}

// Verificar la existencia de elementos DOM para evitar errores
function elementExists(selector) {
    return document.querySelector(selector) !== null;
}

// Detectar la página actual para cargar solo scripts relevantes
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('profesionales.html')) return 'professionals';
    if (path.includes('perfil-profesional.html')) return 'professionalProfile';
    if (path.includes('ofertas.html')) return 'jobs';
    if (path.includes('perfil-empresa.html')) return 'companyProfile';
    if (path.includes('crear-oferta.html')) return 'createJob';
    if (path.includes('login.html')) return 'login';
    if (path.includes('registro.html')) return 'register';
    return 'home';
}

/**
 * Agregar al final de perfiles.js
 */

// Inicialización específica de página
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = getCurrentPage();
    
    if (currentPage === 'professionals') {
        console.log('Página de profesionales cargada');
        // Inicializar funciones específicas para esta página
        initProfessionalsPage();
    } else if (currentPage === 'professionalProfile') {
        console.log('Página de perfil profesional cargada');
        // Inicializar funciones específicas para esta página
        initProfessionalProfilePage();
    }
});

// Funciones específicas para la página de profesionales
function initProfessionalsPage() {
    // Asegurar que los botones de contacto funcionen
    const contactButtons = document.querySelectorAll('.contact-btn');
    if (contactButtons.length > 0) {
        contactButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const modal = document.getElementById('contactModal');
                if (modal) {
                    const professionalName = this.closest('.professional-card').querySelector('h3').textContent;
                    const nameElement = document.getElementById('professionalName');
                    if (nameElement) {
                        nameElement.textContent = professionalName;
                    }
                    modal.style.display = 'flex';
                }
            });
        });
    }
    
    // Asegurar que los filtros funcionen
    const filterCheckboxes = document.querySelectorAll('.filters input[type="checkbox"]');
    if (filterCheckboxes.length > 0) {
        filterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                console.log(`Filtro "${this.value}" ${this.checked ? 'activado' : 'desactivado'}`);
            });
        });
    }
}

// Funciones específicas para la página de perfil profesional
function initProfessionalProfilePage() {
    // Inicializar lightbox para el portafolio
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    if (portfolioItems.length > 0) {
        portfolioItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                showLightbox(imgSrc);
            });
        });
    }
    
    // Inicializar botón de contacto
    const contactBtn = document.getElementById('contactBtn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const modal = document.getElementById('contactModal');
            if (modal) {
                modal.style.display = 'flex';
            }
        });
    }
}

// Función para mostrar imágenes en lightbox
function showLightbox(imageSrc) {
    let lightbox = document.getElementById('portfolio-lightbox');
    
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'portfolio-lightbox';
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.backgroundColor = 'rgba(0,0,0,0.9)';
        lightbox.style.display = 'flex';
        lightbox.style.justifyContent = 'center';
        lightbox.style.alignItems = 'center';
        lightbox.style.zIndex = '9999';
        
        const closeBtn = document.createElement('span');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '20px';
        closeBtn.style.right = '30px';
        closeBtn.style.fontSize = '40px';
        closeBtn.style.color = 'white';
        closeBtn.style.cursor = 'pointer';
        
        closeBtn.addEventListener('click', function() {
            document.body.removeChild(lightbox);
        });
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                document.body.removeChild(lightbox);
            }
        });
        
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);
    }
    
    // Limpiar contenido anterior
    const existingImg = lightbox.querySelector('img');
    if (existingImg) {
        lightbox.removeChild(existingImg);
    }
    
    // Agregar nueva imagen
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '80%';
    img.style.objectFit = 'contain';
    img.style.border = '5px solid white';
    
    lightbox.appendChild(img);
    lightbox.style.display = 'flex';
}