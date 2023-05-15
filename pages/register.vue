<template>
   <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{{ t('Create your account') }}</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="space-y-6">

        <div class="mt-2">
          <Input
            type="text"
            :label="t('Name')"
            :value="formData.name"
            :on-change="(value: string) => formData.name = value"
            :on-blur="() => v$.name.$touch()"
            :is-error="v$.name.$error"
            :show-helper-text="v$.name.$error"
            :helper-text="v$.name.required.$message"
          />
        </div>

        <div class="mt-2">
          <Input
            type="text"
            :label="'Email'"
            :value="formData.email"
            :on-change="(value: string) => formData.email = value"
            :on-blur="() => v$.email.$touch()"
            :is-error="v$.email.$error"
            :show-helper-text="v$.email.$error"
            :helper-text="v$.email.required.$message"
          />
        </div>

        <div class="mt-2">
          <Input
            type="password"
            :label="t('Password')"
            :value="formData.passwd"
            :on-change="(value: string) => formData.passwd = value"
            :on-blur="() => v$.passwd.$touch()"
            :is-error="v$.passwd.$error"
            :show-helper-text="v$.passwd.$error"
            :helper-text="v$.passwd.required.$message"
          />
        </div>

        <div class="mt-2">
          <Input
            type="password"
            :label="t('Confirm password')"
            :value="formData.confirmPassword"
            :on-change="(value: string) => formData.confirmPassword = value"
            :on-blur="() => v$.confirmPassword.$touch()"
            :is-error="v$.confirmPassword.$error"
            :show-helper-text="v$.confirmPassword.$error"
            :helper-text="v$.confirmPassword.sameAs.$message"
          />
        </div>

         <p v-if="statusResponse === 409" class="mt-10 text-center text-sm text-gray-600 bg-red-100 rounded-sm p-4 transform">
          {{ t("This email is already registered") }}{{ "." }}
          {{ ' ' }}
          <NuxtLink href="#" class="font-semibold leading-6 text-primary-500">{{ t('Login') }}</NuxtLink>
        </p>

        <p v-else-if="!statusResponse" class="mt-10 text-center text-sm text-gray-600 bg-red-100 rounded-sm p-4 transform">
          {{ t("Unable to login") }}{{ '.' }}
          {{ ' ' }}
          {{ t("Is your connection working?") }}
        </p>

        <div>
          <Button @click="onSend"
            :is-loading="isLoading"
            loading-size="md"
            is-width-full
          >
            {{ t("Register") }}
          </Button>
        </div>
      </div>

      <p class="mt-10 text-center text-sm text-gray-500">
        {{ t('You have account?') }}
        {{ ' ' }}
        <a href="/login" class="font-semibold leading-6 text-primary-500 hover:text-second">login</a>
      </p>
    </div>

    {{ response }}
  </div>
</template>

<script lang="ts" setup>
//https://rafamed.dev/blog/how-to-add-form-validation-to-your-nuxt-3-application/

import { required, email, sameAs, minLength, helpers, } from "@vuelidate/validators";
import { useVuelidate, } from "@vuelidate/core";

definePageMeta({ middleware: ["auth"] });

const statusResponse = ref(-1);
const isLoading = ref(false);

const formData = reactive({
  name: "",
  email: "",
  passwd: "",
  confirmPassword: ""
});

const { t } = useI18n();

const { setToken } = useAuth();
const { dispatch } = useUser();

const response = ref();

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage(t("The name must contain at least 4 letters"), required),
      minLength: minLength(4),
    },
    email: {
      required: helpers.withMessage(t("Invalid email"), required),
      email: helpers.withMessage(t("Invalid email format"), email),
    },
    passwd: {
      required: helpers.withMessage(t("The password must contain at least 6 characters"), required),
      minLength: minLength(6),
    },
    confirmPassword: {
      required: helpers.withMessage("The password confirmation field is required", required),
      sameAs: helpers.withMessage("Passwords don't match", sameAs(formData.passwd)),
    },
  };
});

const v$ = useVuelidate(rules, formData);

function onSend(){
  v$.value.$validate();

  if (v$.value.$error) return;

  isLoading.value = true;

  const sendData = { ...formData } as any;

  delete sendData.confirmPassword;

  dispatch(sendData)
    .then((res) => {
      setToken(res.data.token);
      navigateTo("/home", { replace: true });
    })
    .catch((err) => {
      statusResponse.value = err?.response?.status ?? 0;
    }).finally(() => {
      isLoading.value = false;
    });
}

</script>