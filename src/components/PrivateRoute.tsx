import { Navigate } from "react-router-dom";
import isAutheticated from "../hooks/authHook";
import { useLogin } from "../hooks/loginHook";


export default function PrivateRoute({children} : {children : React.ReactNode}){
    const validate = isAutheticated()
    const {setLoginData} = useLogin()
    if(!validate){
        return<Navigate to='/login' replace/>
    }
    setLoginData({
        email:'',
        password:''
    })
    return <>{children}</>
}