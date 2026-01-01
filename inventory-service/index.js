require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const amqp = require("amqplib");
const Inventory = require("./models/Inventory");

const app = express();
app.use(express.json());

const startServer = async () => {
  await mongoose.connect("mongodb://mongo:27017/inventorydb");

  const connection = await amqp.connect("amqp://rabbitmq");
  const channel = await connection.createChannel();
  await channel.assertQueue("order_created");

  channel.consume("order_created", async (msg) => {
    const { productId, quantity } = JSON.parse(msg.content.toString());
    let product = await Inventory.findOne({ productId });

    if (product) {
      product.stock -= quantity;
      await product.save();
    } else {
      await Inventory.create({ productId, stock: 100 - quantity }); // Création automatique avec stock initial 100
    }

    channel.ack(msg);
  });

  // Ajouter dans inventory-service/index.js
  app.get("/inventory/:productId", async (req, res) => {
    const { productId } = req.params;
    const inventoryItem = await Inventory.findOne({ productId });
    if (!inventoryItem) return res.status(404).send("Product not found");
    res.json(inventoryItem);
  });

  app.listen(3001, () => {
    console.log("Inventory Service listening on port 3001");
  });
};

startServer();
