import postgres from 'postgres';
import { unstable_noStore as noStore } from 'next/cache';
const sql = postgres(process.env.POSTGRES_URL, { ssl : "require" })

export async function getTransactions() {
    noStore(); 
    try {
        const transactions = await sql`
            SELECT 
                transactions.id, 
                transactions.trxid, 
                transactions.date, 
                transactions.customer, 
                transactions.item, 
                transactions.amount,
                transactions.qty,
                transactions.status,
                users.name as customername,
                products.name as productname
            FROM transactions 
            INNER JOIN products 
            ON transactions.item = products.id 
            INNER JOIN users
            ON transactions.customer = users.id
            ORDER BY transactions.date DESC
        `;
        return transactions;
    } catch (error) {
        console.log(error);
    };
}