<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { type Empowerment } from '@/api/params/Empowerments'
import { useDepartmentStore } from '@/stores/params/DepartmentStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()

const departmentStore = useDepartmentStore()
const { departmentEdit, newRecordTemplate } = storeToRefs(departmentStore)

const form = reactive(newRecordTemplate)
const formRef = ref()
const errors = computed(() => formRef.value?.errors || null)

const onCancel = () => {
  router.push({
    name: 'settings-departments'
  })
}

const onSubmit = (values: Empowerment) => {
  departmentStore.save(values)
  onCancel()
}

onMounted(() => {
  formRef.value.setValues(departmentEdit.value)
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
