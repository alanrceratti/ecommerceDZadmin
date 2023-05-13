"use client";
import { useSession, signIn, signOut } from "next-auth/react";

function Hero() {
	const { data: session, status } = useSession();
	const sessionOrNull: any | {} = session;

	if (status === "loading") {
		return <div>Loading...</div>;
	}

	if (sessionOrNull) {
		return (
			<>
				Signed in as {sessionOrNull?.user?.email} <br />
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
