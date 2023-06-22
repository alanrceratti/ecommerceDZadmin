import "./globals.css";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { NextAuthProvider } from "./providers";
import HeaderNav from "@/components/front/main/header";
import Footer from "@/components/front/footer/footer";
import { CartProvider } from "./context/CartContext";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["800", "500", "300"],
	variable: "--font-poppins",
});

const unisansheavy = localFont({
	src: [
		{
			path: "../../public/fonts/UniSansHeavy.otf",
		},
	],
	variable: "--font-unisansheavy",
});

const unisansthin = localFont({
	src: [
		{
			path: "../../public/fonts/UniSansThin.otf",
		},
	],
	variable: "--font-unisansthin",
});

export const metadata = {
	title: "Drone Zone",
	description: "Start to fly today.",
};

interface RootLayoutProps {
	children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
	return (
		<html lang="en">
			<head></head>
			<body
				className={`${poppins.variable} ${unisansheavy.variable} ${unisansthin.variable} bg-gray900 `}
			>
				<CartProvider>
					<NextAuthProvider>
						<HeaderNav />
						{children} <Footer />
					</NextAuthProvider>
				</CartProvider>
			</body>
		</html>
	);
};

export default RootLayout;
