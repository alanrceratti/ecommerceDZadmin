"use client";
import { CartContext } from "@/app/context/CartContext";
import { NewProductsProps } from "@/app/types";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";

export default function Cart() {
	const {} = useContext(CartContext);
	// const [products, SetProducts] = useState([]);
	const [products, setProducts] = useState<NewProductsProps[]>([]);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		if (cartProducts.length > 0) {
	// 			const response = await fetch(
	// 				`/api/cartProducts?id=${cartProducts}`
	// 			);
	// 			const data = await response.json();
	// 			if (data) {
	// 				setProducts(data);
	// 			}
	// 		}
	// 	};

	// 	fetchData();
	// }, [cartProducts]);

	return (
		<section className="bg-gray950 pl-8 ">
			<h1 className="text-3xl font-bold pt-16 text-white ">
				Shopping Cart
			</h1>
			<div className=" flex gap-10 mt-16 justify-center pb-16">
				<div className="bg-white w-1/2 rounded-md pb-16">
					<div className="relative ">
						<div className=" justify-between  mt-8 mx-4">
							<div className="m-4 flex justify-between items-center">
								<h2>Product Details</h2>
								<h3 className="ml-12">Quantity</h3>
								<h4>Total</h4>
							</div>
							{/* {cartProducts &&
								cartProducts.map((product) => ( */}
							<div className="flex justify-between">
								<div>
									<p className="font-semibold text-center  my-4">
										{/* {product.name} */}
									</p>
									{/* {product.images && (
												<Image
													src={product?.images[0]}
													alt="drone"
													width={200}
													height={200}
													className="rounded-md shadow-2xl border border-black border-opacity-40"
												/>
											)} */}
								</div>
								<div className="m-20">
									<div className="flex gap-4 justify-center items-center  ">
										<>
											<button className="px-3 py-1 bg-black text-white rounded-md">
												+
											</button>
										</>
										<div className="bg-gray-300 w-8 rounded-md ">
											<p className="text-center">
												{/* {
															cartProducts.filter(
																(p) =>
																	p._id ===
																	product._id
															).length
														} */}
											</p>
										</div>
										<button className="px-3 py-1 bg-black text-white rounded-md">
											-
										</button>
									</div>
									<button className="pt-12">Remove</button>
								</div>
								<div className="ml-4">
									<p className="mt-20">
										£
										{/* {product.price &&
													(
														(product.price *
															cartProducts.filter(
																(p) =>
																	p._id ===
																	product._id
															).length) /
														100
													).toLocaleString(
														undefined,
														{
															minimumFractionDigits: 2,
														}
													)} */}
									</p>
								</div>
							</div>
							{/* ))} */}
						</div>

						<hr className="h-[1px] w-full  bg-gray-300 border-none my-4 absolute top-6"></hr>
					</div>
				</div>

				<div className="bg-white w-[300px] rounded-md px-3 pb-32 ">
					<div className="w-full text-center">
						<button className="btn-primary my-4">
							Go To Checkout
						</button>
					</div>

					<h2 className="font-semibold">Order Summary</h2>

					<div>
						<div className="flex gap-4 justify-between">
							<p className="opacity-60">Sub-total</p>
							<p>£199</p>
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
							<p>£199</p>
						</div>
						<p className="opacity-40">Have a promo code?</p>
					</div>
				</div>
			</div>
		</section>
	);
}
