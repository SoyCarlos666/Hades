/* =========================================================
   PORTFOLIO SCRIPT
========================================================= */


let config = clone(DEFAULT_CONFIG);


/* =========================================================
   UTILIDADES
========================================================= */

function clone(object) {
  return JSON.parse(JSON.stringify(object));
}


function escapeHTML(value) {

  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


function loadConfig() {

  try {

    const saved = localStorage.getItem("portfolioConfig");

    if (!saved) {
      return clone(DEFAULT_CONFIG);
    }

    const parsed = JSON.parse(saved);

    return {
      ...clone(DEFAULT_CONFIG),
      ...parsed,
      profile: {
        ...clone(DEFAULT_CONFIG.profile),
        ...(parsed.profile || {})
      },
      about: {
        ...clone(DEFAULT_CONFIG.about),
        ...(parsed.about || {})
      },
      studio: {
        ...clone(DEFAULT_CONFIG.studio),
        ...(parsed.studio || {})
      },
      services: Array.isArray(parsed.services)
        ? parsed.services
        : clone(DEFAULT_CONFIG.services),
      projects: Array.isArray(parsed.projects)
        ? parsed.projects
        : clone(DEFAULT_CONFIG.projects),
      reviews: Array.isArray(parsed.reviews)
        ? parsed.reviews
        : clone(DEFAULT_CONFIG.reviews),
      socials: Array.isArray(parsed.socials)
        ? parsed.socials
        : clone(DEFAULT_CONFIG.socials)
    };

  } catch (error) {

    console.error("No se pudo cargar la configuracion:", error);

    return clone(DEFAULT_CONFIG);
  }
}


config = loadConfig();


/* =========================================================
   ELEMENTOS
========================================================= */

const loader = document.getElementById("portfolioLoader");
const loaderNumber = document.getElementById("loaderNumber");
const loaderProgress = document.getElementById("loaderProgress");
const loaderStatus = document.getElementById("loaderStatus");

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");


/* =========================================================
   RENDER PRINCIPAL
========================================================= */

function renderProfile() {

  document.getElementById("heroName").textContent =
    config.profile.name;

  document.getElementById("heroTitle").textContent =
    config.profile.title;

  document.getElementById("heroDescription").textContent =
    config.profile.description;

  document.getElementById("heroStatus").textContent =
    config.profile.status;

  document.getElementById("heroImage").src =
    config.profile.image;

  document.getElementById("aboutTitle").textContent =
    config.about.title;

  document.getElementById("aboutText").textContent =
    config.about.text;

  document.getElementById("studioName").textContent =
    config.studio.name;

  document.getElementById("studioDescription").textContent =
    config.studio.description;
}


/* =========================================================
   SERVICIOS
========================================================= */

function renderServices() {

  const container =
    document.getElementById("servicesGrid");

  container.innerHTML = "";

  config.services.forEach((service, index) => {

    const card = document.createElement("article");

    card.className = "service-card reveal";

    card.innerHTML = `

      <div class="service-number">
        ${String(index + 1).padStart(2, "0")}
      </div>

      <h3>
        ${escapeHTML(service.title)}
      </h3>

      <p>
        ${escapeHTML(service.description)}
      </p>

    `;

    container.appendChild(card);
  });
}


/* =========================================================
   PROYECTOS
========================================================= */

function renderProjects() {

  const container =
    document.getElementById("projectsGrid");

  container.innerHTML = "";

  config.projects.forEach((project, index) => {

    const card = document.createElement("article");

    card.className = "project-card reveal";

    card.innerHTML = `

      <div class="project-top">

        <div class="project-number">
          ${String(index + 1).padStart(2, "0")}
        </div>

        <div class="project-status">
          ${escapeHTML(project.status || "Proximamente")}
        </div>

      </div>

      <h3>
        ${escapeHTML(project.name)}
      </h3>

      <div class="project-category">
        ${escapeHTML(project.category)}
      </div>

      <p class="project-description">
        ${escapeHTML(project.description)}
      </p>

      <button
        class="project-button"
        data-project="${index}"
      >
        Ver proyecto
      </button>

    `;

    container.appendChild(card);
  });


  document
    .querySelectorAll(".project-button")
    .forEach(button => {

      button.addEventListener("click", () => {

        const index =
          Number(button.dataset.project);

        openProject(index);

      });

    });
}


/* =========================================================
   ABRIR PROYECTO
========================================================= */

function openProject(index) {

  const project = config.projects[index];

  if (!project) {
    return;
  }


  const url =
    String(project.clientUrl || "").trim();


  if (!url || url === "#") {

    showComingSoon(project.name);

    return;
  }


  startPortfolioLoader(
    url,
    "Abriendo portafolio"
  );
}


/* =========================================================
   PROYECTO PROXIMAMENTE
========================================================= */

function showComingSoon(name) {

  const old = document.getElementById("comingSoon");

  if (old) {
    old.remove();
  }


  const modal =
    document.createElement("div");

  modal.id = "comingSoon";

  modal.style.cssText = `
    position:fixed;
    inset:0;
    z-index:100000;
    display:flex;
    align-items:center;
    justify-content:center;
    background:rgba(0,0,0,.88);
    backdrop-filter:blur(12px);
    padding:20px;
  `;


  modal.innerHTML = `

    <div style="
      width:min(420px,100%);
      background:#0d0d0d;
      border:1px solid rgba(255,0,0,.25);
      border-radius:16px;
      padding:35px;
      text-align:center;
      box-shadow:0 0 60px rgba(255,0,0,.12);
      animation:adminOpen .4s ease;
    ">

      <div style="
        color:#ff1e1e;
        font-size:11px;
        font-weight:800;
        letter-spacing:3px;
        margin-bottom:15px;
      ">
        PROYECTO
      </div>

      <h2 style="
        font-family:Space Grotesk,sans-serif;
        margin-bottom:12px;
      ">
        ${escapeHTML(name)}
      </h2>

      <p style="
        color:#777;
        line-height:1.7;
        margin-bottom:25px;
      ">
        Este portafolio estara disponible proximamente.
      </p>

      <button
        id="closeComingSoon"
        style="
          padding:12px 20px;
          background:#ff1e1e;
          color:white;
          border-radius:7px;
          font-weight:800;
        "
      >
        Cerrar
      </button>

    </div>

  `;


  document.body.appendChild(modal);


  document
    .getElementById("closeComingSoon")
    .addEventListener("click", () => {
      modal.remove();
    });
}


/* =========================================================
   LOADER DE 7 SEGUNDOS
========================================================= */

let loaderAnimation = null;


function startPortfolioLoader(
  destination = null,
  status = "Preparando portafolio"
) {

  if (loaderAnimation) {
    cancelAnimationFrame(loaderAnimation);
  }


  loader.classList.remove("hide");

  loaderNumber.textContent = "1";
  loaderProgress.style.width = "0%";
  loaderStatus.textContent = status;


  const duration =
    Number(config.settings.loadingDuration) || 7000;


  const start =
    performance.now();


  function animate(currentTime) {

    const elapsed =
      currentTime - start;


    const progress =
      Math.min(elapsed / duration, 1);


    let number =
      Math.floor(progress * 100);


    if (number < 1) {
      number = 1;
    }

    if (number > 100) {
      number = 100;
    }


    loaderNumber.textContent =
      number;

    loaderProgress.style.width =
      `${number}%`;


    if (number >= 100) {

      loaderStatus.textContent =
        "Portafolio listo";

    }


    if (progress < 1) {

      loaderAnimation =
        requestAnimationFrame(animate);

      return;
    }


    setTimeout(() => {

      if (destination) {

        window.location.href =
          destination;

      } else {

        loader.classList.add("hide");

      }

    }, 80);

  }


  loaderAnimation =
    requestAnimationFrame(animate);
}


/* =========================================================
   INICIO
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    renderProfile();
    renderServices();
    renderProjects();
    renderReviews();
    renderSocials();

    setupAnimations();
    setupMenu();
    setupAdmin();

    /*
      La pagina principal tambien muestra
      el contador del 1 al 100 durante 7 segundos.
    */

    startPortfolioLoader(
      null,
      "Cargando portafolio"
    );

  }
);


/* =========================================================
   RESEÑAS
========================================================= */

function renderReviews() {

  const container =
    document.getElementById("reviewsGrid");

  container.innerHTML = "";

  config.reviews.forEach(review => {

    const card =
      document.createElement("article");

    card.className =
      "review-card reveal";

    card.innerHTML = `

      <div class="review-stars">
        ★★★★★
      </div>

      <p class="review-text">
        "${escapeHTML(review.text)}"
      </p>

      <div class="review-name">
        ${escapeHTML(review.name)}
      </div>

      <div class="review-role">
        ${escapeHTML(review.role)}
      </div>

    `;

    container.appendChild(card);

  });
}


/* =========================================================
   REDES
========================================================= */

function renderSocials() {

  const container =
    document.getElementById("socialGrid");

  container.innerHTML = "";

  config.socials.forEach(social => {

    const card =
      document.createElement("a");

    card.className =
      "social-card reveal";

    card.href =
      social.url || "#";

    card.target =
      social.url && social.url !== "#"
        ? "_blank"
        : "_self";

    card.rel =
      "noopener noreferrer";

    card.innerHTML = `

      <strong>
        ${escapeHTML(social.name)}
      </strong>

      <span>
        →
      </span>

    `;

    container.appendChild(card);

  });
}


/* =========================================================
   ANIMACIONES SCROLL
========================================================= */

function setupAnimations() {

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("show");

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: .12
      }
    );


  document
    .querySelectorAll(".reveal")
    .forEach(element => {

      observer.observe(element);

    });
}


/* =========================================================
   MENU MOVIL
========================================================= */

function setupMenu() {

  if (!menuButton) {
    return;
  }


  menuButton.addEventListener(
    "click",
    () => {

      navMenu.classList.toggle(
        "active"
      );

    }
  );


  navMenu
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          navMenu.classList.remove(
            "active"
          );

        }
      );

    });
}


/* =========================================================
   ADMIN
========================================================= */

const adminPanel =
  document.getElementById("adminPanel");

const adminTrigger =
  document.getElementById("adminTrigger");

const closeAdmin =
  document.getElementById("closeAdmin");

const adminOverlay =
  document.getElementById("adminOverlay");


function setupAdmin() {

  adminTrigger.addEventListener(
    "click",
    openAdmin
  );

  closeAdmin.addEventListener(
    "click",
    closeAdminPanel
  );

  adminOverlay.addEventListener(
    "click",
    closeAdminPanel
  );


  /*
    Atajo para PC:
    Ctrl + Shift + A
  */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.ctrlKey &&
        event.shiftKey &&
        event.key.toLowerCase() === "a"
      ) {

        openAdmin();

      }


      if (
        event.key === "Escape" &&
        adminPanel.classList.contains("active")
      ) {

        closeAdminPanel();

      }

    }
  );


  document
    .getElementById("saveConfig")
    .addEventListener(
      "click",
      saveAdmin
    );


  document
    .getElementById("resetConfig")
    .addEventListener(
      "click",
      resetConfig
    );


  document
    .getElementById("addService")
    .addEventListener(
      "click",
      addService
    );


  document
    .getElementById("addProject")
    .addEventListener(
      "click",
      addProject
    );


  document
    .getElementById("addReview")
    .addEventListener(
      "click",
      addReview
    );


  document
    .getElementById("addSocial")
    .addEventListener(
      "click",
      addSocial
    );

}


function openAdmin() {

  adminPanel.classList.add(
    "active"
  );

  renderAdmin();

  document.body.style.overflow =
    "hidden";
}


function closeAdminPanel() {

  adminPanel.classList.remove(
    "active"
  );

  document.body.style.overflow =
    "";
}


/* =========================================================
   RENDER ADMIN
========================================================= */

function renderAdmin() {

  document.getElementById("adminName").value =
    config.profile.name || "";

  document.getElementById("adminTitle").value =
    config.profile.title || "";

  document.getElementById("adminDescription").value =
    config.profile.description || "";

  document.getElementById("adminStatus").value =
    config.profile.status || "";

  document.getElementById("adminImage").value =
    config.profile.image || "";


  document.getElementById("adminAboutTitle").value =
    config.about.title || "";

  document.getElementById("adminAboutText").value =
    config.about.text || "";


  document.getElementById("adminStudioName").value =
    config.studio.name || "";

  document.getElementById("adminStudioDescription").value =
    config.studio.description || "";


  renderAdminServices();
  renderAdminProjects();
  renderAdminReviews();
  renderAdminSocials();
}


/* =========================================================
   ADMIN SERVICES
========================================================= */

function renderAdminServices() {

  const container =
    document.getElementById("adminServices");

  container.innerHTML = "";


  config.services.forEach(
    (service, index) => {

      const item =
        document.createElement("div");

      item.className =
        "admin-item";

      item.innerHTML = `

        <label>Nombre</label>

        <input
          data-service-title="${index}"
          value="${escapeHTML(service.title)}"
        >

        <label>Descripcion</label>

        <textarea
          data-service-description="${index}"
        >${escapeHTML(service.description)}</textarea>

        <button
          class="admin-delete"
          data-delete-service="${index}"
        >
          Eliminar
        </button>

      `;

      container.appendChild(item);

    }
  );


  container
    .querySelectorAll("[data-delete-service]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const index =
            Number(
              button.dataset.deleteService
            );

          config.services.splice(
            index,
            1
          );

          renderAdminServices();

        }
      );

    });
}


/* =========================================================
   ADMIN PROJECTS
========================================================= */

function renderAdminProjects() {

  const container =
    document.getElementById("adminProjects");

  container.innerHTML = "";


  config.projects.forEach(
    (project, index) => {

      const item =
        document.createElement("div");

      item.className =
        "admin-item";

      item.innerHTML = `

        <label>Nombre</label>

        <input
          data-project-name="${index}"
          value="${escapeHTML(project.name)}"
        >

        <label>Categoria</label>

        <input
          data-project-category="${index}"
          value="${escapeHTML(project.category)}"
        >

        <label>Estado</label>

        <input
          data-project-status="${index}"
          value="${escapeHTML(project.status)}"
        >

        <label>Descripcion</label>

        <textarea
          data-project-description="${index}"
        >${escapeHTML(project.description)}</textarea>

        <label>URL del portafolio del cliente</label>

        <input
          data-project-url="${index}"
          value="${escapeHTML(project.clientUrl)}"
          placeholder="https://ejemplo.com"
        >

        <button
          class="admin-delete"
          data-delete-project="${index}"
        >
          Eliminar proyecto
        </button>

      `;

      container.appendChild(item);

    }
  );


  container
    .querySelectorAll("[data-delete-project]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const index =
            Number(
              button.dataset.deleteProject
            );

          config.projects.splice(
            index,
            1
          );

          renderAdminProjects();

        }
      );

    });
}


/* =========================================================
   ADMIN REVIEWS
========================================================= */

function renderAdminReviews() {

  const container =
    document.getElementById("adminReviews");

  container.innerHTML = "";


  config.reviews.forEach(
    (review, index) => {

      const item =
        document.createElement("div");

      item.className =
        "admin-item";

      item.innerHTML = `

        <label>Nombre</label>

        <input
          data-review-name="${index}"
          value="${escapeHTML(review.name)}"
        >

        <label>Rol</label>

        <input
          data-review-role="${index}"
          value="${escapeHTML(review.role)}"
        >

        <label>Resena</label>

        <textarea
          data-review-text="${index}"
        >${escapeHTML(review.text)}</textarea>

        <button
          class="admin-delete"
          data-delete-review="${index}"
        >
          Eliminar resena
        </button>

      `;

      container.appendChild(item);

    }
  );


  container
    .querySelectorAll("[data-delete-review]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const index =
            Number(
              button.dataset.deleteReview
            );

          config.reviews.splice(
            index,
            1
          );

          renderAdminReviews();

        }
      );

    });
}


/* =========================================================
   ADMIN SOCIALS
========================================================= */

function renderAdminSocials() {

  const container =
    document.getElementById("adminSocials");

  container.innerHTML = "";


  config.socials.forEach(
    (social, index) => {

      const item =
        document.createElement("div");

      item.className =
        "admin-item";

      item.innerHTML = `

        <label>Red social</label>

        <input
          data-social-name="${index}"
          value="${escapeHTML(social.name)}"
        >

        <label>URL</label>

        <input
          data-social-url="${index}"
          value="${escapeHTML(social.url)}"
          placeholder="https://..."
        >

        <button
          class="admin-delete"
          data-delete-social="${index}"
        >
          Eliminar red
        </button>

      `;

      container.appendChild(item);

    }
  );


  container
    .querySelectorAll("[data-delete-social]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const index =
            Number(
              button.dataset.deleteSocial
            );

          config.socials.splice(
            index,
            1
          );

          renderAdminSocials();

        }
      );

    });
}


/* =========================================================
   AGREGAR SERVICIO
========================================================= */

function addService() {

  config.services.push({

    title: "Nuevo servicio",

    description:
      "Descripcion del nuevo servicio."

  });


  renderAdminServices();
}


/* =========================================================
   AGREGAR PROYECTO
========================================================= */

function addProject() {

  config.projects.push({

    name:
      `Proyecto ${String(config.projects.length + 1).padStart(2, "0")}`,

    category:
      "Portafolio",

    status:
      "Proximamente",

    description:
      "Portafolio de cliente.",

    clientUrl:
      "#"

  });


  renderAdminProjects();
}


/* =========================================================
   AGREGAR RESEÑA
========================================================= */

function addReview() {

  config.reviews.push({

    name:
      "Nuevo cliente",

    role:
      "Cliente",

    text:
      "Nueva resena."

  });


  renderAdminReviews();
}


/* =========================================================
   AGREGAR RED
========================================================= */

function addSocial() {

  config.socials.push({

    name:
      "Nueva red",

    url:
      "#"

  });


  renderAdminSocials();
}


/* =========================================================
   GUARDAR ADMIN
========================================================= */

function saveAdmin() {

  /*
    GENERAL
  */

  config.profile.name =
    document.getElementById("adminName").value;

  config.profile.title =
    document.getElementById("adminTitle").value;

  config.profile.description =
    document.getElementById("adminDescription").value;

  config.profile.status =
    document.getElementById("adminStatus").value;

  config.profile.image =
    document.getElementById("adminImage").value;


  /*
    SOBRE MI
  */

  config.about.title =
    document.getElementById("adminAboutTitle").value;

  config.about.text =
    document.getElementById("adminAboutText").value;


  /*
    STUDIO
  */

  config.studio.name =
    document.getElementById("adminStudioName").value;

  config.studio.description =
    document.getElementById("adminStudioDescription").value;


  /*
    SERVICIOS
  */

  config.services.forEach(
    (service, index) => {

      const title =
        document.querySelector(
          `[data-service-title="${index}"]`
        );

      const description =
        document.querySelector(
          `[data-service-description="${index}"]`
        );


      if (title) {
        service.title =
          title.value;
      }

      if (description) {
        service.description =
          description.value;
      }

    }
  );


  /*
    PROYECTOS
  */

  config.projects.forEach(
    (project, index) => {

      const name =
        document.querySelector(
          `[data-project-name="${index}"]`
        );

      const category =
        document.querySelector(
          `[data-project-category="${index}"]`
        );

      const status =
        document.querySelector(
          `[data-project-status="${index}"]`
        );

      const description =
        document.querySelector(
          `[data-project-description="${index}"]`
        );

      const url =
        document.querySelector(
          `[data-project-url="${index}"]`
        );


      if (name) {
        project.name =
          name.value;
      }

      if (category) {
        project.category =
          category.value;
      }

      if (status) {
        project.status =
          status.value;
      }

      if (description) {
        project.description =
          description.value;
      }

      if (url) {
        project.clientUrl =
          url.value.trim();
      }

    }
  );


  /*
    RESEÑAS
  */

  config.reviews.forEach(
    (review, index) => {

      const name =
        document.querySelector(
          `[data-review-name="${index}"]`
        );

      const role =
        document.querySelector(
          `[data-review-role="${index}"]`
        );

      const text =
        document.querySelector(
          `[data-review-text="${index}"]`
        );


      if (name) {
        review.name =
          name.value;
      }

      if (role) {
        review.role =
          role.value;
      }

      if (text) {
        review.text =
          text.value;
      }

    }
  );


  /*
    REDES
  */

  config.socials.forEach(
    (social, index) => {

      const name =
        document.querySelector(
          `[data-social-name="${index}"]`
        );

      const url =
        document.querySelector(
          `[data-social-url="${index}"]`
        );


      if (name) {
        social.name =
          name.value;
      }

      if (url) {
        social.url =
          url.value.trim();
      }

    }
  );


  /*
    GUARDAR
  */

  localStorage.setItem(
    "portfolioConfig",
    JSON.stringify(config)
  );


  /*
    ACTUALIZAR PAGINA
  */

  renderProfile();
  renderServices();
  renderProjects();
  renderReviews();
  renderSocials();

  setupAnimations();


  /*
    MENSAJE
  */

  alert(
    "Cambios guardados correctamente."
  );

  closeAdminPanel();
}


/* =========================================================
   RESTABLECER
========================================================= */

function resetConfig() {

  const confirmation =
    confirm(
      "Esto borrara los cambios guardados y volvera a la configuracion original. ¿Continuar?"
    );


  if (!confirmation) {
    return;
  }


  localStorage.removeItem(
    "portfolioConfig"
  );


  config =
    clone(DEFAULT_CONFIG);


  renderAdmin();

  renderProfile();
  renderServices();
  renderProjects();
  renderReviews();
  renderSocials();

  setupAnimations();


  alert(
    "Configuracion restablecida."
  );
           }
