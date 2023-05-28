import { Main } from "./main/main";
import Footer from "@/components/front/footer/footer";
import HeaderNav from "@/components/front/main/header";

export default function Header() {
	return (
		<>
			<HeaderNav />
			<Main />
			<Footer />
		</>
	);
}
