import { createContext, useContext, useEffect, useState } from "react";
import type { Transaction } from "../../types/transactionTypes";


interface TransactionContextType {
    transactions: Transaction[]
    addTransaction: (newest : Transaction) => void
}
const transactionContext = createContext<TransactionContextType | null>(null)

export const TransactionProvider = ({children}: {children:React.ReactNode}) => {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const authToken = localStorage.getItem("authToken")!

    useEffect(() =>{
        const data = JSON.parse(localStorage.getItem("transactions") || "{}")
        const userTransactions = data[authToken] || []
        setTransactions(userTransactions)
    },[authToken])

    const addTransaction = (newest: Transaction) => {
        const data = JSON.parse(localStorage.getItem("transactions") || "{}")
        const userTransactions = data[authToken] || []

        const updated = [...userTransactions, newest]
        data[authToken] = updated
        localStorage.setItem("transactions", JSON.stringify(data))
        setTransactions(updated)
    }

    return(
        <transactionContext.Provider value={{transactions, addTransaction}}>
            {children}
        </transactionContext.Provider>
    )
}

export const useTransactions = () => {
    const ctx = useContext(transactionContext);
    if (!ctx) throw new Error("useTransactions must be used within a TransactionsProvider");
    return ctx;
};