<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useEqquipmentGroupStore } from '@/stores/params/EqquipmentGroupStore'
import EqquipmentGroupListItem from './EqquipmentGroupListItem.vue'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody
} from '@/components/shdn/ui/table'

const router = useRouter()
const eqquipmentGroupStore = useEqquipmentGroupStore()
const { groups, meta, isLoading } = storeToRefs(eqquipmentGroupStore)

const currentPage = ref(1)

const onSelect = async (id: number) => {
  await eqquipmentGroupStore.getById(id)
  router.push({
    name: 'params-work-equipment-groups-edit', params: { id }
  })
}

watch(currentPage, async (page) => {
  await eqquipmentGroupStore.getAll(page)
})

onMounted(async () => {
  await eqquipmentGroupStore.getAll()
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
        <EqquipmentGroupListItem
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
