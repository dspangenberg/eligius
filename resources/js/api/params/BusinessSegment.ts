import { useAxios } from '@/composables/useAxios'
import { type Meta } from '@/types/'

const { axios } = useAxios(true)
const baseUrl: string = '/api/params/business-segments'

export interface BusinessSegment {
  id?: number | null
  name: string
}

export interface BusinessSegmentWithMeta {
  data: BusinessSegment[],
  meta: Meta
}

export interface ResponseWithMeta {
  segments: BusinessSegmentWithMeta
}

export interface Response {
  segment: BusinessSegment
}

export const getAllBusinessSegments = async (page: number = 1): Promise<BusinessSegmentWithMeta> => {
  const { segments } = await axios.$get(baseUrl, { page }) as ResponseWithMeta
  const { meta, data } = segments
  return { meta, data }
}

export const findBusinessSegmentById = async (id: number): Promise<Response> => {
  const { segment } = await axios.$get(`${baseUrl}/${id}`) as unknown as Response
  return { segment }
}

export const createBusinessSegment = async (payload: BusinessSegment) => {
  await axios.$post(baseUrl, payload)
}

export const updateBusinessSegment = async (payload: BusinessSegment) => {
  await axios.$put(`${baseUrl}/${payload.id}`, payload)
}
