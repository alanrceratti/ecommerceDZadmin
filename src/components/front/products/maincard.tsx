"use client";
import useMedia from "@/app/hooks/useMedia";
import { NewProductsProps } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Loading from "@/components/front/products/loadingComponents";
import { Tooltip as ReactTooltip } from "react-tooltip";
import NoProductsLoad from "./noProductsLoad";

export default function MainCard() {
	const [products, setProducts] = useState<NewProductsProps[]>([]);
	const [noProducts, setNoProducts] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [page, setPage] = useState(1);
	const mobile = useMedia("(max-width: 640px)");
	const path = usePathname();
	const pageSize = 9;
	const searchParams = useSearchParams();
	const queryKeys = searchParams ? Array.from(searchParams.keys()) : [];

	const paramsString = searchParams ? searchParams.toString() : "";
	const decodedParamsString = decodeURIComponent(paramsString);
	const reconstructedURL = `${decodedParamsString}`;

	const categoryPath2 = path?.split("/")[2];
	const params = searchParams?.get("category");

	// console.log("params", params);
	// console.log("categoryPath", categoryPath);
	// console.log("categoryPath2", categoryPath2);
	// console.log("queryKeysLENGTH", queryKeys.length);
	// console.log("queryKeys", queryKeys[0]);
	// console.log("Reconstructed URL:", reconstructedURL);

	const handleLoadMore = () => {
		const nextPage = page + 1;
		setPage(nextPage);
	};

	const canLoadMore = products.length === page * pageSize;

	useEffect(() => {
		selectCategory(page);
	}, [page, path, reconstructedURL]);

	const selectCategory = async (currentPage: number) => {
		try {
			if (
				categoryPath2 !== "all" &&
				queryKeys.length === 1 &&
				queryKeys[0] === "category"
			) {
				setLoading(true);
				const response = await fetch(
					`/api/productsIndividualFilter?category=${params}`
				);
				const data = await response.json();
				if (data) {
					setLoading(false);
					setProducts(data);
				} else if (!data) {
					setNoProducts(true);
				}
			} else if (queryKeys.length >= 1 && queryKeys[0] !== "category") {
				setLoading(true);
				const response = await fetch(
					`/api/productsIndividualFilter?${reconstructedURL}`
				);
				const data = await response.json();
				if (data) {
					setLoading(false);
					setProducts(data);
				} else if (!data) {
					setNoProducts(true);
				}
			} else if (queryKeys.length > 1 && queryKeys[0] === "category") {
				setLoading(true);
				const response = await fetch(
					`/api/productsIndividualFilter?${reconstructedURL}`
				);
				const data = await response.json();
				if (data) {
					setLoading(false);
					setProducts(data);
				} else if (!data) {
					setNoProducts(true);
				}
			} else if (categoryPath2 === "all") {
				const response = await fetch(
					`/api/productsAll?page=${currentPage}&pageSize=${pageSize}`
				);
				setLoading(true);
				const data = await response.json();
				if (data) {
					setLoading(false);
					setProducts((prevProducts) => [...prevProducts, ...data]);
				}
			}
		} catch (error) {
			console.error(error);
		}
	};

	// useEffect(() => {
	// 	selectCategory(currentPage);
	// }, [path, reconstructedURL]);

	// useEffect(() => {
	// 	selectCategory();
	// }, [path, reconstructedURL]);

	// console.log("reconstructedURL", reconstructedURL);
	// console.log("path", path);

	return (
		<>
			<div className="  w-full text-center  bg-white min-h-[500px]   ">
				<div className="flex h-fit w-fit">
					<div className="flex h-fit w-fit">
						<button className=" btn-primaryy text-black m-2">
							All Offers
						</button>
						<button className=" btn-primaryy text-black m-2">
							Best Sellers
						</button>
					</div>
					<button className=" btn-primaryy text-black m-2">
						Sort by
					</button>
				</div>
				{products && products.length > 0 ? (
					<>
						<div className="flex flex-wrap items-center justify-center pt-9 ">
							{products.map((product) => (
								<div className="sm:p-8 p-2 " key={product._id}>
									<div className="w-[270px] sm:w-[340px] h-fit pb-4 sm:h-[470px] text-center font-poppins text-black font-light  bg-white shadow-2xl  rounded-md ">
										<h2 className="sm:py-4 py-2 font-semibold text-black ">
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
														sizes="(max-width: 280px) 100vw"
													/>
												)}
											</div>

											<div className="flex flex-wrap sm:gap-x-4 sm:mx-2 gap-x-2 gap-y-1 mx-2 text-black text-sm sm:text-base   justify-center py-2">
												<div className="flex gap-1 items-center  ">
													<Image
														src="/assets/svgs/speed.svg"
														alt="drone"
														width={20}
														height={20}
														id="speed"
													/>
													{product.speed} mph
													<ReactTooltip
														anchorSelect="#speed"
														place="bottom"
														content="Maximum speed"
														variant="dark"
														delayShow={500}
													/>
												</div>
												<div className="flex gap-1 items-center ">
													<Image
														src="/assets/svgs/range.svg"
														alt="drone"
														width={20}
														height={20}
														id="range"
													/>
													{product.range} miles
													<ReactTooltip
														anchorSelect="#range"
														place="bottom"
														content="Maximum Range For Control"
														variant="dark"
														delayShow={500}
													/>
												</div>
												<div className="flex gap-1  items-center ">
													<Image
														src="/assets/svgs/camera.svg"
														alt="drone"
														width={20}
														height={20}
														id="camera"
													/>
													{product.camera}
													<ReactTooltip
														anchorSelect="#camera"
														place="bottom"
														content="Camera Quality"
														variant="dark"
														delayShow={500}
													/>
												</div>
												<div className="flex gap-1 items-center ">
													<Image
														src="/assets/svgs/battery.svg"
														alt="drone"
														width={20}
														height={20}
														id="battery"
													/>
													{product.battery} min
													<ReactTooltip
														anchorSelect="#battery"
														place="bottom"
														content="Battery Duration"
														variant="dark"
														delayShow={500}
													/>
												</div>{" "}
												<div className="flex gap-1 items-center ">
													<Image
														src="/assets/svgs/water.svg"
														alt="drone"
														width={20}
														height={20}
														id="water"
													/>
													{product.waterProof}
													<ReactTooltip
														anchorSelect="#water"
														place="bottom"
														content="Water Proof"
														variant="dark"
														delayShow={500}
													/>
												</div>{" "}
												<div className="flex gap-1 items-center ">
													<Image
														src="/assets/svgs/weight.svg"
														alt="drone"
														width={20}
														height={20}
														id="weight"
													/>
													{product.weight} kg
													<ReactTooltip
														anchorSelect="#weight"
														place="bottom"
														content="Drone Weight"
														variant="dark"
														delayShow={500}
													/>
												</div>
											</div>
											<hr className="h-[1px] w-4/5 bg-white border-none mb-2 ml-auto mr-auto  "></hr>
											<div className="flex justify-center items-center text-black  gap-4">
												<div className="flex items-center justify-between ">
													<h3 className="text-orange text-base font-normal font-poppins sm:text-lg">
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
												{mobile ? (
													<Image
														src="/assets/svgs/heart-black.svg"
														alt="drone"
														width={20}
														height={20}
														className="cursor-pointer opacity-50"
													/>
												) : (
													<Image
														src="/assets/svgs/heart-black.svg"
														alt="drone"
														width={25}
														height={25}
														className="cursor-pointer opacity-50"
													/>
												)}
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
													href={`/product/details/${product._id}`}
													className="btn-third items-center !bg-black !text-white hover:!bg-orange flex gap-1 shadow-xl"
												>
													View More
												</Link>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
						{canLoadMore && (
							<button
								onClick={handleLoadMore}
								className="btn-primary m-8"
							>
								Load More
							</button>
						)}
					</>
				) : loading ? (
					<div className="m-auto w-full flex-grow">
						<Loading />
					</div>
				) : (
					<div className="m-auto w-full flex-grow">
						<NoProductsLoad />
					</div>
				)}
			</div>
		</>
	);
}
