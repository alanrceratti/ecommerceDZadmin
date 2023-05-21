"use client";

import Image from "next/image";

interface ALOALO {
	name: string;
	email: string;
	image: string;
}

interface ASD {
	session: ALOALO | null;
}

const Hero: React.FC<ASD> = ({ session }) => {
	const image = session?.image;

	return (
		<div className="flex items-center m-4 justify-between">
			<div className="flex items-center">
				<h1 className="flex">Hello</h1>
				<h2 className="font-bold">&nbsp;{session?.name}</h2>
			</div>

			{image && (
				<Image
					src={image}
					width={50}
					height={50}
					alt={`${session?.name} photo`}
					className="rounded-full mx-4"
				/>
			)}
		</div>
	);
};

export default Hero;
