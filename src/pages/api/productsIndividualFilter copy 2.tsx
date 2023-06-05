import { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "../../../lib/mongoose";
import { Product } from "../../../models/Product";

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// Establish a connection to MongoDB using Mongoose
	await mongooseConnect();

	if (req.method === "GET") {
		// Get the selected filters from the query parameters
		const { price, flightTime } = req.query;
		console.log("QUERY", req.query);
		// Prepare the filter object based on the selected filters
		const filter: any = {};

		// Apply specific filters based on the selected options
		if (Array.isArray(price)) {
			const priceFilters = price.map((value) => {
				if (value.includes("-")) {
					const [minPrice, maxPrice] = value.split("-");
					return {
						$and: [
							{
								price: {
									$gte: parseInt(minPrice),
									$lte: parseInt(maxPrice),
								},
							},
						],
					};
				} else {
					const singlePrice = parseInt(value);
					return { price: { $lt: singlePrice } };
				}
			});
			priceFilters.push({ price: { $lt: 10000 } }); // Add filter for price less than 10000
			filter.$or = priceFilters;
		} else if (typeof price === "string") {
			if (price.includes("-")) {
				const [minPrice, maxPrice] = price.split("-");
				filter.$and = [
					{
						price: {
							$gte: parseInt(minPrice),
							$lte: parseInt(maxPrice),
						},
					},
				];
			} else {
				const singlePrice = parseInt(price);
				filter.$or = [
					{ price: { $lt: 10000 } }, // Add filter for price less than 10000
				];
			}
		}

		console.log("FILTER RESULT", filter);

		// Query the database with the applied filters
		const products = await Product.find({
			$and: [
				{ price: { $gt: 19000 } },
				{ price: { $lt: 50000 } },
				{ price: { $lt: 10000 } },
			],
		});

		res.json(products);
	}
}
