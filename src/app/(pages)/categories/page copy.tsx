"use client";
import axios from "axios";
import Link from "next/link";
import { MouseEvent, useEffect, useState } from "react";

interface Categories {
	name: string;
}

export default function CategoriesPage() {
	const [name, setName] = useState<string>("");
	const [categories, setCategories] = useState([]);
	const [editName, setEditName] = useState("");
	const [isEditing, setIsEditing] = useState(false);

	async function saveCategory(event: MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		await axios.post("/api/categories", { name });
		setName("");
	}
	function fetchCategories() {
		axios.get("/api/categories").then((response) => {
			setCategories(response.data);
		});
	}

	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<section className="items-center m-4 px-4 max-w-[700px] ml-auto mr-auto">
			<h1>Categories</h1>
			<label>Add Categories</label>
			<form className="flex gap-2 max-w-[500px] py-4 ">
				<input
					value={name}
					placeholder={"Category name"}
					className="m-0"
					onChange={(event) => setName(event.target.value)}
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
						<td>Categories</td>
					</tr>

					<tbody>
						{categories.length &&
							categories.map((category: Categories, index) => (
								<tr key={index + category.name}>
									{isEditing ? (
										<td>
											<input
												value={editName}
												onChange={(event) =>
													setEditName(
														event.target.value
													)
												}
											/>
										</td>
									) : (
										<td>{category.name}</td>
									)}

									<td className="text-center flex gap-2 justify-center mx-2">
										{!isEditing ? (
											<button
												className="btn-primary bg-orange items-center flex"
												onClick={() => {
													setIsEditing(true);
													return undefined; // Ensure the function returns void
												}}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="w-4 h-4"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
													/>
												</svg>
												Edit
											</button>
										) : (
											<button
												className="btn-primary bg-orange items-center flex"
												onClick={() => {
													setIsEditing(true);
													return undefined; // Ensure the function returns void
												}}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="w-4 h-4"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
													/>
												</svg>
												Save
											</button>
										)}

										<button className="btn-primary !bg-red-800 items-center flex">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-4 h-4"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
												/>
											</svg>
											Delete
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</thead>
			</table>
		</section>
	);
}
