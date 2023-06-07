import { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "../../../lib/mongoose";
import { Product } from "../../../models/Product";
import { Category } from "../../../models/Category";

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// Establish a connection to MongoDB using Mongoose
	await mongooseConnect();

	if (req.method === "GET") {
		// Get the selected filters from the query parameters
		const { price, flightTime, name } = req.query;
		console.log("QUERY", req.query);
		// Prepare the filter object based on the selected filters
		const filter: any = {};

		// Apply specific filters based on the selected options
		if (Array.isArray(price)) {
			const priceFilters = price.flatMap((value) => {
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
				} else if (value === "10000") {
					const singlePrice = parseInt(value);
					return { price: { $lt: singlePrice } };
				} else if (value === "70100") {
					const singlePrice = parseInt(value);
					return { price: { $gt: singlePrice } };
				}
			});

			if (Array.isArray(price)) {
				filter.$or = [...(filter.$or || []), ...priceFilters];
			} else if (typeof price === "string") {
				filter.$or = [...(filter.$or || []), ...[priceFilters]];
			}
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
			} else if (price === "10000") {
				const singlePrice = parseInt(price);
				filter.$or = [
					{ price: { $lt: singlePrice } }, // Add filter for price less than 10000
				];
			} else if (price === "70100") {
				const singlePrice = parseInt(price);
				filter.$or = [
					{ price: { $gt: singlePrice } }, // Add filter for price less than 10000
				];
			}
		}

		if (typeof flightTime === "string") {
			const [minFlightTime, maxFlightTime] = flightTime.split("-");
			filter.flightTime = {
				$gte: parseInt(minFlightTime),
				$lte: parseInt(maxFlightTime),
			};
		}

		if (typeof name === "string") {
			// Retrieve the category object based on the name
			const category = await Category.findOne({ name }).exec();
			if (typeof name === "string") {
				// Add the category filter directly using the provided category name
				filter.category = category._id;
			}
			// if (category) {
			// 	// Add the category filter
			// 	filter.category = category._id;
			// }
		}

		console.log("FILTER RESULT", filter);

		// Query the database with the applied filters
		const products = await Product.find(filter).populate("category").exec();

		res.json(products);
	}
}
