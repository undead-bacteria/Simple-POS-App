const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  productId: { type: String, required: true },
  stock: { type: Number, required: true },
});

module.exports = mongoose.model("Inventory", InventorySchema);
