import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();
const app = express();

// ✅ CONFIGURE CORS FOR DEPLOYMENT
const allowedOrigins = [
  "http://localhost:5173",
  "https://demo-frontend-c131.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // This allows the browser to pass the preflight check
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin); // Check Render logs for this!
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Added OPTIONS
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], // Added for preflight
  }),
);
app.use(express.json({ limit: "50mb" })); //

app.use("/api/ai", aiRoutes); //

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 AI Engine running on port ${PORT}`));
