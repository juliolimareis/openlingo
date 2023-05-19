import { defineStore, } from "pinia";

export const useScoreStore = defineStore("score", {
  state: () => ({ interactionsType: [] as InteractionType[] }),
  actions: {
    addInteractionsType(interactionType: InteractionType){
      this.interactionsType.push(interactionType);
    },
  }
});