import postgres from 'postgres';
const sql = postgres(process.env.POSTGRES_URL, { ssl : "require" })

export async function getProducts() {
    try {
        const products = await sql`
            SELECT 
                products.id, 
                products.name, 
                products.price, 
                products.stock, 
                products.image, 
                products."categoryId", 
                categories.name as category 
            FROM products 
            INNER JOIN categories 
            ON products."categoryId" = categories.id
        `;
        return products;
    } catch (error) {
        console.log(error);
    };
}

export async function addProduct(req) {
    try {
        const { id, product, category, stock, price, imageUrl } = req.body;
    
        const insert = await sql`
            INSERT INTO products (id, name, price, stock, image, "categoryId")
            VALUES (${id}, ${product}, ${price}, ${stock}, ${imageUrl}, ${category})
        `;

        return insert.count > 0;
    } catch (error) {
        console.error('Database error:', error);
        return false;
    }
}