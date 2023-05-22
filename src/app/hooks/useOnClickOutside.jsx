"use client";
import { useEffect, useRef } from "react";

const useOutsideClick = (ref, callback) => {
	const handleClick = (e) => {
		if (ref.current && !ref.current.contains(e.target)) {
			callback();
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClick);
		document.addEventListener("touchstart", handleClick);

		return () => {
			document.removeEventListener("click", handleClick);
			document.removeEventListener("touchstart", handleClick);
		};
	});
};

export default useOutsideClick;
