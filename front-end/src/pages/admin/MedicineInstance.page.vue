<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  MedicineInstanceAPI,
  type MedicineInstance,
} from '../../services/medicine_instance'
import { MedicineAPI, type Medicine } from '../../services/medicine'
import { UBSAPI, type UBS } from '../../services/ubs'

const instances = ref<MedicineInstance[]>([])
const medicines = ref<Medicine[]>([])
const ubsList = ref<UBS[]>([])

async function loadData() {
  const [instanceData, medicineData, ubsData] = await Promise.all([
    MedicineInstanceAPI.list(),
    MedicineAPI.list(),
    UBSAPI.list(),
  ])

  instances.value = instanceData
  medicines.value = medicineData
  ubsList.value = ubsData
}

onMounted(loadData)

const search = ref('')
const dialog = ref(false)
const saving = ref(false)

const editedInstance = ref<MedicineInstance>({
  id: 0,
  medicineId: 0,
  ubsId: 0,
  amount: 0,
})

const headers = [
  { title: '', key: 'actions', sortable: false, width: 70, align: 'center' as const },
  { title: 'Medicamento', key: 'medicine_name' },
  { title: 'UBS', key: 'ubs_name' },
  { title: 'Quantidade', key: 'amount' },
]

// Add readable names to each instance for display and filtering.
const tableItems = computed(() =>
  instances.value.map(instance => {
    const medicine = medicines.value.find(
      m => m.id === instance.medicineId
    )

    const ubs = ubsList.value.find(
      u => u.id === instance.ubsId
    )
    return {
      ...instance,
      medicine_name: medicine
        ? `${medicine.name} ${medicine.dosage}`
        : `Medicamento #${instance.medicineId}`,
      ubs_name: ubs?.name ?? `UBS #${instance.ubsId}`,
    }
  })
)

const filteredInstances = computed(() => {
  const term = search.value.trim().toLowerCase()

  if (!term) return tableItems.value

  return tableItems.value.filter(instance =>
    instance.medicine_name.toLowerCase().includes(term) ||
    instance.ubs_name.toLowerCase().includes(term) ||
    String(instance.amount).includes(term)
  )
})

function newInstance() {
  editedInstance.value = {
    id: 0,
    medicineId: 0,
    ubsId: 0,
    amount: 0,
  }

  dialog.value = true
}

function editInstance(item: MedicineInstance) {
  editedInstance.value = { ...item }
  dialog.value = true
}

async function saveInstance() {
  if (saving.value) return

  saving.value = true

  try {
    if (editedInstance.value.id) {
      await MedicineInstanceAPI.update(
        editedInstance.value.id,
        editedInstance.value
      )
    } else {
      // The backend checks whether this medicine/UBS pair already exists.
      await MedicineInstanceAPI.create(editedInstance.value)
    }

    await loadData()
    dialog.value = false
  } finally {
    saving.value = false
  }
}

async function deleteInstance(id: number) {
  await MedicineInstanceAPI.remove(id)
  await loadData()
}
</script>

<template>
  <v-container fluid>
    <div class="d-flex align-center mb-4">
      <v-text-field
        v-model="search"
        label="Pesquisar medicamento ou UBS"
        prepend-inner-icon="mdi-magnify"
        hide-details
        density="comfortable"
        class="mr-4"
      />

      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        @click="newInstance"
      >
        Novo Estoque
      </v-btn>
    </div>

    <v-card>
      <v-data-table
        :headers="headers"
        :items="filteredInstances"
      >
        <template #header.actions>
          <v-tooltip text="Ações">
            <template #activator="{ props }">
              <v-icon v-bind="props" size="18">
                mdi-square-edit-outline
              </v-icon>
            </template>
          </v-tooltip>
        </template>

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
              <v-list-item @click="editInstance(item)">
                <v-list-item-title>Editar</v-list-item-title>
              </v-list-item>

              <v-list-item @click="deleteInstance(item.id)">
                <v-list-item-title>Excluir</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>

        <template #item.amount="{ item }">
          <v-chip
            :color="item.amount === 0 ? 'grey' : 'primary'"
            size="small"
            variant="tonal"
          >
            {{ item.amount }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>
          {{ editedInstance.id ? 'Editar Estoque' : 'Novo Estoque' }}
        </v-card-title>

        <v-card-text>
          <v-select
            v-model="editedInstance.medicine_id"
            :items="medicines"
            :item-title="(item: Medicine) => `${item.name} ${item.dosage}`"
            item-value="id"
            label="Medicamento"
            :disabled="!!editedInstance.id"
          />

          <v-select
            v-model="editedInstance.ubs_id"
            :items="ubsList"
            item-title="name"
            item-value="id"
            label="UBS"
            :disabled="!!editedInstance.id"
          />

          <v-text-field
            v-model.number="editedInstance.amount"
            label="Quantidade"
            type="number"
            min="0"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            variant="text"
            :disabled="saving"
            @click="dialog = false"
          >
            Cancelar
          </v-btn>

          <v-btn
            color="primary"
            :loading="saving"
            :disabled="
              editedInstance.medicine_id < 0 ||
              editedInstance.ubs_id < 0 ||
              editedInstance.amount < 0
            "
            @click="saveInstance"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>