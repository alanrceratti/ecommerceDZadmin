import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";

// Define the schema for the "User" collection
const UserSchema = new Schema(
	{
		// Define the "name" field as a required string
		name: { type: String, require: true },
		email: { type: String, require: true },
		password: { type: String, require: true },
	},
	{ timestamps: true }
);

// Middleware function executed before saving a user instance to the database
UserSchema.pre("save", async function (next) {
	// Check if the "password" field has been modified
	if (!this.isModified("password")) {
		next(); // If not modified, move to the next middleware or save operation
	}

	// Hash the password with bcrypt using a salt of 10 rounds
	const hashedPassword = await bcrypt.hash(this.password!, 10);

	// Assign the hashed password to the "password" field
	this.password = hashedPassword;

	next(); // Continue with the save operation
});

// Create a model for the "User" collection using the schema
// If the model already exists (e.g., during hot-reloading), use the existing model
export const User = models?.User || model("User", UserSchema);
