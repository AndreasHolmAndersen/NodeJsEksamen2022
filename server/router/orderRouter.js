import { Router } from "express";
import db from "../database/createConnection.js";
import { ObjectId } from "mongodb";

const orderRouter = Router();

const compare = (a, b) => {
  if (a.date < b.date) {
    return -1;
  }
  if (a.date > b.date) {
    return 1;
  }
  return 0;
};

orderRouter.get("/orders", async (req, res) => {
  const orders = await db.orders.find().toArray();
  res.send(orders);
});

orderRouter.post("/orders", async (req, res) => {
  const order = await db.orders.insertOne({
    ...req.body.order,
    date: new Date(),
  });
  res.send(order);
});

orderRouter.post("/orders/period", async (req, res) => {
  const dataPeriodOne = await db.orders
    .find({
      date: {
        $gte: new Date(`${req.body.periodOneStartDate}T00:00:00.000Z`),
        $lte: new Date(`${req.body.periodOneEndDate}T23:59:59.999Z`),
      },
    })
    .toArray();

  const dataPeriodTwo = await db.orders
    .find({
      date: {
        $gte: new Date(`${req.body.periodTwoStartDate}T00:00:00.000Z`),
        $lte: new Date(`${req.body.periodTwoEndDate}T23:59:59.999Z`),
      },
    })
    .toArray();

  dataPeriodOne.sort(compare);
  dataPeriodTwo.sort(compare);
  res.send([dataPeriodOne, dataPeriodTwo]);
});

orderRouter.delete("/orders", async (req, res) => {
  if (ObjectId.isValid(req.body.id)) {
    await db.orders.deleteOne({ _id: ObjectId(req.body.id) });
  } else {
    res.send({ message: "invalid id" });
  }
});

export default orderRouter;
