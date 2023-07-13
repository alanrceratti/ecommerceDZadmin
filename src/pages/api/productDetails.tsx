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
		if (req.query?.id) {
			const productsCount = await Product.countDocuments();
			if (productsCount > 0) {
				const product = await Product.findOne({ _id: req.query.id })
					.populate("category") // Populate the "category" field
					.exec();
				res.json(product);
				
			}
		}
	}
}
