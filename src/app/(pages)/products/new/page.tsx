"use client";
import { NewProductsProps } from "@/app/types";
import ProductForm from "@/components/productForm";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewProduct() {
	const router = useRouter();
	const [productsInfo, setProductsInfo] = useState<NewProductsProps>();

	return (
		<>
			<h1>New Product</h1>
			<ProductForm {...productsInfo} />
		</>
	);
}
