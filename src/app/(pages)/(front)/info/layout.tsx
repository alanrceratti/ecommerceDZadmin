"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FooterLinks({
	children,
}: {
	children: React.ReactNode;
}) {
	const path = usePathname()?.split("/");
	const link = path?.[2];

	const active = "text-orange";
	const inactive = "";

	return (
		<section className="bg-white font-bold text-center py-8">
			<div>
				<Link
					href={"info/information"}
					className={`mx-2 ${
						link === "information" ? active : inactive
					}`}
				>
					INFORMATION
				</Link>
				<Link
					href={"info/resources"}
					className={`mx-2 ${
						link === "resources" ? active : inactive
					}`}
				>
					RESOURCES
				</Link>
				<Link
					href={"info/support"}
					className={`mx-2 ${link === "support" ? active : inactive}`}
				>
					SUPPORT
				</Link>
			</div>
			{children}
		</section>
	);
}
