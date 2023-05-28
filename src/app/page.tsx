import Default from "./(pages)/(front)/layout";
import Header from "./(pages)/(front)/layout";
import { Main } from "./(pages)/(front)/main/main";

export default async function App() {
	// const session = await getServerSession(authOptions);
	// console.log(session);
	return (
		<main>
			<Default />
		</main>
	);
}
