import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './state/AuthContext'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { RequestsPage } from './pages/RequestsPage'
import { NewRequestPage } from './pages/NewRequestPage'
import { RequestDetailPage } from './pages/RequestDetailPage'
import { ProductsPage } from './pages/ProductsPage'
import { NewProductPage } from './pages/NewProductPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { NewProductVersionPage } from './pages/NewProductVersionPage'
import { EvidencePage } from './pages/EvidencePage'
import { DocumentsPage } from './pages/DocumentsPage'
import { DocumentDetailPage } from './pages/DocumentDetailPage'
import { PackagesPage } from './pages/PackagesPage'
import { AppShell } from './components/AppShell'
import { PolypakRoute } from './components/PolypakRoute'

const internal=(node:React.ReactNode)=><PolypakRoute>{node}</PolypakRoute>

export default function App(){
 const {session,loading,error}=useAuth()
 if(loading) return <div className="center-screen">Loading portal…</div>
 if(!session) return <LoginPage />
 if(error) return <div className="center-screen"><div className="error-card"><h2>Access unavailable</h2><p>{error}</p></div></div>
 return <AppShell><Routes>
  <Route path="/" element={<DashboardPage/>}/>
  <Route path="/requests" element={<RequestsPage/>}/>
  <Route path="/requests/new" element={<NewRequestPage/>}/>
  <Route path="/requests/:requestId" element={<RequestDetailPage/>}/>
  <Route path="/products" element={internal(<ProductsPage/>)}/>
  <Route path="/products/new" element={internal(<NewProductPage/>)}/>
  <Route path="/products/:productId" element={internal(<ProductDetailPage/>)}/>
  <Route path="/products/:productId/versions/new" element={internal(<NewProductVersionPage/>)}/>
  <Route path="/evidence" element={internal(<EvidencePage/>)}/>
  <Route path="/documents" element={internal(<DocumentsPage/>)}/>
  <Route path="/documents/:documentId" element={internal(<DocumentDetailPage/>)}/>
  <Route path="/packages" element={<PackagesPage/>}/>
  <Route path="*" element={<Navigate to="/" replace/>}/>
 </Routes></AppShell>
}
