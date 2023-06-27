"use client";
import Image from "next/image";
import Link from "next/link";
import useMedia from "@/app/hooks/useMedia";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function HeaderNav() {
	const mobile = useMedia("(max-width: 990px)");
	const [isInView, setIsInView] = useState(false);
	const [prevScroll, setPrevScroll] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const { cartProducts } = useContext(CartContext);
	// const [isRegisterOpen, setIsRegisterOpen] = useState(false);

	const route = useRouter();
	const { data } = useSession();

	useEffect(() => {
		console.log(data, "SESSION");
	}, [data]);

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

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
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
				<Link href={"/"} className=" md:mr-20 mr-4">
					<Image
						src="/assets/header/DroneZone.svg"
						alt="Logo"
						width={100}
						height={100}
						className=" min-w-[100px] "
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
						<div>
							{data?.user && (
								<h2 className="text-base">
									Hi, {data?.user.name}
								</h2>
							)}
						</div>
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
									{data?.user ? (
										<div className="flex flex-col">
											<button
												onClick={() => signOut()}
												className="btn-primaryy-mobile "
											>
												Logout
											</button>
										</div>
									) : (
										<div className="flex flex-col">
											<Link
												href="/login"
												className="btn-primaryy-mobile mb-2 mt-2"
												onClick={() => setIsOpen(false)}
											>
												Login
											</Link>
											<Link
												href="/register"
												className="btn-primaryy-mobile "
											>
												Register
											</Link>
										</div>
									)}
								</div>
							) : null}
						</div>
					</>
				)}
				<div className="flex items-center gap-4">
					{!mobile && data?.user ? (
						<div className="flex flex-col gap-2">
							<div className="flex flex-row items-center gap-2">
								<div>
									{data?.user && (
										<h2 className="text-base">
											Hi, {data?.user.name}
										</h2>
									)}
								</div>
								<button
									onClick={() => signOut()}
									className="btn-third mb-2 mt-2 "
								>
									Logout
								</button>
							</div>
						</div>
					) : (
						!mobile && (
							<>
								<Link
									href="/login"
									className="btn-third mb-2 mt-2"
								>
									Login
								</Link>
								<Link href="/register" className="btn-third ">
									Register
								</Link>
							</>
						)
					)}

					<Link href={"/cart"} className="flex flex-col mb-4">
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
