import { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "../../../lib/mongoose";
import { Product } from "../../../models/Product";
import { Category } from "../../../models/Category";

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await mongooseConnect();

	if (req.method === "GET") {
		// res.json(await Product.find().populate("category", "name"));
		const categories = await Category.find({}, { name: 1, _id: 0 });
		res.json(categories);
	}
}
