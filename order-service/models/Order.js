const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model("Order", OrderSchema);
