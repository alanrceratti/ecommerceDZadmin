"use client";

import { User } from "@/components/user.component";
import Hero from "./hero/page";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../lib/auth";

export default function App() {
	// const session = await getServerSession(authOptions);
	// console.log(session);
	return (
		<main>
			<Hero />;
			<User />;
		</main>
	);
}
