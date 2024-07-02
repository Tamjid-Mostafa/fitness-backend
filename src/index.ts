// // src/index.ts
import http from "http";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import postRoutes from "./routes/postRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import connectDB from "./config/db";
import { PORT } from "./config/config";

const app = express();
app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
});

// server.listen(8080, ()=> {
//   console.log(`Server is running on port http://localhost:8080`);
// })
// mongoose.Promise = Promise
// mongoose.connect(MONGODB_URI)
// mongoose.connection.on('error', (error:Error)=> console.log(`Connection error: ${error}}`))
