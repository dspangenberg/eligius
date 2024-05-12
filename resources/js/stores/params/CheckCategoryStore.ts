import { defineStore, acceptHMRUpdate } from 'pinia'
import { getAll as apiGetAll, findById as apiFindById, save as apiSave } from '@/api/params/CheckCategories'
import { ref, type Ref } from 'vue'
import type { CheckCategory } from '@/api/params/CheckCategories'
import { type Meta } from '@/types/'

export const useSettingsCheckCategoryStore = defineStore('settings-check-category', () => {
  const categories: Ref<CheckCategory[] | null> = ref([])
  const category: Ref<CheckCategory | null> = ref(null)
  const categoryEdit: Ref<CheckCategory | null> = ref(null)
  const meta: Ref<Meta | null> = ref(null)
  const isLoading: Ref<boolean> = ref(false)

  const getAll = async () => {
    isLoading.value = true
    const { categories: apiCategories, meta: apiMeta } = await apiGetAll()

    categories.value = apiCategories
    meta.value = apiMeta
  }

  const add = () => {
    categoryEdit.value = {
      id: null,
      name: '',
      description: '',
      interval: 360,
      parent_id: 0,
      icon: '',
      textColor: '',
      bgColor: ''
    }
  }

  const getById = async (id: number) => {
    isLoading.value = true
    const { category: apiCategory } = await apiFindById(id)
    category.value = apiCategory
    categoryEdit.value = apiCategory
    isLoading.value = false
  }

  const save = async () => {
    if (categoryEdit.value === null) return
    await apiSave(categoryEdit.value)
  }

  return {
    isLoading,
    category,
    categories,
    meta,
    add,
    getAll,
    getById,
    save
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettingsCheckCategoryStore, import.meta.hot))
}
