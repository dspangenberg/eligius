<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useOperatingInstructionStore } from '@/stores/params/OperatingInstructionStore'
import OperatingInstructionsListItem from './OperatingInstructionsListItem.vue'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody
} from '@/components/shdn/ui/table'

const router = useRouter()
const operatingInstructionStore = useOperatingInstructionStore()
const { instructions, meta, isLoading } = storeToRefs(operatingInstructionStore)

const onAddClicked = () => {
  operatingInstructionStore.add()
  router.push({
    name: 'settings-instructions-operating-instructions-add'
  })
}

const currentPage = ref(1)

const onSelect = async (id: number) => {
  await operatingInstructionStore.getById(id)
  router.push({
    name: 'settings-instructions-operating-instructions-edit', params: { id }
  })
}

watch(currentPage, async (page) => {
  await operatingInstructionStore.getAll(page)
})

onMounted(async () => {
  console.log('operatingInstructionStore.getAll()')
  await operatingInstructionStore.getAll()
})

</script>
<template>
  <twice-ui-page-section
    :loading="isLoading"
    title="Betriebsanweisungen"
    :current-page="currentPage"
    :meta="meta"
    empty-state-title="Sie haben noch keine Betriebsanweisungen."
    @update-page="currentPage=$event"
  >
    <template #toolbar>
      <twice-ui-icon-button
        icon="plus"
        tooltip="Neue Betriebsanweisung hinzufügen"
        variant="gprimary"
        @click="onAddClicked"
      />
    </template>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-24 text-right">
            Nr.
          </TableHead>
          <TableHead>Titel</TableHead>
          <TableHead class="w-auto" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <OperatingInstructionsListItem
          v-for="(instruction, index) in instructions"
          :key="index"
          :item="instruction"
          @select="onSelect"
        />
      </TableBody>
    </Table>
    <template #empty-state-button>
      <twice-ui-button
        variant="primary"
        @click="onAddClicked"
      >
        Betriebsanweisung hinzufügen
      </twice-ui-button>
    </template>
  </twice-ui-page-section>
</template>
