"use client";
import { NewProductsProps } from "@/app/types";
import ProductForm from "@/components/productForm";

import { useState } from "react";

export default function NewProduct() {
	const [productsInfo, setProductsInfo] = useState<NewProductsProps>();

	return (
		<>
			<h1>New Product</h1>
			<ProductForm {...productsInfo} />
		</>
	);
}
