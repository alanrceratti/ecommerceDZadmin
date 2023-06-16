import { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "../../../lib/mongoose";
import { Product } from "../../../models/Product";
import { Category } from "../../../models/Category";
import mongoose from "mongoose";

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// Establish a connection to MongoDB using Mongoose
	await mongooseConnect();

	if (req.method === "GET") {
		// Get the selected filters from the query parameters
		const {
			price,
			battery,
			category,
			range,
			speed,
			camera,
			ambient,
			followMode,
			autoReturn,
			waterProof,
		} = req.query;
		console.log("QUERY", req.query);
		// Prepare the filter object based on the selected filters
		const filter: any = {};

		// Apply specific filters based on the selected options
		if (Array.isArray(price)) {
			const priceFilters = price.map((value) => {
				if (value.includes("-")) {
					const [minPrice, maxPrice] = value.split("-");
					return {
						price: {
							$gte: parseInt(minPrice),
							$lte: parseInt(maxPrice),
						},
					};
				}
				return null;
			});

			filter.$and = [
				...(filter.$and || []),
				{
					$or: priceFilters.filter(
						(priceFilter) => priceFilter !== null
					),
				},
			];
		} else if (typeof price === "string") {
			if (price.includes("-")) {
				const [minPrice, maxPrice] = price.split("-");
				filter.price = {
					$gte: parseInt(minPrice),
					$lte: parseInt(maxPrice),
				};
			} else if (price === "0-10000") {
				filter.price = {
					$lt: 10000,
				};
			} else if (price === "70100-9999999") {
				filter.price = {
					$gt: 70100,
				};
			}
		}

		/////////////////////////////////////////////////////////

		if (Array.isArray(battery)) {
			const batteryFilters = battery.map((value) => {
				if (value.includes("-")) {
					const [minBattery, maxBattery] = value.split("-");
					return {
						battery: {
							$gte: parseInt(minBattery),
							$lte: parseInt(maxBattery),
						},
					};
				}
				return null;
			});

			filter.$and = [
				...(filter.$and || []),
				{
					$or: batteryFilters.filter(
						(batteryFilter) => batteryFilter !== null
					),
				},
			];
		} else if (typeof battery === "string") {
			if (battery.includes("-")) {
				const [minBattery, maxBattery] = battery.split("-");
				filter.battery = {
					$gte: parseInt(minBattery),
					$lte: parseInt(maxBattery),
				};
			} else if (battery === "0-30") {
				filter.battery = {
					$lt: 30,
				};
			} else if (battery === "61-9999") {
				filter.battery = {
					$gte: 61,
				};
			}
		}
		// 	} else if (battery === "31-45") {
		// 		filter.battery = {
		// 			$gte: 31,
		// 			$lte: 45,
		// 		};
		// 	}
		// }

		////////////////////////////////////////////////////////////////

		if (Array.isArray(range)) {
			const rangeFilters = range.map((value) => {
				if (value.includes("-")) {
					const [minRange, maxRange] = value.split("-");
					return {
						range: {
							$gte: parseInt(minRange),
							$lte: parseInt(maxRange),
						},
					};
				}
				return null;
			});

			filter.$and = [
				...(filter.$and || []),
				{
					$or: rangeFilters.filter(
						(rangeFilter) => rangeFilter !== null
					),
				},
			];
		} else if (typeof range === "string") {
			if (range.includes("-")) {
				const [minRange, maxRange] = range.split("-");
				filter.range = {
					$gte: parseInt(minRange),
					$lte: parseInt(maxRange),
				};
			} else if (range === "0-1") {
				filter.range = {
					$lt: 1,
				};
			} else if (range === "4-99") {
				filter.range = {
					$gte: 4,
				};
			}
		}

		///////////////////////////////////////////////////////////////////

		if (Array.isArray(camera)) {
			const cameraFilters = camera.map((value) => {
				if (value !== "Nocamera") {
					return {
						camera: value,
					};
				}
				return null;
			});

			filter.$and = [
				...(filter.$and || []),
				{
					$or: cameraFilters.filter(
						(cameraFilter) => cameraFilter !== null
					),
				},
			];
		} else if (typeof camera === "string") {
			if (camera !== "Nocamera") {
				filter.camera = camera;
			} else if (camera === "Nocamera") {
				filter.camera = "Nocamera";
			}
		}

		///////////////////////////////////////////////////////////////////

		if (Array.isArray(speed)) {
			const speedFilters = speed.map((value) => {
				if (value.includes("-")) {
					const [minSpeed, maxSpeed] = value.split("-");
					return {
						speed: {
							$gte: parseInt(minSpeed),
							$lte: parseInt(maxSpeed),
						},
					};
				}
				return null;
			});

			filter.$and = [
				...(filter.$and || []),
				{
					$or: speedFilters.filter(
						(speedFilter) => speedFilter !== null
					),
				},
			];
		} else if (typeof speed === "string") {
			if (speed.includes("-")) {
				const [minSpeed, maxSpeed] = speed.split("-");
				filter.speed = {
					$gte: parseInt(minSpeed),
					$lte: parseInt(maxSpeed),
				};
			} else if (speed === "0-1") {
				filter.speed = {
					$lt: 1,
				};
			} else if (speed === "4-99") {
				filter.speed = {
					$gte: 4,
				};
			}
		}

		///////////////////////////////////////////////////////////////////

		if (typeof category === "string") {
			const categoryId = mongoose.Types.ObjectId.isValid(category)
				? new mongoose.Types.ObjectId(category)
				: null;
			filter.category = categoryId;
		}

		// Query the database with the applied filters
		const products = await Product.find(filter).populate("category").exec();

		res.json(products);
	}
}
