import { 
    PieChart, 
    Pie, 
    Cell, 
    Legend, 
    ResponsiveContainer 
} from "recharts";
import styles from "../pages/Dashboard/styles.module.scss"
import type { Transaction } from "../types/transactionTypes";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

type TransactionsPieChartsProps = {
    transactions: Transaction[]
}

export default function TransactionsPieCharts({transactions}: TransactionsPieChartsProps){
    const resume = transactions.reduce<{ entry: number, exit: number }>((acc, transaction) => {
        if (transaction.type === "entrada"){
            acc.entry += Number(transaction.value)
        } else {
            acc.exit += Number(transaction.value)
        }
        return acc
    }, { entry: 0, exit: 0 })

    const data = [
        { name: "Entrada", value: resume.entry },
        { name: "Saída", value: resume.exit }
    ]

    return(
        <div className={styles.pieChart}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie 
                    data={data} 
                    dataKey="value" 
                    nameKey="name" 
                    cx="50%" cy="50%" 
                    outerRadius="70%" 
                    fill="#8884d8" label>
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    
                    <Legend />
                </PieChart>  
            </ResponsiveContainer>   
        </div>
    )
}