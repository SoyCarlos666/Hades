(function () {

  "use strict";


  /* =========================================
     CARGAR CONFIGURACION
  ========================================= */

  var saved = localStorage.getItem("portfolioConfig");

  if (saved) {

    try {
      CONFIG = JSON.parse(saved);
    } catch (error) {
      console.log("Configuracion guardada invalida.");
    }

  }


  /* =========================================
     FUNCION SIMPLE PARA TEXTO SEGURO
  ========================================= */

  function safe(text) {

    if (text === undefined || text === null) {
      return "";
    }

    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }


  /* =========================================
     PERFIL
  ========================================= */

  function renderProfile() {

    document.getElementById("name").textContent =
      CONFIG.profile.name;

    document.getElementById("title").textContent =
      CONFIG.profile.title;

    document.getElementById("description").textContent =
      CONFIG.profile.description;

    document.getElementById("status").textContent =
      CONFIG.profile.status;

    document.getElementById("profileImage").src =
      CONFIG.profile.image;


    document.getElementById("aboutTitle").textContent =
      CONFIG.about.title;

    document.getElementById("aboutText").textContent =
      CONFIG.about.text;


    document.getElementById("studioName").textContent =
      CONFIG.studio.name;

    document.getElementById("studioDescription").textContent =
      CONFIG.studio.description;
  }


  /* =========================================
     SERVICIOS
  ========================================= */

  function renderServices() {

    var box =
      document.getElementById("services");

    box.innerHTML = "";


    CONFIG.services.forEach(function (service, index) {

      box.innerHTML +=

        '<div class="service-card reveal">' +

          '<span>0' + (index + 1) + '</span>' +

          '<h3>' +
            safe(service.title) +
          '</h3>' +

          '<p>' +
            safe(service.text) +
          '</p>' +

        '</div>';

    });

  }


  /* =========================================
     PROYECTOS
  ========================================= */

  function renderProjects() {

    var box =
      document.getElementById("projects");

    box.innerHTML = "";


    CONFIG.projects.forEach(function (project, index) {

      box.innerHTML +=

        '<div class="project-card reveal">' +

          '<div class="project-number">' +
            String(index + 1).padStart(2, "0") +
          '</div>' +

          '<div class="project-status">' +
            safe(project.status) +
          '</div>' +

          '<h3>' +
            safe(project.name) +
          '</h3>' +

          '<small>' +
            safe(project.category) +
          '</small>' +

          '<p>' +
            safe(project.description) +
          '</p>' +

          '<button class="project-button" data-project="' +
            index +
          '">' +
            'Ver proyecto' +
          '</button>' +

        '</div>';

    });


    var buttons =
      document.querySelectorAll(".project-button");


    buttons.forEach(function (button) {

      button.addEventListener("click", function () {

        var index =
          Number(button.getAttribute("data-project"));

        openProject(index);

      });

    });

  }


  /* =========================================
     ABRIR PROYECTO
  ========================================= */

  function openProject(index) {

    var project =
      CONFIG.projects[index];


    if (!project) {
      return;
    }


    if (!project.url || project.url === "#") {

      alert(
        "Este proyecto esta proximamente disponible."
      );

      return;
    }


    startLoader(
      project.url,
      "Abriendo portafolio..."
    );

  }


  /* =========================================
     RESEÑAS
  ========================================= */

  function renderReviews() {

    var box =
      document.getElementById("reviews");

    box.innerHTML = "";


    CONFIG.reviews.forEach(function (review) {

      box.innerHTML +=

        '<div class="review-card reveal">' +

          '<div class="stars">★★★★★</div>' +

          '<p>"' +
            safe(review.text) +
          '"</p>' +

          '<strong>' +
            safe(review.name) +
          '</strong>' +

        '</div>';

    });

  }


  /* =========================================
     REDES
  ========================================= */

  function renderSocials() {

    var box =
      document.getElementById("socials");

    box.innerHTML = "";


    CONFIG.socials.forEach(function (social) {

      var target =
        social.url !== "#" ? "_blank" : "_self";


      box.innerHTML +=

        '<a class="social-card reveal" ' +
        'href="' + safe(social.url) + '" ' +
        'target="' + target + '">' +

          '<strong>' +
            safe(social.name) +
          '</strong>' +

          '<span>→</span>' +

        '</a>';

    });

  }


  /* =========================================
     LOADER
  ========================================= */

  var loader =
    document.getElementById("loader");

  var loaderNumber =
    document.getElementById("loaderNumber");

  var loaderBar =
    document.getElementById("loaderBar");

  var loaderText =
    document.getElementById("loaderText");


  function startLoader(url, message) {

    loader.classList.remove("hidden");

    loaderNumber.textContent = "1";
    loaderBar.style.width = "0%";

    loaderText.textContent =
      message || "Preparando portafolio...";


    var start =
      Date.now();

    var duration =
      7000;


    function update() {

      var elapsed =
        Date.now() - start;


      var progress =
        elapsed / duration;


      if (progress > 1) {
        progress = 1;
      }


      var number =
        Math.floor(progress * 100);


      if (number < 1) {
        number = 1;
      }


      loaderNumber.textContent =
        number;

      loaderBar.style.width =
        number + "%";


      if (progress < 1) {

        requestAnimationFrame(update);

      } else {

        loaderNumber.textContent =
          "100";

        loaderBar.style.width =
          "100%";


        setTimeout(function () {

          if (url) {

            window.location.href =
              url;

          } else {

            loader.classList.add("hidden");

          }

        }, 100);

      }

    }


    requestAnimationFrame(update);

  }


  /* =========================================
     ADMIN
  ========================================= */

  var admin =
    document.getElementById("admin");

  var adminButton =
    document.getElementById("adminButton");

  var closeAdmin =
    document.getElementById("closeAdmin");


  adminButton.addEventListener(
    "click",
    function () {

      openAdmin();

    }
  );


  closeAdmin.addEventListener(
    "click",
    function () {

      admin.classList.remove("show");

    }
  );


  function openAdmin() {

    admin.classList.add("show");

    loadAdminFields();

  }


  /* =========================================
     CARGAR CAMPOS ADMIN
  ========================================= */

  function loadAdminFields() {

    document.getElementById("editName").value =
      CONFIG.profile.name;

    document.getElementById("editTitle").value =
      CONFIG.profile.title;

    document.getElementById("editDescription").value =
      CONFIG.profile.description;

    document.getElementById("editStatus").value =
      CONFIG.profile.status;

    document.getElementById("editImage").value =
      CONFIG.profile.image;


    document.getElementById("editAboutTitle").value =
      CONFIG.about.title;

    document.getElementById("editAboutText").value =
      CONFIG.about.text;


    document.getElementById("editStudioName").value =
      CONFIG.studio.name;

    document.getElementById("editStudioDescription").value =
      CONFIG.studio.description;


    renderProjectEditor();
    renderSocialEditor();

  }


  /* =========================================
     EDITOR DE PROYECTOS
  ========================================= */

  function renderProjectEditor() {

    var box =
      document.getElementById("projectEditor");

    box.innerHTML = "";


    CONFIG.projects.forEach(function (project, index) {

      box.innerHTML +=

        '<div class="editor-item">' +

          '<strong>Proyecto ' +
            (index + 1) +
          '</strong>' +

          '<label>Nombre</label>' +

          '<input class="project-name" data-index="' +
            index +
            '" value="' +
            safe(project.name) +
          '">' +

          '<label>Categoria</label>' +

          '<input class="project-category" data-index="' +
            index +
            '" value="' +
            safe(project.category) +
          '">' +

          '<label>Estado</label>' +

          '<input class="project-status-input" data-index="' +
            index +
            '" value="' +
            safe(project.status) +
          '">' +

          '<label>Descripcion</label>' +

          '<textarea class="project-description" data-index="' +
            index +
          '">' +
            safe(project.description) +
          '</textarea>' +

          '<label>URL del cliente</label>' +

          '<input class="project-url" data-index="' +
            index +
            '" value="' +
            safe(project.url) +
            '" placeholder="https://...">' +

        '</div>';

    });

  }


  /* =========================================
     EDITOR DE REDES
  ========================================= */

  function renderSocialEditor() {

    var box =
      document.getElementById("socialEditor");

    box.innerHTML = "";


    CONFIG.socials.forEach(function (social, index) {

      box.innerHTML +=

        '<div class="editor-item">' +

          '<label>Nombre</label>' +

          '<input class="social-name" data-index="' +
            index +
            '" value="' +
            safe(social.name) +
          '">' +

          '<label>URL</label>' +

          '<input class="social-url" data-index="' +
            index +
            '" value="' +
            safe(social.url) +
          '">' +

        '</div>';

    });

  }


  /* =========================================
     GUARDAR
  ========================================= */

  document
    .getElementById("save")
    .addEventListener("click", function () {


      CONFIG.profile.name =
        document.getElementById("editName").value;

      CONFIG.profile.title =
        document.getElementById("editTitle").value;

      CONFIG.profile.description =
        document.getElementById("editDescription").value;

      CONFIG.profile.status =
        document.getElementById("editStatus").value;

      CONFIG.profile.image =
        document.getElementById("editImage").value;


      CONFIG.about.title =
        document.getElementById("editAboutTitle").value;

      CONFIG.about.text =
        document.getElementById("editAboutText").value;


      CONFIG.studio.name =
        document.getElementById("editStudioName").value;

      CONFIG.studio.description =
        document.getElementById("editStudioDescription").value;


      /* PROYECTOS */

      document
        .querySelectorAll(".project-name")
        .forEach(function (input) {

          CONFIG.projects[
            Number(input.dataset.index)
          ].name = input.value;

        });


      document
        .querySelectorAll(".project-category")
        .forEach(function (input) {

          CONFIG.projects[
            Number(input.dataset.index)
          ].category = input.value;

        });


      document
        .querySelectorAll(".project-status-input")
        .forEach(function (input) {

          CONFIG.projects[
            Number(input.dataset.index)
          ].status = input.value;

        });


      document
        .querySelectorAll(".project-description")
        .forEach(function (input) {

          CONFIG.projects[
            Number(input.dataset.index)
          ].description = input.value;

        });


      document
        .querySelectorAll(".project-url")
        .forEach(function (input) {

          CONFIG.projects[
            Number(input.dataset.index)
          ].url = input.value;

        });


      /* REDES */

      document
        .querySelectorAll(".social-name")
        .forEach(function (input) {

          CONFIG.socials[
            Number(input.dataset.index)
          ].name = input.value;

        });


      document
        .querySelectorAll(".social-url")
        .forEach(function (input) {

          CONFIG.socials[
            Number(input.dataset.index)
          ].url = input.value;

        });


      /* GUARDAR LOCALMENTE */

      localStorage.setItem(
        "portfolioConfig",
        JSON.stringify(CONFIG)
      );


      renderAll();


      admin.classList.remove("show");


      alert(
        "Cambios guardados correctamente."
      );

    });


  /* =========================================
     RESTABLECER
  ========================================= */

  document
    .getElementById("reset")
    .addEventListener("click", function () {

      var confirmReset =
        confirm(
          "¿Quieres restablecer el portafolio?"
        );


      if (!confirmReset) {
        return;
      }


      localStorage.removeItem(
        "portfolioConfig"
      );


      location.reload();

    });


  /* =========================================
     MENU MOVIL
  ========================================= */

  document
    .getElementById("menuButton")
    .addEventListener("click", function () {

      document
        .getElementById("nav")
        .classList.toggle("open");

    });


  document
    .querySelectorAll("#nav a")
    .forEach(function (link) {

      link.addEventListener("click", function () {

        document
          .getElementById("nav")
          .classList.remove("open");

      });

    });


  /* =========================================
     ANIMACIONES
  ========================================= */

  function activateAnimations() {

    var elements =
      document.querySelectorAll(".reveal");


    var observer =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(function (entry) {

            if (entry.isIntersecting) {

              entry.target.classList.add("visible");

            }

          });

        },
        {
          threshold: 0.1
        }
      );


    elements.forEach(function (element) {

      observer.observe(element);

    });

  }


  /* =========================================
     RENDER TODO
  ========================================= */

  function renderAll() {

    renderProfile();
    renderServices();
    renderProjects();
    renderReviews();
    renderSocials();

    setTimeout(
      activateAnimations,
      50
    );

  }


  /* =========================================
     INICIAR
  ========================================= */

  renderAll();


  /*
    Loader inicial de 7 segundos.
  */

  startLoader(
    null,
    "Cargando portafolio..."
  );


})();
