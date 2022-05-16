import { Router } from 'express';
import db from '../database/createConnection.js';
import { ObjectId } from 'mongodb';

const orderRouter = Router();

orderRouter.get("/orders", async (req, res) => {
    const orders = await db.orders.find().toArray();
    res.send(orders);
});

orderRouter.post("/orders", async (req, res) => {
    await db.orders.insertOne({ ...req.body.order, date: new Date() });
    res.send({ message: "Order created" });
});

orderRouter.delete("/orders", async (req, res) => {
    if (ObjectId.isValid(req.body.id)) {
        await db.orders.deleteOne({ _id: ObjectId(req.body.id) });
    }
    else {
        res.send({ message: "invalid id" })
    }

})


export default orderRouter;
