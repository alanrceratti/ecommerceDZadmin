"use client";
import BestSellers from "@/components/bestsellers";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../../../../../models/Product";
import { mongooseConnect } from "../../../../../lib/mongoose";

export function Main() {
	return (
		<>
			<section className=" bg-center sm:min-h-[800px] min-h-[500px] flex items-center sm:justify-center mt-16 flex-col  ">
				<Image
					src="/assets/header/bg-main.png"
					alt="test"
					className="rounded-md absolute -z-10 object-cover -mt-8  "
					loading="lazy"
					fill
				/>
				<div className="font-unisansheavy sm:text-6xl text-xl text-white  text-center flex flex-col gap-8 sm:gap-20 mx-8 sm:mx-20 ">
					<h1 className="text-2xl sm:text-5xl ">
						Drones have changed the way we see the world.
					</h1>
					<h1>How it will change yours?</h1>
				</div>
				<div className="flex gap-10 mt-16">
					<Link href={"/all"} className="btn-secondary-mobile">
						Shop All
					</Link>
					<Link href={"/"} className="btn-secondary-mobile">
						Find Yours
					</Link>
				</div>
			</section>
			<section>
				<hr className="sm:h-16 h-8 w-full  bg-black border-none  "></hr>
				<div className="w-full h-[200px] sm:h-[300px] relative flex   ">
					<div className="w-3/5 h-[200px] sm:h-[400px] relative">
						<Image
							src="/assets/header/scene1.webp"
							alt="scene1"
							fill
							className="object-cover "
						/>
					</div>
					<div className="w-full h-[200px] sm:h-[400px] relative">
						<Image
							src="/assets/header/scene2.webp"
							alt="scene2"
							fill
							className="object-cover "
						/>
					</div>
					<div className="w-3/5 h-[200px] sm:h-[400px] relative ">
						<Image
							src="/assets/header/scene3.webp"
							alt="scene3"
							fill
							className="object-cover "
						/>
					</div>
				</div>
				<hr className="sm:h-16 h-0 w-full  bg-white border-none  "></hr>
			</section>
			<BestSellers />
		</>
	);
}
