import { SyncLoader } from "react-spinners";

export default function Loading() {
	// You can add any UI inside Loading, including a Skeleton.
	return (
		<>
			<div className="flex justify-center items-center text-center w-full sm:h-[500px]   sm:w-[400px] md:w-[560px] lg:w-[840px] xl:w-[1100px] 2xl:w-[1350px] sm:mt-auto  mt-20 mb-auto">
				<div className="text-center">
					<div className="flex justify-center items-center  ">
						<SyncLoader color="orange" />
					</div>

					<h1 className="font-unisansheavy text-orange opacity-80 mt-4 animate-pulse-fast">
						Loading
					</h1>
				</div>
			</div>
		</>
	);
}
