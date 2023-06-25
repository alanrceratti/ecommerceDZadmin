"use client";
import Image from "next/image";
import Link from "next/link";
import useMedia from "@/app/hooks/useMedia";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/app/context/CartContext";
import RegisterForm from "./registerForm";

export default function HeaderNav() {
	const mobile = useMedia("(max-width: 990px)");
	const [isInView, setIsInView] = useState(false);
	const [prevScroll, setPrevScroll] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const { cartProducts } = useContext(CartContext);
	const [isRegisterOpen, setIsRegisterOpen] = useState(false);

	function handleMenu() {
		setIsOpen((isOpen) => !isOpen);
	}

	const handleScroll = () => {
		const currentScroll = window.scrollY;
		setIsInView(currentScroll <= prevScroll);
		setPrevScroll(currentScroll);
		if (currentScroll < 150) {
			setIsInView(false);
		}
	};

	const openRegister = () => {
		setIsRegisterOpen((isRegisterOpen) => !isRegisterOpen);
	};

	const closeRegister = () => {
		console.log("Closing register");
		setIsRegisterOpen(false);
	};

	useEffect(() => {
		if (!isRegisterOpen) {
			window.addEventListener("scroll", handleScroll);
			return () => window.removeEventListener("scroll", handleScroll);
		}
	});

	return (
		<>
			<header
				className={`${
					isInView ? "sticky -top-32 translate-y-32 " : ""
				}text-white font-poppins flex items-center z-50 justify-between px-2 transition-all !duration-1000 sm:px-8 bg-black ${
					mobile ? "h-[70px]" : "h-[100px]"
				}`}
			>
				<Link href={"/"} className=" mr-20">
					<Image
						src="/assets/header/DroneZone.svg"
						alt="Logo"
						width={100}
						height={100}
						className="min-h-[100px] min-w-[100px]"
					/>
				</Link>
				{!mobile ? (
					<nav className="flex gap-8 ">
						<Link href={"/"} className="hover">
							Home
						</Link>
						<Link href={"/products/all"} className="hover">
							Shop
						</Link>
						<Link href={"/about"} className="hover">
							About Us
						</Link>
						<Link href={"/contact"} className="hover">
							Contact
						</Link>
					</nav>
				) : (
					<>
						<div className=" ml-auto pr-4 relative ">
							<button
								onClick={handleMenu}
								className="transition-all"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-9 h-9"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
									/>
								</svg>
							</button>
							{isOpen ? (
								<div className="absolute bg-black rounded-lg px-8 py-4 -left-5 transition-all">
									<nav className="flex flex-col gap-2 ">
										<Link
											href={"/"}
											onClick={() => setIsOpen(false)}
											className="hover"
										>
											Home
										</Link>
										<Link
											href={"/products/all"}
											onClick={() => setIsOpen(false)}
											className="hover"
										>
											Shop
										</Link>
										<Link
											href={"/about"}
											onClick={() => setIsOpen(false)}
											className="hover"
										>
											About Us
										</Link>
										<Link
											href={"/contact"}
											onClick={() => setIsOpen(false)}
											className="hover"
										>
											Contact
										</Link>
									</nav>
									<button className="btn-primaryy-mobile mb-2 mt-2">
										Login
									</button>
									<button
										className="btn-primaryy-mobile "
										onClick={() => openRegister()}
									>
										Register
									</button>
								</div>
							) : null}
						</div>
					</>
				)}
				<div className="flex items-center gap-4">
					{!mobile ? (
						<>
							<button className="btn-primaryy">Login</button>
							<button
								className="btn-primaryy"
								onClick={() => openRegister()}
							>
								Register
							</button>
						</>
					) : null}
					{isRegisterOpen && (
						<RegisterForm
							closeRegister={closeRegister}
							setIsRegisterOpen={setIsRegisterOpen}
						/>
					)}
					<Link href={"/cart"} className="flex flex-col">
						<Image
							src="/assets/header/cart.svg"
							alt="Logo"
							width={60}
							height={60}
							className="min-h-[60px] min-w-[60px]"
						/>
						{cartProducts.length > 0 ? (
							<h1 className="text-orange -mt-5  text-center">
								{cartProducts.length}
							</h1>
						) : (
							<h1 className="text-white -mt-5  text-center"></h1>
						)}
					</Link>
				</div>
			</header>
		</>
	);
}
