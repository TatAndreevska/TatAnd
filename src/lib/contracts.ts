export const MEMBER_ROLES = ['customer_user','polypak_reviewer','polypak_approver','polypak_admin'] as const
export type MemberRole = typeof MEMBER_ROLES[number]
export const REQUEST_STATUSES = ['draft','submitted','under_review','approved','issued','closed'] as const
export type RequestStatus = typeof REQUEST_STATUSES[number]
export const CUSTOMER_ROLES = ['manufacturer','distributor','importer','product_packer_filler','brand_owner','retailer','final_professional_user','other','unknown'] as const
export type CustomerRole=typeof CUSTOMER_ROLES[number]
export const MARKET_SCOPES = ['eu','eea','eu_eea','outside_eu_eea','unknown'] as const
export type MarketScope=typeof MARKET_SCOPES[number]
export const FOOD_CONTACT_STATUSES = ['yes','no','unknown'] as const
export type TriState='yes'|'no'|'unknown'
export const TRISTATE_STATUSES = ['yes','no','unknown'] as const
export const COMPOSTABILITY_TYPES = ['industrial','home','both','not_specified'] as const
export type CompostabilityType=typeof COMPOSTABILITY_TYPES[number]
export const ROLE_BASES = ['customer_declared','polypak_documented','not_confirmed'] as const
export const DOCUMENT_TYPES=['technical_data_product_specification','ppwr_supplier_technical_information_statement'] as const
export type DocumentType=typeof DOCUMENT_TYPES[number]

export const MATERIAL_CODES=['ldpe_virgin','ldpe_pcr','hdpe_virgin','hdpe_pcr','industrial_compostable','home_compostable','unsupported_other'] as const
export type MaterialCode=typeof MATERIAL_CODES[number]
export const PRODUCT_COMPOSTABILITY_TYPES=['industrial','home','both','not_applicable'] as const
export type ProductCompostabilityType=typeof PRODUCT_COMPOSTABILITY_TYPES[number]
export const PRINT_POSITIONS=['not_applicable','non_food_contact_side','food_contact_side','unknown'] as const
export type PrintPosition=typeof PRINT_POSITIONS[number]
export const PRINT_COVERAGE_CLASSES=['not_applicable','marking_minimal','partial','high_full','unknown'] as const
export type PrintCoverageClass=typeof PRINT_COVERAGE_CLASSES[number]

export type Profile={profile_id:string;email:string|null;full_name:string|null;preferred_language:string;status:'active'|'inactive'}
export type Membership={organization_id:string;profile_id:string;member_role:MemberRole;status:'active'|'inactive'}
export type DocumentationRequest={request_id:string;owner_organization_id:string;request_number:string|null;request_status:RequestStatus;customer_reference:string|null;product_description:string;intended_use:string;customer_role:CustomerRole;market_scope:MarketScope;preferred_document_language:'cs'|'en';linked_product_id:string|null;submitted_at:string|null;updated_at:string}
export type RequestDraft={customer_reference:string;product_description:string;width_text:string;length_text:string;thickness_text:string;other_dimensions_text:string;intended_use:string;food_contact_status:TriState;customer_role:CustomerRole;printing_status:TriState;pcr_claim_requested:boolean;requested_pcr_percent:number|null;compostability_claim_requested:boolean;compostability_type_requested:CompostabilityType|null;reusable_status:TriState;market_scope:MarketScope;target_countries:string[];documentation_requested:DocumentType[];customer_comments:string;preferred_document_language:'cs'|'en';confirmation_accepted:boolean;role_basis:'customer_declared'|'polypak_documented'|'not_confirmed';customer_own_name_or_trademark:TriState;customer_modifies_packaging_compliance:TriState;customer_microenterprise_status:TriState}

export type ProductVersionDraft={
 product_name:string;product_type:string;width_mm:number|null;length_mm:number|null;thickness_microns:number|null;gusset_mm:number|null;tolerance_text:string;primary_material:string;material_structure:string;contains_recycled_plastic:boolean;pcr_percent:number|null;colour:string;layer_structure:string;printed:boolean;print_colours:number|null;print_reference:string;intended_use:string;traceability_method:string;material_code:MaterialCode;biobased_claim:boolean;biobased_content_percent:number|null;compostable_claim:boolean;compostability_type:ProductCompostabilityType;print_food_contact_position:PrintPosition;ink_system_reference:string;print_coverage_class:PrintCoverageClass;estimated_print_coverage_percent:number|null
}
