import Image from "next/image";
import Link from "next/link";
import { Main } from "./main/main";

export default function Header() {
	return (
		<>
			<header className="text-white font-poppins flex items-center  px-8 bg-black h-[100px]">
				<Link href={"/"} className=" mr-20">
					<Image
						src="assets/header/DroneZone.svg"
						alt="Logo"
						width={100}
						height={100}
						className="min-h-[100px] min-w-[100px]"
					/>
				</Link>
				<nav className="flex gap-8 flex-grow  ">
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
				<div className="flex items-center gap-4">
					<button className="btn-primaryy">Register</button>
					<button className="btn-primaryy">Login</button>
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
		</>
	);
}
