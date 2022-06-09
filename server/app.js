import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./router/authRouter.js";
import session from "express-session";
import productRouter from "./router/productRouter.js";
import orderRouter from "./router/orderRouter.js";
import goalRouter from "./router/goalRouter.js";
import http from "http";
import { Server } from "socket.io";

const app = express();

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
    credentials: true,
  },
});

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);

dotenv.config();

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
});

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);
app.use(helmet()); //https://www.npmjs.com/package/helmet
app.use(sessionMiddleware);

io.use(wrap(sessionMiddleware));
io.on("connection", (socket) => {
  socket.on("themeChanged", ({ data }) => {
    console.log(data);
    io.emit("theme", { data });
  });
});

app.use(authRouter);
app.use(productRouter);
app.use(orderRouter);
app.use(goalRouter);
server.listen(PORT, () => console.log("Running on server", PORT));
