"use client";
import { useParams } from "next/dist/client/components/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/components/productForm";

interface NewProductProps {
	name: string;
	description: string;
	price: number;
	_id: string;
}

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

	const [productsInfo, setProductsInfo] = useState<NewProductProps>();

	return (
		<>
			<h1>Edit Product</h1>
			{productsInfo && <ProductForm {...productsInfo} />}
		</>
	);
}
