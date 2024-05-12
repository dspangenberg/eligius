import { defineStore, acceptHMRUpdate } from 'pinia'
import { getAllEmpowerment, findEmpowermentById, saveEmpowerment } from '@/api/params/Empowerments'
import { reactive, ref, type Ref } from 'vue'
import type { Empowerment } from '@/api/params/Empowerments'
import { type Meta } from '@/types/'

export const useEmpowermentStore = defineStore('settings-empowerment', () => {
  const empowerments: Ref<Empowerment[] | null> = ref([])
  const empowerment: Ref<Empowerment | null> = ref(null)
  const empowermentEdit: Ref<Empowerment | null> = ref(null)
  const meta: Ref<Meta | null> = ref(null)
  const isLoading: Ref<boolean> = ref(false)

  const newRecordTemplate = reactive({
    id: null,
    shortName: '',
    name: '',
    description: ''
  })

  const store = useEmpowermentStore()

  const getAll = async (page: number = 1) => {
    isLoading.value = true
    const { data, meta } = await getAllEmpowerment(page)
    store.$patch(state => {
      state.empowerments = data
      state.meta = meta
    })
    isLoading.value = false
  }

  const add = () => {
    empowermentEdit.value = newRecordTemplate
  }

  const getById = async (id: number) => {
    isLoading.value = true
    const { empowerment: apiEmpowerment } = await findEmpowermentById(id)

    store.$patch(state => {
      state.empowerment = apiEmpowerment
      state.empowermentEdit = apiEmpowerment
      state.isLoading = false
    })
  }

  const save = async (value: Empowerment) => {
    console.log('saveEmpowerment', value)
    await saveEmpowerment(value)
  }

  return {
    isLoading,
    empowerment,
    empowermentEdit,
    empowerments,
    newRecordTemplate,
    meta,
    add,
    getAll,
    getById,
    save
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEmpowermentStore, import.meta.hot))
}
