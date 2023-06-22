"use client";
import Image from "next/image";
import { useState } from "react";

export default function Cart() {
	const [count, setCount] = useState<number>(0);

	return (
		<section className="bg-gray950 pl-8 ">
			<h1 className="text-3xl font-bold pt-16 text-white ">
				Shopping Cart
			</h1>
			<div className=" flex gap-10 mt-16 justify-center pb-16">
				<div className="bg-white w-1/2 rounded-md">
					<div className="relative ">
						<div className="flex justify-between  mt-8 mx-4">
							<div className="m-4">
								<h2>Product Details</h2>
								<p className="font-semibold text-center  my-4">
									Avian X Pro
								</p>
								<Image
									src="/assets/drones/professional/drone24.png"
									alt="drone"
									width={200}
									height={200}
									className="rounded-md"
								/>
							</div>
							<div className="m-4">
								<h3>Quantity</h3>
								<div className="flex gap-4 justify-center items-center  mt-4">
									<button
										onClick={() => setCount(count + 1)}
										className="px-3 py-1 bg-black text-white rounded-md"
									>
										+
									</button>
									<div className="bg-gray-300 w-8 rounded-md ">
										<p className="text-center">{count}</p>
									</div>
									<button
										onClick={() =>
											count > 0 && setCount(count - 1)
										}
										className="px-3 py-1 bg-black text-white rounded-md"
									>
										-
									</button>
								</div>
							</div>
							<div className="m-4">
								<h4>Total</h4>
								<p className="mt-4">£199.00</p>
							</div>

							<h5 className="pt-12">Remove</h5>
						</div>

						<hr className="h-[1px] w-full  bg-gray-300 border-none my-4 absolute top-6"></hr>
					</div>
				</div>

				<div className="bg-white w-[300px] rounded-md px-3 pb-32 ">
					<div className="w-full text-center">
						<button className="btn-primary my-4">
							Go To Checkout
						</button>
					</div>

					<h2 className="font-semibold">Order Summary</h2>
					<div className="flex gap-4 justify-between">
						<p className="opacity-60">Sub-total</p>
						<p>£199</p>
					</div>
					<div className="flex gap-4 justify-between">
						<p className="opacity-60">Shipping</p>
						<p>FREE</p>
					</div>
					<hr className="h-[1px] w-full  bg-gray-300 border-none my-4 "></hr>
					<div className="flex gap-4 justify-between">
						<h3 className="opacity-70 font-medium">
							Estimated Total
						</h3>
						<p>£199</p>
					</div>
					<p className="opacity-40"> Have a promo code?</p>
				</div>
			</div>
		</section>
	);
}
