"use client";
import { SessionProps } from "@/app/types";

import Image from "next/image";

export default function Hero({ session }: SessionProps) {
	const image = session?.user?.image;

	return (
		<div className="flex  items-center m-4 justify-between">
			<div className="flex items-center">
				<h1 className="flex">Hello</h1>
				<h2 className="font-bold">&nbsp;{session?.user?.name}</h2>
			</div>

			<Image
				src={image as string}
				width={50}
				height={50}
				alt={`${session?.user?.name} photo`}
				className="rounded-full mx-4"
			/>
		</div>
	);
}
