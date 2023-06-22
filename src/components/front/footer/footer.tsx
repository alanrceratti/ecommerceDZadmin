"use client";
import useMedia from "@/app/hooks/useMedia";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	const mobile = useMedia("(max-width:740px)");
	const mobile2 = useMedia("(max-width:515px)");
	const footerimage = useMedia("(max-width:515px)");

	return (
		<>
			<hr className="h-[10px] w-4/5 border-none mb-2 ml-auto mr-auto   "></hr>
			<div className="bg-black text-white ">
				<div className="flex justify-center pb-8 ">
					<aside className="hidden lg:block bg-white m-8 rounded-md ">
						<div className="w-[350px] h-[233px]  relative">
							<Image
								src="/assets/footer/drones1.webp"
								alt="drone-photo"
								fill
								className="rounded-t-md"
								sizes="(max-width: 350px) 100vw"
							/>
						</div>
						<div className="w-[350px] h-[233px]  relative">
							<Image
								src="/assets/footer/drones2.webp"
								alt="drone-photo"
								fill
								className="rounded-b-md"
								sizes="(max-width: 350px) 100vw"
							/>
						</div>
					</aside>
					<main
						className={`w-full xl:w-2/3  mt-8 gap-4 h-fit grid mx-4 ${
							mobile ? "grid-cols-2" : "grid-cols-3"
						} ${mobile2 ? "block" : null}  `}
					>
						<div className="footer-card">
							<h1>SHOP</h1>
							<Link
								href="/products/all"
								className="block font-poppins font-light hover:text-orange w-fit"
							>
								All Drones
							</Link>
							<Link
								href="/products/filter?category=646f26196df9ff6b006fcdeb"
								className="block font-poppins font-light hover:text-orange w-fit"
							>
								Subaquatic
							</Link>
							<Link
								href="/products/filter?category=646e6bb9affb3bbaa0805fa6"
								className="block font-poppins font-light hover:text-orange w-fit"
							>
								Beginner Drones
							</Link>
							<Link
								href="/products/filter?category=646e6c20affb3bbaa0805fbe"
								className="block font-poppins font-light hover:text-orange w-fit"
							>
								Professional Drones
							</Link>
							<Link
								href="/products/filter?category=646e6c23affb3bbaa0805fc1"
								className="block font-poppins font-light hover:text-orange w-fit"
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
							<br></br>
							<h2 className="font-semibold">Telephone:</h2>
							<p>021 1234 4534</p>
						</div>
						<div className="footer-card">
							<h1 className="cursor-pointer">
								<Link href={"info/information"}>
									INFORMATION
								</Link>
							</h1>
							<Link
								href="info/information/#FAQ"
								className="block font-poppins font-light hover:text-orange w-fit"
							>
								Frequent Questions
							</Link>
							<Link
								href="info/information/#Shipping&Delivery"
								className="block font-poppins font-light hover:text-orange w-fit"
							>
								Shipping and Delivery
							</Link>
							<Link
								href="info/information/#ReturnPolicy"
								className="block font-poppins font-light hover:text-orange w-fit"
							>
								Return and Refund Policy
							</Link>
							<Link
								href="info/information/#PrivacyPolicy"
								className="block font-poppins font-light hover:text-orange w-fit"
							>
								Privacy Policy
							</Link>
							<Link
								href="info/information/#Terms&Conditions"
								className="block font-poppins font-light hover:text-orange w-fit"
							>
								Terms and Conditions
							</Link>
						</div>

						<div className="footer-card">
							<h1>RESOURCES</h1>
							<Link
								href="info/resources/#Dronebuying"
								className="block font-poppins font-light hover:text-orange w-fit"
							>
								Drone Buying Guide
							</Link>
							<Link
								href="info/resources/#DroneTips"
								className="block font-poppins font-light hover:text-orange w-fit"
							>
								Drone Photography Tips
							</Link>
							<Link
								href="info/resources/#DroneMaintenance"
								className="block font-poppins font-light hover:text-orange w-fit"
							>
								Drone Maintenance
							</Link>
						</div>
						<div className="footer-card">
							<h1>SUPPORT</h1>
							<Link
								href="info/support/#Tracking"
								className="block font-poppins font-light hover:text-orange w-fit"
							>
								Order Tracking
							</Link>
							<Link
								href="info/support/#Payment"
								className="block font-poppins font-light hover:text-orange w-fit"
							>
								Payment Methods
							</Link>
							<Link
								href="info/support/#Warranty"
								className="block font-poppins font-light hover:text-orange w-fit"
							>
								Warranty and Repairs
							</Link>
							<Link
								href="info/support/#Support"
								className="block font-poppins font-light hover:text-orange w-fit"
							>
								Technical Support
							</Link>
						</div>
						<div className="footer-card">
							<h1>SOCIAL</h1>
							<Link
								href="https://facebook.com/"
								className="block font-poppins font-light hover:text-orange w-fit"
							>
								Facebook
							</Link>
							<Link
								href="https://twitter.com/"
								className="block font-poppins font-light hover:text-orange w-fit"
							>
								Twitter
							</Link>
							<Link
								href="https://www.instagram.com/"
								className="block font-poppins font-light hover:text-orange w-fit"
							>
								Instagram
							</Link>
							<Link
								href="https://www.youtube.com/"
								className="block font-poppins font-light hover:text-orange w-fit"
							>
								Youtube
							</Link>
						</div>
					</main>
				</div>
			</div>
		</>
	);
}
