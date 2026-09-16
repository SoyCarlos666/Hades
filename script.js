/* =========================================================
   EL HADESSEI⁶⁶⁶ — SCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTOS
  ======================================================= */

  const body = document.body;
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("main section[id]");
  const serverCards = document.querySelectorAll(".server-card");
  const serviceCards = document.querySelectorAll(".service-card");
  const platforms = document.querySelectorAll(".platform");
  const projects = document.querySelectorAll(".project");
  const reviews = document.querySelectorAll(".review");


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements = [
    ...document.querySelectorAll(
      ".section-heading, .server-card, .service-card, .platform, .project, .result, .about-content, .about-visual, .review, .contact-section"
    )
  ];

  revealElements.forEach((element) => {
    element.classList.add("reveal");
  });


  const revealObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          revealObserver.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );


  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });



  /* =======================================================
     NAVBAR SCROLL
  ======================================================= */

  let lastScroll = 0;

  window.addEventListener(
    "scroll",
    () => {

      const currentScroll = window.scrollY;

      if (!navbar) return;

      if (currentScroll > 30) {

        navbar.style.background =
          "rgba(5,5,5,.92)";

        navbar.style.boxShadow =
          "0 15px 50px rgba(0,0,0,.45)";

      } else {

        navbar.style.background =
          "rgba(8,8,8,.78)";

        navbar.style.boxShadow =
          "0 15px 50px rgba(0,0,0,.3)";

      }

      lastScroll = currentScroll;

    },
    { passive: true }
  );



  /* =======================================================
     ACTIVE NAVIGATION
  ======================================================= */

  const updateActiveNavigation = () => {

    let currentSection = "";

    sections.forEach((section) => {

      const sectionTop =
        section.offsetTop - 180;

      const sectionBottom =
        sectionTop + section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionBottom
      ) {
        currentSection = section.id;
      }

    });


    navLinks.forEach((link) => {

      const href =
        link.getAttribute("href");

      link.classList.remove("active");

      if (
        href &&
        href === `#${currentSection}`
      ) {
        link.classList.add("active");
      }

    });

  };


  window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
  );

  updateActiveNavigation();



  /* =======================================================
     SMOOTH NAVIGATION
  ======================================================= */

  document.querySelectorAll(
    'a[href^="#"]'
  ).forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId =
        link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#"
      ) {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const navbarHeight =
        navbar?.offsetHeight || 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight -
        25;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });



  /* =======================================================
     HERO 3D EFFECT
  ======================================================= */

  const heroVisual =
    document.querySelector(".hero-visual");

  const visualFrame =
    document.querySelector(".visual-frame");


  if (
    heroVisual &&
    visualFrame &&
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ) {

    heroVisual.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          heroVisual.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) /
          rect.width;

        const y =
          (event.clientY - rect.top) /
          rect.height;

        const rotateY =
          (x - 0.5) * 12;

        const rotateX =
          (0.5 - y) * 10;

        visualFrame.style.transform =
          `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;

      }
    );


    heroVisual.addEventListener(
      "mouseleave",
      () => {

        visualFrame.style.transform =
          "";

      }
    );

  }



  /* =======================================================
     SERVER CARD TILT
  ======================================================= */

  if (
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ) {

    serverCards.forEach((card) => {

      card.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            card.getBoundingClientRect();

          const x =
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;

          const rotateY =
            ((x / rect.width) - 0.5) * 5;

          const rotateX =
            ((y / rect.height) - 0.5) * -5;

          card.style.transform =
            `translateY(-10px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          card.style.transform = "";

        }
      );

    });

  }



  /* =======================================================
     SERVICE HOVER
  ======================================================= */

  serviceCards.forEach((card) => {

    card.addEventListener(
      "mouseenter",
      () => {

        serviceCards.forEach((other) => {

          if (other !== card) {

            other.style.opacity =
              ".65";

          }

        });

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        serviceCards.forEach((other) => {

          other.style.opacity =
            "";

        });

      }
    );

  });



  /* =======================================================
     PLATFORM HOVER
  ======================================================= */

  platforms.forEach((platform) => {

    platform.addEventListener(
      "mousemove",
      (event) => {

        if (
          !window.matchMedia(
            "(pointer:fine)"
          ).matches
        ) {
          return;
        }

        const rect =
          platform.getBoundingClientRect();

        const x =
          ((event.clientX - rect.left) /
            rect.width -
            0.5) *
          4;

        const y =
          ((event.clientY - rect.top) /
            rect.height -
            0.5) *
          -4;

        platform.style.transform =
          `translateY(-5px)
           rotateX(${y}deg)
           rotateY(${x}deg)`;

      }
    );


    platform.addEventListener(
      "mouseleave",
      () => {

        platform.style.transform = "";

      }
    );

  });



  /* =======================================================
     PROJECT IMAGE PARALLAX
  ======================================================= */

  projects.forEach((project) => {

    const image =
      project.querySelector(".project-image img");

    if (!image) return;


    project.addEventListener(
      "mousemove",
      (event) => {

        if (
          !window.matchMedia(
            "(pointer:fine)"
          ).matches
        ) {
          return;
        }

        const rect =
          project.getBoundingClientRect();

        const x =
          ((event.clientX - rect.left) /
            rect.width -
            0.5) *
          8;

        const y =
          ((event.clientY - rect.top) /
            rect.height -
            0.5) *
          8;

        image.style.transform =
          `scale(1.05)
           translate(${x}px, ${y}px)`;

      }
    );


    project.addEventListener(
      "mouseleave",
      () => {

        image.style.transform =
          "";

      }
    );

  });



  /* =======================================================
     COUNTER ANIMATION
  ======================================================= */

  const counters =
    document.querySelectorAll(
      "[data-edit^='stats.'], [data-edit^='result.']"
    );


  const animateCounter = (element) => {

    if (
      element.dataset.counterAnimated === "true"
    ) {
      return;
    }

    const original =
      element.textContent.trim();

    const match =
      original.match(
        /^([^\d]*)([\d,.]+)(.*)$/
      );

    if (!match) return;

    const prefix =
      match[1];

    const number =
      parseFloat(
        match[2].replace(/,/g, "")
      );

    const suffix =
      match[3];

    if (Number.isNaN(number)) {
      return;
    }

    element.dataset.counterAnimated =
      "true";

    const duration = 1300;

    const start =
      performance.now();


    const update = (time) => {

      const progress =
        Math.min(
          (time - start) / duration,
          1
        );

      const eased =
        1 -
        Math.pow(
          1 - progress,
          3
        );

      const current =
        Math.floor(
          number * eased
        );

      element.textContent =
        prefix +
        current.toLocaleString("en-US") +
        suffix;

      if (progress < 1) {

        requestAnimationFrame(update);

      } else {

        element.textContent =
          original;

      }

    };


    requestAnimationFrame(update);

  };


  const counterObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (
            entry.isIntersecting
          ) {

            animateCounter(
              entry.target
            );

            counterObserver.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: .7
      }
    );


  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });



  /* =======================================================
     IMAGE FALLBACK
  ======================================================= */

  document.querySelectorAll("img")
    .forEach((image) => {

      image.addEventListener(
        "error",
        () => {

          image.style.display =
            "none";

          const parent =
            image.parentElement;

          if (!parent) return;

          parent.classList.add(
            "image-error"
          );

        }
      );

    });



  /* =======================================================
     CURSOR GLOW
  ======================================================= */

  if (
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ) {

    const cursorGlow =
      document.createElement("div");

    cursorGlow.className =
      "cursor-glow";

    document.body.appendChild(
      cursorGlow
    );


    const cursorStyle =
      document.createElement("style");

    cursorStyle.textContent = `
      .cursor-glow {
        position: fixed;
        width: 180px;
        height: 180px;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        background: radial-gradient(
          circle,
          rgba(225,6,0,.09),
          transparent 70%
        );
        transform: translate(-50%, -50%);
        transition:
          left .08s linear,
          top .08s linear;
      }
    `;

    document.head.appendChild(
      cursorStyle
    );


    window.addEventListener(
      "mousemove",
      (event) => {

        cursorGlow.style.left =
          `${event.clientX}px`;

        cursorGlow.style.top =
          `${event.clientY}px`;

      },
      { passive: true }
    );

  }



  /* =======================================================
     PARALLAX BACKGROUND
  ======================================================= */

  const background =
    document.querySelector(".background");

  if (background) {

    window.addEventListener(
      "scroll",
      () => {

        const movement =
          window.scrollY * .08;

        background.style.transform =
          `translateY(${movement}px)`;

      },
      { passive: true }
    );

  }



  /* =======================================================
     DYNAMIC YEAR
  ======================================================= */

  const footerYear =
    document.querySelector(
      ".footer > span"
    );

  if (footerYear) {

    const year =
      new Date().getFullYear();

    footerYear.textContent =
      `© ${year} — All rights reserved.`;

  }



  /* =======================================================
     IMAGE PRELOAD
  ======================================================= */

  const images = [
    "assets/avatar.png",
    "assets/server-01.jpg",
    "assets/server-02.jpg",
    "assets/server-03.jpg",
    "assets/project-01.jpg",
    "assets/project-02.jpg",
    "assets/project-03.jpg"
  ];


  images.forEach((src) => {

    const image =
      new Image();

    image.src = src;

  });



  /* =======================================================
     PAGE READY
  ======================================================= */

  window.setTimeout(() => {

    body.classList.add(
      "page-ready"
    );

  }, 150);


});
