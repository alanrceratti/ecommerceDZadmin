"use client";
import useOutsideClick from "@/app/hooks/useOnClickOutside";
import Link from "next/link";
import { useRef, useState } from "react";

type RegisterFormProps = {
	setIsRegisterOpen: (isOpen: boolean) => void;
	closeRegister: () => void;
};

export default function RegisterForm({
	setIsRegisterOpen,
	closeRegister,
}: RegisterFormProps) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");

	const ref = useRef<HTMLDivElement | null>(null);

	useOutsideClick(ref, () => {
		setIsRegisterOpen(false);
	});
	return (
		<section className="flex justify-center items-center w-full h-full fixed top-0 left-0 text-black z-50">
			<div className="bg-gray-50 p-2 w-3/6 rounded-md" ref={ref}>
				<div className="float-right">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6 cursor-pointer"
						onClick={closeRegister}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</div>

				<form
					action="/action_page.php"
					className="w-full ml-auto mr-auto border border-gray-400 rounded-md"
				>
					<div className="m-4 ">
						<p>Please fill in this form to create an account.</p>
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
							<Link href="#" className="text-blue-600">
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
