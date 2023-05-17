"use client";
import axios from "axios";
import { MouseEvent, useEffect, useState } from "react";

interface Categories {
	name: string;
}

export default function Categories() {
	const [name, setName] = useState<Categories>({ name: "" });
	const [categories, setCategories] = useState<Categories[]>([]);

	async function saveCategory(
		event: MouseEvent<HTMLButtonElement>
	): Promise<void> {
		event.preventDefault();
		await axios.post("/api/categories", { name });
		setName((prevState) => ({ ...prevState, name: "" }));
	}

	useEffect(() => {
		axios.get("/api/categories").then((response) => {
			setCategories(response.data);
		});
	}, []);

	return (
		<section className="mx-4">
			<h1>Categories</h1>
			<label>Add Categories</label>
			<form className="flex gap-2 max-w-[500px] py-4 ">
				<input
					value={name.name}
					placeholder={"Category name"}
					className="m-0"
					onChange={(event) =>
						setName({ ...name, name: event.target.value })
					}
				></input>
			</form>
			<button
				type="button"
				onClick={saveCategory}
				className="btn-primary mb-4"
			>
				Save
			</button>
			<table className="basic">
				<thead>
					<tr>
						<td>Categoridsdes</td>
					</tr>
				</thead>
				<tbody>
					{categories.length &&
						categories.map((category: Categories, index) => (
							<tr key={index + category.name}>
								<td>{category.name}</td>
							</tr>
						))}
				</tbody>
			</table>
		</section>
	);
}
