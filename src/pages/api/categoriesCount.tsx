import { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "../../../lib/mongoose";
import { Product } from "../../../models/Product";

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await mongooseConnect();
	try {
		if (req.method === "GET") {
			res.json(await Product.find().populate("category", "name"));
		}
	} catch (error) {
		console.error("An error occurred:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
