"use client";
import useMedia from "@/app/hooks/useMedia";
import { NewProductsProps } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Loading from "@/components/front/products/loadingComponents";
import { Tooltip as ReactTooltip } from "react-tooltip";
import NoProductsLoad from "./noProductsLoad";
import { CartContext } from "@/app/context/CartContext";
import { ToastContainer } from "react-toastify";

export default function MainCard() {
	const [products, setProducts] = useState<NewProductsProps[]>([]);
	const [noProducts, setNoProducts] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [bestSeller, setBestSeller] = useState<boolean>(false);
	const [allOffers, setAllOffers] = useState<boolean>(false);
	const {
		setCartProducts,
		cartProducts,
		addProductToCart,
	} = useContext(CartContext);

	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(9);
	const [sortBy, setSortBy] = useState<string>("");
	const mobile = useMedia("(max-width: 640px)");
	const path = usePathname();

	const searchParams = useSearchParams();
	const queryKeys = searchParams ? Array.from(searchParams.keys()) : [];

	const paramsString = searchParams ? searchParams.toString() : "";
	const decodedParamsString = decodeURIComponent(paramsString);
	const reconstructedURL = `${decodedParamsString}`;

	const categoryPath2 = path?.split("/")[2];
	const params = searchParams?.get("category");

	const productsBestSellers = async () => {
		setBestSeller(true);
		try {
			const response = await fetch("/api/productsBestSellers");
			const data = await response.json();
			setProducts(data);
		} catch (error) {
			console.error(error);
		}
	};

	const productOffers = async () => {
		setAllOffers(true);

		try {
			const response = await fetch("/api/productsOffers");
			const data = await response.json();
			setProducts(data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleLoadMore = () => {
		const nextPage = page + 1;
		setPage(nextPage);
	};

	const handleSortByChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const selectedSortBy = event.target.value;
		setSortBy(selectedSortBy);
		setPage(1);
	};

	const canLoadMore = products.length === page * pageSize;

	function addToCart(productId: string) {
		addProductToCart(productId as NewProductsProps);
	}

	useEffect(() => {
		selectCategory(page);
	}, [page, path, reconstructedURL, sortBy]);

	const selectCategory = async (currentPage: number) => {
		try {
			if (
				categoryPath2 !== "all" &&
				queryKeys.length === 1 &&
				queryKeys[0] === "category" &&
				sortBy.length === 0
			) {
				setLoading(true);
				const response = await fetch(
					`/api/productsIndividualFilter?category=${params}`
				);
				const data = await response.json();
				if (data) {
					setProducts(data);
					setLoading(false);
				} else if (!data) {
					setNoProducts(true);
				}
			} else if (
				categoryPath2 !== "all" &&
				queryKeys.length === 1 &&
				queryKeys[0] === "category" &&
				sortBy.length !== 0
			) {
				setLoading(true);
				const response = await fetch(
					`/api/productsIndividualFilter?category=${params}&sortBy=${sortBy}`
				);
				const data = await response.json();
				if (data) {
					setProducts(data);
					setLoading(false);
				} else if (!data) {
					setNoProducts(true);
				}
			} else if (
				queryKeys.length >= 1 &&
				queryKeys[0] !== "category" &&
				sortBy.length === 0
			) {
				setLoading(true);
				const response = await fetch(
					`/api/productsIndividualFilter?${reconstructedURL}`
				);
				const data = await response.json();
				if (data) {
					setProducts(data);
					setLoading(false);
				} else if (!data) {
					setNoProducts(true);
				}
			} else if (
				queryKeys.length >= 1 &&
				queryKeys[0] !== "category" &&
				sortBy.length !== 0
			) {
				setLoading(true);
				const response = await fetch(
					`/api/productsIndividualFilter?${reconstructedURL}&sortBy=${sortBy}`
				);
				const data = await response.json();
				if (data) {
					setProducts(data);
					setLoading(false);
				} else if (!data) {
					setNoProducts(true);
				}
			} else if (
				queryKeys.length > 1 &&
				queryKeys[0] === "category" &&
				sortBy.length === 0
			) {
				setLoading(true);
				const response = await fetch(
					`/api/productsIndividualFilter?${reconstructedURL}`
				);
				const data = await response.json();
				if (data) {
					setProducts(data);
					setLoading(false);
				} else if (!data) {
					setNoProducts(true);
				}
			} else if (
				queryKeys.length > 1 &&
				queryKeys[0] === "category" &&
				sortBy.length !== 0
			) {
				setLoading(true);
				const response = await fetch(
					`/api/productsIndividualFilter?${reconstructedURL}&sortBy=${sortBy}`
				);
				const data = await response.json();
				if (data) {
					setProducts(data);
					setLoading(false);
				} else if (!data) {
					setNoProducts(true);
				}
			} else if (categoryPath2 === "all" && sortBy.length === 0) {
				setLoading(true);
				const response = await fetch(
					`/api/productsAll?page=${currentPage}&pageSize=${pageSize}`
				);
				const data = await response.json();
				if (data) {
					setProducts((prevProducts) => [...prevProducts, ...data]);
					setLoading(false);
				} else if (!data) {
					setNoProducts(true);
				}
			} else if (categoryPath2 === "all" && sortBy.length !== 0) {
				setProducts([]);
				setLoading(true);
				const response = await fetch(
					`/api/productsAll?page=${currentPage}&pageSize=${pageSize}&sortBy=${sortBy}`
				);
				const data = await response.json();
				if (data) {
					setProducts((prevProducts) => [...prevProducts, ...data]);
					setLoading(false);
				} else if (!data) {
					setNoProducts(true);
				}
			}
		} catch (error) {
			console.error(error);
		}
	};

	// console.log("sortBy", sortBy.length);

	return (
		<>
			<div className="  w-full text-center  bg-white min-h-[500px]   ">
				<div className=" mt-2 h-fit w-full justify-center items-center hidden sm:flex">
					<div className="flex h-fit w-fit  flex-wrap ">
						<button
							className=" btn-primaryy !text-red-600 m-2"
							onClick={productOffers}
						>
							All Offers
						</button>
						<button
							className=" btn-primaryy !text-green-600 m-2"
							onClick={productsBestSellers}
						>
							Best Sellers
						</button>
					</div>
					{!bestSeller && !allOffers && (
						<form className="btn-primaryy hover:!bg-white w-10/12 md:w-fit hover:!text-black flex justify-center items-center text-black !font-normal m-2">
							<label>Sort By</label>
							<select
								value={sortBy}
								onChange={handleSortByChange}
							>
								<option value="">Sort By</option>
								<option value="priceLowToHigh">
									Price: Low - High
								</option>
								<option value="priceHighToLow">
									Price: High - Low
								</option>
							</select>
						</form>
					)}
				</div>

				{products && products.length > 0 ? (
					<>
						<div className="flex flex-wrap items-center justify-center pt-9 ">
							{products.map((product) => (
								<div className="sm:p-8 p-2 " key={product._id}>
									<div className="w-[270px] sm:w-[340px] h-fit pb-4 sm:h-[470px] text-center font-poppins text-black font-light  bg-white shadow-2xl  rounded-md ">
										<h2
											className={`${
												product.bestSeller
													? "text-green-600"
													: product.offer
													? "text-red-600"
													: ""
											} sm:py-4 py-2 font-semibold text-black`}
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
												{product.offer ? (
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
												) : (
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
												)}
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
												<ToastContainer
													position="top-right"
													autoClose={3000}
													hideProgressBar={false}
													newestOnTop={false}
													closeOnClick
													rtl={false}
													pauseOnFocusLoss
													draggable
													pauseOnHover
													theme="dark"
												/>
												<button
													className="btn-third items-center !bg-black !text-white hover:!bg-orange flex gap-1 shadow-xl"
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
