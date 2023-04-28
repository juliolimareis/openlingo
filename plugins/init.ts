export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const route = useRoute();

  console.log("start front");

  return {
    provide: {
      idUser: 7,
      userName: "user"
    }
  };
});