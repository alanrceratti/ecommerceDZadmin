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
		const pageSize = parseInt(req.query.pageSize as string) || 9;
		const page = parseInt(req.query.page as string) || 1;
		const sortBy = req.query.sortBy as string;

		const skip = (page - 1) * pageSize;
		let query = Product.find().skip(skip).limit(pageSize);

		// Add the sorting option to the query if provided
		if (sortBy) {
			let sortOption = {};
			if (sortBy === "priceLowToHigh") {
				sortOption = { price: 1 }; // Sort by price: Low - High
			} else if (sortBy === "priceHighToLow") {
				sortOption = { price: -1 }; // Sort by price: High - Low
			}

			query = query.sort(sortOption);
		}

		const products = await query.exec();
		res.json(products);
	}
}
