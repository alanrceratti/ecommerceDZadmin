import { NextApiRequest, NextApiResponse } from "next";
import { Category } from "../../../models/Category";
import { mongooseConnect } from "../../../lib/mongoose";
import { Product } from "../../../models/Product";

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await mongooseConnect();

	if (req.method === "GET") {
		res.json(await Product.find({ _id: "646e6c25affb3bbaa0805fc4" }));
	}
}
