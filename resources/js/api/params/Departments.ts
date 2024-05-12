import { useAxios } from '@/composables/useAxios'
import { type Meta } from '@/types/'

const { axios } = useAxios(true)
const baseUrl: string = '/api/settings/departments'

export interface Department {
  id: number | null
  name: string
  description: string
}

export interface DepartmentWithMeta {
  data: Department[],
  meta: Meta
}

export interface ResponseWithMeta {
  departments: DepartmentWithMeta
}

export interface Response {
  department: Department
}

export const getAllDepartments = async (page: number = 1): Promise<DepartmentWithMeta> => {
  const { departments } = await axios.$get(baseUrl, { page }) as ResponseWithMeta
  const { meta, data } = departments
  return { meta, data }
}

export const findDepartmentById = async (id: number): Promise<Response> => {
  const { department } = await axios.$get(`${baseUrl}/${id}`) as unknown as Response
  return { department }
}

export const saveDepartment = async (payload: Department) => {
  await axios.$post(baseUrl, { department: payload })
}
