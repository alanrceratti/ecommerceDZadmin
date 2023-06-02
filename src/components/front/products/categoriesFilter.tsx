"use client";
import useMedia from "@/app/hooks/useMedia";
import { NewProductsProps } from "@/app/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoriesFilter() {
	const [categories, setCategories] = useState<NewProductsProps[]>([]);
	const [categoriesCount, setCategoriesCount] = useState<NewProductsProps[]>(
		[]
	);
	const mobile = useMedia("(max-width: 640px)");
	const [isOpen, setIsOpen] = useState(false);
	const path = usePathname()?.split("/")[2];

	const active = "text-orange";
	const notActive = "text-white";

	function handleMenu() {
		setIsOpen((isOpen) => !isOpen);
	}

	// const handleClick = (
	// 	event: React.MouseEvent<HTMLAnchorElement>,
	// 	category: string
	// ) => {
	// 	event.preventDefault();
	// 	onCategoryChange(category);
	// };

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
		window.addEventListener("scroll", scrollListener);
		return () => {
			window.removeEventListener("scroll", scrollListener);
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

	const categoryCounts = {} as Record<string, number>;

	// Loop through the categoriesCount array and count the occurrences of each category
	categoriesCount &&
		categoriesCount.forEach((catcount) => {
			if (catcount.category && catcount.category.name) {
				// Increment the count if the category already exists in categoryCounts
				if (categoryCounts[catcount.category.name]) {
					categoryCounts[catcount.category.name] += 1;
				} else {
					// Initialize the count to 1 if it's the first occurrence of the category
					categoryCounts[catcount.category.name] = 1;
				}
			}
		});

	// Map the categories array to create an array of category names with their respective counts
	const result = categories.map((category) => {
		if (category?.name) {
			const count = categoryCounts[category?.name] || 0;
			return count > 0
				? `${category?.name} (${count})` // Include the count if it's greater than 0
				: `${category?.name}(0)`; // Append (0) if the count is 0
		}
	});

	return (
		<main>
			{result && result.length > 0 ? (
				<div className="mx-4 font-poppins ">
					{mobile ? (
						<>
							<h1 className="font-bold  text-black m-2">
								Filter
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
							{isOpen ? (
								<div className="bg-black text-white absolute h-fit w-2/4 z-10 rounded-md font-poppins py-1">
									<Link
										href={`/products/all`}
										className="flex w-full p-2
							border-b-2 border-gray-700"
									>
										All
									</Link>
									{categories && (
										<div className="bg-black text-white  h-fit rounded-md font-poppins py-1">
											{result.map((category, index) => (
												<Link
													href={`/products/${
														category?.split(" ")[0]
													}`}
													key={category}
													className={`${
														path ===
														category?.split(" ")[0]
															? active
															: notActive
													} flex w-full p-2 hover:text-orange ${
														index !==
														categories.length - 1
															? "border-b-2 border-gray-700"
															: ""
													}`}
												>
													{category}
												</Link>
											))}
										</div>
									)}
								</div>
							) : null}
						</>
					) : (
						<div>
							<div className="bg-white border border-gray-600 rounded-md my-4">
								<h1 className="font-bold  text-black m-2">
									Categories
								</h1>
							</div>
							<Link
								href={`/products/all`}
								className="flex w-full p-2
							border-b-2 border-gray-700"
							>
								All
							</Link>
							{categories && (
								<div className="bg-black text-white  h-fit rounded-md font-poppins py-1">
									{result.map((category, index) => (
										<Link
											href={`/products/${
												category?.split(" ")[0]
											}`}
											key={category}
											className={`${
												path === category?.split(" ")[0]
													? active
													: notActive
											} flex w-full p-2 hover:text-orange ${
												index !== categories.length - 1
													? "border-b-2 border-gray-700"
													: ""
											}`}
										>
											{category}
										</Link>
									))}
								</div>
							)}
						</div>
					)}
				</div>
			) : null}
		</main>
	);
}
