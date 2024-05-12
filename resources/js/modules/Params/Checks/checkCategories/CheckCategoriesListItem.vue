<script lang="ts" setup>
import type { CheckCategory } from '@/api/params/CheckCategories'
import {
  TableCell,
  TableRow
} from '@/components/shdn/ui/table'
export interface Props {
  item: CheckCategory
}

defineProps<Props>()

</script>
<template>
  <TableRow>
    <TableCell class="max-w-5">
      <twice-ui-icon
        :name="item.icon"
        class="size-5"
        :stroke-width="1.5"
      />
    </TableCell>
    <TableCell class="font-medium">
      {{ item.name }}
    </TableCell>
  </TableRow>
</template>
