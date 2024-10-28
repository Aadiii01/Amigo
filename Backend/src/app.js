import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import errorHandler from "./Middlewares/errorHandler.js";
import "./passport.js"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_ID,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// Recreate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Make __dirname globally accessible
global.__dirname = __dirname;

// import routes
import userRoutes from "./Routes/user.routes.js"
import connectionRoutes from "./Routes/connection.routes.js"

// Routes Declaration
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/connection",connectionRoutes)

app.use(errorHandler);

export default app;