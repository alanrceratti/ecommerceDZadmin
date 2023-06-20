"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function FooterLinks({
	children,
}: {
	children: React.ReactNode;
}) {
	const [active, setActive] = useState<string>("");
	const path = usePathname()?.split("/");

	const handleClick = () => {};

	return (
		<section className="bg-white font-bold text-center py-8">
			<div>
				<Link href={"info/information"} className="mx-2">
					INFORMATION
				</Link>
				<Link href={"info/resources"} className="mx-2">
					RESOURCES
				</Link>
				<Link href={"info/support"} className="mx-2">
					SUPPORT
				</Link>
			</div>
			{children}
		</section>
	);
}
