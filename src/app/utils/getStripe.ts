import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
	if (!stripePromise) {
		stripePromise = loadStripe(
			"pk_test_51NOlUIKsMrbItMxilJRd0NDAccjwfjUypS31CQr9H700YY8brif8ujmtPYxso6tSbeYWYvGfl3XOw0Cpo4lc9wkK00h7G3dtvO"
		);
	}
	return stripePromise;
};

export default getStripe;
