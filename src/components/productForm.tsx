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
}: NewProductsProps) {
	const [name, setName] = useState(currentName || "");
	const [description, setDescription] = useState(currentDescription || "");
	const [price, setPrice] = useState(currentPrice || "");
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
						></textarea>
					</label>
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
