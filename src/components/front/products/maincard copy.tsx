// "use client";
// import useMedia from "@/app/hooks/useMedia";
// import { NewProductsProps } from "@/app/types";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useParams, usePathname, useSearchParams } from "next/navigation";
// import Loading from "@/components/front/products/loading";

// export default function MainCard() {
// 	const [products, setProducts] = useState<NewProductsProps[]>([]);
// 	const mobile = useMedia("(max-width: 640px)");
// 	const path = usePathname();

// 	const searchParams = useSearchParams();
// 	const queryKeys = searchParams ? Array.from(searchParams.keys()) : [];

// 	const paramss = useParams();
// 	// console.log("HSAUDSADUHSA", paramss);
// 	// for (const [key, value] of searchParams.entries()) {
// 	// 	console.log(`${key}, ${value}`);
// 	// }

// 	const paramsString = searchParams ? searchParams.toString() : "";
// 	const decodedParamsString = decodeURIComponent(paramsString);
// 	const reconstructedURL = `${decodedParamsString}`;

// 	const categoryPath = path?.split("/")[4];
// 	const categoryPath2 = path?.split("/")[2];
// 	const params = searchParams?.get("category");

// 	// console.log("params", params);
// 	// console.log("categoryPath", categoryPath);
// 	// console.log("categoryPath2", categoryPath2);
// 	// console.log("queryKeysLENGTH", queryKeys.length);
// 	// console.log("queryKeys", queryKeys[0]);
// 	// console.log("Reconstructed URL:", reconstructedURL);

// 	const selectCategory = async () => {
// 		try {
// 			if (
// 				categoryPath2 !== "all" &&
// 				queryKeys.length === 1 &&
// 				queryKeys[0] === "category"
// 			) {
// 				const response = await fetch(
// 					`/api/productsIndividualFilter?category=${params}`
// 				);
// 				const data = await response.json();
// 				setProducts(data);
// 				console.log("1111111");
// 			} else if (queryKeys.length >= 1 && queryKeys[0] !== "category") {
// 				const response = await fetch(
// 					`/api/productsIndividualFilter?${reconstructedURL}`
// 				);
// 				const data = await response.json();
// 				setProducts(data);
// 				console.log("222222222", reconstructedURL);
// 			} else if (queryKeys.length > 1 && queryKeys[0] === "category") {
// 				const response = await fetch(
// 					`/api/productsIndividualFilter?${reconstructedURL}`
// 				);
// 				const data = await response.json();
// 				setProducts(data);
// 				console.log("33333333");
// 			} else if (categoryPath2 === "all") {
// 				const response = await fetch(`/api/productsAll`);
// 				const data = await response.json();
// 				setProducts(data);
// 				console.log("44444444");
// 			}
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	};

// 	useEffect(() => {
// 		selectCategory();
// 	}, [path, reconstructedURL]);
// 	// useEffect(() => {
// 	// 	selectCategory();
// 	// }, [path, reconstructedURL]);
// 	// console.log("reconstructedURL", reconstructedURL);
// 	// console.log("path", path);

// 	return (
// 		<>
// 			<div className="flex justify-center w-full sm:justify-normal bg-white min-h-[500px]   ">
// 				{products.length > 0 ? (
// 					<div className="flex flex-wrap items-center justify-center pt-9 ">
// 						{products.map((product) => (
// 							<div className="sm:p-8 p-2 " key={product._id}>
// 								<div className="w-[270px] sm:w-[340px] h-[340px] sm:h-[470px] text-center font-poppins text-black font-light  bg-white shadow-2xl  rounded-md ">
// 									<h2 className="sm:py-4 py-2 font-semibold text-black ">
// 										{product.name}
// 									</h2>
// 									<div>
// 										<div className="w-[180px] h-[150px] sm:w-[280px] sm:h-[250px] relative m-auto">
// 											{product.images && (
// 												<Image
// 													src={product?.images[0]}
// 													alt="drone"
// 													fill
// 													className="ml-auto mr-auto rounded-md object-cover"
// 													sizes="(max-width: 280px) 100vw"
// 												/>
// 											)}
// 										</div>

// 										<div className="block sm:gap-4 gap-2 text-black text-sm sm:text-base  py-2">
// 											<div className="flex justify-center gap-2">
// 												<div className="flex gap-1 items-center  ">
// 													<Image
// 														src="/assets/svgs/speed.svg"
// 														alt="drone"
// 														width={20}
// 														height={20}
// 													/>
// 													{product.speed} mph
// 												</div>
// 												<div className="flex gap-1 items-center ">
// 													<Image
// 														src="/assets/svgs/range.svg"
// 														alt="drone"
// 														width={20}
// 														height={20}
// 													/>
// 													{product.range} miles
// 												</div>
// 												<div className="flex gap-1 items-center ">
// 													<Image
// 														src="/assets/svgs/camera.svg"
// 														alt="drone"
// 														width={20}
// 														height={20}
// 													/>
// 													{product.camera}
// 												</div>
// 											</div>
// 											<div className="flex justify-center ">
// 												<div className="flex gap-1 items-center ">
// 													<Image
// 														src="/assets/svgs/battery.svg"
// 														alt="drone"
// 														width={20}
// 														height={20}
// 													/>
// 													{product.battery} min
// 												</div>{" "}
// 												<div className="flex gap-1 items-center ">
// 													<Image
// 														src="/assets/svgs/water.svg"
// 														alt="drone"
// 														width={20}
// 														height={20}
// 													/>
// 													{product.waterProof} min
// 												</div>{" "}
// 												<div className="flex gap-1 items-center ">
// 													<Image
// 														src="/assets/svgs/weight.svg"
// 														alt="drone"
// 														width={20}
// 														height={20}
// 													/>
// 													{product.weight} min
// 												</div>
// 											</div>
// 										</div>
// 										<hr className="h-[1px] w-4/5 bg-white border-none mb-2 ml-auto mr-auto  "></hr>
// 										<div className="flex justify-center items-center text-black  gap-4">
// 											<div className="flex items-center justify-between ">
// 												<h3 className="text-orange text-base font-normal font-poppins sm:text-lg">
// 													£
// 													{product.price &&
// 														(
// 															product.price / 100
// 														).toLocaleString(
// 															undefined,
// 															{
// 																minimumFractionDigits: 2,
// 															}
// 														)}
// 													&nbsp;
// 												</h3>
// 												<p>Or Pay monthly</p>
// 											</div>
// 											{mobile ? (
// 												<Image
// 													src="/assets/svgs/heart.svg"
// 													alt="drone"
// 													width={20}
// 													height={20}
// 													className="cursor-pointer "
// 												/>
// 											) : (
// 												<Image
// 													src="/assets/svgs/heart-black.svg"
// 													alt="drone"
// 													width={25}
// 													height={25}
// 													className="cursor-pointer opacity-50"
// 												/>
// 											)}
// 										</div>
// 										<hr className="h-[1px] w-4/5 bg-gray-300 border-none my-2 ml-auto mr-auto "></hr>
// 										<div className="flex justify-center items-center gap-4">
// 											<button className="btn-third items-center !bg-black !text-white hover:!bg-orange flex gap-1 shadow-xl">
// 												<svg
// 													xmlns="http://www.w3.org/2000/svg"
// 													fill="none"
// 													viewBox="0 0 24 24"
// 													strokeWidth={1.5}
// 													stroke="currentColor"
// 													className="w-6 h-6"
// 												>
// 													<path
// 														strokeLinecap="round"
// 														strokeLinejoin="round"
// 														d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
// 													/>
// 												</svg>
// 												Add to cart
// 											</button>

// 											<Link
// 												href={`/product/details/${product._id}`}
// 												className="btn-third items-center !bg-black !text-white hover:!bg-orange flex gap-1 shadow-xl"
// 											>
// 												View More
// 											</Link>
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						))}
// 					</div>
// 				) : (
// 					<div className="m-auto w-full flex-grow">
// 						<Loading />
// 					</div>
// 				)}
// 			</div>
// 		</>
// 	);
// }