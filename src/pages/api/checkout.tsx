import { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "../../../lib/mongoose";
import { Product } from "../../../models/Product";
import { Category } from "../../../models/Category";
import { Order } from "../../../models/Order";
import { useSession } from "next-auth/react";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		if (req.method !== "POST") {
			res.json("Not POST request");
			return;
		} else {
			const { products, session } = req.body;
			if (!session || !session.data.user) {
				res.status(400).json({ error: "Invalid session data" });
				return;
			}
			await mongooseConnect();
			const productsIds = products.split(",");
			const uniqueIds = [...new Set(productsIds)];
			const productsInfo = await Product.find({ _id: uniqueIds });

			let line_items = [];
			for (const productId of uniqueIds) {
				const productInfo = productsInfo.find(
					(p) => p._id.toString() === productId
				);
				const quantity =
					productsIds.filter(
						(id: string) => id === (productId as string)
					)?.length || 0;
				if (quantity > 0 && productInfo) {
					line_items.push({
						quantity,
						price_data: {
							currency: "GBP",
							product_data: { name: productInfo.name },
							unit_amount: quantity * productInfo.price,
						},
					});
				}
			}
			const orderDoc = await Order.create({
				line_items,
				name: session?.data?.user.name,
				email: session?.data?.user.email,
				paid: false,
			});

			const sessionStripe = await stripe.checkout.sessions.create({
				line_items,
				mode: "payment",
				customer_email: session.data.user.email,
				success_url: process.env.PUBLIC_URL + "/cart?success=1",
				cancel_url: process.env.PUBLIC_URL + "/cart?cancel=1",
				metadata: {
					orderId: orderDoc._id.toString(),
				},
			});

			res.json({
				url: session.url,
			});
			// res.json(orderDoc);
		}
	} catch (error) {
		console.error("An error occurred:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
