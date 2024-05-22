import { defineStore, acceptHMRUpdate } from 'pinia'
import { getAllUsers, findUserById } from '@/api/User'
import { ref, type Ref } from 'vue'
import type { User } from '@/api/User'
import { type Meta } from '@/types/'

export const useUserStore = defineStore('user-store', () => {
  const users: Ref<User[] | null> = ref([])
  const user: Ref<User | null> = ref(null)
  const userEdit: Ref<User | null> = ref(null)
  const meta: Ref<Meta | null> = ref(null)
  const isLoading: Ref<boolean> = ref(false)

  const template = {
    avatar_url: '',
    email: '',
    first_name: '',
    last_name: '',
    password: ''
  }

  const getAll = async () => {
    isLoading.value = true
    const { data: usersData, meta: metaData } = await getAllUsers()
    users.value = usersData
    meta.value = metaData
  }

  const add = () => {
    userEdit.value = template
    user.value = template
  }

  const findById = async (id: number) => {
    isLoading.value = true
    const { user: apiUser } = await findUserById(id)
    user.value = apiUser
    userEdit.value = apiUser
    isLoading.value = false
  }

  const save = async () => {
    if (categoryEdit.value === null) return
    await apiSave(categoryEdit.value)
  }

  return {
    isLoading,
    user,
    userEdit,
    users,
    meta,
    add,
    getAll,
    findById,
    save
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}