import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { addProduct, getProducts, deleteProduct } from '@/app/lib/data/product';

export async function POST(req) {
    try {
        const formData = await req.formData();
        const id = formData.get('id');
        const product = formData.get('product');
        const category = formData.get('category');
        const stock = formData.get('stock');
        const price = formData.get('price');
        const imageFile = formData.get('image');

        if (!id || !product || !category || !stock || !price) {
            return NextResponse.json({
                message: 'Semua field harus diisi',
            }, { status: 400 });
        }
        
        if (!imageFile) {
            return NextResponse.json({
                message: 'File gambar harus diupload',
            }, { status: 400 });
        }

        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const timestamp = Date.now();
        const filename = `${timestamp}-${imageFile.name}`;
        
        // Upload to Vercel Blob
        const blob = await put(filename, imageFile, {
            access: 'public',
        });
        
       // Prepare data for database
        const productData = {
            body: {
                id,
                product,
                category,
                stock: parseInt(stock),
                price: parseFloat(price),
                imageUrl: blob.url
            }
        };

        // Save to database
        const response = await addProduct(productData);

        if (response) {
            return NextResponse.json({
                status: 201,
                message: 'Produk berhasil ditambahkan',
                data: productData
            }, { status: 201 });
        } else {
            return NextResponse.json({
                status: 500,
                message: 'Gagal menambahkan produk',
            }, { status: 500 });
        }
    } catch (error) {
        console.log(error);
    };
    
}

export async function GET() {
    try {
        const products = await getProducts();
        return NextResponse.json({
            status: 200,
            message: 'Berhasil mengambil data produk',
            data: products
        }, { status: 200 });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({
            message: 'Gagal mengambil data produk',
        }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const url = new URL(req.url).searchParams;
        const id = String(url.get("id"));
        
        if (!id) {
            return NextResponse.json({
                message: 'id produk tidak valid',
            }, { status: 400 });
        }

        const response = await deleteProduct(id);

        if (response) {
            return NextResponse.json({
                status: 200,
                message: 'Produk berhasil dihapus',
            }, { status: 200 });
        } else {
            return NextResponse.json({
                status: 500,
                message: 'Gagal menghapus produk',
            }, { status: 500 });
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json({
            message: 'Gagal menghapus produk',
        }, { status: 500 });
    }
}