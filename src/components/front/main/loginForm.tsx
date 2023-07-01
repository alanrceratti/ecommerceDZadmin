"use client";
import useOutsideClick from "@/app/hooks/useOnClickOutside";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { Session } from "inspector";
import { useRouter } from "next/navigation";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [wrongCredentials, setWrongCredentials] = useState(false);
	const router = useRouter();
	const ref = useRef<HTMLDivElement | null>(null);

	const handleGoBackTwice = () => {
		window.history.go(-1);
	};

	const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
		event
	) => {
		event.preventDefault();

		// 	// Send a POST request to the backend API
		try {
			const data = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});
			if (data?.error === null) {
				setWrongCredentials(false);
				handleGoBackTwice();
				setEmail("");
				setPassword("");
				setTimeout(() => {
					window.location.reload();
				}, 2000);
			} else if (data?.error !== null) {
				setWrongCredentials(true);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section className="flex justify-center items-center w-full h-full p-8 text-black">
			<div className="bg-gray-50 p-2 max-w-md rounded-md" ref={ref}>
				<div className="float-right">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6 cursor-pointer"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</div>

				<form
					onSubmit={handleFormSubmit}
					className="w-full ml-auto mr-auto border border-gray-400 rounded-md"
				>
					<div className="m-4 ">
						<p>Please Login with your account details</p>
						<div className="my-4">
							<label htmlFor="email">
								<b>Email</b>
							</label>
							<input
								type="text"
								placeholder="Enter Email"
								name="email"
								id="email"
								required
								onChange={(event) =>
									setEmail(event?.target.value)
								}
								value={email}
							/>

							<label htmlFor="psw">
								<b>Password</b>
							</label>
							<input
								type="password"
								placeholder="Enter Password"
								name="psw"
								id="psw"
								required
								onChange={(event) =>
									setPassword(event?.target.value)
								}
								value={password}
							/>
						</div>

						<div className="w-full mt-8 ">
							{wrongCredentials && (
								<p className="text-sm text-red-600">
									*Wrong email or password, please try again.
								</p>
							)}
							<button
								type="submit"
								className="btn-secondary !m-0  "
							>
								Login
							</button>
						</div>
					</div>

					<div className="m-4">
						<p>
							Don&apos;t have an account?{" "}
							<Link href="/register" className="text-blue-600">
								Register
							</Link>
							.
						</p>
					</div>
				</form>
			</div>
		</section>
	);
}
