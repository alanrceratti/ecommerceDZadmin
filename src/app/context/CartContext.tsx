"use client";
import { createContext, useEffect, useState } from "react";
import { NewProductsProps } from "../types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CartContext {
	setCartProducts: React.Dispatch<React.SetStateAction<NewProductsProps[]>>;
	cartProducts: NewProductsProps[];
	addProductToCart: (newProduct: NewProductsProps) => void;
	plusOneProduct: (newProduct: NewProductsProps) => void;
	lessOneProduct: (newProduct: NewProductsProps) => void;
	removeProduct: (newProduct: NewProductsProps) => void;
	clearCart: () => void;
}

export const CartContext = createContext<CartContext>({
	setCartProducts: () => {},
	cartProducts: [],
	addProductToCart: () => {},
	plusOneProduct: () => {},
	lessOneProduct: () => {},
	removeProduct: () => {},
	clearCart: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	let initialCartProducts: NewProductsProps[] = [];

	if (typeof window !== "undefined") {
		const savedCart = localStorage.getItem("cart");
		if (savedCart) {
			initialCartProducts = JSON.parse(savedCart);
		}
	}

	const [cartProducts, setCartProducts] =
		useState<NewProductsProps[]>(initialCartProducts);

	function addProductToCart(newProduct: NewProductsProps) {
		setCartProducts((prev) => [...prev, newProduct]);
		toast.success("Flying to your cart...", {
			position: "top-center",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	}

	useEffect(() => {
		if (typeof window !== "undefined") {
			if (cartProducts?.length > 0) {
				localStorage.setItem("cart", JSON.stringify(cartProducts));
			} else {
				localStorage.removeItem("cart");
			}
		}
	}, [cartProducts]);

	function plusOneProduct(newProduct: NewProductsProps) {
		setCartProducts((prev) => [...prev, newProduct]);
	}

	function lessOneProduct(newProduct: NewProductsProps) {
		setCartProducts((prev) => {
			const position = prev.indexOf(newProduct);
			if (position !== -1) {
				return prev.filter((value, index) => index !== position);
			}
			return prev;
		});
	}
	function removeProduct(newProduct: NewProductsProps) {
		setCartProducts((prev) => {
			return prev.filter((value) => value !== newProduct);
		});
	}

	function clearCart() {
		if (cartProducts.length > 0) {
			setCartProducts([]);
		}
	}

	return (
		<CartContext.Provider
			value={{
				setCartProducts,
				cartProducts,
				addProductToCart,
				plusOneProduct,
				lessOneProduct,
				removeProduct,
				clearCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
