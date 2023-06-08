// "use client";
// import useMedia from "@/app/hooks/useMedia";
// import { FilterOption, Filters, NewProductsProps } from "@/app/types";
// import Link from "next/link";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useRef, useState } from "react";
// import productsFilter from "../products/productsFilters.json";
// import useOutsideClick from "@/app/hooks/useOnClickOutside";

// export default function ProductsFilter() {
// 	const [isOpen, setIsOpen] = useState(false);
// 	const [openFilter, setOpenFilter] = useState<string[]>([]);
// 	const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([]);

// 	const mobile = useMedia("(max-width: 640px)");

// 	const ref = useRef<HTMLDivElement | null>(null);
// 	const searchParams = useSearchParams();
// 	const searchParams2 = usePathname();
// 	const params = searchParams2?.split("/")[2];
// 	// const urlSearchParams = new URLSearchParams(window.location.search);
// 	// const retrieveParams = URLSearchParams.getAll("prices")
// 	// console.log("heeloo", searchParams?.getAll("category", "prices"));
// 	// const allURLparams = searchParams ? Array.from(searchParams.keys()) : [];
// 	// for (const [key, value] of searchParams.entries()) {
// 	// 	if (key && value) {
// 	// 		const param = `${key}, ${value}`;
// 	// 		allURLparams.push(param);
// 	// 	}
// 	// }
// 	const paramsPrice = searchParams?.get("price");
// 	const paramsPrice2 = searchParams?.getAll("price");
// 	const paramsCategory = searchParams?.get("category");
// 	const paramsTime = searchParams?.getAll("time");
// 	const [selected, setSelected] = useState<string[]>([]);
// 	const filterOptions = [] as FilterOption[];
// 	const allParams = [paramsPrice, paramsPrice2, paramsCategory, paramsTime];
// 	const prices = paramsPrice2?.map((priceParam) => {
// 		// Assuming the price format is "minValue-maxValue"
// 		const value = priceParam;
// 		setSelected(value);
// 		return { priceParam };
// 	});

// 	console.log(selected, "HUEHUEHUEH");

// 	const categoryPath = searchParams?.get("category");

// 	// console.log("FILTER FILTER ", searchParams2);

// 	const filters = productsFilter as Filters;
// 	const active = "text-orange";
// 	const notActive = "text-black";

// 	function handleFilters() {
// 		setIsOpen((isOpen) => !isOpen);
// 	}

// 	function handleFiltersOpen(filterName: string) {
// 		if (openFilter.includes(filterName)) {
// 			setOpenFilter(openFilter.filter((filter) => filter !== filterName));
// 		} else {
// 			setOpenFilter([...openFilter, filterName]);
// 			setIsOpen(true);
// 		}
// 	}

// 	//if user scroll any direction, menu close
// 	useEffect(() => {
// 		let prevScrollY = window.pageYOffset;
// 		const scrollListener = () => {
// 			const scrollY = window.pageYOffset;
// 			if (scrollY !== prevScrollY) {
// 				setIsOpen(false);
// 			}
// 			prevScrollY = scrollY;
// 		};
// 		window.addEventListener("touchmove", scrollListener);
// 		return () => {
// 			window.removeEventListener("touchmove", scrollListener);
// 		};
// 	}, []);

// 	const handleFilterChange = (option: FilterOption) => {
// 		const isSelected = selectedFilters.includes(option);
// 		if (isSelected) {
// 			setSelectedFilters(
// 				selectedFilters.filter((filter) => filter !== option)
// 			);
// 		} else {
// 			setSelectedFilters([...selectedFilters, option]);
// 		}
// 		return isSelected;
// 	};
// 	let selectedFilters2 = [] as string[];
// 	selectedFilters.forEach((filter) => {
// 		const filterParam = `${filter.labelName}=${filter.value}`;
// 		selectedFilters2.push(filterParam);
// 	});
// 	const queryString = selectedFilters2.join("&");

// 	useEffect(() => {
// 		const urlSearchParams = new URLSearchParams(window.location.search);
// 		filters.filters.forEach((filter) => {
// 			filter.options.forEach((option) => {
// 				const paramName = `${option.labelName}=${option.value}`;
// 				if (urlSearchParams.getAll(paramName).length > 0) {
// 					filterOptions.push(option);
// 				}
// 			});
// 		});

// 		setSelectedFilters(filterOptions);
// 		console.log(filterOptions, "allURLparams");
// 		console.log(allParams, "params");
// 		console.log(selectedFilters, "searchParams");
// 	}, [queryString]);
// 	const router = useRouter();
// 	const urlOnlyFilter = `/products/filter?${queryString}`;
// 	const urlWithCategoryWithFilter = `/products/filter?category=${categoryPath}&${queryString}`;
// 	const urlAll = `/products/all`;

// 	// console.log("categoryPath ", selectedFilters2);

// 	const handleClickOutside = () => {
// 		setIsOpen(false);
// 	};
// 	useEffect(() => {
// 		selectedFilters2 = [];
// 	}, [selectedFilters2]);

// 	useEffect(() => {
// 		if (queryString.length > 0 && !categoryPath) {
// 			router.push(urlOnlyFilter);
// 		} else if (
// 			queryString.length === 0 &&
// 			!categoryPath &&
// 			params === "all"
// 		) {
// 			router.replace(urlAll);
// 		} else if (categoryPath && queryString.length > 0) {
// 			router.replace(urlWithCategoryWithFilter);
// 		}
// 	}, [queryString]);

// 	useEffect(() => {
// 		const urlSearchParams = queryString;
// 		const filterOptions = [] as FilterOption[];

// 		filters.filters.forEach((filter) => {
// 			filter.options.forEach((option) => {
// 				const paramName = `${option.labelName}=${option.value}`;
// 				if (urlSearchParams.includes(paramName)) {
// 					filterOptions.push(option);
// 				}
// 			});
// 		});

// 		setSelectedFilters(filterOptions);
// 	}, [queryString]);

// 	useOutsideClick(ref, handleClickOutside);

// 	return (
// 		<main className="w-[150px] ">
// 			{/* {result && result.length > 0 ? ( */}
// 			<div className="m-2 font-poppins text-black ">
// 				{mobile ? (
// 					<>
// 						<h1 className="font-bold  text-black m-0">Filter by</h1>
// 						<svg
// 							xmlns="http://www.w3.org/2000/svg"
// 							fill="none"
// 							viewBox="0 0 24 24"
// 							strokeWidth={1.5}
// 							stroke="currentColor"
// 							className="w-8 h-8"
// 							onClick={handleFilters}
// 						>
// 							<path
// 								strokeLinecap="round"
// 								strokeLinejoin="round"
// 								d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
// 							/>
// 						</svg>

// 						{isOpen ? (
// 							<div
// 								ref={ref}
// 								className="bg-black text-white absolute h-fit w-2/4 z-10 rounded-md font-poppins py-1"
// 							>
// 								<Link
// 									href={`/products/all`}
// 									className="flex w-full p-2
// 							border-b-2 border-gray-700"
// 								>
// 									All
// 								</Link>
// 								<Link
// 									href={`/products/all`}
// 									className="flex w-full p-2
// 							border-b-2 border-gray-700"
// 								>
// 									Reset
// 								</Link>
// 								<button
// 									className="text-orange btn-third ml-2 mt-2"
// 									onClick={() => {
// 										setIsOpen(false);
// 									}}
// 								>
// 									Apply
// 								</button>
// 								{filters && (
// 									<div className=" text-white  h-fit rounded-md font-poppins py-1">
// 										<div>
// 											{filters.filters.map((filter) => (
// 												<div key={filter.name}>
// 													<div className="flex items-center gap-2">
// 														<h2
// 															className="pl-2 mt-4 font-semibold cursor-pointer"
// 															onClick={() =>
// 																handleFiltersOpen(
// 																	filter.name
// 																)
// 															}
// 														>
// 															{filter.name}
// 														</h2>
// 														<svg
// 															xmlns="http://www.w3.org/2000/svg"
// 															fill="none"
// 															viewBox="0 0 24 24"
// 															strokeWidth={1.5}
// 															stroke="currentColor"
// 															className="w-5 h-5 mt-3 cursor-pointer"
// 															onClick={() =>
// 																handleFiltersOpen(
// 																	filter.name
// 																)
// 															}
// 														>
// 															<path
// 																strokeLinecap="round"
// 																strokeLinejoin="round"
// 																d="M19.5 8.25l-7.5 7.5-7.5-7.5"
// 															/>
// 														</svg>
// 													</div>

// 													{isOpen &&
// 														openFilter.includes(
// 															filter.name
// 														) &&
// 														filter.options.map(
// 															(option) => (
// 																<label
// 																	key={
// 																		option.value
// 																	}
// 																	className="flex justify-start items-center"
// 																>
// 																	<input
// 																		className="w-4 h-6 mx-1 mt-2"
// 																		type="checkbox"
// 																		checked={prices?.includes(
// 																			option
// 																		)}
// 																		onChange={() =>
// 																			handleFilterChange(
// 																				option
// 																			)
// 																		}
// 																	/>
// 																	{
// 																		option.label
// 																	}
// 																</label>
// 															)
// 														)}
// 												</div>
// 											))}
// 										</div>
// 									</div>
// 								)}
// 							</div>
// 						) : null}
// 					</>
// 				) : (
// 					<div>
// 						<div className="bg-white shadow-lg rounded-md my-4">
// 							<h1 className="font-bold  text-center text-black m-2">
// 								Filter by
// 							</h1>
// 						</div>
// 						<Link
// 							href={`/products/all`}
// 							className="flex w-full p-2
// 							border-b-2 border-gray-700"
// 						>
// 							Reset
// 						</Link>
// 						{filters && (
// 							<div className=" text-black  h-fit rounded-md font-poppins py-1">
// 								<div>
// 									{filters.filters.map((filter) => (
// 										<div key={filter.name}>
// 											<div className="flex items-center gap-2">
// 												<h2
// 													className=" mt-4 font-semibold cursor-pointer"
// 													onClick={() =>
// 														handleFiltersOpen(
// 															filter.name
// 														)
// 													}
// 												>
// 													{filter.name}
// 												</h2>
// 												<svg
// 													xmlns="http://www.w3.org/2000/svg"
// 													fill="none"
// 													viewBox="0 0 24 24"
// 													strokeWidth={1.5}
// 													stroke="currentColor"
// 													className="w-5 h-5 mt-3 cursor-pointer"
// 													onClick={() =>
// 														handleFiltersOpen(
// 															filter.name
// 														)
// 													}
// 												>
// 													<path
// 														strokeLinecap="round"
// 														strokeLinejoin="round"
// 														d="M19.5 8.25l-7.5 7.5-7.5-7.5"
// 													/>
// 												</svg>
// 											</div>

// 											{isOpen &&
// 												openFilter.includes(
// 													filter.name
// 												) &&
// 												filter.options.map((option) => (
// 													<label
// 														key={option.value}
// 														className="flex justify-start items-center"
// 													>
// 														<input
// 															className="w-4 h-6 mx-1 mt-2"
// 															type="checkbox"
// 															checked={selectedFilters.includes(
// 																option
// 															)}
// 															onChange={() =>
// 																handleFilterChange(
// 																	option
// 																)
// 															}
// 														/>
// 														{option.label}
// 													</label>
// 												))}
// 										</div>
// 									))}
// 								</div>
// 							</div>
// 						)}
// 					</div>
// 				)}
// 			</div>
// 			{/* ) : null} */}
// 		</main>
// 	);
// }
