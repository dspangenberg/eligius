import { useAxios } from '@/composables/useAxios'
import { type Meta } from '@/types/'
import { type BusinessSegment } from '@/api/params/BusinessSegment'

const { axios } = useAxios(true)
const baseUrl: string = '/api/params/storage-locations'

export interface StorageLocation {
  id?: number | null
  name: string
  business_segment_id?: number
  segment?: BusinessSegment
}

export interface StorageLocationWithMeta {
  data: StorageLocation[],
  meta: Meta
  segments: BusinessSegment[]

}

export interface ResponseWithMeta {
  locations: StorageLocationWithMeta
  segments: BusinessSegment[]
}

export interface Response {
  location: StorageLocation
}

export const getAllStorageLocations = async (page: number = 1): Promise<StorageLocationWithMeta> => {
  const { locations, segments } = await axios.$get(baseUrl, { page }) as ResponseWithMeta
  const { meta, data } = locations
  return { meta, data, segments }
}

export const findStorageLocationById = async (id: number): Promise<Response> => {
  const { location } = await axios.$get(`${baseUrl}/${id}`) as unknown as Response
  return { location }
}

export const createStorageLocation = async (payload: StorageLocation) => {
  await axios.$post(baseUrl, payload)
}

export const updateStorageLocation = async (payload: StorageLocation) => {
  await axios.$put(`${baseUrl}/${payload.id}`, payload)
}
