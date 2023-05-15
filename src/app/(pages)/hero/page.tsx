"use client";
import { useSession } from "next-auth/react";
import { SessionProps } from "@/app/types";
import Layout from "../layout";
import Image from "next/image";
interface Props {
	session: SessionProps | null;
}

export default function Hero() {
	const { data: session } = useSession();
	const image = session?.user?.image;

	return (
		<Layout>
			<div className="flex justify-between items-center">
				<h1 className="flex">
					Hello
					<h2 className="font-bold">&nbsp;{session?.user?.name}</h2>
				</h1>

				<Image
					src={image as string}
					width={50}
					height={50}
					alt={`${session?.user?.name} photo`}
					className="rounded-full mx-4"
				/>
			</div>
		</Layout>
	);
}
