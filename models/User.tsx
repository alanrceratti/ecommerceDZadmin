import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
	{
		// Define the "name" field as a required string
		name: { type: String, require: true },
		email: { type: String, require: true },
		password: { type: String, require: true },
		repeatpassword: { type: String, require: true },
	},
	{ timestamps: true }
);

// Create a model for the "User" collection using the schema
// If the model already exists (e.g., during hot-reloading), use the existing model
export const User = models?.User || model("User", UserSchema);
