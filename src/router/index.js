import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
let title = "Prosoft";

const routes = [
  {
    path: "*",
    redirect: "/login2",
  },
  {
    path: "/",
    redirect: "/login2",
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   component: () => import("../views/Login.vue"),
  //   meta: {
  //     title: `${title} - Ingreso`,
  //   },
  // },
  {
    path: "/login2",
    name: "Login2",
    component: () => import("../views/Login2.vue"),
    meta: {
      title: `${title} - Ingreso`,
    },
  },
  // {
  //   path: "/inicio",
  //   name: "inicio",
  //   component: () => import("../views/CORR/Inicio.vue"),
  //   meta: {
  //     title: `${title} - inicio`,
  //   },
  // },

  {
    path: "/Menu-Principal",
    name: "Menu_Principal",
    component: () => import("../components/GLOBAL/Menus.vue"),
    meta: {
      requiresAuth: true,
      title: `${title} - Menu Principal`,
    },
    children: [
      {
        path: "/CON000",
        name: "CON000",
        component: () => import("../views/CONTAB/CON000.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Cambiar configuración`,
        },
      },
      {
        path: "/COR101",
        name: "actualiza-dptos-servicios",
        component: () => import("../views/CORR/COR101.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Actualiza Dptos o Servicios`,
        },
      },
      {
        path: "/COR102",
        name: "actualiza-funcionarios",
        component: () => import("../views/CORR/COR102.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Actualiza Funcionarios`,
        },
      },
      {
        path: "/COR103",
        name: "actualiza-correspondencia",
        component: () => import("../views/CORR/COR103.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Actualiza tipo correspondencia`,
        },
      },
      {
        path: "/COR104",
        name: "actualiza-aux-correspon",
        component: () => import("../views/CORR/COR104.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Actualiza Aux correspon`,
        },
      },
      {
        path: "/COR105",
        name: "crear-unopcad-funcional",
        component: () => import("../views/CORR/COR105.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Crear unopcad funcional`,
        },
      },
      {
        path: "/COR106",
        name: "crear-dependencia-remitente",
        component: () => import("../views/CORR/COR106.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Crear Dependencia Remitente`,
        },
      },
      {
        path: "/COR107",
        name: "activar-holding-empresarial",
        component: () => import("../views/CORR/COR107.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Activar Holding Empresarial`,
        },
      },
      {
        path: "/COR108",
        name: "actualizar-cargos-OPS",
        component: () => import("../views/CORR/COR108.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Actualizar cargos OPS`,
        },
      },
      {
        path: "/COR109",
        name: "actualizar-dias-feriados",
        component: () => import("../views/CORR/COR109.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Actualizar dias feriados`,
        },
      },
      {
        path: "/COR110",
        name: "datos-usuario",
        component: () => import("../views/CORR/COR110.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - datos usuario`,
        },
      },
      {
        path: "/CON110C",
        name: "actualizar-terceros",
        component: () => import("../views/CONTAB/CON110C.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Actualizar terceros`,
        },
      },
      {
        path: "/COR201",
        name: "recepcion-correspondencia",
        component: () => import("../views/CORR/COR201.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Recepcion Correspondencia`,
        },
      },
      {
        path: "/COR202",
        name: "reimprimir-correspondencia",
        component: () => import("../views/CORR/COR202.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Reimprimir Correspondencia`,
        },
      },
      {
        path: "/COR203",
        name: "traslado-de-correspondencia",
        component: () => import("../views/CORR/COR203.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Traslado de Correspondencia`,
        },
      },
      {
        path: "/COR204",
        name: "imprimir-carta-rips",
        component: () => import("../views/CORR/COR204.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Imprimir Carta Rips`,
        },
      },
      {
        path: "/COR205",
        name: "envio-E-Mail-pendiente",
        component: () => import("../views/CORR/COR205.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Envio E-Mail pendiente`,
        },
      },
      {
        path: "/COR301",
        name: "informe-de-correspondencia",
        component: () => import("../views/CORR/COR301.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Informe de Correspondencia`,
        },
      },
      {
        path: "/COR302",
        name: "informe-corres-dcartar",
        component: () => import("../views/CORR/COR302.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Informe Corres Dcartar`,
        },
      },
      {
        path: "/COR303",
        name: "Informe-corres-general",
        component: () => import("../views/CORR/COR303.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Informe Corres General`,
        },
      },
      {
        path: "/COR304",
        name: "informe-corres-respuestas",
        component: () => import("../views/CORR/COR304.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Informe Corres Respuestas`,
        },
      },
      {
        path: "/COR305",
        name: "distribución-interna",
        component: () => import("../views/CORR/COR305.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Distribución interna`,
        },
      },
      {
        path: "/COR306",
        name: "distribución-externa",
        component: () => import("../views/CORR/COR306.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Distribución externa`,
        },
      },
      {
        path: "/COR307",
        name: "informe-trimestral",
        component: () => import("../views/CORR/COR307.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Informe trimestral`,
        },
      },
      {
        path: "/COR401",
        name: "imprime-correspondencia",
        component: () => import("../views/CORR/COR401.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Imprime Correspondencia`,
        },
      },
      {
        path: "/COR402",
        name: "macro-respuesta-corresp",
        component: () => import("../views/CORR/COR402.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Macro respuesta Corresp`,
        },
      },
      {
        path: "/COR403",
        name: "respuesta-corresponden",
        component: () => import("../views/CORR/COR403.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Respuesta Corresponden`,
        },
      },
      {
        path: "/COR404",
        name: "reimprime-respuesta",
        component: () => import("../views/CORR/COR404.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Reimprime respuesta`,
        },
      },
      {
        path: "/COR405",
        name: "respuesta-corres-manual",
        component: () => import("../views/CORR/COR405.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Respuesta corres manual`,
        },
      },
      {
        path: "/COR501",
        name: "correspondencia-resolutiva",
        component: () => import("../views/CORR/COR501.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Correspondencia Resolutiva`,
        },
      },
      {
        path: "/COR502",
        name: "correspondencia-informativa",
        component: () => import("../views/CORR/COR502.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Correspondencia Informativa`,
        },
      },
      {
        path: "/COR503",
        name: "imprimir-anexos-correspondencia",
        component: () => import("../views/CORR/COR503.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Imprimir Anexos Correspondencia`,
        },
      },
      {
        path: "/imprimir",
        name: "imprimir-consentimientos",
        component: () => import("@/views/CONSE/impresion.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Imprimir Consentimientos`,
        },
      },
      {
        path: "/maestro",
        name: "maestro-consentimientos",
        component: () => import("@/views/CONSE/maestroConse.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Maestros Consentimientos`,
        },
      },
      {
        path: "/utm",
        name: "laboratorio-consentimiento",
        component: () => import("../views/CONSE/Utm2.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - laboratorio consentimientos`,
        },
      },
      {
        path: "/hic002",
        name: "HIC",
        component: () => import("@/views/CONSE/plantillas/HICLIN/HIC002.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - hiclin`,
        },
      },
    ],
  },
  {
    path: "/Modulos",
    name: "modulos",
    component: () => import("../views/Modulos.vue"),
    meta: {
      requiresAuth: true,
      title: `${title} - Modulos`,
    },
  },
  {
    path: "/Configuracion",
    name: "config-global",
    component: () => import("../components/CONFIGURACION/Configuraciones.vue"),
    meta: {
      requiresAuth: false,
      title: `${title} - Configuración-Global`,
    },
  },
  {
    path: "/Configuracion_login",
    name: "config-global-login",
    component: () => import("../components/CONFIGURACION/Configuraciones.vue"),
    meta: {
      requiresAuth: true,
      title: `${title} - Configuración-Global`,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // const auth = sessionStorage.auth_code;
  // document.title = to.meta.title;
  // const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  // console.log("🚀 ~ file: index.js:417 ~ router.beforeEach ~ requiresAuth:", requiresAuth)
  // const currentUser = auth ? JSON.parse(atob(auth)) : null;
  // console.log("🚀 ~ file: index.js:419 ~ router.beforeEach ~ currentUser :", currentUser )
  // if (requiresAuth && !currentUser) next("Login");
  // else if (!requiresAuth && currentUser && to.path !== "/Modulos")
  //   next("modulos");
  // else next();
  const auth = localStorage.config;
  document.title = to.meta.title;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const currentUser = auth ? JSON.parse(atob(auth)) : null;

  if (requiresAuth && !currentUser) next("Login2");
  else if (!requiresAuth && currentUser && to.path !== "/Menu-Principal")
    next("Menu-Principal");
  else next();

  window.scrollTo({ top: 0, behavior: "smooth" });
});

export default router;
