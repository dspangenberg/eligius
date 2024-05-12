<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useEmpowermentStore } from '@/stores/params/EmpowermentStore'
import EmpowermentsListItem from './EmpowermentsListItem.vue'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody
} from '@/components/shdn/ui/table'

const router = useRouter()
const empowermentStore = useEmpowermentStore()
const { empowerments, meta, isLoading } = storeToRefs(empowermentStore)

const onAddClicked = () => {
  empowermentStore.add()
  router.push({
    name: 'settings-empowerments-add'
  })
}

const onSelect = async (id: number) => {
  await empowermentStore.getById(id)
  router.push({
    name: 'settings-empowerments-edit', params: { id }
  })
}

const currentPage = ref(1)

watch(currentPage, async (page) => {
  await empowermentStore.getAll(page)
})

onMounted(async () => {
  await empowermentStore.getAll()
})

</script>
<template>
  <twice-ui-page-section
    :loading="isLoading"
    title="Befähigungen + Fachkunde"
    :current-page="currentPage"
    :meta="meta"
    empty-state-title="Sie haben noch keine Mitarbeiterbefähigungen."
    @update-page="currentPage=$event"
  >
    <template #toolbar>
      <twice-ui-icon-button
        icon="plus"
        tooltip="Neue Mitarbeiterbefähigung hinzufügen"
        variant="gprimary"
        @click="onAddClicked"
      />
    </template>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="text-left">
            Titel
          </TableHead>
          <TableHead class="w-24 text-left ">
            Abkürzung
          </TableHead>
          <TableHead class="w-auto" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <EmpowermentsListItem
          v-for="(empowerment, index) in empowerments"
          :key="index"
          :item="empowerment"
          @select="onSelect"
        />
      </TableBody>
    </Table>
    <template #empty-state-button>
      <twice-ui-button
        variant="primary"
        @click="onAddClicked"
      >
        Mitarbeiterbefähigung hinzufügen
      </twice-ui-button>
    </template>
  </twice-ui-page-section>
</template>
