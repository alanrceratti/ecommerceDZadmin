"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataProps } from "@/app/types";

interface Props {
	session: DataProps | null;
}

export default function Products() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		axios.get("api/products").then((response) => {
			setProducts(response.data);
		});
	}, []);

	return (
		<section className="items-center m-4 px-4 max-w-[700px] ml-auto mr-auto">
			<Link
				href={"/products/new"}
				className="btn-primary !bg-amber-500 font-unisansthin "
			>
				Add new product
			</Link>
			<table className="basic mt-4   ">
				<thead>
					<tr>
						<td>Product name</td>
					</tr>

					{products ? (
						<tbody>
							{products.map((product: DataProps, index) => (
								<tr key={index + product.name}>
									<td>{product.name}</td>
									<td className="text-center flex gap-2 justify-center mx-2">
										<Link
											className="bg-orange items-center "
											href={
												"/products/edit/" + product._id
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
										</Link>

										<Link
											className="bg-red-800 items-center"
											href={
												"/products/delete/" +
												product._id
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
													d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
												/>
											</svg>
											Delete
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					) : null}
				</thead>
			</table>
		</section>
	);
}
