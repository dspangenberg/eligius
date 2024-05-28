<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useInventoryGroupStore } from '@/stores/params/InventoryGroupStore'
import InventoryGroupListItem from './InventoryGroupListItem.vue'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody
} from '@/components/shdn/ui/table'

const router = useRouter()
const inventoryGroupStore = useInventoryGroupStore()
const { groups, meta, isLoading } = storeToRefs(inventoryGroupStore)

const currentPage = ref(1)

const onSelect = async (id: number) => {
  await inventoryGroupStore.getById(id)
  router.push({
    name: 'params-work-equipment-inventory-groups-edit', params: { id }
  })
}

watch(currentPage, async (page) => {
  await inventoryGroupStore.getAll(page)
})

onMounted(async () => {
  await inventoryGroupStore.getAll()
})

</script>
<template>
  <twice-ui-table-box
    use-layout
    :record-count="groups?.length"
  >
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Bezeichnung</TableHead>
          <TableHead>Geschäftsbereich</TableHead>
          <TableHead
            class="w-32"
          >
            Prefix
          </TableHead>
          <TableHead class="w-10">
            Zähler
          </TableHead>
          <TableHead class="w-auto" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <InventoryGroupListItem
          v-for="(group, index) in groups"
          :key="index"
          :item="group"
          @select="onSelect"
        />
      </TableBody>
    </Table>
    <router-view />
  </twice-ui-table-box>
</template>
