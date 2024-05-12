import $axios from '@/utils/Axios'
import { Env } from '@/utils/Env'
import { useGlobalStore } from '@/stores/GlobalStore'

export function useAxios (useAuth: boolean = true) {
  const baseUrl: string = Env('API_URL')
  console.log(baseUrl)

  $axios.setBaseURL(baseUrl)

  if (useAuth) {
    const globalStore = useGlobalStore()
    const token = globalStore.getToken
    if (token) {
      $axios.setToken(token, 'Bearer')
    }
  }

  return { axios: $axios }
}
