import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from "path";
import { addProduct } from '@/app/lib/data/product';

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
        
        if (!imageFile || imageFile.size === 0) {
            return NextResponse.json({
                message: 'File gambar harus diupload',
            }, { status: 400 });
        }

        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generate unique filename
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(imageFile.name);
        const filename = uniqueSuffix + fileExtension;

        // Create upload directory if not exists
        const uploadDir = path.join(process.cwd(), "public/images");
        const fs = require('fs');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Save file
        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);

       // Prepare data for database
        const productData = {
            body: {
                id,
                product,
                category,
                stock: parseInt(stock),
                price: parseFloat(price),
                imageUrl: `images/${filename}`
            }
        };

        // Save to database
        const response = await addProduct(productData);

        if (response) {
            return NextResponse.json({
                status: 201,
                message: 'Produk berhasil ditambahkan',
                data: {
                    id,
                    product,
                    category,
                    stock,
                    price,
                    imageUrl: `images/${filename}`
                }
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