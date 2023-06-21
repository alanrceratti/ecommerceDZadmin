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
// 		const {
// 			price,
// 			battery,
// 			category,
// 			range,
// 			skill,
// 			speed,
// 			camera,
// 			ambient,
// 			followMode,
// 			autoReturn,
// 			waterProof,
// 		} = req.query;
// 		console.log("QUERY", req.query);
// 		// Prepare the filter object based on the selected filters
// 		const filter: any = {};

// 		/////////////////////////////////////////////////////////
// 		// PRICE FILTER
// 		/////////////////////////////////////////////////////////
// 		// Apply specific filters based on the selected options
// 		if (Array.isArray(price)) {
// 			const priceFilters = price.map((value) => {
// 				if (value.includes("-")) {
// 					const [minPrice, maxPrice] = value.split("-");
// 					return {
// 						price: {
// 							$gte: parseInt(minPrice),
// 							$lte: parseInt(maxPrice),
// 						},
// 					};
// 				}
// 				return null;
// 			});

// 			filter.$and = [
// 				...(filter.$and || []),
// 				{
// 					$or: priceFilters.filter(
// 						(priceFilter) => priceFilter !== null
// 					),
// 				},
// 			];
// 		} else if (typeof price === "string") {
// 			if (price.includes("-")) {
// 				const [minPrice, maxPrice] = price.split("-");
// 				filter.price = {
// 					$gte: parseInt(minPrice),
// 					$lte: parseInt(maxPrice),
// 				};
// 			} else if (price === "0-10000") {
// 				filter.price = {
// 					$lt: 10000,
// 				};
// 			} else if (price === "70100-9999999") {
// 				filter.price = {
// 					$gt: 70100,
// 				};
// 			}
// 		}

// 		/////////////////////////////////////////////////////////
// 		// BATTERY FILTER
// 		/////////////////////////////////////////////////////////
// 		if (Array.isArray(battery)) {
// 			const batteryFilters = battery.map((value) => {
// 				if (value.includes("-")) {
// 					const [minBattery, maxBattery] = value.split("-");
// 					return {
// 						battery: {
// 							$gte: parseInt(minBattery),
// 							$lte: parseInt(maxBattery),
// 						},
// 					};
// 				}
// 				return null;
// 			});

// 			filter.$and = [
// 				...(filter.$and || []),
// 				{
// 					$or: batteryFilters.filter(
// 						(batteryFilter) => batteryFilter !== null
// 					),
// 				},
// 			];
// 		} else if (typeof battery === "string") {
// 			if (battery.includes("-")) {
// 				const [minBattery, maxBattery] = battery.split("-");
// 				filter.battery = {
// 					$gte: parseInt(minBattery),
// 					$lte: parseInt(maxBattery),
// 				};
// 			} else if (battery === "0-30") {
// 				filter.battery = {
// 					$lt: 30,
// 				};
// 			} else if (battery === "61-9999") {
// 				filter.battery = {
// 					$gte: 61,
// 				};
// 			}
// 		}
// 		// 	} else if (battery === "31-45") {
// 		// 		filter.battery = {
// 		// 			$gte: 31,
// 		// 			$lte: 45,
// 		// 		};
// 		// 	}
// 		// }

// 		/////////////////////////////////////////////////////////
// 		// RANGE FILTER
// 		/////////////////////////////////////////////////////////

// 		if (Array.isArray(range)) {
// 			const rangeFilters = range.map((value) => {
// 				if (value.includes("-")) {
// 					const [minRange, maxRange] = value.split("-");
// 					return {
// 						range: {
// 							$gte: parseInt(minRange),
// 							$lte: parseInt(maxRange),
// 						},
// 					};
// 				}
// 				return null;
// 			});

// 			filter.$and = [
// 				...(filter.$and || []),
// 				{
// 					$or: rangeFilters.filter(
// 						(rangeFilter) => rangeFilter !== null
// 					),
// 				},
// 			];
// 		} else if (typeof range === "string") {
// 			if (range.includes("-")) {
// 				const [minRange, maxRange] = range.split("-");
// 				filter.range = {
// 					$gte: parseInt(minRange),
// 					$lte: parseInt(maxRange),
// 				};
// 			} else if (range === "0-1") {
// 				filter.range = {
// 					$lt: 1,
// 				};
// 			} else if (range === "4-99") {
// 				filter.range = {
// 					$gte: 4,
// 				};
// 			}
// 		}

// 		/////////////////////////////////////////////////////////
// 		// SKILL LEVEL FILTER
// 		/////////////////////////////////////////////////////////

// 		if (Array.isArray(skill)) {
// 			const skillFilters = skill.map((value) => {
// 				if (value !== "string") {
// 					return {
// 						skillLevel: value,
// 					};
// 				}
// 				return null;
// 			});

// 			filter.$and = [
// 				...(filter.$and || []),
// 				{
// 					$or: skillFilters.filter(
// 						(skillFilter) => skillFilter !== null
// 					),
// 				},
// 			];
// 		} else if (typeof skill === "string") {
// 			if (skill === "Beginner") {
// 				filter.skillLevel = "Beginner";
// 			} else if (skill === "Semi-Professional") {
// 				filter.skillLevel = "Semi-Professional";
// 			} else if (skill === "Professional") {
// 				filter.skillLevel = "Professional";
// 			}
// 		}

// 		/////////////////////////////////////////////////////////
// 		// CAMERA FILTER
// 		/////////////////////////////////////////////////////////

// 		if (Array.isArray(camera)) {
// 			const cameraFilters = camera.map((value) => {
// 				if (value !== "Nocamera") {
// 					return {
// 						camera: value,
// 					};
// 				}
// 				return null;
// 			});

// 			filter.$and = [
// 				...(filter.$and || []),
// 				{
// 					$or: cameraFilters.filter(
// 						(cameraFilter) => cameraFilter !== null
// 					),
// 				},
// 			];
// 		} else if (typeof camera === "string") {
// 			if (camera !== "Nocamera") {
// 				filter.camera = camera;
// 			} else if (camera === "Nocamera") {
// 				filter.camera = "Nocamera";
// 			}
// 		}

// 		/////////////////////////////////////////////////////////
// 		// SPEED FILTER
// 		/////////////////////////////////////////////////////////

// 		if (Array.isArray(speed)) {
// 			const speedFilters = speed.map((value) => {
// 				if (value.includes("-")) {
// 					const [minSpeed, maxSpeed] = value.split("-");
// 					return {
// 						speed: {
// 							$gte: parseInt(minSpeed),
// 							$lte: parseInt(maxSpeed),
// 						},
// 					};
// 				}
// 				return null;
// 			});

// 			filter.$and = [
// 				...(filter.$and || []),
// 				{
// 					$or: speedFilters.filter(
// 						(speedFilter) => speedFilter !== null
// 					),
// 				},
// 			];
// 		} else if (typeof speed === "string") {
// 			if (speed.includes("-")) {
// 				const [minSpeed, maxSpeed] = speed.split("-");
// 				filter.speed = {
// 					$gte: parseInt(minSpeed),
// 					$lte: parseInt(maxSpeed),
// 				};
// 			} else if (speed === "0-20") {
// 				filter.speed = {
// 					$lt: 20,
// 				};
// 			} else if (speed === "50-999") {
// 				filter.speed = {
// 					$gte: 50,
// 				};
// 			}
// 		}

// 		/////////////////////////////////////////////////////////
// 		// AMBIENT FILTER
// 		/////////////////////////////////////////////////////////

// 		if (Array.isArray(ambient)) {
// 			const ambientFilters = ambient.map((value) => {
// 				if (value !== "string") {
// 					return {
// 						ambient: value,
// 					};
// 				}
// 				return null;
// 			});

// 			filter.$and = [
// 				...(filter.$and || []),
// 				{
// 					$or: ambientFilters.filter(
// 						(ambientFilter) => ambientFilter !== null
// 					),
// 				},
// 			];
// 		} else if (typeof ambient === "string") {
// 			if (ambient === "Outdoor") {
// 				filter.ambient = "Outdoor";
// 			} else if (ambient === "Indoor") {
// 				filter.ambient = "Indoor";
// 			} else if (ambient === "Both") {
// 				filter.ambient = "Both";
// 			}
// 		}

// 		/////////////////////////////////////////////////////////
// 		// FOLLOW MODE FILTER
// 		/////////////////////////////////////////////////////////

// 		if (Array.isArray(followMode)) {
// 			const followModeFilters = followMode.map((value) => {
// 				if (value !== "string") {
// 					return {
// 						followMode: value,
// 					};
// 				}
// 				return null;
// 			});

// 			filter.$and = [
// 				...(filter.$and || []),
// 				{
// 					$or: followModeFilters.filter(
// 						(followModeFilter) => followModeFilter !== null
// 					),
// 				},
// 			];
// 		} else if (typeof followMode === "string") {
// 			if (followMode === "Yes") {
// 				filter.followMode = "Yes";
// 			} else if (followMode === "No") {
// 				filter.followMode = "No";
// 			}
// 		}

// 		/////////////////////////////////////////////////////////
// 		// AUTO RETURN FILTER
// 		/////////////////////////////////////////////////////////

// 		if (Array.isArray(autoReturn)) {
// 			const autoReturnFilters = autoReturn.map((value) => {
// 				if (value !== "string") {
// 					return {
// 						autoReturn: value,
// 					};
// 				}
// 				return null;
// 			});

// 			filter.$and = [
// 				...(filter.$and || []),
// 				{
// 					$or: autoReturnFilters.filter(
// 						(autoReturnFilter) => autoReturnFilter !== null
// 					),
// 				},
// 			];
// 		} else if (typeof autoReturn === "string") {
// 			if (autoReturn === "Yes") {
// 				filter.autoReturn = "Yes";
// 			} else if (autoReturn === "No") {
// 				filter.autoReturn = "No";
// 			}
// 		}

// 		/////////////////////////////////////////////////////////
// 		// WATER PROOF FILTER
// 		/////////////////////////////////////////////////////////

// 		if (Array.isArray(waterProof)) {
// 			const waterProofFilters = waterProof.map((value) => {
// 				if (value !== "string") {
// 					return {
// 						waterProof: value,
// 					};
// 				}
// 				return null;
// 			});

// 			filter.$and = [
// 				...(filter.$and || []),
// 				{
// 					$or: waterProofFilters.filter(
// 						(waterProofFilter) => waterProofFilter !== null
// 					),
// 				},
// 			];
// 		} else if (typeof waterProof === "string") {
// 			if (waterProof === "Yes") {
// 				filter.waterProof = "Yes";
// 			} else if (waterProof === "No") {
// 				filter.waterProof = "No";
// 			}
// 		}

// 		// Query the database with the applied filters

// 		// let query = await Product.find(filter).populate("category");

// 		if (typeof category === "string") {
// 			const categoryId = mongoose.Types.ObjectId.isValid(category)
// 				? new mongoose.Types.ObjectId(category)
// 				: null;
// 			filter.category = categoryId;
// 		}
// 		const sortBy = req.query.sortBy as string;
// 		let query = Product.find(filter).populate("category");

// 		if (sortBy) {
// 			let sortOption: any = {};
// 			if (sortBy === "priceLowToHigh") {
// 				sortOption = { price: 1 }; // Sort by price: Low - High
// 			} else if (sortBy === "priceHighToLow") {
// 				sortOption = { price: -1 }; // Sort by price: High - Low
// 			}

// 			query = query.sort(sortOption);
// 		}

// 		const products = await query.exec();
// 		res.json(products);

// 		console.log("RESULTS", filter);
// 	}
// }
