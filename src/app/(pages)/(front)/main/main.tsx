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
			<section className=" bg-center min-h-[800px] flex items-center justify-center flex-col  ">
				<Image
					src="/assets/header/bg-main.png"
					alt="test"
					className="rounded-md absolute -z-10 object-cover -mt-8  "
					loading="lazy"
					fill
				/>
				<div className="font-unisansheavy text-6xl text-white  text-center flex flex-col gap-20 mx-20 ">
					<h1 className="text-5xl ">
						Drones have changed the way we see the world.
					</h1>
					<h1>How it will change yours?</h1>
				</div>
				<div className="flex gap-10 mt-16">
					<Link href={"/all"} className="btn-secondary">
						Shop All
					</Link>
					<Link href={"/"} className="btn-secondary">
						Find Yours
					</Link>
				</div>
			</section>
			<section>
				<hr className="h-16 w-full  bg-black border-none  "></hr>
				<div className="w-full h-[300px] relative flex   ">
					<div className="w-3/5 h-[400px] relative">
						<Image
							src="/assets/header/scene1.webp"
							alt="scene1"
							fill
							className="object-cover "
						/>
					</div>
					<div className="w-full h-[400px] relative">
						<Image
							src="/assets/header/scene2.webp"
							alt="scene2"
							fill
							className="object-cover "
						/>
					</div>
					<div className="w-3/5 h-[400px] relative ">
						<Image
							src="/assets/header/scene3.webp"
							alt="scene3"
							fill
							className="object-cover "
						/>
					</div>
				</div>
				<hr className="h-8 w-full  bg-white border-none  "></hr>
			</section>
			<BestSellers />
		</>
	);
}
