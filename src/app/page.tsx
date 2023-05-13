"use client";
import { SessionProvider } from "next-auth/react";
import Home from "./home/page";

export default function App() {
	return (
		<>
			<SessionProvider>
				<Home />
			</SessionProvider>
		</>
	);
}
