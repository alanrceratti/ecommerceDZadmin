import { FAQtypes } from "@/app/types";
import FAQ from "../information/FAQ.json";

export default function FooterLin() {
	const faqs = FAQ as FAQtypes;
	return (
		<section>
			<div>
				<div className="text-left">
					<h1>Frequent Questions</h1>
				</div>

				<h2></h2>
			</div>
		</section>
	);
}
