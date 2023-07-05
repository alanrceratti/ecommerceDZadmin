// "use client";
// import { useEffect, useState } from "react";
// import { loadStripe, Stripe } from "@stripe/stripe-js";

// export default function Checkout() {
// 	const [stripe, setStripe] = useState<Stripe | null>(null);

// 	const initializeStripe = async () => {
// 		const stripeInstance = await loadStripe(
// 			"pk_test_51NOlUIKsMrbItMxilJRd0NDAccjwfjUypS31CQr9H700YY8brif8ujmtPYxso6tSbeYWYvGfl3XOw0Cpo4lc9wkK00h7G3dtvO"
// 		);
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
// 		<section className="bg-gray950 lg:pl-8 lg:pb-32 pb-8  ">
// 			<h1 className="lg:text-3xl text-xl font-bold lg:pt-16 pt-4 text-white ml-4 ">
// 				Shopping Cart
// 			</h1>
// 			<div className="flex justify-center items-center lg:items-start mt-16 gap-4 flex-col lg:flex-row ">
// 				<div className=" flex gap-10 relative  justify-center pb-16 p-4 rounded-md bg-white">
// 					{/* {total > 0 ? (
// 						<>
// 							<table>
// 								<thead>
// 									<tr>
// 										<th>Product Details</th>
// 										<th>Quantity</th>
// 										<th>Total</th>
// 									</tr>
// 								</thead>

// 								<tbody className="">
// 									{products.map((product) => (
// 										<tr key={product._id}>
// 											<td className="font-bold text-center pt-4">
// 												{product.name}
// 												<div></div>
// 												<div className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] relative m-auto">
// 													{product.images && (
// 														<Image
// 															src={
// 																product
// 																	?.images[0]
// 															}
// 															alt="drone"
// 															fill
// 															className="ml-auto mr-auto rounded-md object-cover"
// 															sizes="(max-width: 280px) 100vw"
// 														/>
// 													)}
// 												</div>
// 											</td>
// 											<td>
// 												<div className="lg:m-20 pt-8">
// 													<div className="flex lg:gap-4 gap-1 justify-center items-center  ">
// 														<>
// 															<button
// 																className="px-3 py-1 bg-black text-white rounded-md"
// 																onClick={() =>
// 																	product._id &&
// 																	lessProduct(
// 																		product?._id
// 																	)
// 																}
// 															>
// 																-
// 															</button>
// 														</>
// 														<div className="bg-gray-300 w-8 rounded-md ">
// 															<p className="text-center">
// 																{
// 																	cartProducts.filter(
// 																		(id) =>
// 																			id ===
// 																			product._id
// 																	).length
// 																}
// 															</p>
// 														</div>
// 														<button
// 															className="px-3 py-1 bg-black text-white rounded-md"
// 															onClick={() =>
// 																product._id &&
// 																plusProduct(
// 																	product?._id
// 																)
// 															}
// 														>
// 															+
// 														</button>
// 													</div>
// 													<button
// 														className="lg:pt-12 "
// 														onClick={() =>
// 															product._id &&
// 															removeOneProduct(
// 																product._id
// 															)
// 														}
// 													>
// 														Remove
// 													</button>
// 												</div>
// 											</td>
// 											<td>
// 												£
// 												{product.offer &&
// 													product.offerPrice &&
// 													(
// 														(product.offerPrice *
// 															cartProducts.filter(
// 																(id) =>
// 																	id ===
// 																	product._id
// 															).length) /
// 														100
// 													).toLocaleString(
// 														undefined,
// 														{
// 															minimumFractionDigits: 2,
// 														}
// 													)}
// 												{!product.offer &&
// 													product.price &&
// 													(
// 														(product.price *
// 															cartProducts.filter(
// 																(id) =>
// 																	id ===
// 																	product._id
// 															).length) /
// 														100
// 													).toLocaleString(
// 														undefined,
// 														{
// 															minimumFractionDigits: 2,
// 														}
// 													)}
// 											</td>
// 										</tr>
// 									))}
// 								</tbody>
// 							</table>
// 							<hr className="h-[1px] w-full  bg-gray-300 border-none my-4 absolute top-8"></hr>
// 						</>
// 					) : (
// 						total <= 0 && (
// 							<div className="w-[320px] h-[200px] text-center ">
// 								<h1 className="text-lg">Your cart is empty.</h1>

// 								<h1 className="text-lg mt-4">
// 									Go back and find your drone!
// 								</h1>
// 								<button
// 									className="btn-primary mt-8"
// 									onClick={() => router.push("/products/all")}
// 								>
// 									Find my Drone
// 								</button>
// 							</div>
// 						)
// 					)} */}
// 				</div>

// 				<div>
// 					{/* {total > 0 && ( */}
// 					<div className="bg-white w-[300px] rounded-md p-4  ">
// 						<div className="w-full text-center">
// 							<button
// 								className="btn-primary my-4"
// 								onClick={handleCheckout}
// 							>
// 								Go To Checkout
// 							</button>
// 						</div>

// 						<h2 className="font-semibold">Order Summary</h2>

// 						<div>
// 							<div className="flex gap-4 justify-between">
// 								<p className="opacity-60">Sub-total</p>£
// 								{/* {totalPrice} */}
// 							</div>
// 							<div className="flex gap-4 justify-between">
// 								<p className="opacity-60">Shipping</p>
// 								<p>FREE</p>
// 							</div>
// 							<hr className="h-[1px] w-full  bg-gray-300 border-none my-4 "></hr>
// 							<div className="flex gap-4 justify-between">
// 								<h3 className="opacity-70 font-medium">
// 									Estimated Total
// 								</h3>
// 								{/* <p> {totalPrice}</p> */}
// 							</div>
// 							<div className="">
// 								<input
// 									className="opacity-60"
// 									placeholder="Have a promo code?"
// 								/>
// 								<button className="px-3 py-1 bg-slate-200 rounded-md opacity-60 text-slate-600">
// 									Add
// 								</button>
// 							</div>
// 							<input
// 								name="products"
// 								type="hidden"
// 								// value={cartProducts.join(",")}
// 							/>
// 						</div>
// 					</div>
// 					{/* )} */}
// 				</div>
// 			</div>
// 		</section>
// 	);
// }
