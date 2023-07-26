import { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "../../../lib/mongoose";
import { Product } from "../../../models/Product";
import { Category } from "../../../models/Category";

// This is the default handler function for the API route
export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// Establish a connection to MongoDB using Mongoose
	await mongooseConnect();

	if (req.method === "GET") {
		if (req.query?.id) {
			const products = await Product.find();
			const categories = await Category.find();
			const product = await Product.findOne({ _id: req.query.id })
				.populate("category") // Populate the "category" field
				.exec();
			res.json(product);
		}
	}
}
