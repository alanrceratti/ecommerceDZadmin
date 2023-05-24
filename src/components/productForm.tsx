"use client";
import { Categories, NewProductsProps } from "@/app/types";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
import Spinner from "./spinner";
import { ItemInterface, ReactSortable } from "react-sortablejs";

export default function ProductForm({
	_id,
	name: currentName,
	description: currentDescription,
	price: currentPrice,
	images: currentImages,
	category: currentCategory,
}: NewProductsProps) {
	const [name, setName] = useState(currentName || "");
	const [description, setDescription] = useState(currentDescription || "");
	const [category, setCategory] = useState(currentCategory || "");
	const [price, setPrice] = useState(currentPrice || "");
	const [images, setImages] = useState(currentImages || []);
	const [goToProducts, setGoToProducts] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [categories, setCategories] = useState<Categories[]>([]);
	const router = useRouter();
	console.log(category);

	useEffect(() => {
		axios.get("/api/categories").then((response) => {
			setCategories(response.data);
		});
	}, []);

	function goBack() {
		router.push("/admin/products");
	}

	async function saveProduct(
		event: MouseEvent<HTMLButtonElement>
	): Promise<void> {
		event.preventDefault();
		const data = { name, description, price, images, category };
		if (_id) {
			await axios.put("/api/products", { ...data, _id });
		} else {
			try {
				await axios.post("/api/products", data);
			} catch (error) {
				console.log("productForm page error:", error);
			}
		}
		setGoToProducts(true);
	}
	if (goToProducts) {
		router.push("/admin/products");
	}

	async function uploadImages(e: React.ChangeEvent<HTMLInputElement>) {
		const files = e.target?.files;
		if (files && files?.length > 0) {
			setIsUploading(true);
			const data = new FormData();
			Array.from(files).forEach((file) => data.append("file", file));

			try {
				const res = await axios.post("/api/upload", data);
				setImages((oldImages) => {
					return [...oldImages, ...res.data.links];
				});

				console.log(res.data);
			} catch (error) {
				console.log("Error uploading images:", error);
			}
			setIsUploading(false);
		}
	}
	function updateImagesOrder(newOrder: ItemInterface[]): void {
		const updatedImages = newOrder.map((item) => item.link);
		setImages(updatedImages);
	}

	return (
		<>
			<div className=" items-center px-2 m-4 max-w-[500px] ml-auto mr-auto">
				<form>
					<label htmlFor="product">
						<h2>Product name</h2>
						<input
							type="text"
							id="product"
							value={name}
							placeholder="Product name"
							onChange={(event) => setName(event.target.value)}
							aria-label="Product name"
							aria-required="true"
							required
						/>
					</label>
					<label className="my-2">
						<h2>Category</h2>
					</label>
					<div className="mb-2">
						<select
							className="text-black"
							onChange={(event) =>
								setCategory(event.target.value)
							}
							value={category}
						>
							<option>Select</option>
							{categories.length > 0 &&
								categories.map((category) => (
									<option
										key={category._id}
										value={category._id}
									>
										{category.name}
									</option>
								))}
						</select>
					</div>
					<label htmlFor="description">
						<h2>Description</h2>
						<textarea
							rows={5}
							id="description"
							value={description}
							placeholder="Description"
							onChange={(event) =>
								setDescription(event.target.value)
							}
							aria-label="Description"
							required
						></textarea>
					</label>

					<label>
						<h2>Photos</h2>
					</label>
					<div className="flex flex-wrap gap-2 h-auto  ">
						<ReactSortable
							list={images.map((link, index) => ({
								id: index.toString(),
								link,
							}))}
							setList={updateImagesOrder}
							className="flex flex-wrap gap-1"
						>
							{images?.length > 0 &&
								images?.map((link) => (
									<div
										key={link}
										className="h-24 w-24 relative  "
									>
										<Image
											src={link}
											alt="test"
											className="rounded-md absolute "
											loading="lazy"
											fill={true}
										/>
									</div>
								))}
						</ReactSortable>
						{isUploading && (
							<div className="flex items-center">
								<Spinner />
							</div>
						)}
						<label className="w-20 h-24 border border-gray-400 bg-gray-700 flex text-gray-400 rounded-md cursor-pointer">
							<div className="w-full h-full flex justify-center items-center">
								<div className="text-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6 m-auto"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
										/>
									</svg>
									<h3>Upload</h3>
								</div>
							</div>
							<input
								type="file"
								className="hidden"
								onChange={uploadImages}
							/>
						</label>
					</div>
					<label htmlFor="price">
						<h2>Price</h2>

						<input
							type="number"
							id="price"
							value={price}
							placeholder="Price"
							onChange={(event) => setPrice(event.target.value)}
							aria-label="Price"
							aria-required="true"
							required
						/>
					</label>
				</form>
				<div>
					<button
						type="button"
						onClick={saveProduct}
						className="btn-primary my-4 mr-4"
					>
						Save
					</button>

					<button onClick={goBack} className="btn-primary m-auto">
						Back
					</button>
				</div>
			</div>
		</>
	);
}
