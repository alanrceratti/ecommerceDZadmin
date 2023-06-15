// import { NextApiRequest, NextApiResponse } from "next";
// import { mongooseConnect } from "../../../lib/mongoose";
// import { Product } from "../../../models/Product";
// import { Category } from "../../../models/Category";
// import mongoose from "mongoose";

// export default async function handle(
// 	req: NextApiRequest,
// 	res: NextApiResponse
// ) {
// 	// Establish a connection to MongoDB using Mongoose
// 	await mongooseConnect();

// 	if (req.method === "GET") {
// 		// Get the selected filters from the query parameters
// 		const { price, battery, category } = req.query;
// 		console.log("QUERY", req.query);
// 		// Prepare the filter object based on the selected filters
// 		const filter: any = {};

// 		// Apply specific filters based on the selected options
// 		if (Array.isArray(price)) {
// 			const priceFilters = price.map((value) => {
// 				if (value.includes("-")) {
// 					const [minPrice, maxPrice] = value.split("-");
// 					return {
// 						$and: [
// 							{
// 								price: {
// 									$gte: parseInt(minPrice),
// 									$lte: parseInt(maxPrice),
// 								},
// 							},
// 						],
// 					};
// 				} else if (value === "0-10000") {
// 					return { price: { $lt: 10000 } };
// 				} else if (value === "70100-9999999") {
// 					return { price: { $gt: 70100 } };
// 				}
// 			});

// 			// if (Array.isArray(price)) {
// 			// 	filter.$or = [...(filter.$or || []), ...priceFilters];
// 			// } else if (typeof price === "string") {
// 			// 	filter.$or = [...(filter.$or || []), ...[priceFilters]];
// 			// }
// 			if (priceFilters.length > 0) {
// 				filter.$or = [...(filter.$or || []), ...priceFilters];
// 			}
// 		} else if (typeof price === "string") {
// 			if (price.includes("-")) {
// 				const [minPrice, maxPrice] = price.split("-");
// 				filter.$and = [
// 					{
// 						price: {
// 							$gte: parseInt(minPrice),
// 							$lte: parseInt(maxPrice),
// 						},
// 					},
// 				];
// 			} else if (price === "0-10000") {
// 				filter.$and = [
// 					{ price: { $lt: 10000 } }, // Add filter for price less than 10000
// 				];
// 			} else if (price === "70100-9999999") {
// 				filter.$and = [
// 					{ price: { $gt: 70100 } }, // Add filter for price less than 10000
// 				];
// 			}
// 		}
// 		console.log("testee", typeof price, price);

// 		/////////////////////////////////////////////
// 		if (Array.isArray(battery)) {
// 			const batteryFilters = battery.map((value) => {
// 				if (value.includes("-")) {
// 					const [minbattery, maxbattery] = value.split("-");
// 					return {
// 						$and: [
// 							{
// 								battery: {
// 									$gte: parseInt(minbattery),
// 									$lte: parseInt(maxbattery),
// 								},
// 							},
// 						],
// 					};
// 				} else if (value === "0-30") {
// 					return { battery: { $lt: 30 } };
// 				} else if (value === "61-9999") {
// 					return { battery: { $gt: 61 } };
// 				}
// 			});

// 			if (Array.isArray(battery)) {
// 				filter.$or = [...(filter.$or || []), ...batteryFilters];
// 			} else if (typeof battery === "string") {
// 				filter.$or = [...(filter.$or || []), ...[batteryFilters]];
// 			}

// 			if (batteryFilters.length > 0) {
// 				filter.$or = [...(filter.$or || []), ...batteryFilters];
// 			}
// 		} else if (typeof battery === "string") {
// 			if (battery.includes("-")) {
// 				const [minbattery, maxbattery] = battery.split("-");
// 				filter.$and = [
// 					{
// 						battery: {
// 							$gte: parseInt(minbattery),
// 							$lte: parseInt(maxbattery),
// 						},
// 					},
// 				];
// 			} else if (battery === "0-30") {
// 				filter.$or = [
// 					{ battery: { $lt: 30 } }, // Add filter for time less than 30 min
// 				];
// 			} else if (battery === "61-9999") {
// 				filter.$or = [
// 					{ battery: { $gt: 61 } }, // Add filter for time less than 60 min
// 				];
// 			}
// 		}
// 		//////////////////////////////////////////

// 		if (typeof category === "string") {
// 			// Retrieve the category object based on the name
// 			const categorys = await Product.find({ category: category }).exec();
// 			if (
// 				typeof category === "string" &&
// 				mongoose.Types.ObjectId.isValid(category)
// 			) {
// 				filter.category = new mongoose.Types.ObjectId(category);
// 			}
// 		}

// 		console.log("FILTER RESULT", filter);

// 		// Query the database with the applied filters
// 		const products = await Product.find(filter).populate("category").exec();

// 		res.json(products);
// 	}
// }
