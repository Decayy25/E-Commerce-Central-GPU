import { db } from "../config/db.js";

export async function getProduct() {
    try {
        const products = await db.collection('products').find().toArray();
        return products
    } catch (error) {
        throw error;
    }
}

export async function addProduct(body) {
    const { id, name, price, image, category, stock, rating, reviews, description } = body;
                
    try {
        const product = { id, name, price, image, category, stock, rating, reviews, description };
        const result = await db.collection('products').insertOne(product);
        return { success: true, productId: result.insertedId, id };
    } catch (error) {
        console.error("Error adding product:", error);
        return { success: false, error: "Failed to add product" };
    }
}