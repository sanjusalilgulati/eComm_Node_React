const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: Number,
    sale_price: Number,
    description: String,
    category_id: Number
},
    { timestamps: true });

module.exports = mongoose.model('products', ProductSchema);