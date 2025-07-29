import { useState, type ChangeEvent, type FormEvent } from "react"
import type { User } from "../types/loginTypes"
import styles from '../pages/Dashboard/styles.module.scss'
import { motion } from "framer-motion"

type EditUserModalProps = {
    closeModal: () => void
}

export default function EditUserModal({closeModal}: EditUserModalProps){
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]')
    const userToken : string = localStorage.getItem('authToken') || ''
    const [userData, setUserData] = useState<Partial<User>>({})
    const [formError, setFormError] = useState<Partial<User>>({})

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
        setUserData({})
        setFormError({})
    }



    return(
        <motion.section className={styles.formSection}
        initial={{opacity: 0, scale: 0.2}}
        animate={{opacity: 1, scale: 1}}
        exit={{ scale: 0.2, opacity: 0 }}
        transition={{duration: 0.2, ease: "easeInOut"}}
        >
            <h1>Edit User</h1>
            
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
            <button onClick={closeModal}><h3>Close</h3></button>
        </motion.section>
    )
}