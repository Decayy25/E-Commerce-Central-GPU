import { NODE_ENV, PORT } from "./utils/env.js";
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { register, login, getAccounts, me, verifyEmail } from "./middleware/auth.js";
import { sendContactMail } from "./utils/sendMail.js";
import { addProduct, getProduct, putProduct, delProduct } from "./controller/product.js";


const app = new Elysia()
    .use(cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    }),
    )

    .get("/", () => ({
        status: "Online",
        message: "Elysia Backend is running perfectly!",
        database: process.env.MONGO_URI ? "Connected (Env OK)" : "Missing Env",
    }))

    .group("/api", (app) =>
        app
        .group("/auth", (app) =>
            app
            .post("/login", async ({ body }) => await login(body))
            .post("/register", async ({ body }) => await register(body))
            .get("/verify-email", async ({ query }) => await verifyEmail(query.token))
            .get("/accounts", async () => await getAccounts())
            .get("/me", async ({ headers, set }) => {
                const token = headers['authorization']; 
                const result = await me({ token });
                if (result.status) { 
                    set.status = result.status;
                }
                return result;
            })
        )
        
        .group("/product", (app) =>
            app
            .get("/get", async () => await getProduct())
            .post("/add", async ({ body }) => await addProduct(body))
            .put("/put", async ({ body }) => await putProduct(body))
            .delete("/del", async ({ body }) => await delProduct(body))
        )

        .group("/contact", (app) =>
            app
                .post("/send", async ({ body }) => sendContactMail(body))
                // .post("/whatsapp", async ({ body }) => sendWhatsappMessage(body))
        )
    )

    .onError(({ code, set, error }) => {
        if (code === "NOT_FOUND") {
            set.status = 404;
            return { error: "Endpoint tidak ditemukan" };
        }
        console.error("Global Error:", error);
        return {
            status: 500,
            error: error.message,
        };
    });

export default app;

if (NODE_ENV !== 'production') {
    app.listen(PORT);
    console.log(`\x1b[32m
    +==================================================+
    ✅ Elysia Server running!
    🌐 http://localhost:${PORT}
    📂 File: index.js
    +==================================================+
`);
}
