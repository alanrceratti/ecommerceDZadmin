"use client";

import Image from "next/image";

interface SessionProps {
	session: {
		user: {
			name: string;
			email: string;
			image: string;
		};
	};
}

interface Props {
	session: SessionProps["session"] | null;
}

const Hero: React.FC<Props> = ({ session }) => {
	const image = session?.user?.image;

	return (
		<div className="flex  items-center m-4 justify-between">
			<div className="flex items-center">
				<h1 className="flex">Hello</h1>
				<h2 className="font-bold">&nbsp;{session?.user?.name}</h2>
			</div>

			{image && (
				<Image
					src={image}
					width={50}
					height={50}
					alt={`${session?.user?.name} photo`}
					className="rounded-full mx-4"
				/>
			)}
		</div>
	);
};

export default Hero;
