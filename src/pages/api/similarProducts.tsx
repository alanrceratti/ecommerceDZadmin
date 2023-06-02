import { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "../../../lib/mongoose";
import { Product } from "../../../models/Product";

// This is the default handler function for the API route
export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// Establish a connection to MongoDB using Mongoose
	await mongooseConnect();

	if (req.method === "GET") {
		if (req.query.id) {
			const category_id = req.query.id as string;

			const products = await Product.find({
				category: category_id,
			}).exec();

			res.json(products);
			return; // Add this line to ensure a response is sent
		}
	}

	res.status(400).json({ error: "Invalid request" });
}
