import { defineStore, acceptHMRUpdate } from 'pinia'
import { getAllFilings, findFilingById, createFiling, updateFiling } from '@/api/params/Filing'
import { reactive, ref, type Ref } from 'vue'
import type { Filing } from '@/api/params/Filing'
import { type Meta } from '@/types/'

export const useFilingStore = defineStore('params-filings', () => {
  const filings: Ref<Filing[] | null> = ref([])
  const filing: Ref<Filing | null> = ref(null)
  const filingEdit: Ref<Filing | null> = ref(null)
  const meta: Ref<Meta | null> = ref(null)
  const isLoading: Ref<boolean> = ref(false)

  const store = useFilingStore()

  const newRecordTemplate = reactive({
    name: ''
  })

  const getAll = async (page: number = 1) => {
    isLoading.value = true
    const { data, meta } = await getAllFilings(page)
    store.$patch(state => {
      state.filings = data
      state.meta = meta
    })
    isLoading.value = false
  }

  const add = () => {
    store.$patch(state => {
      state.filing = newRecordTemplate
      state.filingEdit = newRecordTemplate
    })
  }

  const getById = async (id: number) => {
    isLoading.value = true
    const { filing: record } = await findFilingById(id)

    store.$patch(state => {
      state.filing = record
      state.filingEdit = record
      state.isLoading = false
    })
  }

  const save = async (value: Filing) => {
    if (!value.id) {
      await createFiling(value)
    } else {
      await updateFiling(value)
    }
    filingEdit.value = null
    await getAll()
  }

  return {
    isLoading,
    filing,
    filingEdit,
    filings,
    meta,
    newRecordTemplate,
    add,
    getAll,
    getById,
    save
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFilingStore, import.meta.hot))
}
