"use client";
import { NewProductsProps } from "@/app/types";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "@/components/front/products/loading";
import SimilarProducts from "@/components/front/products/similarProducts";

export default function ProductDetails() {
	const [product, setProduct] = useState<NewProductsProps>();
	const [isLoading, setIsLoading] = useState(true);
	const path = usePathname();
	const idPath = path?.split("/")[3];

	const selectedProduct = () => {
		fetch(`/api/productDetails?id=${idPath}`)
			.then((response) => response.json())
			.then((data) => {
				setProduct(data);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error(error);
				setIsLoading(false);
			});
	};

	useEffect(() => {
		selectedProduct();
	}, []);

	return (
		<main>
			{isLoading ? (
				<Loading />
			) : (
				<>
					{product && (
						<div className="w-full max-w-[1440px] m-auto ">
							<div className="m-4">
								<button
									onClick={() => history.back()}
									className="text-sm h-fit w-fit font-poppins text-gray-500 mb-4 hover:text-white cursor-pointer"
								>
									Back to results
								</button>
								<div className=" sm:flex sm:justify-between w-full mx-auto text-center ">
									<div className="w-[280px] h-[250px] sm:w-[300px] sm:h-[350px]  md:w-[450px] md:h-[440px] lg:w-[600px] lg:h-[580px] relative m-auto ">
										{product.images && (
											<Image
												src={product?.images[0]}
												alt="drone"
												fill
												className="ml-auto mr-auto rounded-md object-cover border-[4px] sm:border-[4px] border-white border-opacity-50"
											/>
										)}
									</div>
									<div className="relative mx-auto w-5/6 sm:w-fit">
										<div className="flex flex-col sm:gap-4 gap-2  text-white text-sm sm:text-base   justify-center py-2   ">
											<h1 className="font-unisansheavy text-2xl">
												{product.name}
											</h1>

											<div className="flex gap-1 items-center  ">
												<Image
													src="/assets/svgs/speed.svg"
													alt="drone"
													width={20}
													height={20}
												/>
												Top speed up to {product.speed}{" "}
												mph
											</div>

											<div className="flex gap-1 items-center ">
												<Image
													src="/assets/svgs/range.svg"
													alt="drone"
													width={20}
													height={20}
												/>
												Distance range - {product.range}{" "}
												miles
											</div>
											<div className="flex gap-1 items-center ">
												<Image
													src="/assets/svgs/camera.svg"
													alt="drone"
													width={20}
													height={20}
												/>
												Camera Quality -{" "}
												{product.camera}
											</div>
											<div className="flex gap-1 items-center pr-16 ">
												<Image
													src="/assets/svgs/battery.svg"
													alt="drone"
													width={20}
													height={20}
												/>
												Battery duration up to&nbsp;
												{product.battery}
												minutes
											</div>
											<div className="flex gap-1 items-center ">
												<Image
													src="/assets/svgs/water.svg"
													alt="drone"
													width={20}
													height={20}
												/>
												Water proof -{" "}
												{product.waterProof}
											</div>
											<div className="flex gap-1 items-center ">
												<Image
													src="/assets/svgs/weight.svg"
													alt="drone"
													width={20}
													height={20}
												/>
												Total weight - {product.weight}
												kg
											</div>
											<hr className=" h-4/6 sm:h-3/6 lg:h-2/5 absolute -right-2 top-14 w-[1px] bg-white border-none  "></hr>

											<hr className="h-[1px] w-full  bg-white border-none   "></hr>
										</div>
										<div className="flex items-center justify-between pt-8">
											<div>
												<h3 className="text-white font-poppins text-base font-normal sm:text-2xl">
													£
													{product.price &&
														(
															product.price / 100
														).toLocaleString(
															undefined,
															{
																minimumFractionDigits: 2,
															}
														)}
													&nbsp;
												</h3>
												<p className="text-gray-500 text-sm">
													*Finance available
												</p>
											</div>

											<button className="btn-primary items-center !text-lg  !text-black hover:!text-white hover:!bg-black flex gap-1 shadow-xl">
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
										</div>
									</div>
								</div>
							</div>
							<p className="font-poppins font-normal text-base text-white whitespace-pre-wrap w-4/5 ml-auto mr-auto my-8">
								{product.description}
							</p>
						</div>
					)}
				</>
			)}
			<SimilarProducts />
		</main>
	);
}
