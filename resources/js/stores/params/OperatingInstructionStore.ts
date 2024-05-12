import { defineStore, acceptHMRUpdate } from 'pinia'
import { saveOperationInstruction, getAllOperatingInstruction, findOperatingInstructionById } from '@/api/params/OperatingInstructions'
import { reactive, ref, type Ref } from 'vue'
import type { OperatingInstruction } from '@/api/params/OperatingInstructions'
import { type Meta } from '@/types/'

export const useOperatingInstructionStore = defineStore('settings-operating-instruction', () => {
  const instructions: Ref<OperatingInstruction[] | null> = ref([])
  const instruction: Ref<OperatingInstruction | null> = ref(null)
  const instructionEdit: Ref<OperatingInstruction | null> = ref(null)
  const meta: Ref<Meta | null> = ref(null)
  const isLoading: Ref<boolean> = ref(false)

  const store = useOperatingInstructionStore()

  const newRecordTemplate = reactive({
    id: null,
    number: '',
    name: '',
    description: ''
  })

  const getAll = async (page: number = 1) => {
    isLoading.value = true
    const { data, meta } = await getAllOperatingInstruction(page)
    store.$patch(state => {
      state.instructions = data
      state.meta = meta
    })
    isLoading.value = false
  }

  const add = () => {
    instructionEdit.value = newRecordTemplate
  }

  const getById = async (id: number) => {
    isLoading.value = true
    const { instruction: apiInstruction } = await findOperatingInstructionById(id)

    store.$patch(state => {
      console.log(apiInstruction)
      state.instruction = apiInstruction
      state.instructionEdit = apiInstruction
      console.log(state.instructionEdit)
      state.isLoading = false
    })
  }

  const save = async (value: OperatingInstruction) => {
    await saveOperationInstruction(value)
  }

  return {
    isLoading,
    instruction,
    instructionEdit,
    instructions,
    meta,
    newRecordTemplate,
    add,
    getAll,
    getById,
    save
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOperatingInstructionStore, import.meta.hot))
}
