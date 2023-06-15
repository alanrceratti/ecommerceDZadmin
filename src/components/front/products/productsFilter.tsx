"use client";
import useMedia from "@/app/hooks/useMedia";
import { FilterOption, Filters, NewProductsProps } from "@/app/types";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import productsFilter from "../products/productsFilters.json";
import useOutsideClick from "@/app/hooks/useOnClickOutside";

export default function ProductsFilter() {
	const [isOpen, setIsOpen] = useState(false);
	const [openFilter, setOpenFilter] = useState<string[]>([]);
	const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([]);

	// const [selectedFilters2, setSelectedFilters2] = useState<string[]>([]);
	const router = useRouter();

	const mobile = useMedia("(max-width: 640px)");
	const filters = productsFilter as Filters;

	const ref = useRef<HTMLDivElement | null>(null);
	const searchParams = useSearchParams();
	const searchParams2 = usePathname();
	const params = searchParams2?.split("/")[2];
	const categoryPath = searchParams?.get("category");

	const pricePath = searchParams?.getAll("price") ?? [];
	const batteryPath = searchParams?.getAll("battery") ?? [];
	const allURLFilter = [...pricePath, ...batteryPath];

	const price = pricePath.map((value) => "price=" + value);
	const battery = batteryPath.map((value) => "battery=" + value);
	const allFilters = [...price, ...battery];

	// Resets the selected filters and navigates to the default products page
	function resetFilter() {
		setSelectedFilters([]);
		router.push("/products/all");
		setIsOpen(false);
	}

	// Toggles the visibility of filter options for a given filter category
	function handleFiltersOpen(filterName: string) {
		if (openFilter.includes(filterName)) {
			setOpenFilter(openFilter.filter((filter) => filter !== filterName));
		} else {
			setOpenFilter([...openFilter, filterName]);
			setIsOpen(true);
		}
	}

	// Handles the change of a filter option
	const handleFilterBoxChange = (option: FilterOption) => {
		const isSelected = allURLFilter.includes(option.value);

		if (isSelected) {
			setSelectedFilters(
				selectedFilters.filter(
					(filter) => filter.value !== option.value
				)
			);
		} else {
			setSelectedFilters([...selectedFilters, option]);
		}
	};

	// Constructs the URL based on the selected filters
	const newSelectedFilters = selectedFilters.map(
		(filter) => `${filter.labelName}=${filter.value}`
	);

	const groupSelectedFilters = newSelectedFilters.join("&");

	const urlOnlyFilter = `/products/filter?${groupSelectedFilters}`;
	const urlWithCategoryWithFilter = `/products/filter?category=${categoryPath}&${groupSelectedFilters}`;
	const urlWithCategoryOnly = `/products/filter?category=${categoryPath}`;
	const urlAll = `/products/all`;

	// Updates the URL based on the selected filters and category
	const updateURL = () => {
		if (
			searchParams2 === "/products/all" &&
			groupSelectedFilters.length === 0
		) {
			setSelectedFilters([]);
			console.log("aaaaa");
			router.push(urlAll);
		} else if (
			groupSelectedFilters.length > 0 &&
			searchParams2 === "/products/all" &&
			categoryPath === null
		) {
			console.log("bbbb");

			router.push(urlOnlyFilter);
		} else if (
			groupSelectedFilters.length > 0 &&
			searchParams2 === "/products/filter" &&
			categoryPath === null
		) {
			console.log("ccccc");

			router.push(urlOnlyFilter);
		} else if (
			groupSelectedFilters.length > 0 &&
			searchParams2 === "/products/filter" &&
			categoryPath &&
			selectedFilters.length !== 0
		) {
			console.log("dddddd");
			router.push(urlWithCategoryWithFilter);
		} else if (
			groupSelectedFilters.length === 0 &&
			searchParams2 === "/products/filter" &&
			!categoryPath
		) {
			console.log("eeeee");

			setSelectedFilters([]);
			router.push(urlAll);
		} else if (
			groupSelectedFilters.length === 0 &&
			searchParams2 === "/products/filter" &&
			categoryPath
		) {
			console.log("eeeee");

			setSelectedFilters([]);
			router.push(urlWithCategoryOnly);
		} else if (
			groupSelectedFilters.length > 0 &&
			categoryPath &&
			allFilters.length === 0 &&
			selectedFilters.length !== 0
		) {
			setSelectedFilters([]);
			console.log("fffffff");
			router.push(urlWithCategoryOnly);
		}
	};

	// params to update the URL in case selectedFitlers is empty
	const refreshedURL = allFilters.map((filter) => filter).join("&");

	const paramsArray = refreshedURL.split("&");
	const refreshedURL2 = paramsArray.map((param) => {
		const [labelName, value] = param.split("=");
		return {
			label: value, // Use value as label for this example, but adjust as needed
			labelName,
			value,
		};
	});

	useEffect(() => {
		if (selectedFilters.length === 0 && refreshedURL.length !== 0) {
			setSelectedFilters(refreshedURL2);
			router.push(`/products/filter?${refreshedURL}`);
		} else if (selectedFilters.length !== 0 && allURLFilter.length === 0) {
			setSelectedFilters([]);
		}
	}, []);

	useEffect(() => {
		if (allURLFilter.length === 0 && selectedFilters.length > 0) {
			setSelectedFilters([]);
		}
	}, [categoryPath]);

	useEffect(() => {
		updateURL();
	}, [groupSelectedFilters]);

	return (
		<main className="w-[100px] sm:w-[150px] ">
			<div className="m-2 font-poppins text-black w-fit">
				{mobile ? (
					<>
						<div className="flex w-[100px]">
							<h1 className="font-bold  text-black m-0 ">
								Filter by
							</h1>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-8 h-8"
								onClick={() =>
									handleFiltersOpen(
										filters.filters.filter.name
									)
								}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
								/>
							</svg>
						</div>
						{isOpen && (
							<div
								ref={ref}
								className="bg-black right-2 text-white absolute  h-fit w-2/5 z-10 rounded-md font-poppins py-1"
							>
								<Link
									href={`/products/all`}
									className="flex w-full p-2
							border-b-2 border-gray-700 "
								>
									All
								</Link>
								<button
									onClick={resetFilter}
									className="flex w-full p-2
							border-b-2 border-gray-700"
								>
									Reset
								</button>
								<button
									className="text-orange btn-third ml-2 mt-2"
									onClick={() => {
										setIsOpen(false);
									}}
								>
									Apply
								</button>
								{filters && (
									<div className=" text-white  h-fit rounded-md font-poppins py-1">
										<div>
											{filters.filters.map((filter) => (
												<div key={filter.name}>
													<div className="flex items-center gap-2">
														<h2
															className="pl-2 mt-4 font-semibold cursor-pointer"
															onClick={() =>
																handleFiltersOpen(
																	filter.name
																)
															}
														>
															{filter.name}
														</h2>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth={1.5}
															stroke="currentColor"
															className="w-5 h-5 mt-3 cursor-pointer"
															onClick={() =>
																handleFiltersOpen(
																	filter.name
																)
															}
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M19.5 8.25l-7.5 7.5-7.5-7.5"
															/>
														</svg>
													</div>

													{isOpen &&
														openFilter.includes(
															filter.name
														) &&
														filter.options.map(
															(option) => (
																<label
																	key={
																		option.value
																	}
																	className="flex justify-start items-center"
																>
																	<input
																		className="w-4 h-6 mx-1 mt-2"
																		type="checkbox"
																		checked={allURLFilter.includes(
																			option.value
																		)}
																		onChange={() =>
																			handleFilterBoxChange(
																				option
																			)
																		}
																	/>
																	{
																		option.label
																	}
																</label>
															)
														)}
												</div>
											))}
										</div>
									</div>
								)}
							</div>
						)}
					</>
				) : (
					<div>
						<div className="bg-white shadow-lg rounded-md my-4">
							<h1 className="font-bold  text-center text-black m-2">
								Filter by
							</h1>
						</div>
						<button
							onClick={resetFilter}
							className="flex w-full p-2
							border-b-2 border-gray-700"
						>
							Reset
						</button>
						{filters && (
							<div className=" text-black  h-fit rounded-md font-poppins py-1">
								<div>
									{filters.filters.map((filter) => (
										<div key={filter.name}>
											<div className="flex items-center gap-2">
												<h2
													className=" mt-4 font-semibold cursor-pointer"
													onClick={() =>
														handleFiltersOpen(
															filter.name
														)
													}
												>
													{filter.name}
												</h2>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="w-5 h-5 mt-3 cursor-pointer"
													onClick={() =>
														handleFiltersOpen(
															filter.name
														)
													}
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M19.5 8.25l-7.5 7.5-7.5-7.5"
													/>
												</svg>
											</div>

											{isOpen &&
												openFilter.includes(
													filter.name
												) &&
												filter.options.map((option) => (
													<label
														key={option.value}
														className="flex justify-start items-center"
													>
														<input
															className="w-4 h-6 mx-1 mt-2"
															type="checkbox"
															checked={allURLFilter.includes(
																option.value
															)}
															onChange={() =>
																handleFilterBoxChange(
																	option
																)
															}
														/>
														{option.label}
													</label>
												))}
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</main>
	);
}
