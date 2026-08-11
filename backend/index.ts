import { NODE_ENV, PORT, MONGO_URI } from "./utils/environtment";
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { register, login, getAccounts, me, verifyEmail } from "./middleware/auth";
import { sendContactMail } from "./utils/sendMail";
import { addProduct, getProduct, putProduct, delProduct } from "./controller/product";

const app = new Elysia()
  .use(
    cors({
      origin: "https://e-commerce-central-gpu.vercel.app/",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }),
  )

  .get("/", () => ({
    status: "Online",
    message: "Elysia Backend is running perfectly!",
    database: MONGO_URI ? "Connected (Env OK)" : "Missing Env",
  }))

  .group("/api", (app) =>
    app
      .group("/auth", (app) =>
        app
          .post("/login", async ({ body }: any) => await login(body))
          .post("/register", async ({ body }: any) => await register(body))
          .get(
            "/verify-email",
            async ({ query }: any) => await verifyEmail(query.token),
          )
          .get("/accounts", async () => await getAccounts())
          .get("/me", async ({ headers, set }: any) => {
            const token = headers["authorization"];
            const result = await me({ token });
            if (result.status) {
              set.status = result.status;
            }
            return result;
          }),
      )

      .group("/product", (app) =>
        app
          .get("/get", async () => await getProduct())
          .post("/add", async ({ body }: any) => await addProduct(body))
          .put("/put", async ({ body }: any) => await putProduct(body))
          .delete("/del", async ({ body }: any) => await delProduct(body)),
      )

      .group(
        "/contact",
        (app) => app.post("/send", async ({ body }: any) => sendContactMail(body)),
      ),
  )

  .onError(({ code, set, error }: any) => {
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
    📂 File: index.ts
    +==================================================+
`);
}
