import { useNavigate} from "react-router-dom"
import styles from './styles.module.scss'
import type { User } from "../../types/loginTypes"
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"

export default function Dashboard(){
    const navigate = useNavigate()
    const userToken = JSON.parse(localStorage.getItem('authToken') || '[]')
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]')
    const loggedUser = users.find(user => user.token === userToken) || null
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [userData, setUserData] = useState<Partial<User>>({})
    const [formError, setFormError] = useState<Partial<User>>({})
    useEffect(() =>{
        setCurrentUser(loggedUser)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("authToken")
        navigate('/login')
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setUserData((prev) => ({
            ...prev,
            [name]: value.trim()
        }))
    }

    const formValidate = (field: keyof User, value: string) =>{
        const errors: Partial<User> = {}

        if (field === 'email' && value && (!/\S+@\S+\.\S+/.test(value))){
            errors.email = "Email format is incorrect."
        }
        
        if (field === 'password' && value && isNaN(Number(value))){
            errors.password = "Password must be only numbers."
        } 
        
        return errors
       
    }

    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement
        const field = submitter.name as keyof User
        const value = userData[field]
        if(!value) {
            setFormError({})
            return (
            alert(`Field "${field}" is empty.`)
            
        )}
        const newErrors = formValidate(field, value)

        if (Object.keys(newErrors).length > 0){
            setFormError(newErrors)
            return
        }

        const updateUser = users.map(user => user.token === userToken ? {...user, [field]: value} : user)
        localStorage.setItem('users', JSON.stringify(updateUser))
        setCurrentUser(prev => prev ? {...prev, [field] : value} : prev)
        setUserData({})
        setFormError({})
    }

    return(
        <>
        <header>   
                <h1>Dashboard</h1>
                <h2>Hello {currentUser?.name}</h2>
                <h2>Your email is: {currentUser?.email}</h2>
        </header>
        <main className={styles.body}>
            <section className={styles.formSection}>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <label htmlFor="nameDash"><h4>Change Name</h4></label>
                    <input id="nameDash" type="text" name="name" value={userData.name || ''} onChange={handleChange}/>
                    <label className={styles.error}><h4>{formError.name}</h4></label>
                    <button className={styles.button} type="submit" name="name"><h3>Submit</h3></button>
                </form>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <label htmlFor="emailDash"><h4>Change Email</h4></label>
                    <input id="emailDash" type="text" name="email" value={userData.email || ''} onChange={handleChange}/>
                    <label className={styles.error}><h4>{formError.email}</h4></label>
                    <button className={styles.button} type="submit" name="email"><h3>Submit</h3></button>
                </form>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <label htmlFor="passwordDash"><h4>Change Password</h4></label>
                    <input id="passwordDash" type="text" name="password" value={userData.password || ''} onChange={handleChange}/>
                    <label className={styles.error}><h4>{formError.password}</h4></label>
                    <button className={styles.button} type="submit" name="password"><h3>Submit</h3></button>
                </form>
            </section>
            <section className="actions">
                <button onClick={handleLogout}><h3>Logout</h3></button>
            </section>
        </main>
        </>
    )
}