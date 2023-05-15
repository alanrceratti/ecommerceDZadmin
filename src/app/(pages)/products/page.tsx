import Link from "next/link";

export default function Products() {
	return (
		<div className="flex items-center m-4">
			<Link href={"/products/new"} className="btn-primary">
				Add new product
			</Link>
		</div>
	);
}
