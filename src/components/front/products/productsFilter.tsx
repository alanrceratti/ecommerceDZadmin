"use client";
import useMedia from "@/app/hooks/useMedia";
import { FilterOption, Filters, NewProductsProps } from "@/app/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import productsFilter from "../products/productsFilters.json";

export default function ProductsFilter() {
	const [categories, setCategories] = useState<NewProductsProps[]>([]);
	const [categoriesCount, setCategoriesCount] = useState<NewProductsProps[]>(
		[]
	);
	const mobile = useMedia("(max-width: 640px)");
	const [isOpen, setIsOpen] = useState(false);
	const [isFiltersOpen, setIsFiltersOpen] = useState(false);
	const path = usePathname()?.split("/")[2];
	const filters = productsFilter as Filters;

	const active = "text-orange";
	const notActive = "text-black";

	function handleFilters() {
		setIsOpen((isOpen) => !isOpen);
	}
	console.log(isOpen);

	function handleFiltersOpen() {
		setIsFiltersOpen((isOpen) => !isOpen);
	}

	//if user scroll any direction, menu close
	useEffect(() => {
		let prevScrollY = window.pageYOffset;
		const scrollListener = () => {
			const scrollY = window.pageYOffset;
			if (scrollY !== prevScrollY) {
				setIsOpen(false);
			}
			prevScrollY = scrollY;
		};
		window.addEventListener("touchmove", scrollListener);
		return () => {
			window.removeEventListener("touchmove", scrollListener);
		};
	}, []);

	//fetch all categories from mongodb
	useEffect(() => {
		fetch("/api/categoriesAll")
			.then((response) => response.json())
			.then((data) => {
				setCategories(data);
			});
	}, []);

	//fetch all categories from mongodb from Products Schema (show only the categories that exist)
	useEffect(() => {
		fetch("/api/categoriesCount")
			.then((response) => response.json())
			.then((data) => {
				setCategoriesCount(data);
			});
	}, []);

	const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([]);

	const handleFilterChange = (option: FilterOption) => {
		const isSelected = selectedFilters.includes(option);
		if (isSelected) {
			setSelectedFilters(
				selectedFilters.filter((filter) => filter !== option)
			);
		} else {
			setSelectedFilters([...selectedFilters, option]);
		}
	};
	console.log(selectedFilters);

	return (
		<main className="w-[100px] ">
			{/* {result && result.length > 0 ? ( */}
			<div className="m-2 font-poppins text-black ">
				{mobile ? (
					<>
						<h1 className="font-bold  text-black m-0">Filter by</h1>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-8 h-8"
							onClick={handleFilters}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
							/>
						</svg>

						{isOpen ? (
							<div className="bg-black text-white absolute h-fit w-2/4 z-10 rounded-md font-poppins py-1">
								<Link
									href={`/products/all`}
									className="flex w-full p-2
							border-b-2 border-gray-700"
								>
									All
								</Link>
								<Link
									href={`/products/all`}
									className="flex w-full p-2
							border-b-2 border-gray-700"
								>
									Reset
								</Link>
								{filters && (
									<div className=" text-white  h-fit rounded-md font-poppins py-1">
										<div>
											{filters.filters.map((filter) => (
												<div key={filter.name}>
													<div className="flex items-center gap-2">
														<h2
															className=" mt-4 font-semibold cursor-pointer"
															onClick={
																handleFilters
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
															onClick={
																handleFiltersOpen
															}
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M19.5 8.25l-7.5 7.5-7.5-7.5"
															/>
														</svg>
													</div>

													{isFiltersOpen &&
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
																		checked={selectedFilters.includes(
																			option
																		)}
																		onChange={() =>
																			handleFilterChange(
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
						) : null}
					</>
				) : (
					<div>
						<div className="bg-white shadow-lg rounded-md my-4">
							<h1 className="font-bold  text-center text-black m-2">
								Filter by
							</h1>
						</div>
						<Link
							href={`/products/all`}
							className="flex w-full p-2
							border-b-2 border-gray-700"
						>
							Reset
						</Link>
						{filters && (
							<div className=" text-black  h-fit rounded-md font-poppins py-1">
								<div>
									{filters.filters.map((filter) => (
										<div key={filter.name}>
											<div className="flex items-center gap-2">
												<h2
													className=" mt-4 font-semibold cursor-pointer"
													onClick={handleFilters}
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
													onClick={handleFilters}
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M19.5 8.25l-7.5 7.5-7.5-7.5"
													/>
												</svg>
											</div>

											{isOpen &&
												filter.options.map((option) => (
													<label
														key={option.value}
														className="flex justify-start items-center"
													>
														<input
															className="w-4 h-6 mx-1 mt-2"
															type="checkbox"
															checked={selectedFilters.includes(
																option
															)}
															onChange={() =>
																handleFilterChange(
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
			{/* ) : null} */}
		</main>
	);
}
