"use client";
import { useSession, signIn, signOut } from "next-auth/react";

function Hero() {
	const { data: session } = useSession();

	if (session) {
		return (
			<>
				Signed in as {session?.user?.email} <br />
				<button onClick={() => signOut()}>Sign out</button>
			</>
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

export default Hero;
