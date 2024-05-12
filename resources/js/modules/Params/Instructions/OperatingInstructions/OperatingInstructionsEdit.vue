<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { type OperatingInstruction } from '@/api/params/OperatingInstructions'
import { useOperatingInstructionStore } from '@/stores/params/OperatingInstructionStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { Button } from '@/components/shdn/ui/button'

const router = useRouter()

const operatingInstructionStore = useOperatingInstructionStore()
const { instructionEdit, newRecordTemplate } = storeToRefs(operatingInstructionStore)

const form = reactive(newRecordTemplate)
const formRef = ref()
const errors = computed(() => formRef.value?.errors || null)

const onSubmit = (values: OperatingInstruction) => {
  operatingInstructionStore.save(values)
  router.push({
    name: 'settings-instructions-operating-instructions'
  })
}

const onCancel = () => {
  router.push({
    name: 'settings-instructions-operating-instructions'
  })
}

onMounted(() => {
  formRef.value.setValues(instructionEdit.value)
})

</script>

<template>
  <twice-ui-form-section
    headline="Betriebsanweisung bearbeiten"
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
          <div class="col-span-3">
            <twice-ui-input
              name="number"
              label="Interne Nr."
              rules="required"
            />
          </div>
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
      <Button>Speichernx</Button>
    </template>
  </twice-ui-form-section>
</template>
