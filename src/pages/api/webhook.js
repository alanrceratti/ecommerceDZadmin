import { mongooseConnect } from "../../../lib/mongoose";
import Stripe from "stripe";
import { buffer } from "micro";
import { Order } from "../../../models/Order";

export default async function handle(req, res) {
	await mongooseConnect();

	const endpointSecret =
		"whsec_bb8674cd3cc4694156406a467076c64161f76d7131c7f10aa014b9d1e1ed470d";
	const sig = req.headers["stripe-signature"];
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2022-11-15",
	});

	let event;

	try {
		event = stripe.webhooks.constructEvent(
			await buffer(req),
			sig,
			endpointSecret
		);
	} catch (err) {
		res.status(400).send(`Webhook Error: ${err.message}`);
		return;
	}

	// Handle the event
	switch (event.type) {
		case "checkout.session.completed":
			const data = event.data.object;
			const orderId = data.metadata?.orderId;
			const paid = data.payment_status === "paid";
			if (orderId && paid) {
				await Order.findByIdAndUpdate(orderId, {
					paid: true,
				});
			}
			// Then define and call a function to handle the event payment_intent.succeeded
			break;

		default:
			console.log(`Unhandled event type ${event.type}`);
	}
	res.status(200).send("ok");
}

export const config = {
	api: { bodyParser: false },
};
