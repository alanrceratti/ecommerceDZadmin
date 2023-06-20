"use client";
import { FAQtypes } from "@/app/types";
import FAQ from "../information/FAQ.json";
import { useState } from "react";
import Link from "next/link";

export default function FooterLin() {
	const faqs = FAQ as FAQtypes;

	const [openedFAQ, setOpenedFAQ] = useState<number[]>([]);

	const handleOpen = (event: number) => {
		setOpenedFAQ((prevOpenedFAQ) => {
			if (prevOpenedFAQ.includes(event)) {
				return prevOpenedFAQ.filter((item) => item !== event);
			} else {
				return [...prevOpenedFAQ, event];
			}
		});
	};
	console.log(openedFAQ);
	return (
		<section id="Shipping&Delivery" className="max-w-5xl ml-auto mr-auto">
			<section id="FAQ">
				<div className="flex justify-center items-start  flex-col ">
					<div className="text-left information">
						<h1>Frequent Questions</h1>
					</div>
					{faqs.questions.map((question, index) => (
						<div
							key={question.id}
							className="font-light font-poppins w-full "
						>
							<div className="bg-gray-100 my-3 ">
								<div className="flex mr-2">
									<h2
										onClick={() => handleOpen(index)}
										className="font-medium mx-4"
									>
										{question.question}
									</h2>
									{openedFAQ.includes(index) ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6  "
											onClick={() => handleOpen(index)}
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M4.5 15.75l7.5-7.5 7.5 7.5"
											/>
										</svg>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6  "
											onClick={() => handleOpen(index)}
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M19.5 8.25l-7.5 7.5-7.5-7.5"
											/>
										</svg>
									)}
								</div>
								{openedFAQ.includes(index) && (
									<p className="text-left mx-4">
										{question.answer}
									</p>
								)}
							</div>
						</div>
					))}
				</div>
			</section>
			<hr className="h-[1px] w-full  bg-gray-300 border-none my-4"></hr>
			<section id="Shipping&Delivery" className="information">
				<h1>Shipping and Delivery</h1>
				<p>
					At DroneZone we strive to provide fast and reliable shipping
					to ensure you receive your drone and accessories in a timely
					manner. We work with trusted shipping partners to deliver
					your orders securely.
					<br></br>
					<br></br>
					Shipping times may vary depending on your location and the
					specific product. We aim to process and dispatch orders
					within 2 business days. Once your order has been shipped,
					you will receive a confirmation email with tracking
					information to monitor the progress of your delivery.
				</p>
			</section>
			<hr className="h-[1px] w-full  bg-gray-300 border-none my-4"></hr>
			<section id="ReturnPolicy" className="information">
				<h1>Returns and Refund Policy</h1>
				<p>
					We want you to be completely satisfied with your purchase
					from DroneZone. If for any reason you are not satisfied, we
					offer a straightforward return and refund policy.
					<br></br>
					<br></br>
					You may return your drone or accessories within 15 days from
					the date of delivery, provided that the items are in their
					original condition, unused, and in their original packaging.
					<br></br>
					<br></br>
					To initiate a return, please contact our{" "}
					<Link href="" className="text-blue-600">
						customer support{" "}
					</Link>
					team with your order details. We will guide you through the
					return process and provide instructions for returning the
					product.
					<br></br>
					<br></br>
					Once we receive and inspect the returned items, we will
					process the refund back to your original payment method.
				</p>
			</section>
			<hr className="h-[1px] w-full  bg-gray-300 border-none my-4"></hr>
			<section id="PrivacyPolicy" className="information">
				<h1>Privacy Policy</h1>
				<p>
					At DroneZone, we take your privacy and the security of your
					personal information seriously. Our Privacy Policy outlines
					how we collect, use, disclose, and protect the data you
					provide to us when using our website or making a purchase.
					<br></br>
					<br></br>
					We only collect the necessary information required to
					process your orders, provide customer support, and improve
					your shopping experience. We do not sell or share your
					personal information with third parties without your
					consent, except in cases required by law.
					<br></br>
					<br></br>
					We utilize industry-standard security measures to safeguard
					your data from unauthorized access, loss, or misuse. By
					using our website and services, you agree to the terms
					outlined in our Privacy Policy. We encourage you to read the
					full{" "}
					<Link href="" className="text-blue-600">
						Privacy Policy{" "}
					</Link>
					to understand our practices and how we handle your
					information.
				</p>
			</section>
			<hr className="h-[1px] w-full  bg-gray-300 border-none my-4"></hr>
			<section id="Terms&Conditions" className="information">
				<h1>Terms and Conditions</h1>
				<p>
					Our Terms and Conditions govern the use of our website and
					the terms of sale for our products. By accessing and using
					our website, you agree to comply with these terms.
					<br></br>
					<br></br>
					The Terms and Conditions cover various aspects, including
					intellectual property rights, limitations of liability,
					product warranties, payment terms, and dispute resolution.
					It is important to review these terms carefully before
					making a purchase.
					<br></br>
					<br></br>
					If you have any questions or concerns regarding our Terms
					and Conditions, please contact our customer support team for
					clarification. By continuing to use our website and making a
					purchase, you acknowledge and accept the terms outlined in
					our{" "}
					<Link href="" className="text-blue-600">
						Terms and Conditions
					</Link>
					.
				</p>
			</section>
			<hr className="h-[1px] w-full  bg-gray-300 border-none my-4"></hr>
		</section>
	);
}
