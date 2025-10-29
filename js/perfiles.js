/**
 * BeautyConnect - perfiles.js
 * Funciones para el manejo de perfiles profesionales y empresas
 */

document.addEventListener('DOMContentLoaded', function() {
    // Página de profesionales
    setupProfessionalFilters();
    setupProfessionalSearch();
    setupContactButtons();
    setupProfessionalPagination();
    
    // Perfil profesional
    setupPortfolioGallery();
    
    // Perfil de empresa
    setupCompanyGallery();
    setupReviews();
});

/**
 * Configurar filtros de profesionales
 */
function setupProfessionalFilters() {
    const applyFiltersBtn = document.getElementById('applyFilters');
    const clearFiltersBtn = document.getElementById('clearFilters');
    
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            // En una aplicación real, se enviarían los filtros al servidor
            // Para este demo, mostramos un mensaje de confirmación
            alert('Filtros aplicados. En una implementación real, se realizaría una búsqueda con los parámetros seleccionados.');
        });
    }
    
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            // Limpiar todos los checkboxes
            document.querySelectorAll('.filters input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
        });
    }
}

/**
 * Configurar búsqueda de profesionales
 */
function setupProfessionalSearch() {
    const searchInput = document.querySelector('.search-input input');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                // En una aplicación real, se enviaría la búsqueda al servidor
                alert('Buscando: ' + this.value);
            }
        });
    }
    
    const searchFilter = document.querySelector('.search-filter select');
    if (searchFilter) {
        searchFilter.addEventListener('change', function() {
            // En una aplicación real, se actualizaría el orden de los resultados
            alert('Ordenando por: ' + this.value);
        });
    }
}

/**
 * Configurar botones de contacto para profesionales
 */
function setupContactButtons() {
    // Manejar envío del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // En una aplicación real, se enviaría el mensaje al servidor
            alert('Mensaje enviado exitosamente.');
            
            // Cerrar el modal
            document.getElementById('contactModal').style.display = 'none';
        });
    }
}

/**
 * Configurar paginación para lista de profesionales
 */
function setupProfessionalPagination() {
    const paginationNumbers = document.querySelectorAll('.pagination-number');
    
    if (paginationNumbers.length > 0) {
        paginationNumbers.forEach(num => {
            num.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Desactivar número activo
                document.querySelector('.pagination-number.active').classList.remove('active');
                
                // Activar número seleccionado
                this.classList.add('active');
                
                // En una aplicación real, se cargarían los resultados de la página seleccionada
                // Para este demo, mostramos un mensaje
                alert('Cargando página ' + this.textContent);
            });
        });
    }
    
    const prevButton = document.querySelector('.pagination-prev');
    const nextButton = document.querySelector('.pagination-next');
    
    if (prevButton) {
        prevButton.addEventListener('click', function(e) {
            if (this.classList.contains('disabled')) return;
            e.preventDefault();
            
            // En una aplicación real, se cargaría la página anterior
            alert('Cargando página anterior');
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', function(e) {
            if (this.classList.contains('disabled')) return;
            e.preventDefault();
            
            // En una aplicación real, se cargaría la página siguiente
            alert('Cargando página siguiente');
        });
    }
}

/**
 * Configurar galería de portafolio para perfil profesional
 */
function setupPortfolioGallery() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (portfolioItems.length > 0) {
        portfolioItems.forEach(item => {
            item.addEventListener('click', function() {
                // En una implementación real, esto mostraría la imagen en un lightbox
                const imageSrc = this.querySelector('img').src;
                
                // Crear un modal simple para mostrar la imagen
                const modal = document.createElement('div');
                modal.style.position = 'fixed';
                modal.style.top = '0';
                modal.style.left = '0';
                modal.style.width = '100%';
                modal.style.height = '100%';
                modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
                modal.style.display = 'flex';
                modal.style.justifyContent = 'center';
                modal.style.alignItems = 'center';
                modal.style.zIndex = '1000';
                modal.onclick = function() {
                    document.body.removeChild(modal);
                };
                
                const image = document.createElement('img');
                image.src = imageSrc;
                image.style.maxWidth = '90%';
                image.style.maxHeight = '90%';
                image.style.objectFit = 'contain';
                image.style.border = '5px solid white';
                
                modal.appendChild(image);
                document.body.appendChild(modal);
            });
        });
    }
}

/**
 * Configurar galería para perfil de empresa
 */
function setupCompanyGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                // En una implementación real, esto mostraría la imagen en un lightbox
                const imageSrc = this.querySelector('img').src;
                
                // Crear un modal simple para mostrar la imagen
                const modal = document.createElement('div');
                modal.style.position = 'fixed';
                modal.style.top = '0';
                modal.style.left = '0';
                modal.style.width = '100%';
                modal.style.height = '100%';
                modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
                modal.style.display = 'flex';
                modal.style.justifyContent = 'center';
                modal.style.alignItems = 'center';
                modal.style.zIndex = '1000';
                modal.onclick = function() {
                    document.body.removeChild(modal);
                };
                
                const image = document.createElement('img');
                image.src = imageSrc;
                image.style.maxWidth = '90%';
                image.style.maxHeight = '90%';
                image.style.objectFit = 'contain';
                image.style.border = '5px solid white';
                
                modal.appendChild(image);
                document.body.appendChild(modal);
            });
        });
    }
}

/**
 * Configurar sección de reseñas
 */
function setupReviews() {
    // Podemos implementar funcionalidad para dejar reseñas, votar, etc.
    // Por ahora, simplemente mostramos las reseñas existentes
}

/**
 * Guardar perfil como favorito
 */
function saveAsFavorite(profileId, profileType) {
    // Verificar si el usuario está autenticado
    if (!checkIfLoggedIn()) {
        alert('Debes iniciar sesión para guardar perfiles como favoritos.');
        window.location.href = 'login.html';
        return;
    }
    
    // En una implementación real, se enviaría esta información al servidor
    alert('Perfil guardado como favorito.');
    
    // Cambiar estilo del botón de guardar
    const saveButton = document.querySelector('.secondary-button');
    if (saveButton) {
        saveButton.innerHTML = '<i class="fas fa-star"></i> Guardado';
        saveButton.style.backgroundColor = 'rgba(255, 105, 180, 0.1)';
    }
}

/**
 * Compartir perfil
 */
function shareProfile(profileId, profileType) {
    // En una implementación real, esto abriría un modal con opciones para compartir
    // Por simplicidad, usamos la API de compartir nativa si está disponible
    
    if (navigator.share) {
        navigator.share({
            title: 'Perfil en BeautyConnect',
            text: 'Mira este perfil profesional en BeautyConnect',
            url: window.location.href,
        })
        .then(() => console.log('Contenido compartido exitosamente'))
        .catch((error) => console.log('Error al compartir', error));
    } else {
        // Fallback para navegadores que no soportan la API de compartir
        prompt('Copia este enlace para compartir el perfil:', window.location.href);
    }
}

/**
 * Comprobar si el usuario está autenticado
 */
function checkIfLoggedIn() {
    return localStorage.getItem('beautyconnect_user') !== null;
}