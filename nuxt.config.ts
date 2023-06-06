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
    apiPublicRouters: { "/api/v1/auth": ["post"], "/api/v1/user":["post"] },
    public: {
      publicPages: ["", "/", "/login", "/register"],
      // api: process.env.API_MAIN,
      // apiAddress: process.env.API_ADDRESS,
      // apiAuthentication: process.env.API_AUTHENTICATION,
    },
  },

  modules:[
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@pinia/nuxt"
    // "@nuxtjs/abifa-ui"
  ],

  // pinia: {
  //   autoImports: [
  //     // automatically imports `defineStore`
  //     "defineStore", // import { defineStore } from 'pinia'
  //     ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
  //   ],
  // },

  components: [
    "components",
    "components/icons",
    "components/system"
  ]

});
