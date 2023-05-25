"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { mongooseConnect } from "../../lib/mongoose";
import axios from "axios";
import { NewProductsProps } from "@/app/types";

export default function BestSellers() {
	const [products, setProducts] = useState<NewProductsProps[]>([]);
	console.log(typeof products);

	useEffect(() => {
		axios.get("/api/productsBestSellers").then((response) => {
			setProducts(response.data);
			console.log(products);
		});
	}, []);

	return (
		<>
			{products ? (
				<section className="h-screen ">
					<h1 className="text-3xl mt-20 text-black bg-white  py-2 font-bold font-unisansheavy text-center">
						BEST SELLERS
					</h1>
					<div className="flex justify-center   ">
						<div className="flex items-center justify-start  overflow-auto">
							{products.map((product) => (
								<div className="p-8" key={product._id}>
									<div className="w-[340px] h-[500px] text-center font-poppins font-normal text-white bg-gray950 rounded-md ">
										<h2 className="py-4">{product.name}</h2>
										<div>
											<div className="w-[280px] h-[250px] relative m-auto">
												{product.images && (
													<Image
														src={product?.images[0]}
														alt="drone"
														fill
														className="ml-auto mr-auto rounded-md object-cover"
													/>
												)}
											</div>

											<div className="flex gap-4 text-white justify-center py-2">
												<div className="flex gap-1 ">
													<Image
														src="/assets/svgs/speed.svg"
														alt="drone"
														width={20}
														height={20}
													/>
													{product.speed} mph
												</div>

												<div className="flex gap-1">
													<Image
														src="/assets/svgs/range.svg"
														alt="drone"
														width={20}
														height={20}
													/>
													{product.range} miles
												</div>

												<div className="flex gap-1">
													<Image
														src="/assets/svgs/battery.svg"
														alt="drone"
														width={20}
														height={20}
													/>
													{product.battery} min
												</div>
											</div>
											<hr className="h-[1px] w-4/5 bg-white border-none mb-2 ml-auto mr-auto  "></hr>
											<div className="flex justify-center items-center text-white font-semibold gap-4">
												<div className="flex items-center">
													<h3 className="text-orange text-xl">
														£
														{product.price &&
															(
																product.price /
																100
															).toLocaleString(
																undefined,
																{
																	minimumFractionDigits: 2,
																}
															)}
														&nbsp;
													</h3>
													<p>Or Pay monthly</p>
												</div>
												<Image
													src="/assets/svgs/heart.svg"
													alt="drone"
													width={25}
													height={25}
													className="cursor-pointer"
												/>
											</div>
											<hr className="h-[1px] w-4/5 bg-white border-none my-2 ml-auto mr-auto "></hr>
											<div className="flex justify-center gap-4">
												<button className="btn-third flex gap-1">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														strokeWidth={1.5}
														stroke="currentColor"
														className="w-6 h-6"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
														/>
													</svg>
													Add to cart
												</button>

												<Link
													href={"/details"}
													className="btn-third !bg-black !text-white hover:!bg-orange "
												>
													View More
												</Link>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			) : null}
		</>
	);
}
