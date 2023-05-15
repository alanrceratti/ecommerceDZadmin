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

	return (
		<Layout>
			Hello {session?.user?.name}
			<Image
				src={session?.user?.image as string}
				alt={`${session?.user?.name} photo`}
			/>
		</Layout>
	);
}
