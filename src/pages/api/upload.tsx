import { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "../../../lib/mongoose";

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {}

export const config = {
	api: { bodyParser: false },
};
