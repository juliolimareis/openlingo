import { PiniaSharedState, } from "pinia-shared-state";

// https://www.vuescript.com/sync-pinia-state-across-browser-tabs/
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$pinia.use(PiniaSharedState({ enable: true }));
});