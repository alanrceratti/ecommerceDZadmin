"use client";
import { FAQtypes } from "@/app/types";
import PhotoTips from "../resources/PhotoTips.json";
import DroneMaintenance from "../resources/DroneMaintenance.json";
import { useState } from "react";

export default function FooterResources() {
	const Tips = PhotoTips as FAQtypes;
	const Maintenance = DroneMaintenance as FAQtypes;

	const [openedTips, setOpenedTips] = useState<number[]>([]);
	const [openedMaintenance, setOpenedMaintenance] = useState<number[]>([]);

	const handleOpenTips = (event: number) => {
		setOpenedTips((prevOpenedTips) => {
			if (prevOpenedTips.includes(event)) {
				return prevOpenedTips.filter((item) => item !== event);
			} else {
				return [...prevOpenedTips, event];
			}
		});
	};

	const handleOpenMaintenance = (event: number) => {
		setOpenedMaintenance((prevOpenedMaintenance) => {
			if (prevOpenedMaintenance.includes(event)) {
				return prevOpenedMaintenance.filter((item) => item !== event);
			} else {
				return [...prevOpenedMaintenance, event];
			}
		});
	};

	console.log(openedTips);
	return (
		<section className="max-w-5xl ml-auto mr-auto">
			<hr className="h-[1px] w-full  bg-gray-300 border-none my-4"></hr>
			<section id="Dronebuying" className="information">
				<h1>Drone Buying questionnaire</h1>
				<p>
					Our Drone Buying questionnaire is designed to help you make
					an informed decision when purchasing a drone. We understand
					that choosing the right drone can be overwhelming with the
					wide range of options available.
					<br></br>
					<br></br>
					Our comprehensive questionnaire results will provide
					valuable insights, tips, and factors to consider based on
					your needs and experience level.
					<br></br>
					<br></br>
					We cover topics such as drone types, features, camera
					capabilities, flight performance, and more. Whether
					you&apos;re a beginner or an experienced pilot, our Drone
					Buying questionnaire will assist you in finding the perfect
					drone that meets your requirements and fits your budget.
					<br></br>
					<br></br>
					Start exploring our questionnaire today to unlock the
					exciting world of drones!
				</p>
			</section>
			<hr className="h-[1px] w-full  bg-gray-300 border-none my-4"></hr>
			<section id="DroneTips">
				<div className="flex justify-center items-start  flex-col ">
					<div className="text-left information">
						<h1>Drone Photography Tips</h1>
						<h2 className="font-medium m-4">
							Capture breathtaking aerial imagery with our expert
							Drone Photography Tips. Whether you&apos;re a
							beginner or an experienced drone pilot, these tips
							will help you elevate your aerial photography skills
							and create stunning visuals.
						</h2>
					</div>
					{Tips.questions.map((question, index) => (
						<div
							key={question.id}
							className="font-light font-poppins w-full "
						>
							<div className="bg-gray-100 my-3 ">
								<div className="flex mr-2">
									<h2
										onClick={() => handleOpenTips(index)}
										className="font-medium mx-4"
									>
										{question.question}
									</h2>
									{openedTips.includes(index) ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6  "
											onClick={() =>
												handleOpenTips(index)
											}
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
											onClick={() =>
												handleOpenTips(index)
											}
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M19.5 8.25l-7.5 7.5-7.5-7.5"
											/>
										</svg>
									)}
								</div>
								{openedTips.includes(index) && (
									<p
										className="text-left mx-4"
										dangerouslySetInnerHTML={{
											__html: question.answer.replace(
												/\n/g,
												"<br>"
											),
										}}
									></p>
								)}
							</div>
						</div>
					))}
				</div>
			</section>
			<hr className="h-[1px] w-full  bg-gray-300 border-none my-4"></hr>
			<section id="DroneMaintenance">
				<div className="flex justify-center items-start  flex-col ">
					<div className="text-left information">
						<h1>Drone Maintenance</h1>
					</div>
					{Maintenance.questions.map((question, index) => (
						<div
							key={question.id}
							className="font-light font-poppins w-full "
						>
							<div className="bg-gray-100 my-3 ">
								<div className="flex mr-2">
									<h2
										onClick={() =>
											handleOpenMaintenance(index)
										}
										className="font-medium mx-4"
									>
										{question.question}
									</h2>
									{openedMaintenance.includes(index) ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6  "
											onClick={() =>
												handleOpenMaintenance(index)
											}
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
											onClick={() =>
												handleOpenMaintenance(index)
											}
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M19.5 8.25l-7.5 7.5-7.5-7.5"
											/>
										</svg>
									)}
								</div>
								{openedMaintenance.includes(index) && (
									<p
										className="text-left mx-4"
										dangerouslySetInnerHTML={{
											__html: question.answer.replace(
												/\n/g,
												"<br>"
											),
										}}
									></p>
								)}
							</div>
						</div>
					))}
					<h3>
						Remember, these tips serve as general guidelines.
						It&apos;s essential to refer to your specific drone
						model&apos;s user manual and follow the
						manufacturer&apos;s recommendations for maintenance and
						care.
					</h3>
				</div>
			</section>
		</section>
	);
}
