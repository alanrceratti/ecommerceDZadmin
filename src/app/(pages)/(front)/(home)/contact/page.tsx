"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Image from "next/image";

export default function Contact() {
	const [name, setName] = useState<string>();
	const [email, setEmail] = useState<string>();
	const [message, setMessage] = useState<string>();
	const ref = useRef();
	const form: React.RefObject<HTMLFormElement> =
		useRef<HTMLFormElement>(null);

	const sendEmail = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		emailjs
			.sendForm(
				"service_tqev2zd",
				"template_nx52f3o",
				e.currentTarget,
				"2JeIbckUpeNHqc2l-"
			)
			.then(
				(result) => {
					alert("Message sent!");
					setEmail("");
					setMessage("");
					setName("");
				},
				(error) => {
					alert("Fail to sent message, please try again!");
				}
			);
	};

	return (
		<section className="lg:flex gap-8 bg-white lg:justify-center pt-8 px-4  ">
			<div className="lg:w-[500px] mx-auto   ">
				<h1 className="font-unisansheavy text-2xl text-center">
					Don&apos;t worry, we are here to help
				</h1>
				<div className="rounded-2xl relative">
					<Image
						src="/assets/contact.webp"
						alt="contactImage"
						width={500}
						height={400}
						className="object-center rounded-md mx-auto lg:mt-7 "
					/>
				</div>
			</div>

			<form
				ref={form}
				onSubmit={sendEmail}
				className="text-lg font-poppins bg-white w-[320px] 	sm:w-[500px] mx-auto  "
			>
				<h1 className="font-unisansheavy text-2xl text-center lg:mt-0 mt-4">
					Drop you message
				</h1>

				<div className="flex gap-3 mt-4 ">
					<label htmlFor="name" className="block mb-6 ">
						<span>Your name*</span>
						<input
							type="text"
							name="name"
							id="name"
							required
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black px-2"
						/>
					</label>
					<label htmlFor="email" className="block mb-6">
						<span>Your email*</span>
						<input
							id="email"
							name="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className=" block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300
 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black px-2"
							placeholder="hello@example.com"
							required
						/>
					</label>
				</div>
				<label htmlFor="message" className="block mb-6">
					<span>Message*</span>
					<textarea
						id="message"
						name="message"
						className=" block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black px-2"
						rows={8}
						placeholder="Don't be shy..."
						required
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					></textarea>
				</label>
				<div className="mb-6 text-center">
					<button
						type="submit"
						className={`
								 h-10 px-5 font-poppins font-bold  rounded-lg transition-colors duration-150 mb-4 focus:shadow-outline hover:bg-amber-400 bg-orange hover:text-black hover:font-bold `}
					>
						Send
					</button>
				</div>
			</form>
		</section>
	);
}
