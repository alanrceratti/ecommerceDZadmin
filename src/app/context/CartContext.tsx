"use client";
import { createContext, useState } from "react";

interface CartContext {
	cartItems: number;
	addToCart: () => void;
	removeFromCart: () => void;
	setCartProducts: React.Dispatch<React.SetStateAction<any[]>>;
	cartProducts: any[];
  addProduct: (productId: string) => void;
}

export const CartContext = createContext<CartContext>({
	cartItems: 0,
	addToCart: () => {},
	removeFromCart: () => {},
	setCartProducts: () => {},
	cartProducts: [],
  addProduct: (productId: string) => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [cartItems, setCartItems] = useState<number>(0);
	const [cartProducts, setCartProducts] = useState<any[]>([]);

	const addToCart = () => {
		setCartItems(cartItems + 1);
	};

	const removeFromCart = () => {
		cartItems > 0 && setCartItems(cartItems - 1);
	};

	function addProduct(productId: string) {
		setCartProducts((prev) => [...prev, productId]);
	}

	return (
		<CartContext.Provider
			value={{
				cartItems,
				setCartProducts,
				cartProducts,
				addToCart,
				removeFromCart,
				addProduct,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
