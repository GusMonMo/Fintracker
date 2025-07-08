import { Navigate, useLocation } from "react-router-dom"
import type { User } from "../types/loginTypes"

export default function LoggedVerify({children} : {children : React.ReactNode}){
    const Token = JSON.parse(localStorage.getItem('authToken') || '[]')
    const location = useLocation()
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const isLogged = users.some((user: User) => user.token === Token)
    if(isLogged && location.pathname !== '/dashboard'){
        return <Navigate to='/dashboard' replace/>
    } 
    return <>{children}</>
}