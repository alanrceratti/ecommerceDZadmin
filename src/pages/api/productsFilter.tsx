import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../../models/Product";
import { mongooseConnect } from "../../../lib/mongoose";

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await mongooseConnect();

	if (req.method === "GET") {
		if (req.query?.category) {
			res.json(await Product.find({ category: req.query.category }));
		} else {
			res.json(await Product.find());
		}
	}
}
