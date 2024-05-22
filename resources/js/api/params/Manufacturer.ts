import { useAxios } from '@/composables/useAxios'
import { type Meta } from '@/types/'

const { axios } = useAxios(true)
const baseUrl: string = '/api/params/manufacturers'

export interface Manufacturer {
  id?: number | null
  name: string
}

export interface ManufacturerWithMeta {
  data: Manufacturer[],
  meta: Meta
}

export interface ResponseWithMeta {
  manufacturers: ManufacturerWithMeta
}

export interface Response {
  manufacturer: Manufacturer
}

export const getAllManufacturer = async (page: number = 1): Promise<ManufacturerWithMeta> => {
  const { manufacturers } = await axios.$get(baseUrl, { page }) as ResponseWithMeta
  const { meta, data } = manufacturers
  return { meta, data }
}

export const findManufacturerById = async (id: number): Promise<Response> => {
  const { manufacturer } = await axios.$get(`${baseUrl}/${id}`) as unknown as Response
  return { manufacturer }
}

export const createManufacturer = async (payload: Manufacturer) => {
  await axios.$post(baseUrl, payload)
}

export const updateManufacturer = async (payload: Manufacturer) => {
  await axios.$put(`${baseUrl}/${payload.id}`, payload)
}
