// import { NextApiRequest, NextApiResponse } from "next";
// import { mongooseConnect } from "../../../lib/mongoose";
// import { Product } from "../../../models/Product";
// import mongoose from "mongoose";

// // This is the default handler function for the API route
// export default async function handle(
// 	req: NextApiRequest,
// 	res: NextApiResponse
// ) {
// 	// Establish a connection to MongoDB using Mongoose
// 	await mongooseConnect();

// 	if (req.method === "GET") {
// 		const pageSize = parseInt(req.query.pageSize as string) || 9;
// 		const page = parseInt(req.query.page as string) || 1;

// 		const skip = (page - 1) * pageSize;
// 		const query = Product.find().skip(skip).limit(pageSize);
// 		const products = await query.exec();
// 		res.json(products);
// 	}
// }
