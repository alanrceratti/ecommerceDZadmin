"use client";
import { CartContext } from "@/app/context/CartContext";
import { CartProps, NewProductsProps } from "@/app/types";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";

export default function Cart() {
	const { cartProducts, plusOneProduct } = useContext(CartContext);
	const [products, setProducts] = useState<NewProductsProps[]>([]);
	const [updatedProducts, setUpdatedProducts] = useState<
		{ _id: string; count: number }[]
	>([]);

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
	}, [cartProducts]);

	function plusProduct(productId: string) {
		plusOneProduct(productId as NewProductsProps);
	}
	return (
		<section className="bg-gray950 pl-8 ">
			<h1 className="text-3xl font-bold pt-16 text-white ">
				Shopping Cart
			</h1>
			<div className="flex justify-center items-start mt-16 gap-4 ">
				<div className=" flex gap-10 relative  justify-center pb-16 p-4 rounded-md bg-white">
					<table>
						<thead>
							<tr>
								<th>Product Details</th>
								<th>Quantity</th>
								<th>Total</th>
							</tr>
						</thead>

						<tbody>
							{products.map((product) => (
								<tr key={product._id}>
									<td className="font-bold text-center font-po">
										{product.name}
										{product.images && (
											<Image
												src={product?.images[0]}
												alt="drone"
												width={160}
												height={160}
												className="rounded-md shadow-2xl border border-black border-opacity-40"
											/>
										)}
									</td>
									<td>
										<div className="m-20">
											<div className="flex gap-4 justify-center items-center  ">
												<>
													<button className="px-3 py-1 bg-black text-white rounded-md">
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
											<button className="pt-12">
												Remove
											</button>
										</div>
									</td>
									<td>
										{" "}
										£
										{product.price &&
											(
												(product.price *
													cartProducts.filter(
														(id) =>
															id === product._id
													).length) /
												100
											).toLocaleString(undefined, {
												minimumFractionDigits: 2,
											})}
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<hr className="h-[1px] w-full  bg-gray-300 border-none my-4 absolute top-8"></hr>
				</div>

				<div>
					{products.length > 0 && (
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
									{products.map((value) => (
										<p key={value._id}></p>
									))}
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
					)}
				</div>
			</div>
		</section>
	);
}
