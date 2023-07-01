import { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "../../../lib/mongoose";
import { Product } from "../../../models/Product";
import { Order } from "../../../models/Order";

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
			if (!session || !session.data) {
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
					productsIds.filter((id: string) => id === productId)
						?.length || 0;
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
				name: session.data.user.name,
				email: session.data.user.email,
				paid: false,
			});

			const sessionStripe = await stripe.checkout.sessions.create({
				line_items,
				mode: "payment",
				customer_email: session.data.user.email,
				payment_method_types: ["card"],

				// custom_text: {
				// 	shipping_address: {
				// 		message:
				// 			"Use this card for checkout: 4242424242424242. MM/YY = 12/24. CVC = 123",
				// 	},
				// 	submit: {
				// 		message:
				// 			"We'll email you instructions on how to get started.",
				// 	},
				// },
				// for customer to provide address
				// shipping_address_collection: {
				// 	allowed_countries: ["GB"],
				// },

				success_url: process.env.PUBLIC_URL + "/cart?success=1",
				cancel_url: process.env.PUBLIC_URL + "/cart?cancel=1",
				metadata: {
					orderId: orderDoc._id.toString(),
				},
			});

			res.json({
				url: sessionStripe.url, // Corrected to sessionStripe.url instead of session.url
			});
		}
	} catch (error) {
		console.error("An error occurred:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
