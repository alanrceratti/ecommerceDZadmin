"use client";
import { CartContext } from "@/app/context/CartContext";
import { NewProductsProps } from "@/app/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";

export default function Cart() {
	const {
		cartProducts,
		plusOneProduct,
		lessOneProduct,
		removeProduct,
		setCartProducts,
		clearCart,
	} = useContext(CartContext);
	const [products, setProducts] = useState<NewProductsProps[]>([]);
	const [updatedProducts, setUpdatedProducts] = useState<
		{ _id: string; count: number }[]
	>([]);
	const [openAlert, setOpenAlert] = useState<boolean>(false);
	const router = useRouter();

	const session = useSession();

	useEffect(() => {
		const updatedCart = Array.from(new Set(cartProducts)).join("&id=");

		const fetchData = async () => {
			if (updatedCart.length > 0) {
				const response = await fetch(
					`/api/cartProducts?id=${updatedCart}`
				);
				const data = await response.json();
				if (data) {
					setProducts(data);
				}
			}
		};

		fetchData();
	}, [cartProducts.length, cartProducts]);

	function plusProduct(productId: string) {
		plusOneProduct(productId as NewProductsProps);
	}

	function lessProduct(productId: string) {
		lessOneProduct(productId as NewProductsProps);
	}

	function removeOneProduct(productId: string) {
		removeProduct(productId as NewProductsProps);
	}

	function redirectCheckout() {
		if (localStorage.getItem("cart")) {
			localStorage.removeItem("cart");
		}
		setCartProducts([]);
		router.push("/");
	}

	let total = 0;
	for (const productId of cartProducts) {
		const product = products.find((p) => p._id === productId);
		const price =
			(product?.offer && product?.offerPrice) ||
			(!product?.offer && product?.price) ||
			0;
		total += price;
	}

	const totalPrice = (total / 100).toLocaleString(undefined, {
		minimumFractionDigits: 2,
	});

	function handleCheckout() {
		if (!session.data) {
			router.push("/login");
			return;
		}
		// setOpenAlert(true);
		else if (session.data) {
			handleAfterAlert();
		}
	}

	async function handleAfterAlert() {
		// setOpenAlert(false);
		const requestBody = {
			products: cartProducts.join(","),
			session: session,
		};

		try {
			const res = await fetch("/api/checkout", {
				method: "POST",
				body: JSON.stringify(requestBody),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!res.ok) {
				throw new Error("Failed to initiate checkout");
			}

			const stripe = await loadStripe(
				"pk_test_51NOlUIKsMrbItMxilJRd0NDAccjwfjUypS31CQr9H700YY8brif8ujmtPYxso6tSbeYWYvGfl3XOw0Cpo4lc9wkK00h7G3dtvO"
			);

			const json = await res.json();
			console.log("API Response:", json);

			const { id } = json;
			console.log("Session ID:", id);

			if (stripe) {
				if (id) {
					stripe.redirectToCheckout({
						sessionId: id,
					});
				} else {
					throw new Error("Failed to retrieve valid session ID");
				}
			} else {
				throw new Error("Failed to load Stripe");
			}
		} catch (error) {
			console.error("An error occurred during checkout:", error);

			throw error; // rethrow the error to see the full stack trace
		}
	}
	if (typeof window !== "undefined") {
		if (window.location.href.includes("success")) {
			if (localStorage.getItem("cart")) {
				localStorage.removeItem("cart");
			}
			clearCart();
			return (
				<>
					<div className="bg-white text-center h-[250px] ">
						<h1 className="md:text-4xl text-2xl text-green-800 font-unisansheavy pt-8">
							Payment successful!
						</h1>
						<h1 className="md:text-2xl text-xl pb-8 font-poppins font-light">
							We are preparing your order, soon you will receive
							our email...
						</h1>

						<button
							className="btn-primary"
							onClick={redirectCheckout}
						>
							Shop more
						</button>
					</div>
				</>
			);
		}
	}

	return (
		<section className="bg-gray950 lg:pl-8 lg:pb-32 pb-8  ">
			{/* {openAlert && (
				<>
					<div className="absolute text-white bg-black bg-opacity-90 w-full h-full text-center z-50 overflow-hidden flex flex-col justify-center items-center">
						<h1 className="w-[300px]">
							Please copy this card number details if you would
							like to test the checkout:
						</h1>
						<h2>
							Number: <b>4242424242424242</b>
						</h2>
						<h3>
							MM/YY: <b>12/24</b>
						</h3>
						<h4>
							CVC:<b>123</b>
						</h4>
						<div className="pt-8">
							<button
								className="btn-primary"
								onClick={handleCheckout}
							>
								OK
							</button>
						</div>
					</div>
				</>
			)} */}
			<h1 className="lg:text-3xl text-xl font-bold lg:pt-16 pt-4 text-white ml-4 ">
				Shopping Cart
			</h1>
			<div className="flex justify-center items-center lg:items-start mt-16 gap-4 flex-col lg:flex-row ">
				<div className=" flex gap-10 relative  justify-center pb-16 p-4 rounded-md bg-white">
					{total > 0 ? (
						<>
							<table>
								<thead>
									<tr>
										<th>Product Details</th>
										<th>Quantity</th>
										<th>Total</th>
									</tr>
								</thead>

								<tbody className="">
									{products.map((product) => (
										<tr key={product._id}>
											<td className="font-bold text-center pt-4">
												{product.name}
												<div></div>
												<div className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] relative m-auto">
													{product.images && (
														<Image
															src={
																product
																	?.images[0]
															}
															alt="drone"
															fill
															className="ml-auto mr-auto rounded-md object-cover"
															sizes="(max-width: 280px) 100vw"
														/>
													)}
												</div>
											</td>
											<td>
												<div className="lg:m-20 pt-8">
													<div className="flex lg:gap-4 sm:mx-16 mx-2 gap-1 justify-center items-center  ">
														<>
															<button
																className="px-3 py-1 bg-black text-white rounded-md"
																onClick={() =>
																	product._id &&
																	lessProduct(
																		product?._id
																	)
																}
															>
																-
															</button>
														</>
														<div className="bg-gray-300 w-8 rounded-md ">
															<p className="text-center">
																{
																	cartProducts.filter(
																		(id) =>
																			id ===
																			product._id
																	).length
																}
															</p>
														</div>
														<button
															className="px-3 py-1 bg-black text-white rounded-md"
															onClick={() =>
																product._id &&
																plusProduct(
																	product?._id
																)
															}
														>
															+
														</button>
													</div>
													<button
														className="lg:pt-12 sm:mx-16 mx-2"
														onClick={() =>
															product._id &&
															removeOneProduct(
																product._id
															)
														}
													>
														Remove
													</button>
												</div>
											</td>
											<td>
												£
												{product.offer &&
													product.offerPrice &&
													(
														(product.offerPrice *
															cartProducts.filter(
																(id) =>
																	id ===
																	product._id
															).length) /
														100
													).toLocaleString(
														undefined,
														{
															minimumFractionDigits: 2,
														}
													)}
												{!product.offer &&
													product.price &&
													(
														(product.price *
															cartProducts.filter(
																(id) =>
																	id ===
																	product._id
															).length) /
														100
													).toLocaleString(
														undefined,
														{
															minimumFractionDigits: 2,
														}
													)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<hr className="h-[1px] w-full  bg-gray-300 border-none my-4 absolute top-8"></hr>
						</>
					) : (
						total <= 0 && (
							<div className="w-[320px] h-[200px] text-center ">
								<h1 className="text-lg">Your cart is empty.</h1>

								<h1 className="text-lg mt-4">
									Go back and find your drone!
								</h1>
								<button
									className="btn-primary mt-8"
									onClick={() => router.push("/products/all")}
								>
									Find my Drone
								</button>
							</div>
						)
					)}
				</div>

				<div>
					{total > 0 && (
						<div className="bg-white w-[300px] rounded-md p-4  ">
							<div className="w-full text-center">
								<button
									className="btn-primary my-4"
									onClick={handleCheckout}
								>
									Go To Checkout
								</button>
							</div>

							<h2 className="font-semibold">Order Summary</h2>

							<div>
								<div className="flex gap-4 justify-between">
									<p className="opacity-60">Sub-total</p>£
									{totalPrice}
								</div>
								<div className="flex gap-4 justify-between">
									<p className="opacity-60">Shipping</p>
									<p>FREE</p>
								</div>
								<hr className="h-[1px] w-full  bg-gray-300 border-none my-4 "></hr>
								<div className="flex gap-4 justify-between">
									<h3 className="opacity-70 font-medium">
										Estimated Total
									</h3>
									<p> {totalPrice}</p>
								</div>
								<div className="">
									<input
										className="opacity-60"
										placeholder="Have a promo code?"
									/>
									<button className="px-3 py-1 bg-slate-200 rounded-md opacity-60 text-slate-600">
										Add
									</button>
								</div>
								<input
									name="products"
									type="hidden"
									value={cartProducts.join(",")}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
