"use client";
import { useState } from "react";

export default function New() {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	function createProduct() {}

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
