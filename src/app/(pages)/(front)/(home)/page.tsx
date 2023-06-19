import BestSellers from "@/components/front/main/bestsellers";
import Image from "next/image";
import Link from "next/link";
import Offers from "@/components/front/main/offers";

export default function MainPage() {
	return (
		<>
			<section className=" bg-center sm:h-[680px] xl:h-[700px] 2xl:h-[800px]  min-h-[300px] flex items-center sm:justify-center flex-col bg-[url('/assets/header/bg-main.webp')] bg-cover ">
				<div className="font-unisansheavy sm:text-6xl text-xl text-white pb-16 text-center flex flex-col gap-8 sm:gap-20 mx-8 sm:mx-32 ">
					<h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl mt-16  ">
						Drones have changed the way we see the world.
					</h1>
					<h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl  ">
						How it will change yours?
					</h1>
				</div>
				<div className="flex gap-10 mb-12">
					<Link
						href={"/products/all"}
						className="sm:px-6 px-3  sm:py-2 py-2 bg-orange text-white font-poppins sm:font-semibold  font-mediumtext-base sm:text-lg rounded-md mx-2 hover:bg-black hover:text-white transition-all duration-300  "
					>
						Shop All
					</Link>
					<Link
						href={"/products/all"}
						className="sm:px-6 px-3  sm:py-2 py-2 bg-orange text-white font-poppins sm:font-semibold  font-medium text-base sm:text-lg rounded-md  hover:bg-black hover:text-white transition-all duration-300 "
					>
						Find Yours
					</Link>
				</div>
			</section>
			<section>
				<hr className=" h-4 w-full  bg-black border-none  "></hr>
				<div className="w-full h-[200px] sm:h-[300px] relative flex   ">
					<div className="w-3/5 h-[200px] sm:h-[400px] relative">
						<Image
							src="/assets/header/scene1.webp"
							alt="scene1"
							fill
							className="object-cover "
							sizes="60vw"
						/>
					</div>
					<div className="w-full h-[200px] sm:h-[400px] relative">
						<Image
							src="/assets/header/scene2.webp"
							alt="scene2"
							fill
							className="object-cover "
							sizes="60vw"
						/>
					</div>
					<div className="w-3/5 h-[200px] sm:h-[400px] relative ">
						<Image
							src="/assets/header/scene3.webp"
							alt="scene3"
							fill
							className="object-cover "
							sizes="60vw"
						/>
					</div>
				</div>
				<hr className="sm:h-16 h-0 w-full  bg-white border-none  "></hr>
			</section>
			<BestSellers />
			<Offers />
		</>
	);
}
