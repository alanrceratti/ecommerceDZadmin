import { NextApiRequest, NextApiResponse } from "next";
import multiparty, { File } from "multiparty";

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const form = new multiparty.Form();
	const { fields, files }: { fields: String; files: File } =
		await new Promise((resolve, reject) => {
			form.parse(req, async (err, fields, files) => {
				if (err) reject(err);
				resolve({ fields, files });
			});
		});
	// console.log("testeee", files.file.lenght);
	return res.json("ok");
}

export const config = {
	api: { bodyParser: false },
};
