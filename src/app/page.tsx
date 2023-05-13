"use client";
import { SessionProvider } from "next-auth/react";
import Hero from "./hero/page";

export default function App() {
	return (
		<>
			<SessionProvider>
				<Hero />
			</SessionProvider>
		</>
	);
}
