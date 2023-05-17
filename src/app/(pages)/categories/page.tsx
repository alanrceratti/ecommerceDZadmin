"use client";
import { useState } from "react";

export default function CategoriesPage() {
	const [name, setName] = useState("");

	function saveCategory() {
    
  }

	return (
		<section className="mx-4">
			<h1>Categories</h1>
			<label>Add Categories</label>
			<form className="flex gap-2 max-w-[500px] ">
				<input
					value={name}
					placeholder={"Category name"}
					className="mb-0"
					onChange={(event) => setName(event.target.value)}
				></input>
			</form>
			<button
				type="button"
				onClick={saveCategory}
				className="btn-primary py-1"
			>
				Save
			</button>
		</section>
	);
}
