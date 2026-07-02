const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    stock: { type: Number, default: 0 },
    unit: { type: String, default: 'kg' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ingredient', ingredientSchema);
