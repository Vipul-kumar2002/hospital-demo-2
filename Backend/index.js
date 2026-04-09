import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();
const app = express();

// ✅ CONFIGURE CORS FOR DEPLOYMENT
const allowedOrigins = [
  "http://localhost:5173", // Local Development
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json({ limit: "50mb" })); //

app.use("/api/ai", aiRoutes); //

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 AI Engine running on port ${PORT}`));
