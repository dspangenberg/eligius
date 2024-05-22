<script setup lang="ts">
import { computed, onMounted, ref, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { type EqquipmentCategory } from '@/api/params/EqquipmentCategory'
import { useEqquipmentCategoryStore } from '@/stores/params/EqquipmentCategoryStore'
import { storeToRefs } from 'pinia'

const eqquipmentCategoryStore = useEqquipmentCategoryStore()
const { categoryEdit, groups } = storeToRefs(eqquipmentCategoryStore)

const form = reactive(categoryEdit)
const router = useRouter()
const route = useRoute()
const formRef = ref(null)

const id = computed(() => route.params.id)

const onClose = () => {
  router.push({ name: 'params-work-equipment-categories' })
}

const onSubmit = async (values: EqquipmentCategory) => {
  await eqquipmentCategoryStore.save(values)
  onClose()
}

watch(id, (id) => {
  if (id) {
    eqquipmentCategoryStore.getById(parseInt(id as string))
  } else {
    eqquipmentCategoryStore.add()
  }
}, { immediate: true })

</script>

<template>
  <div>
    <twice-ui-dialog
      :show="true"
      title="Arbeitsmittelkategorie hinzufügen"
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
            <div class="col-span-8">
              <twice-ui-select
                label="Arbeitsmittelgruppe"
                :options="groups"
                rules="required"
                name="eqquipment_group_id"
              />
            </div>
            <div class="col-span-16">
              <twice-ui-input
                label="Bezeichnung"
                rules="required"
                name="name"
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
