import { MongoClient } from "mongodb";
import { MONGO_URI } from "../utils/environtment";

const uri = MONGO_URI;

if (!uri) {
  console.error("❌ MONGO_URI is not defined in environment variables.");
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 10000,
  family: 4,
});

try {
  await client.connect();
  console.log(`\x1b[32m
+==================================================+
✅ MongoDB Connected
+==================================================+
`);
} catch (err) {
  console.error("❌ MongoDB Gagal Connect: ", err);
  process.exit(1);
}

export const db = client.db("myapp");
export const productsCollection = db.collection("products");
export const usersCollection = db.collection("users");
export const payHistoryCollection = db.collection("history");
