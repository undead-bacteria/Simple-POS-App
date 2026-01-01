require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const amqp = require("amqplib");

const Order = require("./models/Order");

const app = express();
app.use(express.json());

const startServer = async () => {
  await mongoose.connect("mongodb://mongo:27017/orderdb");

  const connection = await amqp.connect("amqp://rabbitmq");
  const channel = await connection.createChannel();
  await channel.assertQueue("order_created");

  app.post("/orders", async (req, res) => {
    const { productId, quantity } = req.body;
    const order = new Order({ productId, quantity });
    await order.save();
    channel.sendToQueue(
      "order_created",
      Buffer.from(JSON.stringify({ productId, quantity }))
    );
    res.status(201).json(order);
  });

  app.listen(3000, () => {
    console.log("Order Service listening on port 3000");
  });
};

startServer();
