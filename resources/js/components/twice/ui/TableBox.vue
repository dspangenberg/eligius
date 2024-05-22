<script setup lang="ts">
import { IconDatabaseSmile } from '@tabler/icons-vue'
import { useParamsLayoutStore } from '@/stores/ParamsLayoutStore'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const paramsItem = ref()
const paramsSubItem = ref()
const paramsLayoutStore = useParamsLayoutStore()

export interface Props {
  recordCount: number
  recordName?: string
  useLayout?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  recordCount: 0,
  recordName: 'Datensätze',
  useLayout: false
})

watch(route, (route) => {
  if (props.useLayout) {
    const { item, subItem } = paramsLayoutStore.getActiveItem(route.path)
    paramsItem.value = item
    paramsSubItem.value = subItem
  }
}, { immediate: true })

const onAddFirstClicked = () => {
  router.push({ name: paramsSubItem.value.addButtonRoute })
}

</script>
<template>
  <div>
    <div>
      <slot />
    </div>
    <div v-if="!recordCount">
      <div>
        <slot name="empty-state">
          <div class="py-12 text-center text-gray-500">
            <IconDatabaseSmile
              :size="36"
              :stroke-width="1.5"
              class="mx-auto my-6 text-stone-500"
            />
            <template v-if="useLayout">
              Sie haben noch keine {{ paramsSubItem.recordName }} hinzufügt.
              <div class="p-6">
                <ShdnUiButton @click="onAddFirstClicked">
                  {{ paramsSubItem.firstButtonTitle }} hinzufügen
                </ShdnUiButton>
              </div>
            </template>
            <template v-else>
              Keine {{ recordName }} gefunden.
            </template>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
