"use client";
import { NewProductsProps } from "@/app/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function ProductForm({
	_id,
	name: currentName,
	description: currentDescription,
	price: currentPrice,
	images: currentImages,
}: NewProductsProps) {
	const [name, setName] = useState(currentName || "");
	const [description, setDescription] = useState(currentDescription || "");
	const [price, setPrice] = useState(currentPrice || "");
	const [images, setImages] = useState(currentImages || []);
	const [goToProducts, setGoToProducts] = useState(false);
	const router = useRouter();

	function goBack() {
		router.push("/products");
		return null;
	}

	async function saveProduct(
		event: FormEvent<HTMLFormElement>
	): Promise<void> {
		event.preventDefault();
		const data = { name, description, price };
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
		router.push("/products");
		return null;
	}

	async function uploadImages(e: React.ChangeEvent<HTMLInputElement>) {
		const files = e.target?.files;
		if (files && files?.length > 0) {
			const data = new FormData();
			Array.from(files).forEach((file) => data.append("file", file));

			try {
				const res = await axios.post("/api/upload", data);
				// headers: { "Content-Type": "multipart/form-data" },
				setImages((oldImages) => {
					return [...oldImages, ...res.data.links];
				});

				console.log(res.data);
			} catch (error) {
				console.log("Error uploading images:", error);
			}
		}
	}
	return (
		<>
			<div className=" items-center px-2 m-4 max-w-[500px] ml-auto mr-auto">
				<form onSubmit={saveProduct}>
					<label htmlFor="product">
						Product name
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
					<label htmlFor="description">
						Description
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
					<label>Photos</label>
					<div>
						{images?.length > 0 &&
							images?.map((link, index) => (
								<div key={index}>{link}sadasdasddsa</div>
							))}
						<label className="w-24 h-24 border border-gray-400 bg-gray-700 flex text-gray-400 rounded-md cursor-pointer">
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
						<h2>No photos</h2>
					</div>
					<label htmlFor="price">
						Price
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
					<div className="w-full text-center ">
						<button type="submit" className="btn-primary my-4 mx-4">
							Save
						</button>
						<button
							onClick={goBack}
							className="btn-primary m-auto "
						>
							Back
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
