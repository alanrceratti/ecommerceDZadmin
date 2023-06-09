"use client";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { NewProductsProps } from "@/app/types";
import useMedia from "@/app/hooks/useMedia";
import { CartContext } from "@/app/context/CartContext";

export default function SimilarProducts({ Category }: { Category: string }) {
	const [products, setProducts] = useState<NewProductsProps[]>([]);
	const mobile = useMedia("(max-width: 640px)");
	const currentcategory = Category;
	const { addProductToCart } = useContext(CartContext);

	const selectedProduct = () => {
		fetch("/api/similarProducts?id=" + currentcategory)
			.then((response) => response.json())
			.then((data) => {
				setProducts(data);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	function addToCart(productId: string) {
		addProductToCart(productId as NewProductsProps);
	}

	useEffect(() => {
		if (currentcategory) {
			selectedProduct();
		}
	}, [currentcategory]);

	return (
		<>
			{products && currentcategory ? (
				<section className="h-fit ">
					<h1 className="text-base sm:text-xl sm:mt-20 mt-2 text-gray-950 bg-gray-200  py-2 font-medium font-poppins  text-center">
						Similar products you may like...
					</h1>
					<div className="flex justify-center   ">
						<div className="flex items-center justify-start  overflow-auto ">
							{products.map((product) => (
								<div className="sm:p-8 p-2" key={product._id}>
									<div className="w-[270px] sm:w-[340px] h-[340px] sm:h-[470px] text-center font-poppins text-black font-light shadow-2xl bg-gray950  rounded-md ">
										<h2
											className="sm:py-4 py-2 font-semibold text-white cursor-pointer"
											onClick={() =>
												window.open(
													`/product/details/${product._id}`,
													"_blank"
												)
											}
										>
											{product.name}
										</h2>
										<div>
											<div className="w-[180px] h-[150px] sm:w-[280px] sm:h-[250px] relative m-auto">
												{product.images && (
													<Image
														src={product?.images[0]}
														alt="drone"
														fill
														className="ml-auto mr-auto rounded-md object-cover cursor-pointer"
														onClick={() =>
															window.open(
																`/product/details/${product._id}`,
																"_blank"
															)
														}
													/>
												)}
											</div>

											<div className="flex sm:gap-4 gap-2 text-white text-sm sm:text-base   justify-center py-2">
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
											<hr className="h-[1px] w-4/5 bg-white border-none mb-2 ml-auto mr-auto  "></hr>
											<div className="flex justify-center items-center text-white  gap-4">
												<div className="flex items-center justify-between ">
													<h3 className="text-orange text-base font-normal sm:text-lg">
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
												{/* {mobile ? (
													<Image
														src="/assets/svgs/heart.svg"
														alt="drone"
														width={20}
														height={20}
														className="cursor-pointer"
													/>
												) : (
													<Image
														src="/assets/svgs/heart.svg"
														alt="drone"
														width={25}
														height={25}
														className="cursor-pointer"
													/>
												)} */}
											</div>
											<hr className="h-[1px] w-4/5 bg-gray-300 border-none my-2 ml-auto mr-auto "></hr>
											<div className="flex justify-center items-center gap-4">
												<button
													className="btn-third items-center !bg-orange  !text-white hover:!bg-amber-400 flex gap-1 shadow-xl"
													onClick={() =>
														product._id &&
														addToCart(product._id)
													}
												>
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
													href={`product/details/${product._id}`}
													className="btn-third !bg-white !text-black hover:!text-orange   "
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
