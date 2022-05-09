import { Router } from 'express';
import db from '../database/createConnection.js';
import bcrypt from 'bcrypt';

const authRouter = Router();

authRouter.post("/auth/sign-up", async (req, res) => {
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    db.users.insertOne({username: req.body.username, password: hashedPassword, role: req.body.role});
    
    res.send({message: "User created"});
});



authRouter.post("/auth/login", async (req, res) => {
    const user = await db.users.findOne({username: req.body.username});

    const isSamePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      let isSameUsername = false;
    
      if (user.username === req.body.username) {
        isSameUsername = true;
      }
    
      if (isSameUsername && isSamePassword) {
        res.send({ id: user._id, username: user.username, role: user.role });
        req.session.role = user.role;
        return;
      }
      res.send({ error: "wrong credentials" });

});

export default authRouter;