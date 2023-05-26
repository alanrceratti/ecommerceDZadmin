import useMedia from "@/app/hooks/useMedia";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	const mobile = useMedia("(max-width: 560px)");
	return (
		<>
			<hr className="h-[20px] w-4/5 border-none mb-2 ml-auto mr-auto   "></hr>
			<div className="bg-black text-white ">
				<div className="flex justify-center pb-8 ">
					<aside className="hidden lg:block bg-white m-8 ">
						<div className="w-[300px] h-[200px]   relative">
							<Image
								src="/assets/footer/drones1.webp"
								alt="drone-photo"
								fill
							/>
						</div>
						<div className="w-[300px] h-[200px]  relative">
							<Image
								src="/assets/footer/drones2.webp"
								alt="drone-photo"
								fill
							/>
						</div>
					</aside>
					<main className="w-full flex flex-wrap mt-8 gap-8 h-fit justify-center ">
						<div className="flex flex-wrap justify-center ">
							<div className="footer-card">
								<h1>SHOP</h1>
								<Link
									href="/"
									className="block font-poppins font-light hover:text-orange"
								>
									All Drones
								</Link>
								<Link
									href="/"
									className="block font-poppins font-light hover:text-orange"
								>
									Camera Drones
								</Link>
								<Link
									href="/"
									className="block font-poppins font-light hover:text-orange"
								>
									Beginner Drones
								</Link>
								<Link
									href="/"
									className="block font-poppins font-light hover:text-orange"
								>
									Professional Drones
								</Link>
								<Link
									href="/"
									className="block font-poppins font-light hover:text-orange"
								>
									Racing Drones
								</Link>
							</div>
							<div className="footer-card">
								<h1>CONTACT</h1>
								<h2 className="font-semibold">Adress:</h2>
								<p>
									12, Skyview Avenue, Droneville,<br></br>DL
									98765, United Kingdom
								</p>
								<h2 className="font-semibold">Telephone:</h2>
								<p>021 1234 4534</p>
							</div>
							<div className="footer-card">
								<h1>INFORMATION</h1>
								<Link
									href="/"
									className="block font-poppins font-light hover:text-orange"
								>
									Frequent Questions
								</Link>
								<Link
									href="/"
									className="block font-poppins font-light hover:text-orange"
								>
									Shipping and Delivery
								</Link>
								<Link
									href="/"
									className="block font-poppins font-light hover:text-orange"
								>
									Return and Refund Policy
								</Link>
								<Link
									href="/"
									className="block font-poppins font-light hover:text-orange"
								>
									Privacy Policy
								</Link>
								<Link
									href="/"
									className="block font-poppins font-light hover:text-orange"
								>
									Terms and Conditions
								</Link>
							</div>

							<div className="footer-card">
								<h1>RESOURCES</h1>
								<Link
									href="/"
									className="block font-poppins font-light hover:text-orange"
								>
									Drone Buying Guide
								</Link>
								<Link
									href="/"
									className="block font-poppins font-light hover:text-orange"
								>
									Drone Photography Tips
								</Link>
								<Link
									href="/"
									className="block font-poppins font-light hover:text-orange"
								>
									Drone Maintenance
								</Link>
							</div>
							<div className="footer-card">
								<h1>SUPPORT</h1>
								<Link
									href="/"
									className="block font-poppins font-light hover:text-orange"
								>
									Order Tracking
								</Link>
								<Link
									href="/"
									className="block font-poppins font-light hover:text-orange"
								>
									Payment Methods
								</Link>
								<Link
									href="/"
									className="block font-poppins font-light hover:text-orange"
								>
									Warranty and Repairs
								</Link>
								<Link
									href="/"
									className="block font-poppins font-light hover:text-orange"
								>
									Technical Support
								</Link>
							</div>
							<div className="footer-card">
								<h1>SOCIAL</h1>
								<Link
									href="/"
									className="block font-poppins font-light hover:text-orange"
								>
									Facebook
								</Link>
								<Link
									href="/"
									className="block font-poppins font-light hover:text-orange"
								>
									Twitter
								</Link>
								<Link
									href="/"
									className="block font-poppins font-light hover:text-orange"
								>
									Instagram
								</Link>
								<Link
									href="/"
									className="block font-poppins font-light hover:text-orange"
								>
									Youtube
								</Link>
							</div>
						</div>
					</main>
				</div>
			</div>
		</>
	);
}
