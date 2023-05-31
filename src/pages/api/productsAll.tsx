import { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "../../../lib/mongoose";
import { Product } from "../../../models/Product";
import mongoose from "mongoose";

// This is the default handler function for the API route
export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// Establish a connection to MongoDB using Mongoose
	await mongooseConnect();

	if (req.method === "GET") {
		if (req.query.name) {
			const categoryId = req.query.name;
			const query = Product.find({ category: categoryId }).populate(
				// "category",
				"name"
			);

			res.json(await query);
		} else {
			const query = Product.find();
			res.json(await query);
		}
	}
}
