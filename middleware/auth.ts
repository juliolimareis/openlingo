export default defineNuxtRouteMiddleware((to) => {
  if(process.client){
    const { publicPages } = useRuntimeConfig().public;
    const { isLogin } = useAuth();

    if(!isLogin()){
      if(!publicPages.includes(to.path)){
        return navigateTo("/login", { redirectCode: 400, replace: true });
      }
    }else{
      if(publicPages.includes(to.path)){
        return navigateTo("/home", { replace: true });
      }
    }
  }
});