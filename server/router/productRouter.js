import { Router } from "express";
import db from "../database/createConnection.js";
import { ObjectId } from "mongodb";

const productRouter = Router();

productRouter.get("/products", async (req, res) => {
  const products = await db.products.find().toArray();
  res.send(products);
});

productRouter.post("/products", async (req, res) => {
  console.log(req.body);
  await db.products.insertOne({
    title: req.body.title,
    price: req.body.price,
    cost: req.body.cost,
  });
  const products = await db.products.find().toArray();
  res.send(products);
});

productRouter.delete("/products", async (req, res) => {
  console.log(req.body.id);
  await db.products.deleteOne({ _id: ObjectId(req.body.id) });
  const products = await db.products.find().toArray();
  res.send(products);
});

export default productRouter;
