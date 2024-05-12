<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useSettingsCheckCategoryStore } from '@/stores/params/CheckCategoryStore'
import CheckCategoriesListItem from './CheckCategoriesListItem.vue'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/shdn/ui/table'
const checkCategoryStore = useSettingsCheckCategoryStore()
const { categories } = storeToRefs(checkCategoryStore)

onMounted(async () => {
  await checkCategoryStore.getAll()
})

</script>
<template>
  <div class="rounded-lg border bg-card text-sm text-card-foreground shadow-sm p-4">
    <Table class="w-full">
      <TableHeader>
        <TableRow>
          <TableHead class="w-6" />
          <TableHead>Bezeichnung</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <CheckCategoriesListItem
          v-for="(category, index) in categories"
          :key="index"
          :item="category"
        />
      </TableBody>
    </Table>
  </div>
</template>
