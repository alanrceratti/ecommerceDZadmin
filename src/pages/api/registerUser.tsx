import { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "../../../lib/mongoose";
import { User } from "../../../models/User";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// Check if the HTTP method is not "POST"
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	// Connect to the MongoDB database
	await mongooseConnect();

	// Extract email, passwordfrom the request body
	const { name, email, password } = req.body;

	// Validate the input
	if (!name || !email || !password) {
		return res.status(400).json({ message: "Invalid input" });
	}

	try {
		// Check if a user with the provided email already exists
		const existingUser = await User.findOne({ email });

		// If a user with the same email exists, return an error response
		if (existingUser) {
			return res.status(422).json({ message: "User already exists" });
		}

		// Create a new user instance with the provided email, password, and repeatpassword
		const newUser = await User.create({ name, email, password });

		// Return a success response with the newly created user
		res.status(201).json({ message: "User created", user: newUser });
	} catch (error) {
		// Handle any errors that occur during the user creation process
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
}
