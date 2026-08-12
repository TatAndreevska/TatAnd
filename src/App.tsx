import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './state/AuthContext'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { RequestsPage } from './pages/RequestsPage'
import { AppShell } from './components/AppShell'

export default function App(){
 const {session,loading,error}=useAuth()
 if(loading) return <div className="center-screen">Loading portal…</div>
 if(!session) return <LoginPage />
 if(error) return <div className="center-screen"><div className="error-card"><h2>Access unavailable</h2><p>{error}</p></div></div>
 return <AppShell><Routes><Route path="/" element={<DashboardPage/>}/><Route path="/requests" element={<RequestsPage/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes></AppShell>
}
