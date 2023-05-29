import mongoose, { Schema, model, models } from "mongoose";

// Define the schema for the "Product" collection
const ProductSchema = new Schema(
	{
		// Define the "name" field as a required string
		name: { type: String, require: true },
		// Define the "description" field as an optional string
		description: String,
		// Define the "price" field as a required number
		price: { type: Number, require: true },
		category: { type: Schema.Types.ObjectId, ref: "Category" },
		speed: { type: Number },
		range: { type: Number },
		camera: { type: String, require: true },
		battery: { type: Number },
		waterProof: { type: String, require: true },
		skillLevel: { type: String, require: true },
		ambient: { type: String, require: true },
		followMode: { type: String, require: true },
		autoReturn: { type: String, require: true },
		weight: { type: Number },
		images: { type: [String] },
		bestSeller: { type: Boolean },
		offer: { type: Boolean },
		offerPrice: { type: Number },
	},
	{ timestamps: true }
);



// Create a model for the "Product" collection using the schema
// If the model already exists (e.g., during hot-reloading), use the existing model
export const Product = models?.Product || model("Product", ProductSchema);
