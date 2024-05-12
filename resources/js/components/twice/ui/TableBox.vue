<script setup lang="ts">
import { IconMoodPlus } from '@tabler/icons-vue'

export interface Props {
  recordCount: number
  recordName?: string
}

withDefaults(defineProps<Props>(), {
  recordCount: 0,
  recordName: 'Datensätze'
})

</script>
<template>
  <div>
    <div>
      <slot />
    </div>
    <div v-if="!recordCount">
      <div class="relative w-full overflow-auto border-t rounded-md shadow border-stone-100">
        <slot name="empty-state">
          <div class="py-12 text-center text-gray-500">
            <IconMoodPlus
              :size="36"
              :stroke-width="2"
              class="mx-auto my-6 text-stone-500"
            />
            Keine {{ recordName }} gefunden.
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
