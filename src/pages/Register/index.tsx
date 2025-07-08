import { useState, type ChangeEvent, type FormEvent } from 'react'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import type { User } from '../../types/loginTypes'
export default function RegisterPage(){
    const [formData, setFormData] = useState<User>({name: "", email: "", password: "", token: ''})
    const [error, setError] = useState<Partial<User>>({})

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setFormData((prev) => ({
            ...prev,
            [name]: value.trim()
        }))
    }

    const Validate = () => {
        const passData = Number(formData.password)
        const errors : Partial<User> = {}
        const users : User[] = JSON.parse(localStorage.getItem('users') || '[]')

        if(formData.name.length < 3){
            errors.name = "Name: Minimum of 3 letters is required."
        }

        if (!formData.email){
            errors.email = "Email is required."
        } else if (!/\S+@\S+\.\S+/.test(formData.email)){
            errors.email = "Email format is incorrect."
        } else if (users.some(user => user.email === formData.email)){
            errors.email = "Email already registered"
        }

        if (isNaN(passData)){
            errors.password = "Password must be only numbers."
        } else if (!passData){
            errors.password = "Password is required."
        }

        return errors
    }

    function TokenGenerate(size: number = 20){
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let Token = ''
        for(let i=0; i < size; i++){
            const index = Math.floor(Math.random()* characters.length)
            Token += characters.charAt(index)
        
        }
        return Token
    }

    function SaveUser(form : User){
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]')
        users.push({...form})
        localStorage.setItem('users', JSON.stringify(users))
    }
    const handleSubmit = (event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        const newErrors = Validate()
        const Token = TokenGenerate()
        const UserToken: User = {
            ...formData,
            token: Token
        }

        if(Object.keys(newErrors).length > 0){
            setError(newErrors)
            return
        }

        setError({})
        SaveUser(UserToken)
        setFormData({name: '', email: '', password: '', token: ''})

    }
    return(
        <>
        <form className={styles.form} onSubmit={handleSubmit}>
            <h1>Register</h1>
            <label htmlFor="name">NAME</label>
            <input id="email"  type="text" name='name' value={formData.name} onChange={handleChange}/>
            <label htmlFor="email">EMAIL</label>
            <input id="email"  type="text" name='email' value={formData.email} onChange={handleChange}/>
            <label htmlFor='password'>PASSWORD</label>
            <input id='password' type="text" name='password'value={formData.password} onChange={handleChange}/>
            <label className={styles.errors}>{error.name}<br/>{error.email}<br/>{error.password}</label>
            <button type='submit'>Register</button>
        </form>
        <button className={styles.link}><Link to='/login'><h3>Login Page</h3></Link></button>
        
        </>
    )
}