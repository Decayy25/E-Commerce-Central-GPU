import nodemailer from "nodemailer";
import { EMAIL_PASS, EMAIL_USER } from "./env";

export async function sendContactMail({ name, email, message }) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: `"${name}" <${EMAIL_USER}>`, 
        replyTo: email,
        to: "smartcicalengka02@gmail.com",
        subject: "Pesan Baru dari SMArT CLK",
        html: `
            <h3>Pesan Baru</h3>
            <p><b>Nama:</b> ${name}</p>
            <p><b>Email Pengunjung:</b> ${email}</p>
            <p><b>Pesan:</b></p>
            <p>${message}</p>
        `
    });
}