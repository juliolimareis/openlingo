<template>
  <Container class="grid grid-cols-1">
    <div>
      <Text type="title">Cadastro de usuário</Text>
    </div>

    <div class="gr">
      <Input label="Name" :on-change="(value: string) => user.name = value"/>
      <Input label="Email" :on-change="(value: string) => user.email = value"/>
      <Input label="Senha" type="password" :on-change="(value: string) => user.passwd = value"/>
    </div>

    <div>
      <Button class="mt-10" @click="onSend">Cadastrar</Button>
    </div>

  </Container>
</template>

<script lang="ts" setup>
const api = useApi();
const user = ref<User>({
  name: "",
  email: "",
  passwd: "",
});

function onSend(){
  api.post<User>("/student", user.value)
    .then((res) => {
      alert("Cadastro efetuado com sucesso!");
    });
}

</script>