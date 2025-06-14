import Layout from "@/app/ui/components/Layout";
import Products from "@/app/ui/admin/Products";
import { getProducts } from "@/app/lib/data/product";

export default async function Page() {
    const products = await getProducts();
    return (
        <Layout>
            <Products product={products}/>
        </Layout>
    )
}