import { useAxios } from '@/composables/useAxios'
import { type Meta } from '@/types/'

const { axios } = useAxios(true)
const baseUrl: string = '/api/params/eqquipment-groups'

export interface EqquipmentGroup {
  id?: number | null
  name: string
  inventory_number_prefix?: string
  inventory_current_number?: number
}

export interface EqquipmentGroupWithMeta {
  data: EqquipmentGroup[],
  meta: Meta
}

export interface ResponseWithMeta {
  groups: EqquipmentGroupWithMeta
}

export interface Response {
  group: EqquipmentGroup
}

export const getAllEqquipmentGroup = async (page: number = 1): Promise<EqquipmentGroupWithMeta> => {
  const { groups } = await axios.$get(baseUrl, { page }) as ResponseWithMeta
  const { meta, data } = groups
  return { meta, data }
}

export const findEqquipmentGroupById = async (id: number): Promise<Response> => {
  const { group } = await axios.$get(`${baseUrl}/${id}`) as unknown as Response
  return { group }
}

export const createEqquipmentGroup= async (payload: EqquipmentGroup) => {
  await axios.$post(baseUrl, payload)
}

export const updateEqquipmentGroup = async (payload: EqquipmentGroup) => {
  await axios.$put(`${baseUrl}/${payload.id}`, payload)
}
