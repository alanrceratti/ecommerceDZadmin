import { NextApiRequest, NextApiResponse } from "next";
import { Category } from "../../../models/Category";
import { mongooseConnect } from "../../../lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions, isAdminRequest } from "../../../lib/auth";

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await mongooseConnect();
	await isAdminRequest(req, res);

	if (req.method === "GET") {
		res.json(await Category.find());
	}

	if (req.method === "POST") {
		const { name } = req.body;

		const categoryDoc = await Category.create({ name });
		res.json(categoryDoc);
	}

	if (req.method === "PUT") {
		const { name, _id } = req.body;
		await Category.updateOne({ _id }, { name });
		res.json(true);
	}

	if (req.method === "DELETE") {
		if (req.query?.id) {
			await Category.deleteOne({ _id: req.query.id });
			res.json(true);
		}
	}
}
