<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { type Empowerment } from '@/api/params/Empowerments'
import { useEmpowermentStore } from '@/stores/params/EmpowermentStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()

const empowermentStore = useEmpowermentStore()
const { empowermentEdit, newRecordTemplate } = storeToRefs(empowermentStore)

const form = reactive(newRecordTemplate)
const formRef = ref()
const errors = computed(() => formRef.value?.errors || null)

const onCancel = () => {
  router.push({
    name: 'settings-empowerments'
  })
}

const onSubmit = (values: Empowerment) => {
  empowermentStore.save(values)
  onCancel()
}

onMounted(() => {
  formRef.value.setValues(empowermentEdit.value)
})

</script>

<template>
  <twice-ui-form-section
    headline="Mitarbeiterbefähigungen bearbeiten"
    :errors="errors"
    @submitted="onSubmit"
  >
    <template #form>
      <twice-ui-form
        id="form"
        ref="formRef"
        :initial-values="form"
        @submitted="onSubmit"
      >
        <twice-ui-form-group>
          <div class="col-span-12">
            <twice-ui-input
              name="name"
              label="Titel"
              rules="required"
            />
          </div>
          <div class="col-span-3">
            <twice-ui-input
              name="shortName"
              label="Abkürzung"
            />
          </div>
        </twice-ui-form-group>
        <twice-ui-form-group>
          <div class="col-span-15">
            <twice-ui-input
              type="textarea"
              name="description"
              label="Beschreibung"
            />
          </div>
        </twice-ui-form-group>
      </twice-ui-form>
    </template>
    <template #actions>
      <twice-ui-button
        variant="link"
        @click="onCancel"
      >
        Abbrechen
      </twice-ui-button>
      <twice-ui-button
        variant="primary"
        form="form"
        type="submit"
      >
        Speichern
      </twice-ui-button>
    </template>
  </twice-ui-form-section>
</template>
