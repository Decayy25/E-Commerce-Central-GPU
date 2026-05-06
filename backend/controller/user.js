import { usersCollection } from "../config/db.js";

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
