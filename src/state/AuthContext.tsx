import { createContext, useContext, useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import type { Membership, Profile } from '../lib/contracts'

type Org = { organization_id:string; organization_type:'polypak'|'customer'; legal_name:string; country_code:string; status:'active'|'inactive' }
type AuthState = { session:Session|null; profile:Profile|null; membership:Membership|null; organization:Org|null; loading:boolean; error:string|null }
const Ctx=createContext<AuthState>({session:null,profile:null,membership:null,organization:null,loading:true,error:null})

async function resolveContext(session:Session|null){
 if(!session) return {profile:null,membership:null,organization:null,error:null}
 const uid=session.user.id
 const {data:profile,error:pErr}=await supabase.from('profiles').select('profile_id,email,full_name,preferred_language,status').eq('profile_id',uid).single()
 if(pErr||!profile||profile.status!=='active') return {profile:null,membership:null,organization:null,error:'Active user profile not available.'}
 const {data:membership,error:mErr}=await supabase.from('organization_members').select('organization_id,profile_id,member_role,status').eq('profile_id',uid).eq('status','active').single()
 if(mErr||!membership) return {profile, membership:null,organization:null,error:'Active organization membership not available.'}
 const {data:organization,error:oErr}=await supabase.from('organizations').select('organization_id,organization_type,legal_name,country_code,status').eq('organization_id',membership.organization_id).eq('status','active').single()
 if(oErr||!organization) return {profile,membership,organization:null,error:'Active organization not available.'}
 return {profile:profile as Profile,membership:membership as Membership,organization:organization as Org,error:null}
}

export function AuthProvider({children}:{children:React.ReactNode}){
 const [state,setState]=useState<AuthState>({session:null,profile:null,membership:null,organization:null,loading:true,error:null})
 useEffect(()=>{let live=true
  const load=async(session:Session|null)=>{const c=await resolveContext(session); if(live)setState({session,...c,loading:false})}
  supabase.auth.getSession().then(({data})=>load(data.session))
  const {data:sub}=supabase.auth.onAuthStateChange((_event,session)=>load(session))
  return()=>{live=false;sub.subscription.unsubscribe()}
 },[])
 return <Ctx.Provider value={state}>{children}</Ctx.Provider>
}
export const useAuth=()=>useContext(Ctx)
