import { defineStore, acceptHMRUpdate } from 'pinia'
import { getAllStorageLocations, findStorageLocationById, createStorageLocation, updateStorageLocation } from '@/api/params/StorageLocation'
import { reactive, ref, type Ref } from 'vue'
import type { StorageLocation } from '@/api/params/StorageLocation'
import { type Meta } from '@/types/'

export const useStorageLocationStore = defineStore('params-storage-location', () => {
  const locations: Ref<StorageLocation[] | null> = ref([])
  const location: Ref<StorageLocation | null> = ref(null)
  const locationEdit: Ref<StorageLocation | null> = ref(null)
  const meta: Ref<Meta | null> = ref(null)
  const isLoading: Ref<boolean> = ref(false)

  const store = useStorageLocationStore()

  const newRecordTemplate = reactive({
    name: ''
  })

  const getAll = async (page: number = 1) => {
    isLoading.value = true
    const { data, meta } = await getAllStorageLocations(page)
    store.$patch(state => {
      state.locations = data
      state.meta = meta
    })
    isLoading.value = false
  }

  const add = () => {
    store.$patch(state => {
      state.location = newRecordTemplate
      state.locationEdit = newRecordTemplate
    })
  }

  const getById = async (id: number) => {
    isLoading.value = true
    const { location: record } = await findStorageLocationById(id)

    store.$patch(state => {
      state.location = record
      state.locationEdit = record
      state.isLoading = false
    })
  }

  const save = async (value: StorageLocation) => {
    if (!value.id) {
      await createStorageLocation(value)
    } else {
      await updateStorageLocation(value)
    }
    locationEdit.value = null
    await getAll()
  }

  return {
    isLoading,
    location,
    locationEdit,
    locations,
    meta,
    newRecordTemplate,
    add,
    getAll,
    getById,
    save
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStorageLocationStore, import.meta.hot))
}
