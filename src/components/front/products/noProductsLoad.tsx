import { SyncLoader } from "react-spinners";

export default function NoProductsLoad() {
	// You can add any UI inside Loading, including a Skeleton.
	return (
		<>
			<div className="text-center w-full sm:w-[400px] md:w-[560px] lg:w-[840px] xl:w-[1100px] 2xl:w-[1350px]   mt-auto mb-auto">
				<div className="flex justify-center "></div>
				<h1 className="font-unisansheavy text-orange opacity-80 mt-4 ">
					Ops...The Drones you are trying to find are gone.<br></br>
					Try to change the filters.
				</h1>
			</div>
		</>
	);
}
