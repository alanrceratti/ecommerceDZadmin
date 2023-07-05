// import { NextApiRequest, NextApiResponse } from "next";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
// 	apiVersion: "2022-11-15",
// });

// export default async function handler(
// 	req: NextApiRequest,
// 	res: NextApiResponse
// ) {
// 	if (req.method === "POST") {
// 		try {
// 			const session = await stripe.checkout.sessions.create({
// 				payment_method_types: ["card"],
// 				line_items: [
// 					{
// 						price_data: {
// 							currency: "usd",
// 							product_data: {
// 								name: "Sample Product",
// 							},
// 							unit_amount: 1000,
// 						},
// 						quantity: 1,
// 					},
// 				],
// 				mode: "payment",
// 				success_url: "http://localhost:3000/success",
// 				cancel_url: "http://localhost:3000/cancel",
// 			});

// 			res.status(200).json({ sessionId: session.id });
// 		} catch (error: any) {
// 			res.status(500).json({ error: error.message });
// 		}
// 	} else {
// 		res.setHeader("Allow", "POST");
// 		res.status(405).end("Method Not Allowed");
// 	}
// }
