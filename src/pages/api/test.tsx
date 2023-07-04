import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		// Handle the POST request
		res.status(200).json({ message: "POST request received" });
	} else {
		// Handle other types of requests
		res.status(200).json({ message: "Endpoint test successful" });
	}
}
