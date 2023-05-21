import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { AuthOptions, Session, getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const adminEmails = ["alanrceratti@gmail.com"];

export const authOptions: AuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			// authorization: {
			// 	params: {
			// 		prompt: "consent",
			// 		access_type: "offline",
			// 		response_type: "code",
			// 	},
			// },
		}),
	],
	callbacks: {
		session({ session, token, user }): Promise<Session> {
			if (adminEmails.includes(session.user.email)) {
				return Promise.resolve(session);
			} else {
				return Promise.reject(new Error("Access denied"));
			}
		},
	},

	secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);

export async function isAdminRequest(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getServerSession(req, res, authOptions);

	if (!adminEmails.includes(session?.user?.email)) {
		throw "Not admin";
	}
}
