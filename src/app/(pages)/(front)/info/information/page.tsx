"use client";
import { FAQtypes } from "@/app/types";
import FAQ from "../information/FAQ.json";
import { useState } from "react";

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
					<div className="text-left">
						<h1 className="text-lg mt-6 mx-4">
							Frequent Questions
						</h1>
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
			<hr className="h-[1px] w-full  bg-white border-none   "></hr>
			<section id="Shipping&Delivery">
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
					information to monitor the progress of your delivery.{" "}
				</p>
			</section>
		</section>
	);
}
