<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { MedicineAPI, type Medicine } from '../../services/medicine'



const medicines = ref([])

async function loadMedicines() {
  medicines.value = await MedicineAPI.list()
}

onMounted(() => {
  loadMedicines()
})

const search = ref('')

const dialog = ref(false)

const editedMedicine = ref<Medicine>({
  id: 0,
  name: '',
  dosage: '',
  amount: 0,
  manufacturer: ''
})

const headers = [
  { title: 'Nome', key: 'name' },
  { title: 'Dosagem', key: 'dosage' },
  { title: 'Quantidade', key: 'amount' },
  { title: 'Fabricante', key: 'manufacturer' },
  { title: '', key: 'actions', sortable: false }
]

const filteredMedicines = computed(() => {
  const term = search.value.toLowerCase()

  return medicines.value.filter(m =>
    m.name.toLowerCase().includes(term) ||
    m.dosage.toLowerCase().includes(term) ||
    m.manufacturer.toLowerCase().includes(term)
  )
})

function newMedicine() {
  editedMedicine.value = {
    id: 0,
    name: '',
    dosage: '',
    amount: 0,
    manufacturer: ''
  }

  dialog.value = true
}

function editMedicine(item: Medicine) {
  editedMedicine.value = { ...item }
  dialog.value = true
}

async function saveMedicine() {
  if (editedMedicine.value.id) {
    await MedicineAPI.update(
      editedMedicine.value.id,
      editedMedicine.value
    )
  } else {
    await MedicineAPI.create(editedMedicine.value)
  }

  await loadMedicines()

  dialog.value = false
}

async function deleteMedicine(id: number) {
  await MedicineAPI.remove(id)

  await loadMedicines()
}

</script>

<template>
  <v-container fluid>
    <div class="d-flex align-center mb-4">
      <v-text-field
        v-model="search"
        label="Pesquisar medicamento"
        prepend-inner-icon="mdi-magnify"
        hide-details
        density="comfortable"
        class="mr-4"
      />

      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        @click="newMedicine"
      >
        Novo Medicamento
      </v-btn>
    </div>

    <v-card>
      <v-data-table
        :headers="headers"
        :items="filteredMedicines"
      >
        <template #item.actions="{ item }">
          <v-menu>
            <template #activator="{ props }">
              <v-btn
                icon="mdi-dots-vertical"
                variant="text"
                v-bind="props"
              />
            </template>

            <v-list>
              <v-list-item @click="editMedicine(item)">
                <v-list-item-title>
                  Editar
                </v-list-item-title>
              </v-list-item>

              <v-list-item @click="deleteMedicine(item.id)">
                <v-list-item-title>
                  Excluir
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog
      v-model="dialog"
      max-width="500"
    >
      <v-card>
        <v-card-title>
          {{
            editedMedicine.id
              ? 'Editar Medicamento'
              : 'Novo Medicamento'
          }}
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="editedMedicine.name"
            label="Nome"
          />

          <v-text-field
            v-model="editedMedicine.dosage"
            label="Dosagem"
          />

          <v-text-field
            v-model.number="editedMedicine.amount"
            type="number"
            label="Quantidade"
          />

          <v-text-field
            v-model="editedMedicine.manufacturer"
            label="Fabricante"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            variant="text"
            @click="dialog = false"
          >
            Cancelar
          </v-btn>

          <v-btn
            color="primary"
            @click="saveMedicine"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>