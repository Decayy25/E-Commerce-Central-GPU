import dotenv from "dotenv";

dotenv.config();

export const MONGO_URI = process.env.MONGO_URI;
export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const NODE_ENV = process.env.NODE_ENV;
export const VITE_URL = process.env.VITE_URL || "http://localhost:5001/";
export const FRONTEND = process.env.FRONTEND || "http://localhost:5173/";
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASS = process.env.EMAIL_PASS;