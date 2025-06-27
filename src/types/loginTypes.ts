export type Login = {
    email: string,
    password: string,
}

export type Data = {
    loginData: Login
    setLoginData: React.Dispatch<React.SetStateAction<Login>>
}