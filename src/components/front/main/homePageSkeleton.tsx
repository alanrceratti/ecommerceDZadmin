"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NewProductsProps } from "@/app/types";
import useMedia from "@/app/hooks/useMedia";

export default function HomePageSkeleton() {
	const mobile = useMedia("(max-width: 640px)");

	return (
		<section className="h-fit ">
			<div className="flex justify-center   ">
				<div className="flex flex-row items-center justify-start gap-8  overflow-auto ">
					<div className="w-[270px] sm:w-[340px] h-[340px] sm:h-[470px] shadow-2xl bg-gray-600  rounded-md animate-pulse-medium m-8 ">
						<div>
							<div className="flex sm:gap-4 gap-2 text-white text-sm sm:text-base   justify-center py-2">
								<hr className=" h-[15px] rounded-2xl  w-[100px] bg-gray-400 animate-pulse-medium border-none ml-auto mr-auto mt-4 "></hr>
							</div>
							<div className="flex sm:gap-4 gap-2 text-white text-sm sm:text-base   justify-center py-2">
								<hr className=" sm:h-[250px] h-[200px] rounded-md  sm:w-[270px] w-[230px]  bg-gray-500 animate-pulse-medium border-none ml-auto mr-auto mt-0 "></hr>
							</div>
							<div className="flex justify-center items-center gap-0">
								<hr className=" h-[30px] rounded-md  w-[130px] bg-gray-500 animate-pulse-medium border-none ml-2 mr-2 "></hr>
								<hr className=" h-[30px] rounded-md  w-[130px] bg-gray-500 animate-pulse-medium border-none ml-2 mr-2  "></hr>
							</div>
						</div>
					</div>
					<div className="w-[270px] sm:w-[340px] h-[340px] sm:h-[470px] shadow-2xl bg-gray-600  rounded-md animate-pulse-medium ">
						<div>
							<div className="flex sm:gap-4 gap-2 text-white text-sm sm:text-base   justify-center py-2">
								<hr className=" h-[15px] rounded-2xl  w-[100px] bg-gray-500 animate-pulse-medium border-none ml-auto mr-auto mt-4 "></hr>
							</div>
							<div className="flex sm:gap-4 gap-2 text-white text-sm sm:text-base   justify-center py-2">
								<hr className=" h-[250px] rounded-md  w-[270px] bg-gray-500 animate-pulse-medium border-none ml-auto mr-auto mt-0 "></hr>
							</div>
							<div className="flex justify-center items-center gap-0">
								<hr className=" h-[30px] rounded-md  w-[130px] bg-gray-500 animate-pulse-medium border-none ml-2 mr-2 "></hr>
								<hr className=" h-[30px] rounded-md  w-[130px] bg-gray-500 animate-pulse-medium border-none ml-2 mr-2  "></hr>
							</div>
						</div>
					</div>
					<div className="w-[270px] sm:w-[340px] h-[340px] sm:h-[470px] shadow-2xl bg-gray-600  rounded-md animate-pulse-medium ">
						<div>
							<div className="flex sm:gap-4 gap-2 text-white text-sm sm:text-base   justify-center py-2">
								<hr className=" h-[15px] rounded-2xl  w-[100px] bg-gray-500 animate-pulse-medium border-none ml-auto mr-auto mt-4 "></hr>
							</div>
							<div className="flex sm:gap-4 gap-2 text-white text-sm sm:text-base   justify-center py-2">
								<hr className=" h-[250px] rounded-md  w-[270px] bg-gray-500 animate-pulse-medium border-none ml-auto mr-auto mt-0 "></hr>
							</div>
							<div className="flex justify-center items-center gap-0">
								<hr className=" h-[30px] rounded-md  w-[130px] bg-gray-500 animate-pulse-medium border-none ml-2 mr-2 "></hr>
								<hr className=" h-[30px] rounded-md  w-[130px] bg-gray-500 animate-pulse-medium border-none ml-2 mr-2  "></hr>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
