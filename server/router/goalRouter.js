import { Router } from "express";
import db from "../database/createConnection.js";
import { ObjectId } from "mongodb";

const goalRouter = Router();

goalRouter.get("/goals", async (req, res) => {
  const goals = await db.goals.find().toArray();
  res.send(goals);
});

goalRouter.post("/goals/periods", async (req, res) => {
  const goalsPeriodOne = await db.goals
    .find({
      year: Number(req.body.periodOneYear),
      periodName: req.body.periodOneName,
    })
    .toArray();
  const goalsPeriodTwo = await db.goals
    .find({
      year: Number(req.body.periodTwoYear),
      periodName: req.body.periodTwoName,
    })
    .toArray();
  res.send([goalsPeriodOne, goalsPeriodTwo]);
});

goalRouter.post("/goals", async (req, res) => {
  const goalFound = await db.goals.findOne({
    year: req.body.year,
    periodName: req.body.periodName,
    goal: req.body.goal,
  });
  if (goalFound === null) {
    await db.goals.insertOne({ ...req.body });
    res.send({ message: "goal set" });
    return;
  }
  res.send({ message: "Goal already exist for this exact period and year" });
});

export default goalRouter;
