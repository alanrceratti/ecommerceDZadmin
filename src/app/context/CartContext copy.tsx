// "use client";
// import { createContext, useState } from "react";

// interface CartContext {
// 	cartItems: number;
// 	addToCart: () => void;
// 	removeFromCart: () => void;
// }

// export const CartContext = createContext<CartContext>({
// 	cartItems: 0,
// 	addToCart: () => {},
// 	removeFromCart: () => {},
// });

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
// 	children,
// }) => {
// 	const [cartItems, setCartItems] = useState<number>(0);
// 	const [cart, setCart] = useState<[]>([]);

// 	const addToCart = () => {
// 		setCartItems(cartItems + 1);
// 	};

// 	const removeFromCart = () => {
// 		cartItems > 0 && setCartItems(cartItems - 1);
// 	};

// 	const addProduct = async({
// 		id,
// 		name,
// 		price,
// 		image,
// 		quantity = 1,
// 	});

// 	const item = {
// 		id,
// 		name,
// 		price,
// 		image,
// 		quantity = 1,
// 	};

// 	const isItemExist = cart?.CartItems?.find((i) => i.id === item.id);
// 	let newCartItems;

// 	if (isItemExist) {
// 		newCartItems = cart?.CartItems?.map((i) =>
// 			i.id === isItemExist.id ? item : i
// 		);
// 	} else {
// 		newCartItems = [...(cart?.CartItems || []), item];
// 	}

//   localStorage.setItem('cart', JSON.stringify(newCartItems);

// 	return (
// 		<CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
// 			{children}
// 		</CartContext.Provider>
// 	);
// };
