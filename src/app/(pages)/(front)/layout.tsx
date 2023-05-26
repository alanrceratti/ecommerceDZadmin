"use client";
import Image from "next/image";
import Link from "next/link";
import { Main } from "./main/main";
import useMedia from "@/app/hooks/useMedia";
import { useEffect, useState } from "react";
import Footer from "@/components/footer";

export default function Header() {
	const mobile = useMedia("(max-width: 990px)");
	const [isInView, setIsInView] = useState(false);
	const [prevScroll, setPrevScroll] = useState(0);
	const [isOpen, setIsOpen] = useState(false);

	function handleMenu() {
		setIsOpen((isOpen) => !isOpen);
	}

	const handleScroll = () => {
		const currentScroll = window.pageYOffset;
		setIsInView(currentScroll <= prevScroll);
		setPrevScroll(currentScroll);
		if (currentScroll < 150) {
			setIsInView(false);
		}
		console.log(currentScroll);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	});

	return (
		<>
			<header
				className={`${
					isInView ? "sticky -top-32 translate-y-32 " : ""
				}text-white font-poppins flex items-center z-50 justify-between px-2 transition-all !duration-1000 sm:px-8 bg-black h-[100px]`}
			>
				<Link href={"/"} className=" mr-20">
					<Image
						src="assets/header/DroneZone.svg"
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
						<Link href={"/shop"} className="hover">
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
							{!isOpen ? (
								<div className="absolute bg-black rounded-lg px-8 py-4 -left-5 transition-all">
									<nav className="flex flex-col gap-2 ">
										<Link href={"/"} className="hover">
											Home
										</Link>
										<Link href={"/shop"} className="hover">
											Shop
										</Link>
										<Link href={"/about"} className="hover">
											About Us
										</Link>
										<Link
											href={"/contact"}
											className="hover"
										>
											Contact
										</Link>
									</nav>
									<button className="btn-primaryy-mobile mb-2 mt-2">
										Login
									</button>
									<button className="btn-primaryy-mobile ">
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
							<button className="btn-primaryy">Register</button>
						</>
					) : null}
					<Link href={"/cart"} className="flex">
						<Image
							src="assets/header/cart.svg"
							alt="Logo"
							width={60}
							height={60}
							className="min-h-[60px] min-w-[60px]"
						/>
						0
					</Link>
				</div>
			</header>
			<Main />
			<footer>
				<Footer />
			</footer>
		</>
	);
}
