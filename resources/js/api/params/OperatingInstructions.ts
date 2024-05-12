import { useAxios } from '@/composables/useAxios'
import { type Meta } from '@/types/'

const { axios } = useAxios(true)
const baseUrl: string = '/api/settings/operating-instructions'

export interface OperatingInstruction {
  id: number | null
  number: string
  name: string
  description: string
}

export interface InstructionsWithMeta {
  data: OperatingInstruction[],
  meta: Meta
}

export interface ResponseWithMeta {
  instructions: InstructionsWithMeta
}

export interface Response {
  instruction: OperatingInstruction
}

export const getAllOperatingInstruction = async (page: number = 1): Promise<InstructionsWithMeta> => {
  const { instructions } = await axios.$get(baseUrl, { page }) as ResponseWithMeta
  const { meta, data } = instructions
  return { meta, data }
}

export const findOperatingInstructionById = async (id: number): Promise<Response> => {
  const { instruction } = await axios.$get(`${baseUrl}/${id}`) as unknown as Response
  return { instruction }
}

export const saveOperationInstruction = async (payload: OperatingInstruction) => {
  await axios.$post(baseUrl, { instruction: payload })
}
