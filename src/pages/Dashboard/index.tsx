import { useNavigate} from "react-router-dom"
import styles from './styles.module.scss'
import type { User } from "../../types/loginTypes"
import { useEffect, useState} from "react"
import EditUserModal from "../../components/editUserModal"
import InsertTransactionModal from "../../components/insertTransactionModal"
import { AnimatePresence } from "framer-motion"
import TransactionsPieCharts from "../../components/TransactionsPieCharts"
import { useTransactions } from "../../contexts/TransactionContext/TransactionContext"


export default function Dashboard(){
    const navigate = useNavigate()
    const userToken : string = localStorage.getItem('authToken') || ''
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]')
    const loggedUser = users.find(user => user.token === userToken) || null
    const [activeModal, setActiveModal] = useState<"edit" | "transaction" | null>(null)

    const {transactions} = useTransactions()

    useEffect(() =>{
        if (!userToken) return;
        const raw = localStorage.getItem("transactions");
        if (!raw) return;
        const allTransactions = JSON.parse(raw);
        const doUsuario = Array.isArray(allTransactions[userToken]) ? allTransactions[userToken] : [];
        setCurrentUser(loggedUser)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("authToken")
        navigate('/login')
    }

    const handleShowEditModal = () => {
        setActiveModal("edit")
    }

    const handleShowTransactionModal = () => {
        setActiveModal("transaction")
    }

    const handleShowTransactions = () => {
        console.log("transactions:", transactions || [])
    }

    return(
        <>  
              {activeModal !== null && <div className="overlay"/>}
        <header>   
                <h1>Dashboard</h1>
                <h2>Hello {currentUser?.name}</h2>
                <h2>Your email is: {currentUser?.email}</h2>
        </header>
        
        <main className={styles.dashMain}>
            <AnimatePresence>   
                {activeModal === "edit" && <EditUserModal closeModal={() => setActiveModal(null)}/>}
            </AnimatePresence>

            <AnimatePresence>
                {activeModal === "transaction" && <InsertTransactionModal closeModal={() => setActiveModal(null)} />}
            </AnimatePresence>

            <TransactionsPieCharts transactions={transactions} />
            
            <section className={styles.actions}>
                <button onClick={handleShowEditModal}><h3>Edit User</h3></button>
                <button onClick={handleShowTransactionModal}><h3>Insert Transaction</h3></button>
                <button onClick={handleLogout}><h3>Logout</h3></button>
                <button onClick={handleShowTransactions}><h3>Show Transactions</h3></button>
            </section>
        </main>
        </>
    )
}