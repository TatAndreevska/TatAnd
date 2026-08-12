import {supabase} from './supabase'

export type EvidenceType='supplier_tds'|'supplier_declaration'|'laboratory_report'|'migration_report'|'certificate'|'drawing_specification'|'customer_attachment'|'internal_record'|'other'
export type EvidenceStatus='unreviewed'|'verified'|'rejected'|'expired'

export async function listEvidence(){const {data,error}=await supabase.from('evidence_records').select('evidence_id,related_request_id,related_product_id,related_product_version_id,evidence_type,title,issuer,reference_number,issue_date,valid_until,storage_path,sha256,verification_status,verified_at,created_at').order('created_at',{ascending:false});if(error)throw error;return data||[]}
export async function listEvidenceScopeOptions(){
 const [{data:requests,error:rErr},{data:products,error:pErr},{data:versions,error:vErr}]=await Promise.all([
  supabase.from('documentation_requests').select('request_id,request_number,product_description,linked_product_id').in('request_status',['submitted','under_review','approved','issued']).order('updated_at',{ascending:false}),
  supabase.from('products').select('product_id,sku_code,product_name,status').eq('status','active').order('product_name'),
  supabase.from('product_versions').select('product_version_id,product_id,version_no,product_name,approved_at').order('created_at',{ascending:false})
 ])
 if(rErr)throw rErr;if(pErr)throw pErr;if(vErr)throw vErr;return {requests:requests||[],products:products||[],versions:versions||[]}
}

export async function uploadEvidence(args:{file:File;creatorProfileId:string;relatedRequestId?:string|null;relatedProductId?:string|null;relatedProductVersionId?:string|null;evidenceType:EvidenceType;title:string;issuer?:string;referenceNumber?:string;issueDate?:string;validUntil?:string}){
 const safeName=args.file.name.replace(/[^a-zA-Z0-9._-]+/g,'_');const storagePath=`evidence/${crypto.randomUUID()}/${safeName}`
 const up=await supabase.storage.from('evidence-private').upload(storagePath,args.file,{upsert:false});if(up.error)throw up.error
 const payload={related_request_id:args.relatedRequestId||null,related_product_id:args.relatedProductId||null,related_product_version_id:args.relatedProductVersionId||null,evidence_type:args.evidenceType,title:args.title.trim(),issuer:args.issuer?.trim()||null,reference_number:args.referenceNumber?.trim()||null,issue_date:args.issueDate||null,valid_until:args.validUntil||null,storage_path:storagePath,created_by_profile_id:args.creatorProfileId}
 const {data,error}=await supabase.from('evidence_records').insert(payload).select('evidence_id,verification_status,storage_path').single()
 if(error){await supabase.storage.from('evidence-private').remove([storagePath]);throw error}return data
}

export async function setEvidenceStatus(evidenceId:string,status:Exclude<EvidenceStatus,'verified'>){const {data,error}=await supabase.rpc('set_evidence_review_status',{target_evidence_id:evidenceId,target_status:status});if(error)throw error;return data}
export async function verifyEvidenceFile(evidenceId:string){const {data,error}=await supabase.functions.invoke('verify-evidence-file-v2',{body:{evidence_id:evidenceId}});if(error)throw error;if(data?.error)throw new Error(data.error);return data}
