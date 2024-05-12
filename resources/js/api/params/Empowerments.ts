import { useAxios } from '@/composables/useAxios'
import { type Meta } from '@/types/'

const { axios } = useAxios(true)

export interface Empowerment {
  id: number | null
  name: string
  shortName: string
  description: string
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

export const getAllEmpowerment = async (page: number = 1): Promise<EmpowermentWithMeta> => {
  const { empowerments } = await axios.$get('api/settings/empowerments', { page }) as ResponseWithMeta
  const { meta, data } = empowerments
  return { meta, data }
}

export const findEmpowermentById = async (id: number): Promise<Response> => {
  const { empowerment } = await axios.$get(`/api/settings/empowerments/${id}`) as unknown as Response
  return { empowerment }
}

export const saveEmpowerment = async (payload: Empowerment) => {
  console.log('saveEmpowerment', payload)
  await axios.$post('/api/settings/empowerments', { empowerment: payload })
}
