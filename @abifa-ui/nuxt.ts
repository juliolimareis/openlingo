import { defineNuxtModule, createResolver, } from "@nuxt/kit";

export default defineNuxtModule({
  // defaults: {
  //    modules:[
  //     "@nuxtjs/tailwindcss",
  //   ],
  //   css: [
  //     "~/css/main.css",
  //   ],
  // },

  hooks: {
    "components:dirs": (dirs) => {
      // const dirs = ["button", "dialog", "input", "loader"];

      const { resolve } = createResolver(import.meta.url);
      // Add ./components dir to the list

      console.log("path => ", resolve("./components"));

      dirs.push({
        path: resolve("./components"),
        // prefix: "abifa"
      });
    }
  }
});
