import { usersCollection } from "../config/db";

// PUT
export async function editUser(body: any): Promise<any> {
  const { id, fullName, userName, email, profilePicture, phone } = body;
  try {
    const dataUser = {
      fullName,
      userName,
      email,
      profilePicture,
      phone,
    };

    const result = await usersCollection.updateOne(
      { id: id },
      { $set: dataUser },
    );

    if (!result)
      return { success: false, message: "User tidak ditemukan" };

    return { success: true, message: "User berhasil diupdate" };
  } catch (error) {
    console.log(error);
  }
}

// DELETE
export async function deleteUser(body: any): Promise<any> {
  const { id } = body;
  try {
    // Keep original variables (even if undefined/errors, per user request to ignore other bugs)
    // We declare them to avoid TS compilation errors
    let fullName: any;
    let userName: any;
    let email: any;
    let profilePicture: any;
    let phone: any;
    let isVerfied: any;
    let password: any;
    let createdAt: any;

    const dataUser = {
      id,
      fullName,
      userName,
      email,
      profilePicture,
      phone,
      isVerfied,
      password,
      createdAt,
    };

    const result = await usersCollection.findOneAndDelete({ ...dataUser });
    return {
      success: true,
      message: "Data pengguna berhasil dihapus!",
      data: result,
    };
  } catch (error) {
    return {
      status: false,
      message: "Gagal menghapus pengguna!",
    };
  }
}
