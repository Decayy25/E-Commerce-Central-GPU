import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { usersCollection } from './config/db.js';
import { sendContactMail, mailHistory } from "./utils/sendMail.js";
import { getProduct } from "./controller/product.js";
import { register, login, getAccounts } from "./middleware/auth.js";
import dotenv from "dotenv";
import path from "path";
import { error } from "console";

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({
    path: path.resolve(process.cwd(), "../.env")
  });
}

const PORT = process.env.PORT || 3000;

const app = new Elysia()
    .use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }))


    .get("/", () => ({
        status: "Online",
        message: "Elysia Backend is running perfectly!",
        database: process.env.MONGO_URI ? "Connected (Env OK)" : "Missing Env"
    }))


    .group("/api", (app) =>
        app
            // Auth Group
            .group("/auth", (app) =>
                app
                  .post('/login', async ({ body }) => await login(body))
                  .post('/register', async ({ body }) => await register(body))
                  .get("/accounts", async () => await getAccounts())
            )
            .group("/product", (app) => 
                app
                    .get('/get', async () => await getProduct())
                )







            .get("/me", async ({ query }) => {
                try {
                    const user = await usersCollection.findOne({ email: query.email });
                    return user || { error: "User tidak ditemukan" };
                } catch (error) {
                    return { error: error.message };
                }
            })

            .post("/contact", async ({ body }) => {
                try {
                    await sendContactMail(body);
                    await mailHistory(body);
                    return { 
                        success: true, 
                        message: "Pesan berhasil dikirim" 
                    };
                } catch (error) {
                    throw error;
                }
            })
        )

    .onError(({ code, set, error }) => {
        if (code === "NOT_FOUND") {
            set.status = 404;
            return { error: "Endpoint tidak ditemukan" };
        }
        console.error("Global Error:", error);
        return {
            status: 500,
            error: error.message
        };
    });

export default app;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT);
  console.log(`\x1b[32m
  +==================================================+
  ✅ Elysia Server running!
  🌐 http://localhost:${PORT}
  📂 File: index.js
  +==================================================+
`);
}