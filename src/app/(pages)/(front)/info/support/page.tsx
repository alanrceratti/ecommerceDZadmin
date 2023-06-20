"use client";
import { FAQtypes } from "@/app/types";
import PhotoTips from "../resources/PhotoTips.json";
import DroneMaintenance from "../resources/DroneMaintenance.json";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function FooterSupport() {
	const Tips = PhotoTips as FAQtypes;
	const Maintenance = DroneMaintenance as FAQtypes;

	const [openedTips, setOpenedTips] = useState<number[]>([]);
	const [openedMaintenance, setOpenedMaintenance] = useState<number[]>([]);
	const [trackingNumber, setTrackingNumber] = useState("");

	const route = useRouter();

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

	const handleTrackOrders = () => {
		const url = `https://www.royalmail.com/track-your-item#/tracking-results/${trackingNumber}`;
		window.open(url, "_blank");
	};

	console.log(openedTips);
	return (
		<section className="max-w-5xl ml-auto mr-auto">
			<hr className="h-[1px] w-full  bg-gray-300 border-none my-4"></hr>
			<section id="Tracking" className="information">
				<h1>Order Tracking</h1>
				<p>
					Stay informed about the status of your order with our
					convenient Order Tracking feature. Once your order is
					confirmed, you will receive a unique tracking number via
					email.
					<br></br>
					<br></br>
					Simply enter the tracking number bellow to get real-time
					updates on the whereabouts of your package.
					<br></br>
					<form className="flex mt-4">
						<input
							type="text"
							value={trackingNumber}
							onChange={(e) => setTrackingNumber(e.target.value)}
							placeholder="Enter tracking number"
							className="w-1/4 mx-4"
						/>
						<button
							type="submit"
							className="btn-primary"
							onClick={handleTrackOrders}
						>
							Track My Orders
						</button>
					</form>
					<br></br>
					Track your order every step of the way, from processing and
					packaging to shipping and delivery. If you have any
					questions or concerns regarding your order, our customer
					support team is here to assist you.
				</p>
			</section>
			<hr className="h-[1px] w-full  bg-gray-300 border-none my-4"></hr>
			<section id="DroneTips">
				<div className="flex justify-center items-start  flex-col ">
					<div className="text-left information">
						<h1>Payment Methods</h1>
						<h2 className="font-medium m-4">
							We offer a variety of secure and convenient payment
							methods to ensure a seamless shopping experience.
							Choose from the following payment options at
							checkout:
						</h2>
						<div className="flex gap-2">
							<Image
								src="/assets/paymentMethods/visa.svg"
								alt="visa"
								width={100}
								height={100}
							/>
							<Image
								src="/assets/paymentMethods/master.svg"
								alt="master"
								width={100}
								height={100}
							/>
							<Image
								src="/assets/paymentMethods/paypal.svg"
								alt="paypal"
								width={100}
								height={100}
							/>
							<Image
								src="/assets/paymentMethods/btc.svg"
								alt="btc"
								width={100}
								height={100}
							/>
						</div>
						<h2 className="font-medium m-4">
							If you have any questions or need assistance with
							payment methods, feel free to reach out to our
							customer support team. We are here to help you
							choose the most convenient payment option for your
							order.
						</h2>
					</div>
				</div>
			</section>
			<hr className="h-[1px] w-full  bg-gray-300 border-none my-4"></hr>
			<section id="DroneMaintenance">
				<div className="flex justify-center items-start  flex-col ">
					<div className="text-left information">
						<h1>Warranty and Repairs</h1>
					</div>

					<h3 className="font-medium text-left mt-4">
						At DroneZone, we stand behind the quality and
						performance of our drones. We offer a comprehensive
						warranty program to ensure your peace of mind and
						provide prompt support in the unlikely event of any
						issues with your purchased products.
						<br></br>
						<br></br>
						<h4 className="font-bold">Warranty Coverage:</h4> All
						drones purchased from DroneZone are covered by our
						manufacturer&apos;s warranty. The duration and specific
						coverage may vary depending on the product and its
						components. Our warranty typically covers defects in
						materials and workmanship under normal use conditions.
						<br></br>
						<br></br>
						Initiating a Warranty Claim: If you believe your drone
						is experiencing a warranty-related issue, we encourage
						you to reach out to our dedicated customer support team.
						They will guide you through the warranty claim process
						and provide assistance in resolving the issue promptly.
						<br></br>
						<br></br>
						To initiate a warranty claim, please provide the
						following information: <br></br>- Order number or proof
						of purchase.<br></br>- Detailed description of the issue
						you are experiencing.
						<br></br>- Supporting photos or videos, if applicable.
						<br></br>
						<br></br>
						Our customer support team will carefully evaluate your
						claim and provide further instructions on the next
						steps. In some cases, we may require the product to be
						returned for inspection or repair. We will work
						diligently to ensure your warranty claim is processed
						efficiently and to your satisfaction.
						<br></br>
						<br></br>
						<h4 className="font-bold">Repairs and Maintenance:</h4>
						In addition to warranty services, we offer repair and
						maintenance support for your drones. Whether it&apos;s a
						damaged component, a malfunctioning part, or routine
						maintenance, our team of experienced technicians is here
						to assist you. If your drone is out of warranty or
						requires repairs not covered under the warranty, please
						contact our customer support team for further guidance.{" "}
						<br></br>
						<br></br> They will provide you with the necessary
						information on repair options, associated costs, and
						instructions for sending in your drone. Please note that
						our repair services may vary depending on the
						availability of spare parts and the complexity of the
						repair required. Our goal is to ensure that your drone
						is restored to optimal functionality and ready to take
						flight once again. We strive to provide excellent
						support throughout your ownership experience. <br></br>
						<br></br>Our warranty and repair services are designed
						to give you confidence in the quality and durability of
						your purchased drones. Should you have any questions,
						concerns, or require further assistance, please
						don&apos;t hesitate to contact our customer support
						team.
					</h3>
				</div>
			</section>
		</section>
	);
}
