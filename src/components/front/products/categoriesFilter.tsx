"use client";
import useMedia from "@/app/hooks/useMedia";
import { NewProductsProps } from "@/app/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CategoriesFilter({
	onCategoryChange,
}: {
	onCategoryChange: (category: string) => void;
}) {
	const [categories, setCategories] = useState<NewProductsProps[]>([]);
	const mobile = useMedia("(max-width: 640px)");
	const [isOpen, SetIsOpen] = useState(false);
	const [category, setCategory] = useState("");
	const [filteredCategory, setFilteredCategory] = useState("");

	function handleMenu() {
		SetIsOpen((isOpen) => !isOpen);
	}

	const handleClick = (category: string) => {
		onCategoryChange(category);
	};

	// useEffect(() => {
	// 	fetch("/api/categoriesAll")
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			setCategories(data);
	// 		});
	// }, []);

	useEffect(() => {
		fetch("/api/categoriesAll")
			.then((response) => response.json())
			.then((data) => {
				setCategories(data);
				console.log("data CATEGORI FILTER", data);
			});
	}, []);

	return (
		<>
			<div className="mx-4 font-poppins">
				{mobile ? (
					<>
						<h1 className="font-bold  text-black m-2">Filter</h1>
						<svg
							xmlns="http://www.w3.org/2000/svg"
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
								{categories.map((category, index) => (
									<Link
										key={category._id}
										href={`/categorys/${category?.category?.name}`}
										className={`flex w-full p-2 ${
											index !== categories.length - 1
												? "border-b-2 border-gray-700"
												: ""
										}`}
										onClick={() =>
											handleClick(
												category?.category
													?._id as string
											)
										}
									>
										{category?.category?.name}
									</Link>
								))}
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

						<div className="bg-black text-white  h-fit rounded-md font-poppins py-1">
							{categories.map((category, index) => (
								<Link
									key={category._id}
									href={`/products/${category?.category?.name}`}
									className={`flex w-full p-2 ${
										index !== categories.length - 1
											? "border-b-2 border-gray-700"
											: ""
									}`}
									onClick={() =>
										handleClick(
											category?.category?._id as string
										)
									}
								>
									{category?.category?.name}
								</Link>
							))}
						</div>
					</div>
				)}
			</div>
		</>
	);
}
