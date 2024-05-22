<script setup lang="ts">
import { computed, onMounted, ref, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { type EqquipmentGroup } from '@/api/params/EqquipmentGroup'
import { useEqquipmentGroupStore } from '@/stores/params/EqquipmentGroupStore'


import { storeToRefs } from 'pinia'

const eqquipmentGroupStore = useEqquipmentGroupStore()
const { groupEdit } = storeToRefs(eqquipmentGroupStore)

const form = reactive(groupEdit)
const router = useRouter()
const route = useRoute()
const formRef = ref(null)

const id = computed(() => route.params.id)

const onClose = () => {
  router.push({ name: 'params-work-equipment-groups' })
}

const onSubmit = async (values: EqquipmentGroup) => {
  await eqquipmentGroupStore.save(values)
  onClose()
}

watch(id, (id) => {
  if (id) {
    eqquipmentGroupStore.getById(parseInt(id as string))
  } else {
    eqquipmentGroupStore.add()
  }
}, { immediate: true })

</script>

<template>
  <div>
    <twice-ui-dialog
      :show="true"
      title="Arbeitsmittelgruppe hinzufügen"
      @hide="onClose"
    >
      <template #content>
        <twice-ui-form
          id="form"
          ref="formRef"
          :initial-values="form"
          @submitted="onSubmit"
        >
          <twice-ui-form-group>
            <div class="col-span-24">
              <twice-ui-input
                label="Bezeichnung"
                rules="required"
                name="name"
              />
            </div>
          </twice-ui-form-group>
          <twice-ui-form-group title="Inventarnummer">
            <div class="col-span-6">
              <twice-ui-input
                label="Prefix"
                rules="required"
                name="inventory_number_prefix"
              />
            </div>
            <div class="col-span-6">
              <twice-ui-input
                label="Laufende Nummer"
                rules="required"
                name="inventory_current_number"
              />
            </div>
          </twice-ui-form-group>
        </twice-ui-form>
      </template>
      <template #footer>
        <ShdnUiButton
          variant="secondary"
          @click="onClose"
        >
          Abbrechen
        </ShdnUiButton>
        <ShdnUiButton
          form="form"
          type="submit"
        >
          Speichern
        </ShdnUiButton>
      </template>
    </twice-ui-dialog>
  </div>
</template>
