import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { usersCollection } from "../config/db.js";
import { sendVerificationEmail } from "../utils/sendVerifMail.js";
import { JWT_SECRET } from "../utils/environtment.js";

export async function register(body) {
  try {
    if (
      !body.username ||
      !body.email ||
      !body.phone ||
      !body.birthday ||
      !body.password ||
      !body.confirmPassword
    ) {
      return { status: 400, message: "Semua wajib di isi!" };
    }

    if (body.password !== body.confirmPassword) {
      return {
        status: 400,
        message: "Password wajib sama dengan Confirm Password",
      };
    }

    if (body.birthday >= 18) {
      return {
        status: 400,
        message: "Umur Belum Cukup!",
      };
    }

    const existing = await usersCollection.findOne({
      $or: [{ email: body.email }, { username: body.username }],
    });

    if (existing) {
      return { status: 400, message: "Email atau username sudah terdaftar" };
    }

    const hashed = await bcrypt.hash(body.password, 10);

    const verificationToken = jwt.sign(
      { email: body.email },
      JWT_SECRET,
      { expiresIn: "1d" },
    );

    await usersCollection.insertOne({
      username: body.username,
      email: body.email,
      phone: body.phone,
      birthday: body.birthday,
      password: hashed,
      isVerified: true,
      verificationToken,
      createdAt: new Date(),
    });

    await sendVerificationEmail(body.email, verificationToken);

    return {
      status: 200,
      message: "Registrasi berhasil. Silakan cek email untuk verifikasi.",
    };
  } catch (error) {
    return { status: 500, message: "Terjadi kesalahan saat registrasi" };
  }
}

export async function verifyEmail(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await usersCollection.findOne({
      email: decoded.email,
      verificationToken: token,
    });

    if (!user) {
      return { status: 400, message: "Token tidak valid" };
    }

    await usersCollection.updateOne(
      { email: decoded.email },
      {
        $set: { isVerified: true },
        $unset: { verificationToken: "" },
      },
    );

    return { message: "Email berhasil diverifikasi" };
  } catch (error) {
    return { status: 500, message: "Token tidak valid atau kadaluarsa" };
  }
}

export async function me(token) {
  try {
    if (!token) {
      return { status: 401, message: "Token tidak ditemukan" };
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await usersCollection.findOne({ email: decoded.email });
    if (!user) {
      return { status: 404, message: "User tidak ditemukan" };
    }

    return {
      status: 200,
      message: "Profil user berhasil diambil",
      data: {
        email: user.email,
        username: user.username,
        fullname: user.fullname,
        phone: user.phone,
      },
    };
  } catch (error) {
    return {
      status: 500,
      message: "Token tidak valid atau kadaluarsa",
      error: error.message,
    };
  }
}

export async function login(body) {
  try {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET belum diset!");
    }

    const user = await usersCollection.findOne({ email: body.email });

    if (!user || !user.isVerified) {
      return Response.json(
        { message: "Akun belum di Verifikasi" },
        { status: 401 },
      );
    }

    const match = await bcrypt.compare(body.password, user.password);

    if (!match) {
      return Response.json(
        { message: "Email atau password salah" },
        { status: 401 },
      );
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1d" },
    );

    console.log("Login:", body.email);

    return Response.json({
      token,
      user: {
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    return Response.json(
      { message: "terjadi kesalahan pada login" },
      { status: 500 },
    );
  }
}

export async function getAccounts() {
  try {
    const users = await usersCollection
      .find(
        {},
        {
          projection: {
            _id: 0,
            fullname: 1,
            username: 1,
            createdAt: 1,
          },
        },
      )
      .toArray();

    return {
      status: 200,
      message: "Data semua akun berhasil diambil",
      data: users,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Terjadi kesalahan saat mengambil data akun",
      error: error.message,
    };
  }
}
