import HomeLayout from "./(pages)/(front)/layout";
import { ReactNode } from "react";
import MainPage from "./(pages)/(front)/(home)/page";

export default function App() {
	// const session = await getServerSession(authOptions);
	// console.log(session);
	return (
		<main>
			<HomeLayout>
				<MainPage/>
			</HomeLayout>
		</main>
	);
}
