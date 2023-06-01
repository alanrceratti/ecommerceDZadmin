"use client";
import { NewProductsProps } from "@/app/types";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

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
				<h1>HUASDUHASDASUHDHUSD</h1>
			) : (
				<>
					{product && (
						<div className="w-full max-w-[1440px] m-auto ">
							<div className="  m-4">
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
												className="ml-auto mr-auto rounded-md object-cover border-[8px] sm:border-[16px] border-white border-opacity-50"
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
											<div className="flex gap-1 items-center ">
												<Image
													src="/assets/svgs/battery.svg"
													alt="drone"
													width={20}
													height={20}
												/>
												Battery duration up to{" "}
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

											<hr className="h-[1px] w-full bg-white border-none   "></hr>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</>
			)}
		</main>
	);
}
