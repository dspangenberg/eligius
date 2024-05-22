<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useDepartmentStore } from '@/stores/params/DepartmentStore'
import DepartmentListItem from './DepartmentListItem.vue'
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

const currentPage = ref(1)

const onSelect = async (id: number) => {
  await departmentStore.getById(id)
  router.push({
    name: 'params-business-departments-edit', params: { id }
  })
}

watch(currentPage, async (page) => {
  await departmentStore.getAll(page)
})

onMounted(async () => {
  await departmentStore.getAll()
})

</script>
<template>
  <twice-ui-table-box
    use-layout
    :record-count="departments?.length"
  >
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Bezeichnung</TableHead>
          <TableHead class="w-auto" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <DepartmentListItem
          v-for="(department, index) in departments"
          :key="index"
          :item="department"
          @select="onSelect"
        />
      </TableBody>
    </Table>
    <router-view />
  </twice-ui-table-box>
</template>
