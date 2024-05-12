import { type Meta } from '@/types/'

export interface IAaul {
  token: string
}

export interface Country {
  name: string
}

export interface Profile {
  country: Country
  street: string
  zip: string,
  city: string
  phone: string
}

export interface User {
  id: number
  email: string
  last_name: string
  first_name: string
  avatar_url: string
  created_at: string
  company: string
  full_name: string
  initials: string
  reverse_full_name: string
}

export interface UsersResponse {
  users: User[]
  meta: Meta
  user: User
}

export interface Log {
  id: number,
  event: string,
  entry: string,
  created_at: string,
  uid: number
}

export interface InquiryStatsDetails {
  uid: number
  month: number,
  year: number,
  counts: number
}

export interface Pool {
  id: number
  name: string
  is_pool: boolean
}
export interface Pools {
  id: number
  can_share: boolean
  can_take: boolean
  pool: Pool
}

export interface InquiryStats {
  [key: number]: InquiryStatsDetails
}

export interface UserWithDetails {
  user: User,
  logs: Log[]
  inquiryStats: InquiryStats[]
  bookingStats: InquiryStats[]
  pools: Pools[]
}

export interface UsersWithMeta {
  users: User[],
  meta: Meta
}
