const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true, unique: false },
    price: { type: Number, required: true },
    description: { type: String, trim: true, required: true },
    category: { type: String },
    imagePath: { type: String, trim: true, required: true},
    createdById: { type: String, required: true },
    starCount: { type: Number, default: 0 },
    location: { type: String, required: true }
  });
  
module.exports = mongoose.model('Item', itemSchema);