"use client";
import CategoriesFilter from "@/components/front/products/categoriesFilter";
import Loading from "@/components/front/products/loading";
import MainCard from "@/components/front/products/maincard";
import ProductsFilter from "@/components/front/products/productsFilter";
import { useParams, usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function Products() {
	const [param, setParam] = useState("");
	const path = usePathname();

	const categoryPath = path?.split("/")[2];

	// console.log("1", path);
	// console.log("2", categoryPath);

	useEffect(() => {
		if (categoryPath && path !== "products/all") {
			setParam(JSON.stringify(categoryPath));
		}
	}, [path, categoryPath]);
	// useEffect(() => {
	// 	console.log(param, "PARAMSSS");
	// }, [param]);

	return (
		<section>
			<main className="bg-black">
				<div className=" bg-center  h-[220px] sm:h-[340px] md:h-[400px] lg:h-[500px]  flex items-center sm:justify-center flex-col bg-[url('/assets/products/top-bg.webp')] bg-cover bg-no-repeat  2xl:w-10/12 m-auto">
					<div className=" flex text-2xl sm:text-3xl  md:text-5xl lg:text-6xl xl:text-7xl font-unisansheavy text-white justify-between w-11/12 mt-12 sm:mt-0 xl:w-10/12  ">
						<div>
							<p>Explore</p> <p>the</p> <p>world</p>
						</div>
						<div>
							<p>With</p> <p>new</p> <p>eyes</p>
						</div>
					</div>
				</div>
				<hr className=" h-6 w-full  bg-black border-none  "></hr>
				<div className="block bg-white sm:flex ">
					<div className="w-full flex justify-between px-8 sm:block sm:justify-normal sm:w-fit">
						<Suspense fallback={<Loading />}>
							<CategoriesFilter />
						</Suspense>
						<Suspense fallback={<Loading />}>
							<ProductsFilter />
						</Suspense>
					</div>
					<Suspense fallback={<Loading />}>
						<MainCard />
					</Suspense>
				</div>
			</main>
		</section>
	);
}
