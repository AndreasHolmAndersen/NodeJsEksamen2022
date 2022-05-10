import express from "express";
import helmet from "helmet";
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './router/authRouter.js';
import session from 'express-session';


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));
app.use(helmet()); //https://www.npmjs.com/package/helmet
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));


app.use(authRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Running on server", PORT));
