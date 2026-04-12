import { db } from "../../config/db.js";

export async function getProduct() {
    try {
        const products = await db.collection('products').find().toArray();
        return products
    } catch (error) {
        throw error;
    }
}