"use client";

import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

import Hero from "./(pages)/hero/page";

export default async function App() {
	// const session = await getServerSession(authOptions);
	// console.log(session);
	return (
		<main>
			<Hero />
		</main>
	);
}
