"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { NewProductsProps } from "../../../../types";

export default function DeleteProduct() {
	const router = useRouter();
	const { id } = useParams() as { id: string };

	const [productInfo, setProductInfo] = useState<NewProductsProps>();

	function goBack() {
		router.push("/products");
		return null;
	}

	useEffect(() => {
		if (!id) {
			return;
		}
		axios
			.get("/api/products?id=" + id)
			.then((response) => setProductInfo(response.data));
	}, [id]);

	return (
		<>
			<h1 className="ml-auto mr-auto text-center">
				Do you really want to delete product{" "}
				{productInfo && productInfo?.name}
			</h1>
			<div className="flex justify-center">
				<button className="btn-primary mx-2">Yes</button>
				<button onClick={goBack} className="btn-primary !bg-red-700">
					NO
				</button>
			</div>
		</>
	);
}
