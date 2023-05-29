import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
	return (
		<>
			<div className="bg-[#FDF6E4] h-screen flex justify-center w-full ml-auto mr-auto">
				<div className="text-center text-2xl pt-8">
					<h2 className="text-3xl">404 page not found</h2>
					<div className="w-[512px] h-[340px] relative m-auto ">
						<Image
							src="/assets/notfound.webp"
							alt="not-found"
							fill
						/>
					</div>

					<p className="w-2/3 m-auto">
						Ops... It looks like this drone has ventured into
						uncharted territory and It got lost while exploring a
						forbidden place...
					</p>
					<br></br>
					<p className=" m-auto">
						You can help us bring it back safely by clicking&nbsp;
						<Link href="/" className="text-blue-500">
							here
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}
