/**
 * BeautyConnect - ofertas.js
 * Funciones para el manejo de ofertas de empleo
 */

document.addEventListener('DOMContentLoaded', function() {
    // Página de ofertas
    setupJobFilters();
    setupJobSearch();
    setupApplyButtons();
    setupPagination();
    
    // Página de creación de ofertas
    const createJobForm = document.getElementById('createJobForm');
    if (createJobForm) {
        createJobForm.addEventListener('submit', handleCreateJob);
    }
});

/**
 * Configurar filtros de ofertas
 */
function setupJobFilters() {
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
 * Configurar búsqueda de ofertas
 */
function setupJobSearch() {
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
 * Configurar botones de aplicar a oferta
 */
function setupApplyButtons() {
    const applyButtons = document.querySelectorAll('.job-view');
    if (applyButtons.length > 0) {
        applyButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                // Si queremos abrir el modal en lugar de ir al detalle de la oferta
                if (document.getElementById('applyModal')) {
                    e.preventDefault();
                    
                    // Actualizar información del modal con datos de la oferta
                    const jobCard = this.closest('.job-card');
                    const jobTitle = jobCard.querySelector('h3').textContent;
                    const companyName = jobCard.querySelector('.company-name').textContent;
                    
                    document.getElementById('jobTitle').textContent = jobTitle;
                    document.getElementById('companyName').textContent = companyName;
                    
                    // Mostrar el modal
                    document.getElementById('applyModal').style.display = 'flex';
                }
            });
        });
    }
    
    // Manejar envío del formulario de aplicación
    const applyForm = document.getElementById('applyForm');
    if (applyForm) {
        applyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // En una aplicación real, se enviaría la solicitud al servidor
            alert('Solicitud enviada exitosamente. Gracias por tu interés.');
            
            // Cerrar el modal
            document.getElementById('applyModal').style.display = 'none';
        });
    }
}

/**
 * Configurar paginación
 */
function setupPagination() {
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
 * Manejar creación de una nueva oferta
 */
function handleCreateJob(e) {
    e.preventDefault();
    
    // En una aplicación real, se enviaría la oferta al servidor
    // Para este demo, simulamos un guardado exitoso
    
    const saveAsDraft = e.submitter.classList.contains('secondary-button');
    
    if (saveAsDraft) {
        alert('Oferta guardada como borrador. Puedes editarla más tarde.');
    } else {
        alert('Oferta publicada exitosamente. Será visible para los profesionales inmediatamente.');
        
        // Redireccionar a la página de ofertas después de un breve retraso
        setTimeout(() => {
            window.location.href = 'ofertas.html';
        }, 1500);
    }
}

/**
 * Generar vista previa de una oferta
 */
function previewJob() {
    // Recolectar información del formulario
    const title = document.querySelector('input[placeholder="Ej: Estilista con experiencia en color"]').value;
    const category = document.querySelector('select[required]').value;
    const description = document.querySelector('textarea[required]').value;
    
    // Crear una vista previa
    const preview = `
        <h3>${title || 'Título de la oferta'}</h3>
        <p><strong>Categoría:</strong> ${category || 'No seleccionada'}</p>
        <p>${description || 'No hay descripción disponible.'}</p>
    `;
    
    // Mostrar la vista previa en un modal o sección de la página
    alert('Vista previa de la oferta:\n\n' + title + '\n\nEn una implementación real, se mostraría una vista previa completa.');
}