"use client";
import useMedia from "@/app/hooks/useMedia";
import { NewProductsProps } from "@/app/types";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CategoriesSkeleton from "./categoriesSkeleton";

export default function CategoriesFilter() {
	const [categories, setCategories] = useState<NewProductsProps[]>([]);
	const [categoriesCount, setCategoriesCount] = useState<NewProductsProps[]>(
		[]
	);
	const [resultsUpdate, setResultsUpdate] = useState<boolean>(false);
	const [categoryCounts, setCategoryCounts] = useState<
		Record<string, number>
	>({});
	const mobile = useMedia("(max-width: 640px)");
	const router = useRouter();

	const [isOpen, setIsOpen] = useState(false);

	const searchParams = useSearchParams();
	const searchParams2 = usePathname();
	const categoryPath = searchParams?.get("category");

	const active = "text-orange";
	const notActive = "text-white";

	function handleMenu() {
		setIsOpen((isOpen) => !isOpen);
	}
	function resetFilter() {
		if (searchParams2 === "/products/all") {
			location.reload();
		} else {
			router.push("/products/all");
			setIsOpen(false);
		}
	}

	//if user scroll any direction, menu close
	// useEffect(() => {
	// 	let prevScrollY = window.pageYOffset;
	// 	const scrollListener = () => {
	// 		const scrollY = window.pageYOffset;
	// 		if (scrollY !== prevScrollY) {
	// 			setIsOpen(false);
	// 		}
	// 		prevScrollY = scrollY;
	// 	};
	// 	window.addEventListener("scroll", scrollListener);
	// 	return () => {
	// 		window.removeEventListener("scroll", scrollListener);
	// 	};
	// }, []);

	//fetch all categories from mongodb
	async function fetchAllCategories() {
		try {
			const response = await fetch("/api/categoriesAll");
			const data = await response.json();
			setCategories(data);
		} catch (error) {
			console.error("Error fetching all categories:", error);
		}
	}

	//fetch all categories from mongodb from Products Schema (show only the categories that exist)
	async function countCategories() {
		try {
			const response = await fetch("/api/categoriesCount");
			const data = await response.json();
			setCategoriesCount(data);
			setResultsUpdate(true); // Set resultsUpdate to true once the data is fetched
		} catch (error) {
			console.error("Error fetching categories count:", error);
		}
	}

	useEffect(() => {
		countCategories();
		fetchAllCategories();
	}, []);

	useEffect(() => {
		if (categoriesCount.length > 0) {
			setResultsUpdate(true);
		}
	}, [categoriesCount]);

	// Loop through the categoriesCount array and count the occurrences of each category
	useEffect(() => {
		if (categoriesCount && categoriesCount.length > 0) {
			const counts: Record<string, number> = {};
			categoriesCount.forEach((catcount) => {
				if (catcount.category && catcount.category.name) {
					if (counts[catcount.category.name]) {
						counts[catcount.category.name] += 1;
					} else {
						counts[catcount.category.name] = 1;
					}
				}
			});
			setCategoryCounts(counts);
		}
	}, [categoriesCount]);

	// Map the categories array to create an array of category names with their respective counts

	const allCategories = categories
		.filter((category) => category?.name)
		.map((category) => ({ key: category._id, value: category.name }));

	const result = allCategories.map((category) => {
		if (category?.value) {
			const count = categoryCounts[category?.value] || 0;
			return {
				value: category.value,
				key: category.key,
				count: count > 0 ? `(${count})` : "(0)",
			};
		}
	});

	return (
		<main className="w-fit ">
			{result.length > 0 && mobile ? (
				<div className="m-2 font-poppins ">
					{mobile && (
						<>
							<div className="flex items-center ml-auto ">
								<h1
									onClick={handleMenu}
									className="font-bold  text-black m-0"
								>
									Categories
								</h1>
								<svg
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-8 h-8"
									onClick={handleMenu}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
									/>
								</svg>
							</div>
							{isOpen ? (
								<div className="bg-black text-white absolute h-fit w-2/4 z-10 rounded-md font-poppins py-1">
									<button
										onClick={resetFilter}
										className="flex w-full p-2
							border-b-2 border-gray-700"
									>
										Show All
									</button>
									{result && result.length > 0 && (
										<div className="bg-black text-white  h-fit rounded-md font-poppins py-1">
											{result.map((category, index) => (
												<Link
													onClick={() =>
														setIsOpen(false)
													}
													href={`/products/filter?category=${category?.key}`}
													key={category?.key}
													className={`${
														categoryPath ===
														category?.key
															? active
															: notActive
													} flex w-full p-2 hover:text-orange ${
														index !==
														categories.length - 1
															? "border-b-2 border-gray-700"
															: ""
													}`}
												>
													{category?.value}
													{category?.count}
												</Link>
											))}
										</div>
									)}
								</div>
							) : null}
						</>
					)}
				</div>
			) : (
				mobile && <h1>Loading...</h1>
			)}
			{resultsUpdate && categoriesCount.length > 0 && !mobile ? (
				<div>
					<div className="bg-white border border-gray-600 rounded-md my-4">
						<h1 className="font-bold  text-black m-2">
							Categories
						</h1>
					</div>
					<div className=" font-semibold shadow-xl rounded-md mt-4 cursor-pointer ">
						<button
							className=" btn-primaryy  text-black m-2"
							onClick={resetFilter}
						>
							Show All
						</button>
					</div>
					{result && result.length > 0 && (
						<div className="bg-black text-white  h-fit rounded-md font-poppins py-1">
							{result.map((category, index) => (
								<Link
									href={`/products/filter?category=${category?.key}`}
									key={category?.key}
									className={`${
										categoryPath === category?.key
											? active
											: notActive
									} flex w-full p-2 hover:text-orange ${
										index !== categories.length - 1
											? "border-b-2 border-gray-700"
											: ""
									}`}
								>
									{category?.value}
									{category?.count}
								</Link>
							))}
						</div>
					)}
				</div>
			) : (
				!mobile && <CategoriesSkeleton />
			)}
		</main>
	);
}
