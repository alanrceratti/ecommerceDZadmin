"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface NewProductProps {
	name: string;
	description: string;
	price: number;
	_id: string;
}

export default function ProductForm({
	_id,
	name: currentName,
	description: currentDescription,
	price: currentPrice,
}: NewProductProps) {
	const [name, setName] = useState(currentName || "");
	const [description, setDescription] = useState(currentDescription || "");
	const [price, setPrice] = useState(currentPrice || "");
	// const [id, setId] = useState(current_id || "");
	const [goToProducts, setGoToProducts] = useState(false);
	const router = useRouter();

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
					<button type="submit" className="btn-primary">
						Save
					</button>
				</form>
			</div>
		</>
	);
}
