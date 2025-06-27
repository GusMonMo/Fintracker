import styles from './styles.module.scss'
import { useLogin } from '../../hooks/loginHook'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

type FormatErrors = {
    email?: string
    password?: string
}

export default function LoginPage(){
    const {loginData, setLoginData} = useLogin()
    const [formatErrors, setFormatErrors] = useState<FormatErrors>({})
    const [noUser, setNoUser] = useState<string>('')
    const navigate = useNavigate()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setLoginData((prev) => ({
            ...prev,
            [name]: value.trim()
        }))
        }

        const formValidate = () =>{
        const passData = Number(loginData.password)
        const errors : FormatErrors = {}
        if (!loginData.email){
            errors.email = "Email is required."
        } else if (!/\S+@\S+\.\S+/.test(loginData.email)){
            errors.email = "Email format is incorrect."
        }
        if (isNaN(passData)){
            errors.password = "Password must be only numbers."
        } else if (!passData){
            errors.password = "Password is required."
        }
        return errors
        }

    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newFormErrors = formValidate()

        if (Object.keys(newFormErrors).length > 0){
            setFormatErrors(newFormErrors)
            return
        }

        console.log('Login Data :', loginData)

        setFormatErrors({})

        if(loginData.email === "admin@admin.com" && loginData.password === "123"){
            localStorage.setItem("authToken", "ADM")
            navigate('/dashboard')
        } else if (localStorage.getItem("authToken") !== "ADM"){
            setLoginData({email:'', password:''})
            setNoUser('User not find.')
        }

    }
    return (
        <>
        <h1>Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
            <label>EMAIL</label>
            <input type="text" name='email' value={loginData.email} onChange={handleChange}/>
            <label>PASSWORD</label>
            <input type="text" name='password'value={loginData.password} onChange={handleChange}/>
            <label className={styles.errors}>{formatErrors.email}<br/>{formatErrors.password}</label>
            <label>{noUser}</label>
            <button type='submit'>Login</button>
        </form>
        </>
    )
}