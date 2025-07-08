import { Navigate} from "react-router-dom";
import type { User } from "../types/loginTypes";

export default function PrivateRoute({children} : {children : React.ReactNode}){
    const Token = JSON.parse(localStorage.getItem('authToken') || '[]')
    const Users: User[] = JSON.parse(localStorage.getItem('users') || '[]')
    const UserToken = Users.some(user => user.token === Token)
    if(!UserToken){
        return <Navigate to='/login' replace/>
    } 

    return <>{children}</>
}