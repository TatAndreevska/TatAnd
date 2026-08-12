import { useState } from 'react'
import { Boxes, FileText, LayoutDashboard, LogOut, Menu, ShieldCheck, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../state/AuthContext'

export function AppShell({children}:{children:React.ReactNode}){
 const [open,setOpen]=useState(false); const {profile,membership,organization}=useAuth(); const polypak=membership?.member_role!=='customer_user'
 const nav=<><div className="brand"><span className="brand-blue">POLY</span><span className="brand-green">PAK</span><small>Documentation Portal</small></div><nav><NavLink to="/" end onClick={()=>setOpen(false)}><LayoutDashboard size={18}/>Dashboard</NavLink><NavLink to="/requests" onClick={()=>setOpen(false)}><FileText size={18}/>Documentation Requests</NavLink>{polypak&&<><NavLink to="/products" onClick={()=>setOpen(false)}><Boxes size={18}/>Products</NavLink><NavLink to="/evidence" onClick={()=>setOpen(false)}><ShieldCheck size={18}/>Evidence</NavLink></>}</nav><div className="sidebar-user"><strong>{profile?.full_name||profile?.email}</strong><span>{organization?.legal_name}</span><span>{membership?.member_role.replaceAll('_',' ')}</span><button className="ghost" onClick={()=>supabase.auth.signOut()}><LogOut size={17}/>Sign out</button></div></>
 return <div className="app-layout"><aside className="sidebar desktop-sidebar">{nav}</aside>{open&&<div className="mobile-overlay" onClick={()=>setOpen(false)}><aside className="sidebar mobile-sidebar" onClick={e=>e.stopPropagation()}><button className="icon-button close" onClick={()=>setOpen(false)}><X/></button>{nav}</aside></div>}<main><header className="mobile-header"><button className="icon-button" onClick={()=>setOpen(true)}><Menu/></button><div className="mobile-brand"><b>POLY</b><strong>PAK</strong></div></header><div className="content">{children}</div></main></div>
}
