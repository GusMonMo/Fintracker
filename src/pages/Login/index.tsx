import styles from '../Login/styles.module.scss'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import type { User } from '../../types/loginTypes'
import { Link, useNavigate } from 'react-router-dom'

type FormData = {
    email: string
    password: string
}

export default function LoginPage(){
    const [formData, setFormData] = useState<FormData>({email: '', password: ''})
    const [formatErrors, setFormatErrors] = useState<Partial<FormData>>({})
    const [noUser, setNoUser] = useState<string>('')
    const navigate = useNavigate()
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setFormData((prev) => ({
            ...prev,
            [name]: value.trim()
        }))
        }

        const formValidate = () =>{
        const passData = Number(formData.password)
        const errors : Partial<FormData> = {}

        if (!formData.email){
            errors.email = "Email is required."
        } else if (!/\S+@\S+\.\S+/.test(formData.email)){
            errors.email = "Email format is incorrect."
        }
        
        if (isNaN(passData)){
            errors.password = "Password must be only numbers."
        } else if (!passData){
            errors.password = "Password is required."
        }

        return errors
        }

        const loginValidate = () =>{
            const users: User[] = JSON.parse(localStorage.getItem('users') || '[]')
            const userData = users.find(user => user.email === formData.email)
            const userToken = userData?.token
            
            if(userData?.email === undefined){
                setNoUser('User not found')
                return
            } else if(!(userData.password === formData.password)) {
                setNoUser('Password does not match')
                return
            }
            localStorage.setItem('authToken', JSON.stringify(userToken))
            navigate('/dashboard')
        }
    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newFormErrors = formValidate()

        if (Object.keys(newFormErrors).length > 0){
            setFormatErrors(newFormErrors)
            return
        }
        setFormatErrors({})
        loginValidate()
        
    }
    return (
        <>
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className='fintracker'/>
            <h1>Login</h1>
            <div className='inputContainer'>
                <label htmlFor="email"><h4>EMAIL</h4></label>
                <input id="email"  type="text" name='email' value={formData.email} onChange={handleChange}/>
            </div>
            <div className='inputContainer'>
                <label htmlFor='password'><h4>PASSWORD</h4></label>
                <input id='password' type="text" name='password'value={formData.password} onChange={handleChange}/>
            </div>
            <div className='errors'>
                <h5>{formatErrors.email}</h5>
                <h5>{formatErrors.password}</h5>
            </div>
            <label className={styles.label}>{noUser}</label>
            <div className='buttonContainer'>
                <button><Link className={styles.link} to='/register'><h3>Register</h3></Link></button>
                <button type='submit'><h3>Submit</h3></button>
            </div>
        </form>
        </>
    )
}