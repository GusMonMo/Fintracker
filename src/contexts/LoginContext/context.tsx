import { createContext, useState } from "react";
import type { Login, Data } from "../../types/loginTypes";

export const LoginContext = createContext<Data | undefined>(undefined)

export function LoginProvider({children} : {children : React.ReactNode}) {
    const [loginData, setLoginData] = useState<Login>({
        email:'',
        password: '',
    })
    return(
        <LoginContext.Provider value={{loginData, setLoginData}}>
            {children}
        </LoginContext.Provider>
    )
}