import Layout from "@/app/ui/components/Layout";
import { getTransactions } from "@/app/lib/data/transaksi";
import History from "@/app/ui/admin/History";

export default async function Page() {
    const transaksi = await getTransactions();
    return (
        <Layout>
            <History transaksi={transaksi}></History>
        </Layout>
    )
}