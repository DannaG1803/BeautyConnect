// frontend/js/app.js
async function postJSON(url, data) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(data)
  });
  const json = await res.json().catch(()=>({}));
  if (!res.ok) throw json;
  return json;
}

async function getJSON(url){
  const res = await fetch(url, { credentials: "same-origin" });
  const json = await res.json().catch(()=>({}));
  if (!res.ok) throw json;
  return json;
}

document.addEventListener("DOMContentLoaded", () => {

  // -------------- NAV: actualizar UI según sesión -------------
  (async function updateNav(){
    try {
      const me = await getJSON("/api/me");
      if (!me.error) {
        const loginItem = document.querySelector(".login-item");
        const userMenu = document.querySelector(".user-menu");
        if (loginItem) loginItem.style.display = "none";
        if (userMenu) {
          userMenu.style.display = "block";
          const navUsername = document.getElementById("navUsername");
          if (navUsername) navUsername.textContent = me.nombre || "Usuario";
        }
      }
    } catch(e) { /* no autenticado */ }
  })();

  // -------------- LOGIN (login.html) -------------
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;
      try {
        await postJSON("/api/login", { email, password });
        window.location.href = "/"; // redirige a inicio
      } catch (err) {
        alert(err.error || "Error iniciando sesión");
      }
    });
  }

  // -------------- REGISTRO (registro.html) -------------
  const profForm = document.getElementById("professionalForm");
  if (profForm) {
    profForm.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const nombre = document.getElementById("prof_name").value.trim();
      const email = document.getElementById("prof_email").value.trim();
      const password = document.getElementById("prof_password").value;
      const especialidad = document.getElementById("prof_especialidad").value;
      const experiencia = document.getElementById("prof_experiencia").value;
      const ubicacion = document.getElementById("prof_ubicacion").value || "Chía, Cundinamarca";

      try {
        await postJSON("/api/register", {
          nombre, email, password, rol: "profesional",
          especialidad, experiencia, ubicacion
        });
        alert("Registro exitoso. Inicia sesión.");
        window.location.href = "/login.html";
      } catch (err) {
        alert(err.error || "Error en registro");
      }
    });
  }

  const busForm = document.getElementById("businessForm");
  if (busForm) {
    busForm.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const nombre = document.getElementById("bus_name").value.trim();
      const email = document.getElementById("bus_email").value.trim();
      const password = document.getElementById("bus_password").value;
      // campos extra (nit, representante) pueden enviarse a futuro a otra tabla
      try {
        await postJSON("/api/register", { nombre, email, password, rol: "empresa" });
        alert("Empresa registrada. Inicia sesión.");
        window.location.href = "/login.html";
      } catch (err) {
        alert(err.error || "Error en registro");
      }
    });
  }

  // -------------- CREAR OFERTA (crear-oferta.html) -------------
  const createJobForm = document.getElementById("createJobForm");
  if (createJobForm) {
    createJobForm.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const titulo = document.querySelector("#createJobForm input[placeholder^='Ej']").value || document.querySelector("#createJobForm input[name='titulo']").value;
      // toma campos por id si los asignaste; aquí un ejemplo usando ids:
      const categoria = document.querySelector("select[name='categoria']").value;
      const experiencia = document.querySelector("select[name='experiencia']").value;
      const descripcion = document.querySelector("#createJobForm textarea").value;
      const salario_min = Number(document.querySelector("input[placeholder='Mínimo']").value || 0);
      const salario_max = Number(document.querySelector("input[placeholder='Máximo']").value || 0);
      const ubicacion = document.querySelector("select[name='moneda']") ? "" : "";

      try {
        await postJSON("/api/ofertas", { titulo, descripcion, categoria, experiencia, salario_min, salario_max, ubicacion });
        alert("Oferta publicada");
        window.location.href = "/ofertas.html";
      } catch (err) {
        alert(err.error || "No autorizado o error al crear oferta");
      }
    });
  }

  // -------------- LISTAR OFERTAS (ofertas.html) -------------
  const jobsList = document.getElementById("jobsList");
  if (jobsList) {
    (async () => {
      try {
        const ofertas = await getJSON("/api/ofertas");
        if (Array.isArray(ofertas)) {
          jobsList.innerHTML = ofertas.map(o => `
            <div class="job-card">
              <div class="job-header"><h3>${o.titulo}</h3><span class="job-date">#${o.id}</span></div>
              <div class="job-company"><div><span class="company-name">${o.empresa}</span><span class="job-location">${o.ubicacion || ''}</span></div></div>
              <p class="job-description">${(o.descripcion||'').slice(0,200)}</p>
              <div class="job-details">
                <span>${o.experiencia || ''}</span>
                <span>${o.salario_min || ''} - ${o.salario_max || ''}</span>
              </div>
              <a href="/detalle-oferta.html?id=${o.id}" class="job-view">Ver detalles</a>
            </div>
          `).join("");
        }
      } catch(e) {
        jobsList.innerHTML = "<p>No se pudieron cargar ofertas.</p>";
      }
    })();
  }

  // -------------- LISTAR PROFESIONALES (profesionales.html) -------------
  const profsList = document.getElementById("profsList");
  if (profsList) {
    (async () => {
      try {
        const pros = await getJSON("/api/profesionales");
        profsList.innerHTML = pros.map(p => `
          <div class="professional-card">
            <div class="professional-info">
              <h3>${p.nombre}</h3>
              <p class="professional-title">${p.especialidad || ''}</p>
              <p class="professional-location">${p.ubicacion || ''}</p>
              <p>${(p.bio||'').slice(0,160)}</p>
              <div class="professional-actions">
                <a href="/perfil-profesional.html?id=${p.usuario_id}" class="profile-view">Ver perfil</a>
              </div>
            </div>
          </div>
        `).join("");
      } catch(e) {
        profsList.innerHTML = "<p>No se pudieron cargar profesionales.</p>";
      }
    })();
  }

  // -------------- LOGOUT (si hay botón) -------------
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async (ev) => {
      ev.preventDefault();
      await postJSON("/api/logout", {});
      window.location.href = "/";
    });
  }

});
