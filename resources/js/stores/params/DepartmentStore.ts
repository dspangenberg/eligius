import { defineStore, acceptHMRUpdate } from 'pinia'
import { getAllDepartments, findDepartmentById, saveDepartment, type Department } from '@/api/params/Departments'
import { reactive, ref, type Ref } from 'vue'
import { type Meta } from '@/types/'

export const useDepartmentStore = defineStore('settings-department', () => {
  const departments: Ref<Department[] | null> = ref([])
  const department: Ref<Department | null> = ref(null)
  const departmentEdit: Ref<Department | null> = ref(null)
  const meta: Ref<Meta | null> = ref(null)
  const isLoading: Ref<boolean> = ref(false)

  const newRecordTemplate = reactive({
    id: null,
    name: '',
    description: ''
  })

  const store = useDepartmentStore()

  const getAll = async (page: number = 1) => {
    isLoading.value = true
    const { data, meta } = await getAllDepartments(page)
    store.$patch(state => {
      state.departments = data
      state.meta = meta
    })
    isLoading.value = false
  }

  const add = () => {
    departmentEdit.value = newRecordTemplate
  }

  const getById = async (id: number) => {
    isLoading.value = true
    const { department: apiDepartment } = await findDepartmentById(id)

    store.$patch(state => {
      state.department = apiDepartment
      state.departmentEdit = apiDepartment
      state.isLoading = false
    })
  }

  const save = async (value: Department) => {
    await saveDepartment(value)
  }

  return {
    isLoading,
    department,
    departmentEdit,
    departments,
    newRecordTemplate,
    meta,
    add,
    getAll,
    getById,
    save
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDepartmentStore, import.meta.hot))
}
