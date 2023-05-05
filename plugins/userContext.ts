export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const route = useRoute();

  let userData = {};

  function setUserData(data: any){
    userData = data;
  }

  return {
    provide: {
      userData,
      setUserData,
      idUser: 7,
      userName: "user"
    }
  };
});