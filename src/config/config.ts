// src/config.ts
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

export { JWT_SECRET, JWT_EXPIRATION, MONGO_URI, PORT };
