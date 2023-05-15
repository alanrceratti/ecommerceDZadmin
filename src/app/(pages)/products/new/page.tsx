"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function New() {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [goToProducts, setGoToProducts] = useState(false);
	const router = useRouter();

	async function createProduct(
		event: FormEvent<HTMLFormElement>
	): Promise<void> {
		event.preventDefault();
		const data = { name, description, price };
		try {
			await axios.post("/api/products", data);
			setGoToProducts(true);
		} catch (error) {
			console.log(error);
		}
	}

	if (goToProducts) {
		return router.push("/products");
	}
	return (
		<>
			<div className=" items-center px-2 m-4 max-w-[500px] ml-auto mr-auto">
				<form onSubmit={createProduct}>
					<h1>New Product</h1>
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
