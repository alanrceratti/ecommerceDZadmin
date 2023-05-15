"use client";
import Nav from "@/components/nav";
import { useSession, signIn, signOut } from "next-auth/react";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
	const { data: session } = useSession();

	if (session) {
		return (
			<section className="bg-black800 min-h-screen text-white">
				<div className="flex h-screen  ">
					<Nav />
					<div className="flex flex-grow gap-3 bg-gray-600  my-2 mr-2 rounded-md mt-3 ">
						<h1 className="mx-2 ">{children}</h1>
						<button className="flex" onClick={() => signOut()}>
							Sign out
						</button>
					</div>
				</div>
			</section>
		);
	}
	return (
		<section>
			<div className="bg-black800 w-screen h-screen flex items-center">
				<div className="text-center w-full">
					<button
						className="bg-orange p-2 mx-2 rounded-md font-poppins"
						onClick={async () => await signIn("google")}
					>
						Login with Google
					</button>
					<button
						className="bg-orange p-2 mx-2 rounded-md font-poppins"
						onClick={async () => await signIn("github")}
					>
						Login with Github
					</button>
				</div>
			</div>
		</section>
	);
}

export default Layout;