export const MEMBER_ROLES = ['customer_user','polypak_reviewer','polypak_approver','polypak_admin'] as const
export type MemberRole = typeof MEMBER_ROLES[number]

export const REQUEST_STATUSES = ['draft','submitted','under_review','approved','issued','closed'] as const
export type RequestStatus = typeof REQUEST_STATUSES[number]

export const CUSTOMER_ROLES = ['manufacturer','distributor','importer','product_packer_filler','brand_owner','retailer','final_professional_user','other','unknown'] as const
export const MARKET_SCOPES = ['eu','eea','eu_eea','outside_eu_eea','unknown'] as const
export const FOOD_CONTACT_STATUSES = ['yes','no','unknown'] as const
export const TRISTATE_STATUSES = ['yes','no','unknown'] as const
export const COMPOSTABILITY_TYPES = ['industrial','home','both','not_specified'] as const
export const ROLE_BASES = ['customer_declared','polypak_documented','not_confirmed'] as const

export type Profile = {
  profile_id: string
  email: string | null
  full_name: string | null
  preferred_language: string
  status: 'active' | 'inactive'
}

export type Membership = {
  organization_id: string
  profile_id: string
  member_role: MemberRole
  status: 'active' | 'inactive'
}

export type DocumentationRequest = {
  request_id: string
  owner_organization_id: string
  request_number: string | null
  request_status: RequestStatus
  customer_reference: string | null
  product_description: string
  intended_use: string
  customer_role: typeof CUSTOMER_ROLES[number]
  market_scope: typeof MARKET_SCOPES[number]
  preferred_document_language: string
  linked_product_id: string | null
  submitted_at: string | null
  updated_at: string
}
