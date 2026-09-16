/* =========================================================
   MORGAN_ — CONFIG.JS
   TODO LO EDITABLE DEL PORTFOLIO
   ========================================================= */

const PORTFOLIO_CONFIG = {

    /* ===============================
       IDENTIDAD
       =============================== */

    identity: {

        name: "MORGAN_",

        username: "/Morgan",

        role: "Staff Manager & Developer",

        country: "🇲🇽 México",

        status: "Disponible para proyectos",

        description:
            "Staff Manager & Developer enfocado en Minecraft, configuración de servidores, optimización y gestión de comunidades.",

        avatar:
            "https://cdn.discordapp.com/attachments/1513772002534494390/1533402693010460742/SaveTikTok.to_7554828542089973022_8.jpg",

        background:
            "https://cdn.discordapp.com/attachments/1513772002534494390/1533402693010460742/SaveTikTok.to_7554828542089973022_8.jpg"
    },


    /* ===============================
       HERO
       =============================== */

    hero: {

        badge: "MINECRAFT • STAFF • DEVELOPMENT",

        titleLine1: "Construyo.",

        titleLine2: "Gestiono.",

        titleHighlight: "Optimizo.",

        typingTexts: [
            "Staff Manager",
            "Minecraft Developer",
            "Server Configurator",
            "Community Manager"
        ],

        buttonPrimary: {
            text: "VER PROYECTOS",
            target: "#projects"
        },

        buttonSecondary: {
            text: "CONTACTAR",
            target: "#contact"
        }
    },


    /* ===============================
       ESTADÍSTICAS
       =============================== */

    stats: [

        {
            number: "8+",
            label: "Meses de experiencia"
        },

        {
            number: "100+",
            label: "Jugadores atendidos"
        },

        {
            number: "5+",
            label: "Eventos organizados"
        },

        {
            number: "3+",
            label: "Servidores administrados"
        }

    ],


    /* ===============================
       SOBRE MÍ
       =============================== */

    about: {

        title: "SOBRE MÍ",

        subtitle:
            "Desarrollo, gestión y configuración de servidores Minecraft.",

        text:
            "Me especializo en crear experiencias organizadas y optimizadas para comunidades de Minecraft. Trabajo con configuración de servidores, plugins, sistemas de staff, eventos, optimización y gestión de comunidades.",

        cards: [

            {
                icon: "⚡",
                title: "Optimización",
                text:
                    "Configuración enfocada en rendimiento y estabilidad."
            },

            {
                icon: "🛡️",
                title: "Staff",
                text:
                    "Experiencia en gestión y organización de equipos."
            },

            {
                icon: "⚙️",
                title: "Configuración",
                text:
                    "Configuración avanzada de plugins y sistemas."
            },

            {
                icon: "🌐",
                title: "Comunidades",
                text:
                    "Organización y administración de comunidades."
            }

        ]
    },


    /* ===============================
       SKILLS
       =============================== */

    skills: [

        "Minecraft",
        "WorldGuard",
        "WorldEdit",
        "LuckPerms",
        "EssentialsX",
        "PlayerKits",
        "PlaceholderAPI",
        "Discord",
        "Configuración",
        "Optimización",
        "Staff Management",
        "Server Management"

    ],


    /* ===============================
       SERVIDORES
       =============================== */

    servers: [

        {

            name: "BockieMC",

            role: "Manager",

            description:
                "Gestión y organización de la comunidad y operaciones del servidor.",

            status: "Activo",

            image:
                "https://images.unsplash.com/photo-1607513746994-51f730a44832?auto=format&fit=crop&w=1200&q=80",

            tags: [
                "Manager",
                "Staff",
                "Minecraft"
            ]

        },


        {

            name: "Minehave",

            role: "Builder",

            description:
                "Participación en construcción y desarrollo visual del servidor.",

            status: "Proyecto",

            image:
                "https://images.unsplash.com/photo-1605870445919-838d190e8e1b?auto=format&fit=crop&w=1200&q=80",

            tags: [
                "Builder",
                "Builds",
                "Minecraft"
            ]

        },


        {

            name: "CrazyBox",

            role: "Staff / Developer",

            description:
                "Trabajo relacionado con configuración y gestión del servidor.",

            status: "Proyecto",

            image:
                "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",

            tags: [
                "Staff",
                "Developer",
                "BoxPvP"
            ]

        },


        {

            name: "Morgan Studio",

            role: "Founder",

            description:
                "Proyecto enfocado en desarrollo, diseño y creación de soluciones digitales.",

            status: "Activo",

            image:
                "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=80",

            tags: [
                "Studio",
                "Development",
                "Design"
            ]

        }

    ],


    /* ===============================
       PROYECTOS
       =============================== */

    projects: [

        {

            title: "Minecraft Server Management",

            category: "MANAGEMENT",

            description:
                "Gestión de servidores, staff, eventos y comunidades.",

            icon: "🛡️",

            technologies: [
                "Staff",
                "Discord",
                "Minecraft"
            ]

        },


        {

            title: "Advanced Server Setup",

            category: "DEVELOPMENT",

            description:
                "Configuración avanzada de plugins y sistemas Minecraft.",

            icon: "⚙️",

            technologies: [
                "WorldEdit",
                "WorldGuard",
                "LuckPerms"
            ]

        },


        {

            title: "Community Systems",

            category: "COMMUNITY",

            description:
                "Sistemas para organizar comunidades y equipos de staff.",

            icon: "🌐",

            technologies: [
                "Discord",
                "Management",
                "Staff"
            ]

        }

    ],


    /* ===============================
       EXPERIENCIA
       =============================== */

    timeline: [

        {

            year: "2026",

            title: "Staff Manager & Developer",

            description:
                "Gestión de comunidades, servidores y desarrollo de sistemas."

        },


        {

            year: "2025",

            title: "Minecraft Developer",

            description:
                "Configuración de plugins, servidores y sistemas Minecraft."

        },


        {

            year: "2025",

            title: "Staff",

            description:
                "Experiencia en moderación y organización de comunidades."

        }

    ],


    /* ===============================
       CONTACTO
       =============================== */

    contact: {

        title: "¿TRABAJAMOS JUNTOS?",

        description:
            "Si tienes un proyecto de Minecraft o necesitas ayuda con configuración y gestión, puedes contactarme.",


        discord: {

            enabled: true,

            text: "Discord",

            url:
                "https://discord.gg/6tqFJQcZ7"

        },


        tiktok: {

            enabled: true,

            text: "TikTok",

            url:
                "https://www.tiktok.com/@its.reid3"

        },


        email: {

            enabled: false,

            text: "Email",

            url:
                "mailto:tuemail@example.com"

        }

    },


    /* ===============================
       REDES
       =============================== */

    social: {

        discord:
            "https://discord.gg/6tqFJQcZ7",

        tiktok:
            "https://www.tiktok.com/@its.reid3",

        github:
            "https://github.com/carloscalet7"

    },


    /* ===============================
       COLORES
       =============================== */

    theme: {

        primary:
            "#00ff66",

        secondary:
            "#00c853",

        background:
            "#020403",

        background2:
            "#07100a",

        text:
            "#ffffff",

        muted:
            "#8b9a91",

        card:
            "rgba(8, 20, 13, 0.72)",

        border:
            "rgba(0, 255, 102, 0.18)",

        glow:
            "rgba(0, 255, 102, 0.45)"

    },


    /* ===============================
       ANIMACIONES
       =============================== */

    animations: {

        particles: true,

        mouseGlow: true,

        cursorGlow: true,

        cards3D: true,

        revealOnScroll: true,

        typing: true,

        smoothScroll: true,

        parallax: true

    },


    /* ===============================
       FOOTER
       =============================== */

    footer: {

        text:
            "© 2026 MORGAN_ — Staff Manager & Developer",

        subtext:
            "Built with passion for Minecraft."

    }

};


/* =========================================================
   NO MODIFICAR
   ========================================================= */

window.PORTFOLIO_CONFIG = PORTFOLIO_CONFIG;
