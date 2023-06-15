// import { NewProductsProps } from "../types";
// import React, { createContext, useContext, useEffect, useState } from "react";

// export const CategoryContext = createContext<NewProductsProps[]>([]);

// const useCategoryContext = () => useContext(CategoryContext);

// export const CategoryProvider: React.FC = ({
// 	children,
// }: React.PropsWithChildren<{}>) => {
// 	const [categories, setCategories] = useState<NewProductsProps[]>([]);

// 	useEffect(() => {
// 		fetch("/api/categoriesAll")
// 			.then((response) => response.json())
// 			.then((data) => {
// 				setCategories(data);
// 			});
// 	}, []);

// 	return (
// 		<CategoryContext.Provider value={categories}>
// 			{children}
// 		</CategoryContext.Provider>
// 	);
// };
