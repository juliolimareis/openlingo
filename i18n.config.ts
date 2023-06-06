import enUS from "~/lang/en-US";
import ptBr from "~/lang/pt-BR";

export default defineI18nConfig(nuxt => ({
  legacy: false,
  locale: "en",
  messages: {
    "en": enUS,
    "en-US": enUS,
    "pt-BR": ptBr
  }
}));