import react from "react";
import { useEffect } from "react";
import { useState } from "react";

const useMedia = (media) => {
	const [match, setMatch] = useState(null);

	useEffect(() => {
		function changeMatch() {
			const { matches } = window.matchMedia(media);
			setMatch(matches);
		}
		changeMatch();
		window.addEventListener("resize", changeMatch);
		return () => {
			window.removeEventListener("resize", changeMatch);
		};
	}, [media]);

	return match;
};

export default useMedia;