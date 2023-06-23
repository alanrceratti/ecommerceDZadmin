"use client";
import { createContext, useState } from "react";
import { NewProductsProps } from "../types";

interface CartContext {}

export const CartContext = createContext<CartContext>({});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return <CartContext.Provider value={{}}>{children}</CartContext.Provider>;
};
