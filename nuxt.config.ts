// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Openlingo",
      script: [
        { hid: "stripe", src: "https://www.youtube.com/iframe_api", defer: true }
      ]
    },
  },

  imports: {
    dirs: [
      // Scan top-level modules
      "composables",
      // ... or scan modules nested one level deep with a specific name and file extension
      "composables/*/index.{ts,js,mjs,mts}",
      // ... or scan all modules within given directory
      "composables/**"
    ]
  },

  runtimeConfig: {
    public: {
      publicPages: ["", "/", "/login", "/register"],
      userData: {}
      // api: process.env.API_MAIN,
      // apiAddress: process.env.API_ADDRESS,
      // apiAuthentication: process.env.API_AUTHENTICATION,
    },
  },

  modules:[
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n"
    // "@nuxtjs/abifa-ui"
  ],

  i18n: {
    // locales: [
    //   {
    //     code: "pt-BR",
    //     file: "pt-BR.ts"
    //   }
    // ],
    // vueI18n: "en, pt-BR",
    // lazy: true,
    // langDir: "lang",
    defaultLocale: "pt-BR",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // recommended
      alwaysRedirect: true
    }
  },
});