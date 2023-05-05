import en from "~/lang/en";
import enUS from "~/lang/en-US";
import ptBr from "~/lang/pt-BR";

export default defineI18nConfig(nuxt => ({
  legacy: false,
  // locale: "pt-BR",
  messages: {
    "en": en,
    "en-US": enUS,
    "pt-BR": ptBr
  }
}));