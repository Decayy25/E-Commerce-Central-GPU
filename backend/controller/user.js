import { usersCollection } from "../config/db.js";

// PUT
export async function editUser(body) {
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

    if (!result || result === 0)
      return { success: false, message: "User tidak ditemukan" };

    return { success: true, message: "User berhasil diupdate" };
  } catch (error) {
    console.log(error);
  }
}

// DELETE
export async function deleteUser(body) {
  const { id } = body;
  try {
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
