import { useAxios } from '@/composables/useAxios'
import { type Meta } from '@/types/'
import { type EqquipmentGroup } from './EqquipmentGroup'

const { axios } = useAxios(true)
const baseUrl: string = '/api/params/eqquipment-categories'

export interface EqquipmentCategory {
  id?: number | null
  name: string
  eqquipment_group_id: number
  group?: EqquipmentGroup
}

export interface EqquipmentCategoryWithMeta {
  data: EqquipmentCategory[],
  groups: EqquipmentGroup[]
  meta: Meta
}

export interface ResponseWithMeta {
  categories: EqquipmentCategoryWithMeta
  groups: EqquipmentGroup[]
}

export interface Response {
  category: EqquipmentCategory
}

export const getAllEqquipmentCategories = async (page: number = 1): Promise<EqquipmentCategoryWithMeta> => {
  const { categories, groups } = await axios.$get(baseUrl, { page }) as ResponseWithMeta
  const { meta, data } = categories
  return { meta, data, groups }
}

export const findEqquipmentCategoryById = async (id: number): Promise<Response> => {
  const { category } = await axios.$get(`${baseUrl}/${id}`) as unknown as Response
  return { category }
}

export const createEqquipmentCategory = async (payload: EqquipmentCategory) => {
  await axios.$post(baseUrl, payload)
}

export const updateEqquipmentCategory = async (payload: EqquipmentCategory) => {
  await axios.$put(`${baseUrl}/${payload.id}`, payload)
}
