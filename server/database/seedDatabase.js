import db from "../database/createConnection.js";
import bcrypt from "bcrypt";

await db.users.deleteMany({seeded: true});

const hashedPassword = await bcrypt.hash("password", 12);

db.users.insertOne({
    username: "Admin", 
    password: hashedPassword,
    role: "Admin",
    seeded: true
});

const users = await db.users.find({}).toArray();

console.log(users);

db.client.close();