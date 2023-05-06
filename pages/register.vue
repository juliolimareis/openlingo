<template>
   <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="space-y-6">

        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div class="mt-2">
            <Input name="name" type="text" :on-change="(value: string) => user.name = value"/>
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <Input id="email" name="email" type="email" autocomplete="email" :on-change="(value: string) => user.email = value"/>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>
          <div class="mt-2">
            <Input id="password" name="password" type="password" autocomplete="current-password" :on-change="(value: string) => user.passwd = value"/>
          </div>
        </div>

        <div>
          <Button @click="onSend" class="w-full">Sign in</Button>
        </div>
      </div>

      <p class="mt-10 text-center text-sm text-gray-500">
        You have account?
        {{ ' ' }}
        <a href="/login" class="font-semibold leading-6 text-primary hover:text-second">login</a>
      </p>
    </div>

    {{ response }}
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: ["auth"] });

const { setToken } = useAuth();
const api = useApi();

const response = ref();

const user = ref<User>({
  name: "",
  email: "",
  passwd: "",
});

function onSend(){
  api.post("/user", user.value)
    .then((res) => {
      setToken(res.data.token);
      navigateTo("/home", { replace: true });
    })
    .catch(err => {
      console.log(err);
      response.value = err;
    });
}

</script>