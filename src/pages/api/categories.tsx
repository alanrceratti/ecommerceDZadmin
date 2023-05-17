import { NextApiRequest, NextApiResponse } from "next";
import { Category } from "../../../models/Category";
import { mongooseConnect } from "../../../lib/mongoose";

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await mongooseConnect();

	if (req.method === "GET") {
		res.json(await Category.find());
	}

	if (req.method === "POST") {
		const { name } = req.body;

		const categoryDoc = await Category.create({ name });
		res.json(categoryDoc);
	}


}
