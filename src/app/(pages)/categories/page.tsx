"use client";
import axios from "axios";
import Link from "next/link";
import { MouseEvent, useEffect, useState } from "react";

interface Categories {
	name: string;
	_id: string;
}

export default function CategoriesPage() {
	const [name, setName] = useState<string>("");
	const [categories, setCategories] = useState<Categories[]>([]);
	const [editName, setEditName] = useState("");
	const [categoryID, setCategoryID] = useState("");
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [ModalDelete, setModalDelete] = useState(false);

	async function saveCategory(event: MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		const current = { name };

		try {
			await axios.post("/api/categories", current);
			setName("");
			fetchCategories();
		} catch (error) {
			console.log("categories page error:", error);
		}
	}

	async function fetchCategories() {
		await axios.get("/api/categories").then((response) => {
			setCategories(response.data);
		});
	}
	useEffect(() => {
		fetchCategories();
	}, []);

	const handleEdit = (index: number) => {
		setActiveIndex(index);
		setCategoryID(categories[index]._id);
		setEditName(categories[index].name);
	};

	// useEffect(() => {
	// 	console.log("activeIndex:", activeIndex, categoryID);
	// }, [activeIndex]);

	const handleDelete = (index: number) => {
		setModalDelete(true);
		setCategoryID(categories[index]._id);
	};

	async function handleEditSave(event: MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		if (activeIndex !== null) {
			try {
				await axios.put("/api/categories", {
					name: editName,
					_id: categoryID,
				});
				setActiveIndex(null);
				fetchCategories();
			} catch (error) {
				console.log("category iddd error:", error);
			}
		}
	}
	async function deleteCategory() {
		await axios.delete("/api/categories?id=" + categoryID);
		setModalDelete(false);
		setActiveIndex(null);
		fetchCategories();
	}

	function goBack() {
		setModalDelete(false);
		setActiveIndex(null);
	}

	return (
		<section className="items-center m-4 px-4 max-w-[700px] ml-auto mr-auto">
			<h1 className="relative">Categories</h1>
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
									{activeIndex === index ? (
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
										{activeIndex !== index ? (
											<button
												className="btn-primary bg-orange items-center flex"
												onClick={() =>
													handleEdit(index)
												}
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
												type="button"
												className="btn-primary bg-orange items-center flex"
												onClick={handleEditSave}
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

										<button
											className="btn-primary !bg-red-800 items-center flex"
											onClick={() => handleDelete(index)}
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

				{ModalDelete ? (
					<div className="absolute top-1/3 left-auto shadow-[0px_20px_20px_1000px_#000000b9]">
						<div className="bg-white text-black w-[380px] h-32 rounded-md font-semibold text-center ">
							<h2>
								Are you sure you want to delete this category?
							</h2>

							<div className="flex gap-2 justify-center my-4 ">
								<button
									className="btn-primary !bg-red-700"
									onClick={deleteCategory}
								>
									Yes
								</button>
								<button
									className="btn-primary"
									onClick={goBack}
								>
									No
								</button>
							</div>
						</div>
					</div>
				) : null}
			</table>
		</section>
	);
}
