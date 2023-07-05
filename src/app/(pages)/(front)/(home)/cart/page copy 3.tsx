// "use client";
// import { useEffect, useState } from "react";
// import { loadStripe, Stripe } from "@stripe/stripe-js";

// export default function Checkout() {
// 	const [stripe, setStripe] = useState<Stripe | null>(null);

// 	const initializeStripe = async () => {
// 		const stripeInstance = await loadStripe("pk_test_51NOlUIKsMrbItMxilJRd0NDAccjwfjUypS31CQr9H700YY8brif8ujmtPYxso6tSbeYWYvGfl3XOw0Cpo4lc9wkK00h7G3dtvO");
// 		setStripe(stripeInstance);
// 	};

// 	const handleCheckout = async () => {
// 		if (!stripe) {
// 			console.error("Stripe is not initialized.");
// 			initializeStripe();
// 			return;
// 		}

// 		const response = await fetch("/api/checkout", {
// 			method: "POST",
// 		});

// 		const { sessionId } = await response.json();

// 		const { error } = await stripe.redirectToCheckout({
// 			sessionId,
// 		});

// 		if (error) {
// 			console.error(error);
// 		}
// 	};

// 	return (
// 		<div>
// 			<h1>Checkout Page</h1>
// 			<button onClick={handleCheckout}>Checkout</button>
// 		</div>
// 	);
// }
