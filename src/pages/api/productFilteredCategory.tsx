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
			const categoryName = req.query.name as string;

			const products = await Product.find()
				.populate({
					path: "category",
					match: { name: categoryName },
				})
				.exec();

			const filteredProducts = products.filter(
				(product) => product.category !== null
			);

			res.json(filteredProducts);
		}
	}
}
