import Layout from "@/app/ui/components/Layout";
import { getProducts } from "@/app/lib/data/product";
import Katalog from "@/app/ui/customer/Katalog";
import { katalogProduct } from '@/app/lib/data/katalog';

export default async function Page() {
	const products = await getProducts();

	return (
		<Layout>
			<Katalog products={products} katalog={katalogProduct}/>
		</Layout>
	)
}