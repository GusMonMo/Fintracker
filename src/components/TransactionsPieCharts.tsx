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

    const resume = transactions.reduce<{ entry: number, exit: number}>((acc, transaction) => {
        if (transaction.type === "entry"){
            acc.entry += Number(transaction.value)
        } else {
            acc.exit += Number(transaction.value)
        }
        return acc
    }, { entry: 0, exit: 0 })

    const entriesData = [
        { name: "Entry", value: resume.entry },
        { name: "Exit", value: resume.exit }
    ]

    const originsMap = new Map<string, number>();

    transactions.forEach(({ origin, value }) => {
        const current = originsMap.get(origin) || 0;
        originsMap.set(origin, current + Number(value));
    });

    const originsData = Array.from(originsMap.entries())
    .map(([name, value]) => ({
    name,
    value
    }));


    const originColorsMap = new Map<string, string>();
    const dynamicColors: string[] = [];

    for (let i = 0; i < originsMap.size; i++) {
    const baseColor = COLORS[i % COLORS.length];
    const dynamicColor = `hsl(${(i * 67) % 360}, 70%, 60%)`;
    dynamicColors.push(baseColor || dynamicColor);
    }

    Array.from(originsMap.keys()).forEach((origin, i) => {
    originColorsMap.set(origin, dynamicColors[i]);
    });



    return(
        <div className={styles.pieChart}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie 
                    data={entriesData} 
                    dataKey="value" 
                    nameKey="name" 
                    cx="50%" cy="50%" 
                    outerRadius="70%" 
                    fill="#8884d8" label>
                        {entriesData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    
                    <Legend />
                </PieChart>  
            </ResponsiveContainer>  

            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie 
                    data={originsData} 
                    dataKey="value" 
                    nameKey="name" 
                    cx="50%" cy="50%" 
                    outerRadius="70%" 
                    fill="#8884d8" label>
                        {originsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} 
                            fill={originColorsMap.get(entry.name) || COLORS[index % COLORS.length]} 
                            />
                        ))}
                    </Pie>
                    <Legend />
                </PieChart>  
            </ResponsiveContainer> 
        </div>
    )
}