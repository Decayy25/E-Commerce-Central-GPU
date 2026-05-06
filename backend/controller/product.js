import { productsCollection } from "../config/db.js";

// CRUD
export async function getProduct() {
  try {
    const products = await productsCollection.find().toArray();
    return products;
  } catch (error) {
    throw error;
  }
}

export async function addProduct(body) {
  const {
    id,
    name,
    price,
    image,
    category,
    stock,
    rating,
    reviews,
    description,
  } = body;

  if (!id || !name || !price) {
    return {
      status: 400,
      message: "ID, name, dan price wajib diisi",
      success: false,
    };
  }

  try {
    const existingProduct = await productsCollection.findOne({ id: id });
    if (existingProduct) {
      return {
        status: 400,
        message: "Product dengan ID ini sudah ada",
        success: false,
      };
    }

    const product = {
      id,
      name,
      price,
      image,
      category,
      stock,
      rating,
      reviews,
      description,
    };
    const result = await productsCollection.insertOne(product);
    return {
      status: 201,
      message: "Product berhasil ditambahkan",
      success: true,
      productId: result.insertedId,
      id,
    };
  } catch (error) {
    console.error("Error adding product:", error);
    return {
      status: 500,
      message: "Terjadi kesalahan saat menambahkan product",
      success: false,
      error: error.message,
    };
  }
}

export async function delProduct(body) {
  try {
    const { id } = body;

    const result = await productsCollection.deleteOne({ id: id });

    if (result.deletedCount === 0) {
      return { success: false, message: "Product tidak ditemukan" };
    }
    return { success: true, message: "Product berhasil dihapus" };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: "Failed to delete product" };
  }
}

export async function putProduct(body) {
  const {
    id,
    name,
    price,
    image,
    category,
    stock,
    rating,
    reviews,
    description,
  } = body;

  try {
    const updateData = {
      name,
      price,
      image,
      category,
      stock,
      rating,
      reviews,
      description,
    };

    const result = await productsCollection.updateOne(
      { id: id },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return { success: false, message: "Product tidak ditemukan" };
    }

    return { success: true, message: "Product berhasil diupdate" };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: "Failed to update product" };
  }
}
