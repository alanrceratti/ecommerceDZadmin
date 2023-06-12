// "use client";
import CategoriesFilter from "@/components/front/products/categoriesFilter";
import Loading from "@/components/front/products/loading";
import MainCard from "@/components/front/products/maincard";
import ProductsFilter from "@/components/front/products/productsFilter";
// import { useParams, usePathname } from "next/navigation";
import { Suspense } from "react";

export default function Products() {
	return (
		<section>
			<main className="bg-black">
				<div className="block bg-white w-full sm:flex ">
					<MainCard />
				</div>
			</main>
		</section>
	);
}
