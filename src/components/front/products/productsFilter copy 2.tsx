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
// 	// const [selectedFilters2, setSelectedFilters2] = useState<string[]>([]);
// 	const router = useRouter();

// 	const mobile = useMedia("(max-width: 640px)");
// 	const filters = productsFilter as Filters;

// 	const ref = useRef<HTMLDivElement | null>(null);
// 	// const searchParams = useSearchParams();
// 	// const searchParams2 = usePathname();
// 	// const params = searchParams2?.split("/")[2];

// 	// const categoryPath = searchParams?.get("category");
// 	// const pricePath = searchParams?.getAll("price") ?? [];
// 	// const timePath = searchParams?.getAll("time") ?? [];
// 	// const allURLFilter = [...pricePath, ...timePath];
// 	// const price = pricePath.map((value) => "price=" + value);
// 	// const time = timePath.map((value) => "time=" + value);
// 	// const allFilters = [...price, ...time];

// 	// const active = "text-orange";
// 	// const notActive = "text-black";
// 	// console.log("ASASDASDASDASD", allFilters);

// 	// function handleFilters() {
// 	// 	setIsOpen((isOpen) => !isOpen);
// 	// }

// 	function resetFilter() {
// 		router.push("/products/all");
// 		setIsOpen(false);
// 	}

// 	function handleFiltersOpen(filterName: string) {
// 		if (openFilter.includes(filterName)) {
// 			setOpenFilter(openFilter.filter((filter) => filter !== filterName));
// 		} else {
// 			setOpenFilter([...openFilter, filterName]);
// 			setIsOpen(true);
// 		}
// 	}

// 	const handleFilterBoxChange = (option: FilterOption) => {
// 		const isSelected = selectedFilters.includes(option);

// 		if (isSelected) {
// 			setSelectedFilters(
// 				selectedFilters.filter((filter) => filter !== option)
// 			);
// 		} else {
// 			setSelectedFilters([...selectedFilters, option]);
// 		}
// 	};

// 	const newSelectedFilters = selectedFilters.map(
// 		(filter) => `${filter.labelName}=${filter.value}`
// 	);

// 	const groupedFilters: { [key: string]: string[] } = {};
// 	selectedFilters.forEach((filter) => {
// 		if (!groupedFilters[filter.labelName]) {
// 			groupedFilters[filter.labelName] = [];
// 		}
// 		groupedFilters[filter.labelName].push(filter.value);
// 	});

// 	const newGroupedFilters = Object.entries(groupedFilters).map(
// 		([labelName, values]) => `${labelName}=${values.join("-")}`
// 	);

// 	const queryString = newGroupedFilters.join("&");
// 	const searchParams = useSearchParams();
// 	const categoryPath = searchParams?.get("category");

// 	const urlOnlyFilter = `/products/filter?${queryString}`;
// 	const urlWithCategoryWithFilter = `/products/filter?category=${categoryPath}&${queryString}`;
// 	const urlAll = `/products/all`;

// 	useEffect(() => {
// 		console.log(queryString);
// 	}, [selectedFilters]);

// 	// 	router.replace(updatedUrl);
// 	// 	return isSelected;
// 	// };

// 	// useEffect(() => {
// 	// 	const newSelectedFilters2 = selectedFilters.map(
// 	// 		(filter) => `${filter.labelName}=${filter.value}`
// 	// 	);
// 	// 	setSelectedFilters2(newSelectedFilters2);
// 	// }, [selectedFilters]);

// 	// // selectedFilters.forEach((filter) => {
// 	// // 	const filterParam = `${filter.labelName}=${filter.value}`;
// 	// // 	selectedFilters2.push(filterParam);
// 	// // });
// 	// //

// 	// // useEffect(() => {
// 	// // 	if (queryString.length === 0 && params === "filter") {
// 	// // 		router.push(urlAll);
// 	// // 	}
// 	// // }, [queryString]);

// 	// const urlOnlyFilter = `/products/filter?${queryString}`;
// 	// const urlWithCategoryWithFilter = `/products/filter?category=${categoryPath}&${queryString}`;
// 	// const urlAll = `/products/all`;

// 	// const handleClickOutside = () => {
// 	// 	setIsOpen(false);
// 	// };
// 	// // useEffect(() => {
// 	// // 	selectedFilters2 = [];
// 	// // }, [selectedFilters2]);

// 	// useEffect(() => {
// 	// 	if (
// 	// 		queryString.length > 0 &&
// 	// 		!categoryPath &&
// 	// 		selectedFilters2.length > 0
// 	// 	) {
// 	// 		console.log("urlOnlyFilter", urlOnlyFilter);
// 	// 		router.push(urlOnlyFilter);
// 	// 	} else if (
// 	// 		queryString.length === 0 &&
// 	// 		!categoryPath &&
// 	// 		params === "all"
// 	// 	) {
// 	// 		console.log("urlAll", urlAll);

// 	// 		router.push(urlAll);
// 	// 	} else if (categoryPath && params === "filter") {
// 	// 		console.log("urlWithCategoryWithFilter", urlWithCategoryWithFilter);

// 	// 		router.push(urlWithCategoryWithFilter);
// 	// 	} else if (
// 	// 		queryString.length === 0 &&
// 	// 		!pricePath &&
// 	// 		selectedFilters2.length === 0
// 	// 	) {
// 	// 		console.log("urlAll3333", urlAll);

// 	// 		router.push(urlAll);
// 	// 	} else if (
// 	// 		selectedFilters2.length === 0 &&
// 	// 		params === "filter" &&
// 	// 		allURLFilter.length === 0
// 	// 	) {
// 	// 		console.log("urlAll44444", urlAll);
// 	// 		router.push(urlAll);
// 	// 	}
// 	// 	const urlParam = window.location.toString().includes("?");
// 	// }, [selectedFilters2]);

// 	return (
// 		<main className="w-[100px] sm:w-[150px] ">
// 			{/* {result && result.length > 0 ? ( */}
// 			<div className="m-2 font-poppins text-black w-fit">
// 				{/* {mobile ? (
// 					<>
// 						<div className="flex w-[100px]">
// 							<h1 className="font-bold  text-black m-0 ">
// 								Filter by
// 							</h1>
// 							<svg
// 								xmlns="http://www.w3.org/2000/svg"
// 								fill="none"
// 								viewBox="0 0 24 24"
// 								strokeWidth={1.5}
// 								stroke="currentColor"
// 								className="w-8 h-8"
// 								// onClick={handleFilters}
// 							>
// 								<path
// 									strokeLinecap="round"
// 									strokeLinejoin="round"
// 									d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
// 								/>
// 							</svg>
// 						</div>
// 						{isOpen ? (
// 							<div
// 								ref={ref}
// 								className="bg-black right-2 text-white absolute  h-fit w-2/5 z-10 rounded-md font-poppins py-1"
// 							>
// 								<Link
// 									href={`/products/all`}
// 									className="flex w-full p-2
// 							border-b-2 border-gray-700 "
// 								>
// 									All
// 								</Link>
// 								<button
// 									onClick={resetFilter}
// 									className="flex w-full p-2
// 							border-b-2 border-gray-700"
// 								>
// 									Reset
// 								</button>
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
// 															onClick={(event) =>
// 																handleFiltersOpen(
// 																	filter.name,
// 																	event
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
// 															onClick={(event) =>
// 																handleFiltersOpen(
// 																	filter.name,
// 																	event
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
// 																	// className="w-4 h-6 mx-1 mt-2"
// 																	// type="checkbox"
// 																	// checked={allURLFilter?.includes(
// 																	// 	option.value
// 																	// )}
// 																	// onChange={() =>
// 																	// 	handleFilterBoxChange(
// 																	// 		option
// 																	// 	)
// 																	// }
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
// 				) : ( */}
// 				<div>
// 					<div className="bg-white shadow-lg rounded-md my-4">
// 						<h1 className="font-bold  text-center text-black m-2">
// 							Filter by
// 						</h1>
// 					</div>
// 					<Link
// 						href={`/products/all`}
// 						className="flex w-full p-2
// 							border-b-2 border-gray-700"
// 					>
// 						Reset
// 					</Link>
// 					{filters && (
// 						<div className=" text-black  h-fit rounded-md font-poppins py-1">
// 							<div>
// 								{filters.filters.map((filter) => (
// 									<div key={filter.name}>
// 										<div className="flex items-center gap-2">
// 											<h2
// 												className=" mt-4 font-semibold cursor-pointer"
// 												onClick={() =>
// 													handleFiltersOpen(
// 														filter.name
// 													)
// 												}
// 											>
// 												{filter.name}
// 											</h2>
// 											<svg
// 												xmlns="http://www.w3.org/2000/svg"
// 												fill="none"
// 												viewBox="0 0 24 24"
// 												strokeWidth={1.5}
// 												stroke="currentColor"
// 												className="w-5 h-5 mt-3 cursor-pointer"
// 												onClick={() =>
// 													handleFiltersOpen(
// 														filter.name
// 													)
// 												}
// 											>
// 												<path
// 													strokeLinecap="round"
// 													strokeLinejoin="round"
// 													d="M19.5 8.25l-7.5 7.5-7.5-7.5"
// 												/>
// 											</svg>
// 										</div>

// 										{isOpen &&
// 											openFilter.includes(filter.name) &&
// 											filter.options.map((option) => (
// 												<label
// 													key={option.value}
// 													className="flex justify-start items-center"
// 												>
// 													<input
// 														className="w-4 h-6 mx-1 mt-2"
// 														type="checkbox"
// 														// checked={Object.values(
// 														// 	allURLFilter
// 														// ).includes(
// 														// 	option.value
// 														// )}
// 														onChange={() =>
// 															handleFilterBoxChange(
// 																option
// 															)
// 														}
// 													/>
// 													{option.label}
// 												</label>
// 											))}
// 									</div>
// 								))}
// 							</div>
// 						</div>
// 					)}
// 				</div>
// 				{/* )} */}
// 			</div>
// 			{/* ) : null} */}
// 		</main>
// 	);
// }
