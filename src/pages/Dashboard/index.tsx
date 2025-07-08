import { useNavigate} from "react-router-dom"
import styles from './styles.module.scss'
import type { User } from "../../types/loginTypes"

export default function Dashboard(){
    const navigate = useNavigate()
    const userToken = JSON.parse(localStorage.getItem('authToken') || '[]')
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find((user: User) => user.token === userToken)
    console.log(user)
    const handleLogout = () => {
        localStorage.removeItem("authToken")
        navigate('/login')
    }

    return(
        <>
        <h1>Dashboard</h1>
        <div className={styles.dashboard}>
            <h2>Hello {user.name}</h2>
            <h2>Your email is: {user.email}</h2>
            <button onClick={handleLogout}><h2>Logout</h2></button>
            <button><h2>Change Email</h2></button>
            <button><h2>Change Password</h2></button>
        </div>
        </>
    )
}