import { motion } from "framer-motion"
import styles from "../pages/Dashboard/styles.module.scss"
import { useForm } from "react-hook-form";
import type { Transaction } from "../types/transactionTypes";
import { useTransactions } from "../contexts/TransactionContext/TransactionContext";


type InsertTransactionModalProps = {
    closeModal: () => void
}

export default function InsertTransactionModal({closeModal}: InsertTransactionModalProps){
    const { register, handleSubmit, formState: { errors } } = useForm<Transaction>();
    const userToken : string = localStorage.getItem('authToken') || ''
    const {addTransaction} = useTransactions()

    function onSubmit(data: Transaction) {

        if (!userToken){
            console.error("User not logged in")
            return
        }
        addTransaction(data)
        closeModal()
    }

    return(
        <motion.section className={styles.insertTransactionSection}
        initial={{opacity: 0, scale: 0.2}}
        animate={{opacity: 1, scale: 1}}
        exit={{ scale: 0.2, opacity: 0 }}
        transition={{duration: 0.2, ease: "easeInOut"}}>
            <h1>Insert Transaction</h1>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                
                <section className={styles.formSubSection}>
                    <label><h2>Origem</h2></label>
                    <input {...register("origin", { required: true })} />
                    {errors.origin && <span>Campo obrigatório</span>}
                </section>

                <section className={styles.formSubSection}>
                <label><h2>Valor</h2></label>
                <input type="text" {...register("value", { 
                    required: true,  
                    validate: (value) =>
                        !isNaN(Number(value)),})} />
                {errors.value && <span>Campo obrigatório</span>}
                </section>

                <section className={styles.formSubSection}>
                    <label><h2>Tipo</h2></label>
                    <select {...register("type", { required: true })}>
                        <option value="">Selecione</option>
                        <option value="entrada">Entrada</option>
                        <option value="saida">Saída</option>
                    </select>
                    {errors.type && <span>Selecione o tipo</span>}
                </section>

                <button type="submit"> <h3>Registrar Transação</h3></button>
                
            </form>

            <button onClick={closeModal}><h3>Close</h3></button>
        </motion.section>
    )
}