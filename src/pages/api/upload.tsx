import { NextApiRequest, NextApiResponse } from "next";
import multiparty from "multiparty";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import mime, { contentType } from "mime-types";
import { mongooseConnect } from "../../../lib/mongoose";
import { isAdminRequest } from "../../../lib/auth";
const bucketName = "dronezone-admin";

interface File {
	file: [];
	fieldName: string;
	originalFilename: string;
	path: string;
	headers: any;
	size: number;
}

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await mongooseConnect();
	await isAdminRequest(req, res);

	const form = new multiparty.Form();
	const { fields, files }: { fields: String; files: File } =
		await new Promise((resolve, reject) => {
			form.parse(req, async (err, fields, files) => {
				if (err) reject(err);
				resolve({ fields, files });
			});
		});

	function generateRandomString() {
		const characters =
			"0123456798abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Exclude zero from the characters
		const length = 32;
		let randomString = "";

		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			const randomChar = characters.charAt(randomIndex);
			randomString += randomChar;
		}

		return randomString;
	}
	const randomString = generateRandomString();

	const client = new S3Client({
		region: "eu-west-2",
		credentials: {
			accessKeyId: process.env.S3_ACCESS_KEY || "",
			secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
		},
	});

	const links = [];
	for (const file of Object.values(files.file) as File[]) {
		const ext = file.originalFilename;
		const randomName = randomString + ext;

		await client.send(
			new PutObjectCommand({
				Bucket: bucketName,
				Key: randomName,
				Body: fs.readFileSync(file.path),
				ACL: "public-read",
				ContentType: mime.lookup(file.path) || undefined,
			})
		);

		const link = `https://${bucketName}.s3.amazonaws.com/${randomName}`;
		links.push(link);
	}

	return res.json({ links });
}

export const config = {
	api: { bodyParser: false },
};
