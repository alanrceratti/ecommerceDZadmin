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
		const categoryId = req.query._id;

		const query = Product.find({ category: categoryId }).populate(
			"category",
			"name"
		);

		res.json(await query);
	}
}
