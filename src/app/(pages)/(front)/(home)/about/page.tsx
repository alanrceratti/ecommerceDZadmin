import Image from "next/image";

export default function AboutUs() {
	return (
		<section className="bg-white font-poppins font-medium text-left">
			<div className="flex flex-wrap justify-center sm:items-center sm:gap-12">
				<div className=" m-auto px-4">
					<div className="w-[300px] md:w-[450px]  ">
						<h1 className="font-bold pb-3 mt-12 sm:mt-16">
							About Us
						</h1>
						<p>
							At DroneZone, our love for drones began with a
							shared passion for innovation, technology, and the
							limitless possibilities that drones offer. Founded
							in 2009, we set out on a mission to bring the
							exciting world of drones to enthusiasts, hobbyists,
							and professionals alike.
						</p>
						<Image
							src="/assets/about/owners.webp"
							alt="photo-of-owners"
							width={350}
							height={300}
							className="my-8 mx-auto"
						/>
					</div>
					<div className="w-[300px] md:w-[450px] ">
						<h1 className="font-bold py-4">Our Journey</h1>
						<p>
							It all started with a group of drone enthusiasts who
							were captivated by the incredible aerial
							perspectives and the transformative power of drone
							technology.
							<br></br> <br></br>
							What began as a hobby quickly evolved into a deep
							fascination that led us to explore the vast
							potential of drones in various industries and
							applications.
							<br></br> <br></br>
							Over the years, we witnessed the rapid advancements
							in drone technology, from the early days of bulky,
							limited-range models to the sleek, feature-packed
							drones of today. This journey of technological
							progress inspired us to establish DroneZone as a
							trusted source for high-quality drones.
						</p>
						<Image
							src="/assets/about/drone2.webp"
							alt="drone-on-hands"
							width={350}
							height={300}
							className="my-8 mx-auto"
						/>
					</div>
				</div>
				<hr className="hidden lg:block h-3/6 sm:h-3/6 lg:h-full absolute w-[1px] bg-gray-300 border-none   "></hr>
				<div className="m-auto px-3">
					<div className="w-[300px] md:w-[450px]  mb-12 sm:pt-24 ">
						<h1 className="font-bold pb-3 mt-4 ">Our Commitment</h1>
						<p>
							We are committed to providing our customers with the
							finest selection of drones that cater to their
							unique needs and aspirations. <br></br> <br></br>
							Whether you&apos;re an aerial photographer, a racing
							enthusiast, a beginner looking for your first drone,
							or a professional in search of advanced
							capabilities, we have the perfect drone for you.
						</p>
					</div>
					<div className="w-[300px] md:w-[450px] ">
						<h1 className="font-bold pb-3 mt-4">
							Exceptional Customer Experience
						</h1>
						<p>
							Beyond the products we offer, we believe in
							fostering an exceptional customer experience.
							<br></br> <br></br>Our knowledgeable and friendly
							customer support team is here to assist you at every
							step, from answering your questions and providing
							guidance to resolving any issues that may arise.
							<br></br> <br></br>We strive to make your drone
							journey as seamless and enjoyable as possible.
						</p>
						<Image
							src="/assets/about/drone.webp"
							alt="drone "
							width={350}
							height={300}
							className="my-8 mx-auto"
						/>
					</div>
					<div className="w-[300px] md:w-[450px] ">
						<h1 className="font-bold pb-3">
							Quality and Innovation
						</h1>
						<p>
							We carefully curate our product offerings,
							partnering with leading drone manufacturers who
							share our commitment to quality and innovation.
							<br></br> <br></br>Each drone undergoes rigorous
							testing to ensure it meets our stringent standards
							for performance, reliability, and customer
							satisfaction. <br></br> <br></br>We take pride in
							offering only the best-in-class drones equipped with
							cutting-edge features, advanced flight controls,
							high-resolution cameras, and impressive flight
							times.
						</p>
					</div>
				</div>
			</div>
			<div className="text-left mt-8 px-8 pb-8 bg-black text-white">
				<h1 className="font-bold pb-3 pt-8">
					Join Us on the Drone Adventure
				</h1>
				<p>
					We invite you to join us on this exciting drone adventure.
					Whether you&apos;re a professional capturing breathtaking
					aerial footage, a beginner exploring the wonders of flight,
					or someone who simply appreciates the art of drone
					technology, we are here to support and inspire you.
					<br></br> <br></br>
					Thank you for choosing{" "}
					<span className="text-orange">DroneZone</span>. We look
					forward to being a part of your drone journey and helping
					you experience the world from above in new and exciting
					ways.
				</p>
			</div>
		</section>
	);
}
