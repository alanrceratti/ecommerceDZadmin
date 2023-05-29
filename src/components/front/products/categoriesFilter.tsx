"use client";
import { NewProductsProps } from "@/app/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CategoriesFilter() {
	const [categories, setCategories] = useState<NewProductsProps[]>([]);

	useEffect(() => {
		fetch("/api/categoriesAll")
			.then((response) => response.json())
			.then((data) => {
				setCategories(data);
				console.log(categories);
				console.log("categories");
			});
	}, []);
	return (
		<>
			<div className="mx-4 font-poppins">
				<div className="bg-white border border-gray-600 rounded-md my-4">
					<h1 className="font-bold  text-black m-2">Categories</h1>
				</div>
				<div className="bg-black text-white  h-fit rounded-md font-poppins py-1">
					<div className=""></div>
					{categories.map((categorie, index) => (
						<Link key={categorie._id}
							href={`/categories/${categorie.name}`}
							className={`flex w-full p-2 ${
								index !== categories.length - 1
									? "border-b-2 border-gray-700"
									: ""
							}`}
						>
							{categorie?.name}
						</Link>
					))}
				</div>
			</div>
		</>
	);
}
