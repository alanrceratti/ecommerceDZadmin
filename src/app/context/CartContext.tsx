"use client";
import { createContext, useState } from "react";
import { NewProductsProps } from "../types";

interface CartContext {
	cartItems: number;
	addToCart: () => void;
	setCartProducts: React.Dispatch<React.SetStateAction<NewProductsProps[]>>;
	setCartItems: React.Dispatch<React.SetStateAction<number>>;
	cartProducts: NewProductsProps[];
	addProduct: (productId: string) => void;
}

export const CartContext = createContext<CartContext>({
	cartItems: 0,
	addToCart: () => {},
	setCartProducts: () => {},
	cartProducts: [],
	addProduct: (productId: string) => [],
	setCartItems: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [cartItems, setCartItems] = useState<number>(1);
	const [cartProducts, setCartProducts] = useState<NewProductsProps[]>([]);

	const addToCart = () => {
		setCartItems(cartItems + 1);
	};

	function addProduct(productId: string) {
		setCartProducts((prev) => {
			const newProduct: NewProductsProps = {
				_id: productId,
				// Add other properties as needed
			};
			return [...prev, newProduct];
		});
	}

	console.log("teste", cartProducts);

	return (
		<CartContext.Provider
			value={{
				cartItems,
				setCartProducts,
				cartProducts,
				addToCart,

				addProduct,
				setCartItems,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
