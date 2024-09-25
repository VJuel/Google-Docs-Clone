// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: true,
  target: "static", // Cela configure Nuxt.js pour générer un site statique

  app: {
    base: "/Google-Docs-Clone/", // Ajoutez le chemin de base si votre projet n'est pas sur la racine du domaine GitHub Pages
    pageTransition: { name: "page", mode: "out-in" },
  },
  $production: {
    routeRules: {
      "/**": { isr: true },
    },
  },

  $development: {
    extends: [
      // '../base',                     // Extend from a local layer
      // '@my-themes/awesome',          // Extend from an installed npm package
      // 'github:my-themes/awesome#v1', // Extend from a git repository
    ],
  },

  compatibilityDate: "2024-09-17",
});
