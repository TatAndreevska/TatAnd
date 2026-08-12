import { FormEvent, useState } from 'react'
import { supabase } from '../lib/supabase'

export function LoginPage(){
 const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [busy,setBusy]=useState(false); const [error,setError]=useState('')
 async function submit(e:FormEvent){e.preventDefault();setBusy(true);setError('');const {error}=await supabase.auth.signInWithPassword({email,password});if(error)setError(error.message);setBusy(false)}
 async function reset(){if(!email){setError('Enter your email address first.');return}setBusy(true);const {error}=await supabase.auth.resetPasswordForEmail(email,{redirectTo:window.location.origin});setBusy(false);setError(error?error.message:'Password reset email sent.')}
 return <div className="login-page"><section className="login-brand-panel"><div className="hero-mark"><span>POLY</span><b>PAK</b></div><h1>Documentation, structured for confidence.</h1><p>Secure customer and regulatory documentation workspace.</p></section><section className="login-form-panel"><form className="login-card" onSubmit={submit}><div className="eyebrow">POLYPAK DOCUMENTATION PORTAL</div><h2>Welcome back</h2><p className="muted">Sign in to manage documentation requests and issued records.</p><label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="email"/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required autoComplete="current-password"/></label>{error&&<div className="form-message">{error}</div>}<button className="primary" disabled={busy}>{busy?'Signing in…':'Sign in'}</button><button type="button" className="link-button" onClick={reset} disabled={busy}>Forgot password?</button></form></section></div>
}
