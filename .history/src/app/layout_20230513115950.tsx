import "./globals.css";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["800", "500", "300"],
	variable: "--font-poppins",
});

const unisans = localFont({
	src: [
		{
			path: "../../public/fonts/UniSansHeavy.",
		},
	],
	variable: "--font-grifter",
});

export const metadata = {
	title: "Drone Zone",
	description: "Start to fly",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${poppins.variable}`}>{children}</body>
		</html>
	);
}
