import nodemailer from "nodemailer";
import { EMAIL_PASS, EMAIL_USER, VITE_URL } from "./environtment.js";

export async function sendVerificationEmail(email, token) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const verificationLink = `${VITE_URL}api/auth/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"No Reply" <${EMAIL_USER}>`,
    to: email,
    subject: "Verifikasi Email Anda",
    html: `
      <h2>Verifikasi Email</h2>
      <p>Terima kasih telah mendaftar. Silakan klik tombol di bawah ini untuk memverifikasi email Anda:</p>
      <a href="${verificationLink}" 
          style="padding:10px 20px;background:#4CAF50;color:white;text-decoration:none;border-radius:5px;">
          Verifikasi Email
      </a>
      <p>Jika Anda tidak merasa mendaftar, abaikan email ini.</p>
    `,
  });
}