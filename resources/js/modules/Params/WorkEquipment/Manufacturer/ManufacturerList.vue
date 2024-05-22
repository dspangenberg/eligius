<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useManufacturerStore } from '@/stores/params/ManufacturerStore'
import ManufacturerListItem from './ManufacturerListItem.vue'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody
} from '@/components/shdn/ui/table'

const router = useRouter()
const manufacturerStore = useManufacturerStore()
const { manufacturers, meta, isLoading } = storeToRefs(manufacturerStore)

const currentPage = ref(1)

const onSelect = async (id: number) => {
  await manufacturerStore.getById(id)
  router.push({
    name: 'params-work-equipment-manufacturers-edit', params: { id }
  })
}

watch(currentPage, async (page) => {
  await manufacturerStore.getAll(page)
})

onMounted(async () => {
  await manufacturerStore.getAll()
})

</script>
<template>
  <twice-ui-table-box
    use-layout
    :record-count="manufacturers?.length"
  >
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name des Hersteller</TableHead>
          <TableHead class="w-auto" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <ManufacturerListItem
          v-for="(manufacturer, index) in manufacturers"
          :key="index"
          :item="manufacturer"
          @select="onSelect"
        />
      </TableBody>
    </Table>
    <router-view />
  </twice-ui-table-box>
</template>
