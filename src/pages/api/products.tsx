import { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "../../../lib/mongoose";
import { Product } from "../../../models/Product";
import { isAdminRequest } from "../../../lib/auth";

// This is the default handler function for the API route
export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// Establish a connection to MongoDB using Mongoose
	await mongooseConnect();
	await isAdminRequest(req, res);

	if (req.method === "GET") {
		if (req.query?.id) {
			res.json(await Product.findOne({ _id: req.query.id }));
		} else {
			res.json(await Product.find());
		}
	}

	// Check if the HTTP method is POST
	if (req.method === "POST") {
		// Extract the name, description, and price from the request body
		const {
			name,
			description,
			price,
			images,
			category,
			speed,
			range,
			camera,
			battery,
			waterProof,
			skillLevel,
			ambient,
			followMode,
			autoReturn,
			weight,
			bestSeller,
			offer,
			offerPrice,
		} = req.body;

		// Create a new document in the "Product" collection using the extracted data
		const productDoc = await Product.create({
			name,
			description,
			price,
			images,
			category,
			speed,
			range,
			camera,
			battery,
			waterProof,
			skillLevel,
			ambient,
			followMode,
			autoReturn,
			weight,
			bestSeller,
			offer,
			offerPrice,
		});

		// Send the created product document as the response
		res.json(productDoc);
	}

	if (req.method === "PUT") {
		const {
			name,
			description,
			price,
			images,
			_id,
			category,
			speed,
			range,
			camera,
			battery,
			waterProof,
			skillLevel,
			ambient,
			followMode,
			autoReturn,
			weight,
			bestSeller,
			offer,
			offerPrice,
		} = req.body;
		await Product.updateOne(
			{ _id },
			{
				name,
				description,
				price,
				images,
				category,
				speed,
				range,
				camera,
				battery,
				waterProof,
				skillLevel,
				ambient,
				followMode,
				autoReturn,
				weight,
				bestSeller,
				offer,
				offerPrice,
			}
		);
		res.json(true);
	}

	if (req.method === "DELETE") {
		if (req.query?.id) {
			await Product.deleteOne({ _id: req.query.id });
			res.json(true);
		}
	}
}
