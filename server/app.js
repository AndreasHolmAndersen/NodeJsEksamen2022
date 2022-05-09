import express from "express";
import helmet from "helmet";
import dotenv from 'dotenv'
import cors from 'cors'




dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet()); //https://www.npmjs.com/package/helmet




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Running on server", PORT));
