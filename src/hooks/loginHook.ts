import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext/context";


export function useLogin(){
    const context = useContext(LoginContext)
    if(!context){
        throw new Error('useLogin must be used inside LoginProvider')
    }
    return context
}