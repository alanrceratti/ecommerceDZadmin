import Footer from "@/components/front/footer/footer";
import HeaderNav from "@/components/front/main/header";

export default function HomeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section>
			<HeaderNav />
			{children}
			<Footer />
		</section>
	);
}
