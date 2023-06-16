import { SyncLoader } from "react-spinners";

export default function Loading() {
	// You can add any UI inside Loading, including a Skeleton.
	return (
		<>
			<div className="text-center w-full sm:w-[400px] md:w-[560px] lg:w-[840px] xl:w-[1100px] 2xl:w-[1350px]   mt-auto mb-auto">
				<div className="flex justify-center ">
					<SyncLoader color="orange" />
				</div>
				<h1 className="font-unisansheavy text-orange opacity-80 mt-4 animate-pulse-fast">
					Loading
				</h1>
			</div>
		</>
	);
}
