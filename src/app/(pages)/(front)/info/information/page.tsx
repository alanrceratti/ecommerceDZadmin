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
		<section className="max-w-5xl ml-auto mr-auto ">
			<div className="flex justify-center items-start  flex-col ">
				<div className="text-left">
					<h1 className="text-lg mt-6 mx-4">Frequent Questions</h1>
				</div>
				{faqs.questions.map((question, index) => (
					<div className="font-light font-poppins w-full ">
						<div key={question.id} className="bg-gray-100 my-3 ">
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
	);
}
