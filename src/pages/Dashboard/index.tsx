import { useNavigate} from "react-router-dom"
import styles from './styles.module.scss'
import type { User } from "../../types/loginTypes"
import { useEffect, useState} from "react"
import EditUserModal from "../../components/editUserModal"
import { AnimatePresence } from "framer-motion"

export default function Dashboard(){
    const navigate = useNavigate()
    const userToken : string = JSON.parse(localStorage.getItem('authToken') || '[]')
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]')
    const loggedUser = users.find(user => user.token === userToken) || null
    const [showModal, setShowModal] = useState(false)
    
    useEffect(() =>{
        setCurrentUser(loggedUser)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("authToken")
        navigate('/login')
    }

    const handleShowModal = () => {
        setShowModal(prev => !prev)
    }

    

    return(
        <>  
              {showModal && <div className="overlay"/>}
        <header>   
                <h1>Dashboard</h1>
                <h2>Hello {currentUser?.name}</h2>
                <h2>Your email is: {currentUser?.email}</h2>
        </header>
        
        <main>
            <AnimatePresence>   
                {showModal && <EditUserModal closeModal={() => setShowModal(false)}/>}
            </AnimatePresence>
            <div className="dashGraph">
                dasdas
            </div>
            
            <section className={styles.actions}>
                <button onClick={handleShowModal}><h3>Edit User</h3></button>
                <button onClick={handleLogout}><h3>Logout</h3></button>
            </section>
        </main>
        </>
    )
}