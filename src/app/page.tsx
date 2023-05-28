import HomeLayout from "./(pages)/(front)/layout";

export default async function App() {
	// const session = await getServerSession(authOptions);
	// console.log(session);
	return (
		<main>
			<HomeLayout />
		</main>
	);
}
