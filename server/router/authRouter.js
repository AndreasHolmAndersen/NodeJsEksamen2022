import { Router } from 'express';
import db from '../database/createConnection.js';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

const authRouter = Router();

authRouter.get("/users", async (req, res) => {
  const userList = await db.users.find().toArray();
  res.send(userList);
});

authRouter.post("/auth/sign-up", async (req, res) => {
  console.log(req.session.id);
  if (req.session.user.role === "Admin") {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await db.users.insertOne({ username: req.body.username, password: hashedPassword, role: req.body.role });
    const userList = await db.users.find().toArray();
    res.send(userList);
  }
  else {
    res.send({ message: "You are not authorized to create users" });
  }
});



authRouter.post("/auth/login", async (req, res) => {
  const user = await db.users.findOne({ username: req.body.username });
  if (user) {
    const isSamePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    let isSameUsername = false;

    if (user.username === req.body.username) {
      isSameUsername = true;
    }

    if (isSameUsername && isSamePassword) {
      req.session.user = user;
      res.send({ id: user._id, username: user.username, role: user.role });
      
      console.log(req.session.id);
      return;
    }
  }
  res.send({ error: "wrong credentials" });


});

authRouter.delete("/auth/delete-user", async (req, res) => {
  console.log(req.body.id)
  await db.users.deleteOne({ _id: ObjectId(req.body.id) });
  const userList = await db.users.find().toArray();
  res.send(userList);
})

export default authRouter;