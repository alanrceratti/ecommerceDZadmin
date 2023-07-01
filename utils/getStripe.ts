// utils/get-stripejs.ts
import { loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<any> | null = null;

const getStripe = () => {
	if (!stripePromise) {
		stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY!);
	}
	return stripePromise;
};

export default getStripe;
