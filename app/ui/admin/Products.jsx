"use client"; 
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { isAuthenticated } from "@/app/lib/services/auth.service";
import { getCurrentUser, isAdmin } from "@/app/lib/services/auth.service";
import { ProductsSkeletonLoader } from "@/app/ui/components/ProductSkeleton"

export default function Products(props) {
    const { product } = props;
    const products = product || [];
    const router = useRouter();
    const [user, setUser] = useState(null);
    // const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            if (!isAuthenticated()) {
                router.push('/');
                return;
            }
            const currentUser = getCurrentUser();
            if (!currentUser || !isAdmin()) {
                router.push('/');
                return;
            }

            setUser(currentUser);

            setLoading(false);
        };
        checkAuth();

        // const fetchProducts = async () => {
        //     try {
        //         const response = await product;

        //         // Tambahkan delay kecil untuk menghindari glitch visual
        //         setTimeout(() => {
        //             setProducts(response || []);
        //             setLoading(false);
        //         }, 300);
        //     } catch (error) {
        //         console.error("Gagal mengambil data produk:", error);
        //         setLoading(false);
        //     }
        // };
        // fetchProducts();
    }, [router]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <Link href="/admin" className="italic text-blue-500">&#x21d0; Kembali</Link>
                    <h2 className="text-2xl font-bold mb-4">Daftar Produk</h2>
                    <Link href="/admin/products/create"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        Tambah Produk
                    </Link>

                    {loading ? (
                        <ProductsSkeletonLoader />
                    ) : (
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8 transition-all duration-300">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Nama Produk</th>
                                        <th scope="col" className="px-6 py-3">Katalog</th>
                                        <th scope="col" className="px-6 py-3">Stok</th>
                                        <th scope="col" className="px-6 py-3">Harga</th>
                                        <th scope="col" className="px-6 py-3">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.id}
                                            className="odd:bg-white even:bg-gray-50  border-b  border-gray-200">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {product.name}
                                            </th>
                                            <td className="px-6 py-4">{product.category}</td>
                                            <td className="px-6 py-4">{product.stock}</td>
                                            <td className="px-6 py-4">Rp. {product.price}</td>
                                            <td className="px-6 py-4">
                                                <Link href={`/admin/products/edit/${product.id}`} className="font-medium text-blue-600 hover:underline">Edit</Link>
                                                <button
                                                    className="ml-4 font-medium text-red-600 hover:underline"
                                                    onClick={() => handleToDelete(product.id)}
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}