import dotenv from "dotenv"

dotenv.config();

export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/botzap',
  port: process.env.PORT || 5050,
  engine: process.env.ENGINE || 1,
  jwtSecret: process.env.JWT_SECRET || 'dnfgkdt6534=@#$slfs123',
  salt: process.env.SALT || 12
}