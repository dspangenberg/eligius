<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useEqquipmentCategoryStore } from '@/stores/params/EqquipmentCategoryStore'
import EqquipmentCategoryListItem from './EqquipmentCategoryListItem.vue'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody
} from '@/components/shdn/ui/table'

const router = useRouter()
const eqquipmentCategoryStore = useEqquipmentCategoryStore()
const { categories, meta, isLoading } = storeToRefs(eqquipmentCategoryStore)

const currentPage = ref(1)

const onSelect = async (id: number) => {
  await eqquipmentCategoryStore.getById(id)
  router.push({
    name: 'params-work-equipment-categories-edit', params: { id }
  })
}

watch(currentPage, async (page) => {
  await eqquipmentCategoryStore.getAll(page)
})

onMounted(async () => {
  await eqquipmentCategoryStore.getAll()
})

</script>
<template>
  <twice-ui-table-box
    use-layout
    :record-count="categories?.length"
    record-name="Arbeitsmittelkategorien"
  >
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Bezeichnung</TableHead>
          <TableHead
            class="w-40"
          >
            Arbeitsmittelgruppe
          </TableHead>
          <TableHead class="w-auto" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <EqquipmentCategoryListItem
          v-for="(category, index) in categories"
          :key="index"
          :item="category"
          @select="onSelect"
        />
      </TableBody>
    </Table>
    <router-view />
  </twice-ui-table-box>
</template>
