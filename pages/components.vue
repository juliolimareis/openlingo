<template>
  <div class="pt-3 grid grid-cols-[110px_80%]">

    <div class="border-r-2 border-gray-400">
      <div @click="onSelect('buttons')" :class="`${menuClass} ${menuSelect === 'buttons' && 'bg-gray-200'}`"><cursor-arrow-rays-icon class="w-6 pr-1"/>Buttons</div>
      <div @click="onSelect('inputs')" :class="`${menuClass} ${menuSelect === 'inputs' && 'bg-gray-200'}`"><pencil-square-icon class="w-6 pr-1"/>Inputs</div>
      <div @click="onSelect('loader')" :class="`${menuClass} ${menuSelect === 'loader' && 'bg-gray-200'}`"><arrow-path-icon class="w-6 pr-1"/>Loader</div>
      <div @click="onSelect('text')" :class="`${menuClass} ${menuSelect === 'text' && 'bg-gray-200'}`"><DocumentTextIcon class="w-6 pr-1"/>Text</div>
      <div @click="onSelect('icons')" :class="`${menuClass} ${menuSelect === 'icons' && 'bg-gray-200'}`"><AcademicCapIcon class="w-6 pr-1"/>Icons</div>
      <div @click="onSelect('modal')" :class="`${menuClass} ${menuSelect === 'modal' && 'bg-gray-200'}`"><WindowIcon class="w-6 pr-1"/>Modal</div>
      <div @click="onSelect('table')" :class="`${menuClass} ${menuSelect === 'table' && 'bg-gray-200'}`"><TableCellsIcon class="w-6 pr-1"/>Table</div>
    </div>

    <div class="p-4">
      <div v-if="menuSelect === 'buttons'">
        <Text type="title">Buttons</Text>

        <hr>

        <div class="p-2">
          <Button>
            Primary
          </Button>
          <Button has-icon>
            Primary Icon
            <AcademicCapIcon class="h-5 w-5"/>
          </Button>
          <br>
          <Button secondary>Secondary</Button>
          <Button secondary>
            Secondary Icon
            <AcademicCapIcon class="h-5 w-5"/>
          </Button>
        </div>

        <div>
          <Text class="mb-2" type="subtitle">Switch</Text>

          <div class="flex">
            <Switch :on-change="value => switchText = value ? 'On' : 'Off'"/>
            <span class="ml-2">
              {{ switchText }}
            </span>
          </div>
        </div>

      </div>

      <div v-else-if="menuSelect === 'inputs'">
        <Text type="title">Inputs</Text>

        <hr>

        <Input
          :placeholder="'placeholder'"
          :on-change="onChange"
        />

        <Input
          type="number"
        />

        <TextArea
          label="Text Area"
          :value="text"
          :on-change="(value: any) => text = value"
        />

        Text: {{ text }}
      </div>

      <div v-else-if="menuSelect === 'loader'">
        <Text type="title">Loader</Text>
        <hr>
        <Loader class="w-14"/>
      </div>

      <div v-else-if="menuSelect === 'icons'">
        <Text type="title">Icons</Text>
        <hr>
        <BeakerIcon class="w-10" />
      </div>

      <div v-else-if="menuSelect === 'text'">
        <Text type="title">Texts</Text>
        <hr>
        <Text type="subtitle">Subtitle</Text>
        <Text>Normal</Text>
      </div>

      <div v-else-if="menuSelect === 'modal'">
        <Modal :is-open="isOpenModal" :on-close="onClose">
          <template v-slot:title>Modal title</template>
          <template v-slot:body>Modal body</template>
          <template v-slot:footer>Modal Footer</template>
        </Modal>
        <Button @click="isOpenModal = true">Open Modal</Button>

        <Dialog :is-open="isOpenDialog" :on-close="onCloseDialog"
          message-accept="Sim"
          message-cancel="Não"
        >
          <template v-slot:title>Você está certo disso ?</template>
          <template v-slot:body><p>Posso perguntar ?</p></template>
        </Dialog>
        <Button @click="isOpenDialog = true">Open Dialog</Button>
      </div>

      <div v-else-if="menuSelect === 'table'">
        <Table>
          <TableHead>
            <TableTitle>Name</TableTitle>
            <TableTitle>Title</TableTitle>
            <TableTitle>Email</TableTitle>
            <TableTitle>Hole</TableTitle>
            <TableTitle>Options</TableTitle>
          </TableHead>

          <TableBody>
            <TableRow v-for="person in people" :key="person.email">
              <TableCell>{{ person.name }}</TableCell>
              <TableCell>{{ person.title }}</TableCell>
              <TableCell>{{ person.email }}</TableCell>
              <TableCell>{{ person.role }}</TableCell>
              <TableCell><Button>Active</Button></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { BeakerIcon, CursorArrowRaysIcon, PencilSquareIcon, ArrowPathIcon, AcademicCapIcon, WindowIcon, DocumentTextIcon, TableCellsIcon, } from "@heroicons/vue/24/solid";

const route = useRoute();
const router = useRouter();
const api = useApi();

type Options = "buttons" | "inputs" | "loader" | "text" | "modal" | "icons" | "table";

const text = ref<string | undefined>("valor default");
const menuSelect = ref<Options>("buttons");
const menuClass = "flex hover:bg-gray-200 p-2 rounded-sm cursor-pointer";

const isOpenModal = ref(false);
const isOpenDialog = ref(false);

const switchText = ref<"Off" | "On">("Off");

onMounted(() => {
  api.get("/music")
    .then(res => {
      console.log(res.data);
    });

  const { option } = route.query as Record<string, Options>;

  if(option){
    menuSelect.value = option;
  }
});

const onClose = () => isOpenModal.value = false;

const people = [
  { name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay.walton@example.com", role: "Member" },
  { name: "Lila Mur", title: "Front-end Developer", email: "ludo.chef@example.com", role: "Member" },
];

const onCloseDialog = (value: boolean) => {
  isOpenDialog.value = false;

  console.log(value);
};

function onSelect(option: Options){
  menuSelect.value = option;
  router.push({ path: "/components", query: { option } });
}

function onChange(value: string){
  text.value = value;
}

</script>