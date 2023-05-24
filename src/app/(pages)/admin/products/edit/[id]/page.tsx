"use client";
import { useParams } from "next/dist/client/components/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/components/productForm";
import { NewProductsProps } from "@/app/types";

export default function EditProduct() {
	const { id } = useParams() as { id: string };
	useEffect(() => {
		if (!id) {
			return;
		}
		axios
			.get("/api/products?id=" + id)
			.then((response) => setProductsInfo(response.data));
	}, [id]);

	const [productsInfo, setProductsInfo] = useState<NewProductsProps>();

	return (
		<>
			<h1 className="h1">Edit Product</h1>
			{productsInfo && <ProductForm {...productsInfo} />}
		</>
	);
}
