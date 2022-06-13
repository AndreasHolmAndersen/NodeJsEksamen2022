import db from "../database/createConnection.js";
import bcrypt from "bcrypt";

await db.users.deleteMany({ seeded: true });
await db.products.deleteMany({ seeded: true });
await db.orders.deleteMany({ products: { seeded: true } });

const products = [
  { title: "Tooth picks", price: 1, cost: 0.5, seeded: true },
  { title: "Bread", price: 20, cost: 5, seeded: true },
  { title: "TV", price: 5000, cost: 2000, seeded: true },
  { title: "Blanket", price: 3500, cost: 700, seeded: true },
  { title: "Hair tie", price: 10, cost: 1, seeded: true },
  { title: "Fork", price: 15, cost: 2, seeded: true },
  { title: "Bracelet", price: 80, cost: 10, seeded: true },
  { title: "Water bottle", price: 12, cost: 1, seeded: true },
];

const hashedPassword = await bcrypt.hash("password", 12);

await db.users.insertOne({
  username: "Admin",
  password: hashedPassword,
  role: "Admin",
  seeded: true,
});

await db.products.insertMany(products);

const randomOrder = async (start, end) => {
  const orders = [];
  const randomProductsArray = [];
  let randomProductsObject = {};
  products.forEach((product) => {
    const randomNumber = Math.floor(Math.random() * (3 - 0 + 1) + 0);
    if (randomNumber !== 0) {
      randomProductsObject = {};
      randomProductsObject = {
        product: {
          ...product,
          amount: randomNumber,
        },
      };
      randomProductsArray.push(randomProductsObject);
    }
  });

  orders.push({
    products: randomProductsArray,
    date: new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ),
  });

  //Insert into database
  await db.orders.insertMany(orders);
};

for (let i = 0; i < 9999; i++) {
  await randomOrder(new Date(2019, 0, 1), new Date());
}

db.client.close();
