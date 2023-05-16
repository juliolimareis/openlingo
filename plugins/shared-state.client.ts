import { PiniaSharedState, } from "pinia-shared-state";
import piniaPersistedstate from "pinia-plugin-persistedstate";

// https://www.vuescript.com/sync-pinia-state-across-browser-tabs/
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$pinia.use(PiniaSharedState({ enable: true }));
  nuxtApp.$pinia.use(piniaPersistedstate);
});