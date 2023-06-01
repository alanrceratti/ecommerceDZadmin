import { SyncLoader } from "react-spinners";

export default function Loading() {
	// You can add any UI inside Loading, including a Skeleton.
	return (
		<>
			<div className="text-center w-full  mt-auto mb-auto">
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
