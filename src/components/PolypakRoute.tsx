import {Navigate} from 'react-router-dom'
import {useAuth} from '../state/AuthContext'

export function PolypakRoute({children}:{children:React.ReactNode}){
 const {membership}=useAuth()
 if(!membership) return <Navigate to="/" replace/>
 if(membership.member_role==='customer_user') return <Navigate to="/" replace/>
 return <>{children}</>
}
