import "./globals.css";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";

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

// export const metadata = {
// 	title: "Drone Zone",
// 	description: "Start to fly",
// };

interface RootLayoutProps {
	children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
	return (
		<html lang="en">
			<head>
				<title>Drone Zone</title>
			</head>
			<body
				className={`${poppins.variable} ${unisansheavy.variable} ${unisansthin.variable}`}
			>
				{children}
			</body>
		</html>
	);
};

export default RootLayout;
