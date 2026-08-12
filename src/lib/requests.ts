import { supabase } from './supabase'
import type { RequestDraft } from './contracts'

export async function createRequest(ownerOrganizationId:string,creatorProfileId:string,draft:RequestDraft){
 const payload={owner_organization_id:ownerOrganizationId,created_by_profile_id:creatorProfileId,request_status:'draft',...normalizeDraft(draft)}
 const {data,error}=await supabase.from('documentation_requests').insert(payload).select('request_id,request_number,request_status').single()
 if(error) throw error
 return data
}
export async function saveDraft(requestId:string,draft:RequestDraft|null){
 if(!draft) throw new Error('Draft data is not available.')
 const {data,error}=await supabase.rpc('update_draft_documentation_request',{target_request_id:requestId,patch:normalizeDraft(draft)})
 if(error) throw error
 return data
}
export async function submitRequest(requestId:string){
 const {data,error}=await supabase.rpc('submit_documentation_request',{target_request_id:requestId})
 if(error) throw error
 return data
}
function normalizeDraft(d:RequestDraft){return {...d,customer_reference:empty(d.customer_reference),width_text:empty(d.width_text),length_text:empty(d.length_text),thickness_text:empty(d.thickness_text),other_dimensions_text:empty(d.other_dimensions_text),customer_comments:empty(d.customer_comments),requested_pcr_percent:d.pcr_claim_requested?d.requested_pcr_percent:null,compostability_type_requested:d.compostability_claim_requested?d.compostability_type_requested:null}}
const empty=(v:string)=>v.trim()===''?null:v.trim()
