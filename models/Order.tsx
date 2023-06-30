import mongoose, { Schema, model, models } from "mongoose";

// Define the schema for the "Product" collection
const OrderSchema = new Schema(
	{
		line_items: Object,
		name: String,
		email: String,
		paid: Boolean,
	},
	{ timestamps: true }
);

// Create a model for the "Product" collection using the schema
// If the model already exists (e.g., during hot-reloading), use the existing model
export const Order = models?.Order || model("Order", OrderSchema);
