import { defineStore, acceptHMRUpdate } from 'pinia'
import { getAllEqquipmentGroup, findEqquipmentGroupById, createEqquipmentGroup, updateEqquipmentGroup } from '@/api/params/EqquipmentGroup'
import { reactive, ref, type Ref } from 'vue'
import type { EqquipmentGroup } from '@/api/params/EqquipmentGroup'
import { type Meta } from '@/types/'

export const useEqquipmentGroupStore = defineStore('params-eqquipment-group', () => {
  const groups: Ref<EqquipmentGroup[] | null> = ref([])
  const group: Ref<EqquipmentGroup | null> = ref(null)
  const groupEdit: Ref<EqquipmentGroup | null> = ref(null)
  const meta: Ref<Meta | null> = ref(null)
  const isLoading: Ref<boolean> = ref(false)

  const store = useEqquipmentGroupStore()

  const newRecordTemplate = reactive({
    name: '',
    inventory_number_prefix: '',
    inventory_current_number: 0
  })

  const getAll = async (page: number = 1) => {
    isLoading.value = true
    const { data, meta } = await getAllEqquipmentGroup(page)
    store.$patch(state => {
      state.groups = data
      state.meta = meta
    })
    isLoading.value = false
  }

  const add = () => {
    store.$patch(state => {
      state.group = newRecordTemplate
      state.groupEdit = newRecordTemplate
    })
  }

  const getById = async (id: number) => {
    isLoading.value = true
    const { group: record } = await findEqquipmentGroupById(id)

    store.$patch(state => {
      state.group = record
      state.groupEdit = record
      state.isLoading = false
    })
  }

  const save = async (value: EqquipmentGroup) => {
    if (!value.id) {
      await createEqquipmentGroup(value)
    } else {
      await updateEqquipmentGroup(value)
    }
    groupEdit.value = null
    await getAll()
  }

  return {
    isLoading,
    group,
    groupEdit,
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
  import.meta.hot.accept(acceptHMRUpdate(useEqquipmentGroupStore, import.meta.hot))
}
