"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { mongooseConnect } from "../../lib/mongoose";
import axios from "axios";
import { NewProductsProps } from "@/app/types";
import useMedia from "@/app/hooks/useMedia";

export default function Offers() {
	const [products, setProducts] = useState<NewProductsProps[]>([]);
	// const mobile = useMedia("(max-width: 990px)");

	useEffect(() => {
		axios.get("/api/productsOffers").then((response) => {
			setProducts(response.data);
		});
	}, []);

	return (
		<>
			{products ? (
				<section className="h-fit ">
					<h1 className="text-xl sm:text-3xl sm:mt-1 mt-2 text-slate-50 bg-red-700  py-2 font-bold font-unisansheavy text-center">
						WEEK OFFERS
					</h1>
					<div className="flex justify-center bg-white  ">
						<div className="flex items-center justify-start  overflow-auto bg-white">
							{products.map((product) => (
								<div className="sm:p-8 p-2" key={product._id}>
									<div className="w-[270px] sm:w-[340px] h-[340px] sm:h-[470px] text-center font-poppins text-black font-light shadow-2xl bg-white rounded-md ">
										<h2 className="sm:py-4 py-2 font-semibold ">
											{product.name}
										</h2>
										<div>
											<div className="w-[180px] h-[150px] sm:w-[280px] sm:h-[250px] relative m-auto">
												{product.images && (
													<Image
														src={product?.images[0]}
														alt="drone"
														fill
														className="ml-auto mr-auto rounded-md object-cover"
													/>
												)}
											</div>

											<div className="flex sm:gap-4 gap-2 text-black text-sm sm:text-base   justify-center py-2">
												<div className="flex gap-1 items-center  ">
													<Image
														src="/assets/svgs/speed.svg"
														alt="drone"
														width={20}
														height={20}
													/>
													{product.speed} mph
												</div>

												<div className="flex gap-1 items-center ">
													<Image
														src="/assets/svgs/range.svg"
														alt="drone"
														width={20}
														height={20}
													/>
													{product.range} miles
												</div>

												<div className="flex gap-1 items-center ">
													<Image
														src="/assets/svgs/battery.svg"
														alt="drone"
														width={20}
														height={20}
													/>
													{product.battery} min
												</div>
											</div>
											<hr className="h-[1px] w-4/5 bg-gray-300 border-none mb-2 ml-auto mr-auto  "></hr>
											<div className="flex justify-center items-center text-black  gap-4">
												<div className="flex items-center justify-between ">
													<div className="flex">
														<h3 className="text-orange text-xl items-center flex">
															<p className="text-black text-sm font-normal sm:text-base">
																From &nbsp;
															</p>
															£
															<s className=" text-base font-normal ">
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
															</s>
															&nbsp;
														</h3>
													</div>
													<div className="flex items-center">
														<p className="text-base font-normal sm:text-lg  ">
															Now&nbsp;
														</p>
														<h3 className="text-base font-normal sm:text-lg text-red-500">
															£
															{product.offerPrice &&
																(
																	product.offerPrice /
																	100
																).toLocaleString(
																	undefined,
																	{
																		minimumFractionDigits: 2,
																	}
																)}
														</h3>
													</div>
												</div>
											</div>
											<hr className="h-[1px] w-4/5 bg-gray-300 border-none my-2 ml-auto mr-auto "></hr>
											<div className="flex justify-center items-center gap-4">
												<button className="btn-third items-center !bg-black !text-white hover:!bg-orange flex gap-1 shadow-xl">
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
													className="btn-third !bg-white !text-black hover:!bg-orange shadow-md shadow-slate-300 "
												>
													View More
												</Link>
											</div>
										</div>
									</div>
								</div>
							))}

							{/* <svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6 absolute right-2 sm:hidden"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8.25 4.5l7.5 7.5-7.5 7.5"
								/>
							</svg> */}
						</div>
					</div>
				</section>
			) : null}
		</>
	);
}
