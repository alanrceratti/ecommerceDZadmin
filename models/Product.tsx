import mongoose, { Schema, model, models } from "mongoose";

// Define the schema for the "Product" collection
const ProductSchema = new Schema({
	// Define the "name" field as a required string
	name: { type: String, require: true },
	// Define the "description" field as an optional string
	description: String,
	// Define the "price" field as a required number
	price: { type: Number, require: true },

	category: {type:mongoose.Types.ObjectId, ref:"Category"},

	images: { type: [String] },
});

// Create a model for the "Product" collection using the schema
// If the model already exists (e.g., during hot-reloading), use the existing model
export const Product = models?.Product || model("Product", ProductSchema);
