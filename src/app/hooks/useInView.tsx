import { ReactNode, useRef } from "react";
import { useInView } from "framer-motion";

interface InViewSectionProps {
	children: ReactNode;
}

export function InViewSectionLeft({ children }: InViewSectionProps) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true });

	return (
		<section ref={ref}>
			<div
				style={{
					transform: isInView ? "none" : "translateX(-200px)",
					opacity: isInView ? 1 : 0,
					transition:
						"all 1.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
				}}
			>
				{children}
			</div>
		</section>
	);
}

export function InViewSectionRight({ children }: InViewSectionProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	return (
		<section ref={ref}>
			<div
				style={{
					transform: isInView ? "none" : "translateX(400px)",
					opacity: isInView ? 1 : 0,
					transition:
						"all 1.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
				}}
			>
				{children}
			</div>
		</section>
	);
}

export function InViewSectionDown({ children }: InViewSectionProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	return (
		<section ref={ref}>
			<div
				style={{
					transform: isInView ? "none" : "translatey(100px)",
					opacity: isInView ? 1 : 0,
					transition:
						"all 1.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
				}}
			>
				{children}
			</div>
		</section>
	);
}

export function InViewSectionUp({ children }: InViewSectionProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	return (
		<section ref={ref}>
			<div
				style={{
					transform: isInView ? "none" : "translatey(-100px)",
					opacity: isInView ? 1 : 0,
					transition:
						"all 1.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
				}}
			>
				{children}
			</div>
		</section>
	);
}
