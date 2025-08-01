import { motion } from "framer-motion"
import styles from "../pages/Dashboard/styles.module.scss"
import { useTransactions } from "../contexts/TransactionContext/TransactionContext";


type CloseModal = {
    closeModal: () => void
}

export default function ShowTransactionModal({closeModal}: CloseModal){
    const {transactions, removeTransaction} = useTransactions() 

    return(
        <motion.section className={styles.insertTransactionSection}
        initial={{opacity: 0, scale: 0.2}}
        animate={{opacity: 1, scale: 1}}
        exit={{ scale: 0.2, opacity: 0 }}
        transition={{duration: 0.2, ease: "easeInOut"}}>
             <div className={styles.transactionList}>
                {transactions.length === 0 ? (
                    <p>Você ainda não possui transações registradas.</p>
                ) : (
                        transactions.map((transaction, index) => (
                            <div key={index} className={styles.transactionItem}>
                                <h4>Origem:{transaction.origin}</h4>
                                <h4>Valor: R$ {Number(transaction.value).toFixed(2)}</h4>
                                <h4>Tipo: {transaction.type === 'entry' ? 'entry' : 'exit'}</h4>
                                <button onClick={() => removeTransaction(transaction)}><h3>Remove</h3></button>
                            </div>
                        ))
                 
                )}
            </div>
            <button onClick={closeModal}><h3>Close</h3></button>
        </motion.section>
    )
}