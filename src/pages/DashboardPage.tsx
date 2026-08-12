import { useEffect,useState } from 'react'
import { ArrowRight, FileCheck2, FileClock, FilePenLine, SearchCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../state/AuthContext'

type Counts={draft:number;submitted:number;review:number;approvedIssued:number}
export function DashboardPage(){const {profile,membership}=useAuth();const [c,setC]=useState<Counts>({draft:0,submitted:0,review:0,approvedIssued:0})
 useEffect(()=>{(async()=>{const {data}=await supabase.from('documentation_requests').select('request_status');const rows=data||[];setC({draft:rows.filter(x=>x.request_status==='draft').length,submitted:rows.filter(x=>x.request_status==='submitted').length,review:rows.filter(x=>x.request_status==='under_review').length,approvedIssued:rows.filter(x=>['approved','issued'].includes(x.request_status)).length})})()},[])
 const customer=membership?.member_role==='customer_user'
 return <><div className="page-heading"><div><div className="eyebrow">OVERVIEW</div><h1>Good day{profile?.full_name?`, ${profile.full_name.split(' ')[0]}`:''}.</h1><p>{customer?'Track your documentation requests and issued records.':'Review documentation workflows requiring Polypak action.'}</p></div><Link className="primary button-link" to="/requests">View requests <ArrowRight size={17}/></Link></div><div className="metric-grid"><Metric icon={<FilePenLine/>} label="Draft" value={c.draft}/><Metric icon={<FileClock/>} label="Submitted" value={c.submitted}/><Metric icon={<SearchCheck/>} label="Under review" value={c.review}/><Metric icon={<FileCheck2/>} label="Approved / issued" value={c.approvedIssued}/></div><section className="panel"><div><div className="eyebrow">WORKSPACE</div><h2>Documentation Requests</h2><p className="muted">Authoritative statuses come directly from the Polypak backend workflow.</p></div><Link to="/requests" className="secondary button-link">Open workspace</Link></section></>}
function Metric({icon,label,value}:{icon:React.ReactNode;label:string;value:number}){return <div className="metric"><div className="metric-icon">{icon}</div><span>{label}</span><strong>{value}</strong></div>}
