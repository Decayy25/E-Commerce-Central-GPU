import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";
import { sendVerificationEmail } from "../utils/sendVerifMail.js";

export async function register(body) {
  try {
    if (!body.username || !body.email || !body.phone || !body.birthday || !body.password || !body.confirmPassword) {
      return { status: 400, message: "Semua wajib di isi!" };
    }

    if (body.password !== body.confirmPassword) {
      return { status: 400, message: "Password wajib sama dengan Confirm Password" };
    }

    const existing = await db.collection("users").findOne({
      $or: [{ email: body.email }, { username: body.username }]
    });

    if (existing) {
      return { status: 400, message: "Email atau username sudah terdaftar" };
    }

    const hashed = await bcrypt.hash(body.password, 10);

    const verificationToken = jwt.sign(
      { email: body.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    await db.collection("users").insertOne({
      username: body.username,
      email: body.email,
      phone: body.phone,
      birthday: body.birthday,
      password: hashed,
      isVerified: true, // Set to true for testing, change to false in production
      verificationToken,
      createdAt: new Date(),
    });

    await sendVerificationEmail(body.email, verificationToken);

    return {
      status: 200,
      message: "Registrasi berhasil. Silakan cek email untuk verifikasi."
    };

  } catch (error) {
    return { status: 500, message: "Terjadi kesalahan saat registrasi" };
  }
}

export async function verifyEmail(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await db.collection("users").findOne({
      email: decoded.email,
      verificationToken: token
    });

    if (!user) {
      return { status: 400, message: "Token tidak valid" };
    }

    await db.collection("users").updateOne(
      { email: decoded.email },
      {
        $set: { isVerified: true },
        $unset: { verificationToken: "" }
      }
    );

    return { message: "Email berhasil diverifikasi" };
  } catch (error) {
    return { status: 500, message: "Token tidak valid atau kadaluarsa" };
  }
}

export async function login(body) {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET belum diset!");
    }

    const user = await db.collection("users")
      .findOne({ email: body.email });

    if (!user || !user.isVerified) {
      return Response.json(
        { message: "Akun belum di Verifikasi" },
        { status: 401 }
      );
    }

    const match = await bcrypt.compare(
      body.password,
      user.password
    );

    if (!match) {
      return Response.json(
        { message: "Email atau password salah" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("Login:", body.email);

    return Response.json({
      token,
      user: {
        email: user.email,
        username: user.username
      }
    });

  } catch (err) {
    return Response.json(
      { message: "terjadi kesalahan pada login" },
      { status: 500 }
    );
  }
}

export async function getAccounts(body) {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET belum diset!");
    }

    const authHeader = body.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return Response.json(
        { message: "Format token salah atau tidak ditemukan" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return Response.json(
        { message: "Token tidak ditemukan" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await db.collection("users").findOne(
      { email: decoded.email },
      { projection: { 
          _id: 0, 
          email: 1, 
          username: 1,
          createdAt: 1 ,
          isVerified: 1
        }
      }
    );

    if (!user) {
      return Response.json(
        { message: "User tidak ditemukan" },
        { status: 404 }
      );
    }

      return Response.json(user);
  } catch (err) {
    return Response.json(
      { message: "token tidak valid" },
      { status: 401 }
    );
  }
}