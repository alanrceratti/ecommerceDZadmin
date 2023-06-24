// "use client";
// import { createContext, useEffect, useState } from "react";
// import { NewProductsProps } from "../types";

// interface CartContext {
// 	setCartProducts: React.Dispatch<React.SetStateAction<NewProductsProps[]>>;
// 	cartProducts: NewProductsProps[];
// 	addProductToCart: (newProduct: NewProductsProps) => void;
// 	addProduct: (newProduct: NewProductsProps) => void;
// }

// export const CartContext = createContext<CartContext>({
// 	setCartProducts: () => {},
// 	cartProducts: [],
// 	addProductToCart: () => {},
// 	addProduct: () => {},
// });

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
// 	children,
// }) => {
// 	let initialCartProducts: NewProductsProps[] = [];

// 	if (typeof window !== "undefined") {
// 		const savedCart = localStorage.getItem("cart");
// 		if (savedCart) {
// 			initialCartProducts = JSON.parse(savedCart);
// 		}
// 	}

// 	const [cartProducts, setCartProducts] =
// 		useState<NewProductsProps[]>(initialCartProducts);

// 	function addProductToCart(newProduct: NewProductsProps) {
// 		setCartProducts((prev) => [...prev, newProduct]);
// 	}

// 	useEffect(() => {
// 		if (cartProducts?.length > 0 && typeof window !== "undefined") {
// 			localStorage.setItem("cart", JSON.stringify(cartProducts));
// 		}
// 	}, [cartProducts]);

// 	function addProduct(newProduct: NewProductsProps) {
// 		setCartProducts((prev) => [...prev, newProduct]);
// 	}

// 	return (
// 		<CartContext.Provider
// 			value={{
// 				setCartProducts,
// 				cartProducts,
// 				addProductToCart,
// 				addProduct,
// 			}}
// 		>
// 			{children}
// 		</CartContext.Provider>
// 	);
// };
