<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useDepartmentStore } from '@/stores/params/DepartmentStore'
import DepartmentsListItem from './DepartmentsListItem.vue'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody
} from '@/components/shdn/ui/table'

const router = useRouter()
const departmentStore = useDepartmentStore()
const { departments, meta, isLoading } = storeToRefs(departmentStore)

const onAddClicked = () => {
  departmentStore.add()
  router.push({
    name: 'settings-departments-add'
  })
}

const onSelect = async (id: number) => {
  await departmentStore.getById(id)
  router.push({
    name: 'settings-departments-edit', params: { id }
  })
}

const currentPage = ref(1)

watch(currentPage, async (page) => {
  await departmentStore.getAll(page)
})

onMounted(async () => {
  await departmentStore.getAll()
})

</script>
<template>
  <twice-ui-page-section
    title="Abteilungen"
    :current-page="currentPage"
    :meta="meta"
    :loading="isLoading"
    empty-state-title="Sie haben noch keine Abteilungen."
    @update-page="currentPage=$event"
  >
    <template #toolbar>
      <twice-ui-icon-button
        icon="plus"
        tooltip="Neue Abteilung hinzufügen"
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
          <TableHead class="w-auto" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <DepartmentsListItem
          v-for="(department, index) in departments"
          :key="index"
          :item="department"
          @select="onSelect"
        />
      </TableBody>
    </Table>
    <template #empty-state-button>
      <twice-ui-button
        variant="primary"
        @click="onAddClicked"
      >
        Abteiliung hinzufügen
      </twice-ui-button>
    </template>
  </twice-ui-page-section>
</template>
