import { defineStore, acceptHMRUpdate } from 'pinia'
import { getAllEqquipmentCategories, findEqquipmentCategoryById, createEqquipmentCategory, updateEqquipmentCategory } from '@/api/params/EqquipmentCategory'
import { reactive, ref, type Ref } from 'vue'
import type { EqquipmentCategory } from '@/api/params/EqquipmentCategory'
import type { EqquipmentGroup } from '@/api/params/EqquipmentGroup'

import { type Meta } from '@/types/'

export const useEqquipmentCategoryStore = defineStore('params-eqquipment-category', () => {
  const categories: Ref<EqquipmentCategory[] | null> = ref([])
  const category: Ref<EqquipmentCategory | null> = ref(null)
  const categoryEdit: Ref<EqquipmentCategory | null> = ref(null)
  const groups: Ref<EqquipmentGroup[] | null> = ref([])

  const meta: Ref<Meta | null> = ref(null)
  const isLoading: Ref<boolean> = ref(false)

  const store = useEqquipmentCategoryStore()

  const newRecordTemplate = reactive({
    name: '',
    eqquipment_group_id: 0
  })

  const getAll = async (page: number = 1) => {
    isLoading.value = true
    const { data, meta, groups: records } = await getAllEqquipmentCategories(page)
    store.$patch(state => {
      state.categories = data
      state.meta = meta
      state.groups = records
    })
    isLoading.value = false
  }

  const add = () => {
    store.$patch(state => {
      state.category = newRecordTemplate
      state.categoryEdit = newRecordTemplate
    })
  }

  const getById = async (id: number) => {
    isLoading.value = true
    const { category: record } = await findEqquipmentCategoryById(id)

    store.$patch(state => {
      state.category = record
      state.categoryEdit = record
      state.isLoading = false
    })
  }

  const save = async (value: EqquipmentCategory) => {
    if (!value.id) {
      await createEqquipmentCategory(value)
    } else {
      await updateEqquipmentCategory(value)
    }
    categoryEdit.value = null
    await getAll()
  }

  return {
    isLoading,
    category,
    categoryEdit,
    categories,
    groups,
    meta,
    newRecordTemplate,
    add,
    getAll,
    getById,
    save
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEqquipmentCategoryStore, import.meta.hot))
}
