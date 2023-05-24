"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { mongooseConnect } from "../../lib/mongoose";
import axios from "axios";

export default function BestSellers() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		axios.get("/api/productsFront").then((response) => {
			setProducts(response.data);
			console.log(products);
		});
	}, []);
	
	return (
		<>
			<section className="h-screen">
				<h1 className="text-3xl mt-20 text-black bg-white  py-2 font-bold font-unisansheavy text-center">
					BEST SELLERS
				</h1>
				<div className="p-16">
					<div className="w-[340px] h-[500px] text-center bg-gray950 rounded-md">
						<h2 className="py-4">Racing Drone</h2>
						<div>
							<Image
								src="/assets/drones/drone1.png"
								alt="drone"
								width={280}
								height={280}
								className="ml-auto mr-auto rounded-md"
							/>
							<div className="flex gap-4 text-white justify-center py-2">
								<div className="flex gap-1 ">
									<Image
										src="/assets/svgs/speed.svg"
										alt="drone"
										width={20}
										height={20}
									/>
									80 mph
								</div>

								<div className="flex gap-1">
									<Image
										src="/assets/svgs/range.svg"
										alt="drone"
										width={20}
										height={20}
									/>
									2.5 miles
								</div>

								<div className="flex gap-1">
									<Image
										src="/assets/svgs/battery.svg"
										alt="drone"
										width={20}
										height={20}
									/>
									30 min
								</div>
							</div>
							<hr className="h-[1px] w-4/5 bg-white border-none mb-2 ml-auto mr-auto  "></hr>
							<div className="flex justify-center items-center text-white font-semibold gap-4">
								<div className="flex">
									<h3 className="text-orange text-xl">
										£199&nbsp;
									</h3>
									<p>Or Pay monthly</p>
								</div>
								<Image
									src="/assets/svgs/heart.svg"
									alt="drone"
									width={25}
									height={25}
									className="cursor-pointer"
								/>
							</div>
							<hr className="h-[1px] w-4/5 bg-white border-none my-2 ml-auto mr-auto "></hr>
							<div className="flex justify-center gap-4">
								<button className="btn-third flex gap-1">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
										/>
									</svg>
									Add to cart
								</button>

								<Link
									href={"/details"}
									className="btn-third !bg-black !text-white hover:!bg-orange "
								>
									View More
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
