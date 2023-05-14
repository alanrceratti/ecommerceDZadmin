"use client";

import Hero from "./hero/page";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../lib/auth";

export default function App() {
	// const session = getServerSession(authOptions);
	// console.log(session);
	return (
		<main>
			<Hero />;
		</main>
	);
}
