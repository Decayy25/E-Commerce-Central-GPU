import { payHistoryCollection } from "../config/db";

// Get
export const getHistoryUser = async () => {
  try {
    const result = payHistoryCollection.findOne("history");
    if (!result) return "Tidak ada history";

    return result;
  } catch (error) {
    return {
      status: 500,
      message: "Terjadi kesalahan saat mengambil riwayat pembelian",
      success: false,
      error: error.message,
    };
  }
};

// POST
export const postHistoryUser = async (body) => {
  const { id, email, methodPay, username, createdAt, listProduct } = body;

  if (
    !body ||
    !email ||
    !methodPay ||
    !username ||
    !createdAt ||
    !listProduct
  ) {
    return {
      status: 400,
      message: "Semuanya wajib di isi",
      success: false,
    };
  }
  try {
    const existingProduct = await payHistoryCollection.findOne({ id: id });

    if (existingProduct) {
      return {
        id: id + 1,
        status: 200,
        message: "ID history ini sudah ada!, sistem sudah menambahkan id baru",
        success: true,
      };
    }
    const product = { id, email, methodPay, username, createdAt, listProduct };
    const result = await payHistoryCollection.insertOne(product);

    return {
      status: 200,
      message: "History berhasil ditambahkan",
      success: true,
      data: product,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Terjadi kesalahan saat menambahkan riwayat pembelian",
      success: false,
      error: error.message,
    };
  }
};

// DELETE
export const delHistoryUser = async (body) => {
  try {
    const { id } = body;

    const result = payHistoryCollection.deleteOne({ id: id });

    if (result.deleteCount === 0) {
      return {
        success: false,
        message: "Tidak ada history",
      };
    }

    return {
      success: true,
      message: "Berhasil menghapus riwayat transaksi!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Gagal menghapus riwayat transaksi!",
    };
  }
};
