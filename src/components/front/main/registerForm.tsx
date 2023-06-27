"use client";
import useOutsideClick from "@/app/hooks/useOnClickOutside";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function RegisterForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const ref = useRef<HTMLDivElement | null>(null);

	const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
		event
	) => {
		event.preventDefault();

		// 	// Send a POST request to the backend API
		try {
			const response = await fetch("/api/registerUser", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, password }),
			});
			const data = await response.json();
			console.log(data);
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
						<p>Please fill in this form to create an account.</p>
						<div className="my-4">
							<label htmlFor="name">
								<b>Name</b>
							</label>
							<input
								type="text"
								placeholder="Enter name"
								name="name"
								id="name"
								required
								onChange={(event) =>
									setName(event?.target.value)
								}
								value={name}
							/>
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

							<label htmlFor="psw-repeat">
								<b>Repeat Password</b>
							</label>
							<input
								type="password"
								placeholder="Repeat Password"
								name="psw-repeat"
								id="psw-repeat"
								required
								onChange={(event) =>
									setRepeatPassword(event?.target.value)
								}
								value={repeatPassword}
							/>
						</div>
						<p className="text-sm">
							By creating an account you agree to our{" "}
							<Link href="#" className="text-blue-600">
								Terms & Privacy
							</Link>
							.
						</p>
						<div className="w-full mt-8 ">
							<button
								type="submit"
								className="btn-secondary !m-0  "
							>
								Register
							</button>
						</div>
					</div>

					<div className="m-4">
						<p>
							Already have an account?{" "}
							<Link href="/login" className="text-blue-600">
								Sign in
							</Link>
							.
						</p>
					</div>
				</form>
			</div>
		</section>
	);
}
