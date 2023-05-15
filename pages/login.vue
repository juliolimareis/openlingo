<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{{ t("Sign in to your account") }}</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="space-y-6">
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

        <p v-if="statusResponse > 0" class="mt-10 text-center text-sm text-gray-600 bg-red-100 rounded-sm p-4 transform">
          {{ t("Forgot your password?") }}
          {{ ' ' }}
          <NuxtLink href="#" class="font-semibold leading-6 text-primary-500">{{ t('Recovery password') }}</NuxtLink>
        </p>

        <p v-else-if="!statusResponse" class="mt-10 text-center text-sm text-gray-600 bg-red-100 rounded-sm p-4 transform">
          {{ t("Unable to login") }}{{ '.' }}
          {{ ' ' }}
          {{ t("is your connection working?") }}
        </p>

        <div>
          <Button @click="onSend"
            :is-loading="isLoading"
            loading-size="md"
            is-width-full
          >
            {{ t("Sign In") }}
          </Button>
        </div>
      </div>

      <p class="mt-10 text-center text-sm text-gray-500">
        {{ t("Not a member?") }}
        {{ ' ' }}
        <NuxtLink href="/register" class="font-semibold leading-6 text-primary-500 hover:text-primary-500">{{ t('Create Account') }}</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useVuelidate from "@vuelidate/core";
import { email, helpers, required, minLength, } from "@vuelidate/validators";

definePageMeta({ middleware: ["auth"] });
const { t } = useI18n();
const { auth } = useUser();
const { setToken } = useAuth();

const statusResponse = ref(-1);
const isLoading = ref(false);

const formData = reactive({
  email: "",
  passwd: ""
});

const rules = computed(() => ({
  email: {
    required: helpers.withMessage(t("Invalid email"), required),
    email: { email }
  },
  passwd: {
    required: helpers.withMessage(t("The password must contain at least 6 characters"), required),
    minLength: minLength(6),
  }
}));

const v$ = useVuelidate(rules, formData);

function onSend(){
  v$.value.$validate();

  if (v$.value.$error) return;

  isLoading.value = true;

  auth(formData)
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