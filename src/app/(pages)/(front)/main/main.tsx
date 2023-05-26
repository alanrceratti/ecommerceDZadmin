"use client";
import BestSellers from "@/components/bestsellers";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../../../../../models/Product";
import { mongooseConnect } from "../../../../../lib/mongoose";
import Offers from "@/components/offers";
import useMedia from "@/app/hooks/useMedia";

export function Main() {
	const mobile = useMedia("(max-width: 640px)");
	return (
		<>
			<section className=" bg-center sm:h-[680px] xl:h-[900px] 2xl:h-[1000px]  min-h-[300px] flex items-center sm:justify-center flex-col bg-[url('/assets/header/bg-main.webp')] bg-cover ">
				{/* <Image
					src="/assets/header/bg-main.webp"
					alt="test"
					className="rounded-md absolute -z-10  -mt-64 "
					loading="lazy"
					fill
				/> */}
				<div className="font-unisansheavy sm:text-6xl text-xl text-white  text-center flex flex-col gap-8 sm:gap-20 mx-8 sm:mx-20 ">
					<h1 className="text-2xl sm:text-5xl ">
						Drones have changed the way we see the world.
					</h1>
					<h1>How it will change yours?</h1>
				</div>
				<div className="flex gap-10 mt-16">
					<Link
						href={"/all"}
						className={`${
							mobile ? "btn-secondary-mobile" : "btn-secondary"
						}`}
					>
						Shop All
					</Link>
					<Link
						href={"/all"}
						className={`${
							mobile ? "btn-secondary-mobile" : "btn-secondary"
						}`}
					>
						Find Yours
					</Link>
				</div>
			</section>
			<section>
				<hr className=" h-4 w-full  bg-black border-none  "></hr>
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
			<Offers />
		</>
	);
}
