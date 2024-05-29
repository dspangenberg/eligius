import { useAxios } from '@/composables/useAxios'
import { type Meta } from '@/types/'

const { axios } = useAxios(true)
const baseUrl: string = '/api/params/empowerments'

export interface Empowerment {
  id?: number | null
  name: string
  abbreviation?: string
}

export interface EmpowermentWithMeta {
  data: Empowerment[],
  meta: Meta
}

export interface ResponseWithMeta {
  empowerments: EmpowermentWithMeta
}

export interface Response {
  empowerment: Empowerment
}

export const getAllEmpowerments = async (page: number = 1): Promise<EmpowermentWithMeta> => {
  const { empowerments } = await axios.$get(baseUrl, { page }) as ResponseWithMeta
  const { meta, data } = empowerments
  return { meta, data }
}

export const findEmpowermentById = async (id: number): Promise<Response> => {
  const { empowerment } = await axios.$get(`${baseUrl}/${id}`) as unknown as Response
  return { empowerment }
}

export const createEmpowerment = async (payload: Empowerment) => {
  await axios.$post(baseUrl, payload)
}

export const updateEmpowerment= async (payload: Empowerment) => {
  await axios.$put(`${baseUrl}/${payload.id}`, payload)
}
