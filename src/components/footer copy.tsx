import useMedia from "@/app/hooks/useMedia";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	const mobile = useMedia("(max-width:740px)");
	const mobile2 = useMedia("(max-width:515px)");

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
					<main
						className={`w-full xl:w-2/3  mt-8 gap-8 h-fit grid ${
							mobile ? "grid-cols-2" : "grid-cols-3"
						} ${mobile2 ? "grid-cols-1" : null} m-auto mx-8 `}
					>
						{/* <div className="flex flex-wrap justify-center "> */}
						<div className="footer-card">
							<h1>SHOP</h1>
							<Link
								href="/"
								className="block font-poppins w-fit font-light "
							>
								<h3 className="hover:text-orange w-fit">
									All Drones
								</h3>
							</Link>
							<Link
								href="/"
								className="block font-poppins w-fit font-light "
							>
								<h3 className="hover:text-orange w-fit">
									Camera Drones
								</h3>
							</Link>
							<Link
								href="/"
								className="block font-poppins w-fit font-light "
							>
								<h3 className="hover:text-orange w-fit">
									Beginner Drones
								</h3>
							</Link>
							<Link
								href="/"
								className="block font-poppins w-fit font-light "
							>
								<h3 className="hover:text-orange w-fit">
									Professional Drones
								</h3>
							</Link>
							<Link
								href="/"
								className="block font-poppins w-fit font-light "
							>
								<h3 className="hover:text-orange w-fit">
									Racing Drones
								</h3>
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
								className="block font-poppins w-fit font-light "
							>
								<h3 className="hover:text-orange w-fit">
									Frequent Questions
								</h3>
							</Link>
							<Link
								href="/"
								className="block font-poppins w-fit font-light "
							>
								<h3 className="hover:text-orange w-fit">
									Shipping and Delivery
								</h3>
							</Link>
							<Link
								href="/"
								className="block font-poppins w-fit font-light "
							>
								<h3 className="hover:text-orange w-fit">
									Return and Refund Policy
								</h3>
							</Link>
							<Link
								href="/"
								className="block font-poppins w-fit font-light "
							>
								<h3 className="hover:text-orange w-fit">
									Privacy Policy
								</h3>
							</Link>
							<Link
								href="/"
								className="block font-poppins w-fit font-light "
							>
								<h3 className="hover:text-orange w-fit">
									Terms and Conditions
								</h3>
							</Link>
						</div>

						<div className="footer-card">
							<h1>RESOURCES</h1>
							<Link
								href="/"
								className="block font-poppins w-fit font-light "
							>
								<h3 className="hover:text-orange w-fit">
									Drone Buying Guide
								</h3>
							</Link>
							<Link
								href="/"
								className="block font-poppins w-fit font-light "
							>
								<h3 className="hover:text-orange w-fit">
									Drone Photography Tips
								</h3>
							</Link>
							<Link
								href="/"
								className="block font-poppins w-fit font-light "
							>
								<h3 className="hover:text-orange w-fit">
									Drone Maintenance
								</h3>
							</Link>
						</div>
						<div className="footer-card">
							<h1>SUPPORT</h1>
							<Link
								href="/"
								className="block font-poppins w-fit font-light "
							>
								<h3 className="hover:text-orange w-fit">
									Order Tracking
								</h3>
							</Link>
							<Link
								href="/"
								className="block font-poppins w-fit font-light "
							>
								<h3 className="hover:text-orange w-fit">
									Payment Methods
								</h3>
							</Link>
							<Link
								href="/"
								className="block font-poppins w-fit font-light "
							>
								<h3 className="hover:text-orange w-fit">
									Warranty and Repairs
								</h3>
							</Link>
							<Link
								href="/"
								className="block font-poppins w-fit font-light "
							>
								<h3 className="hover:text-orange w-fit">
									Technical Support
								</h3>
							</Link>
						</div>
						<div className="footer-card">
							<h1>SOCIAL</h1>
							<Link
								href="/"
								className="block font-poppins w-fit font-light "
							>
								<h3 className="hover:text-orange w-fit">
									Facebook
								</h3>
							</Link>
							<Link
								href="/"
								className="block font-poppins w-fit font-light "
							>
								<h3 className="hover:text-orange w-fit">
									Twitter
								</h3>
							</Link>
							<Link
								href="/"
								className="block font-poppins w-fit font-light "
							>
								<h3 className="hover:text-orange w-fit">
									Instagram
								</h3>
							</Link>
							<Link
								href="/"
								className="block font-poppins w-fit font-light "
							>
								<h3 className="hover:text-orange w-fit">
									Youtube
								</h3>
							</Link>
						</div>
						{/* </div> */}
					</main>
				</div>
			</div>
		</>
	);
}
