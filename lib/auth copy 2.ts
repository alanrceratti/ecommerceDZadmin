// import { NextApiRequest, NextApiResponse } from "next";
// import NextAuth, { AuthOptions, Session, getServerSession } from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import Credentials from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";

// import { User } from "../models/User";
// import { mongooseConnect } from "../lib/mongoose";

// const adminEmails = ["alanrceratti@gmail.com", "maripopova2009@mail.ru"];

// mongooseConnect(); // Call the mongooseConnect function before defining authOptions

// export const authOptions: AuthOptions = {
// 	session: {
// 		strategy: "jwt",
// 	},
// 	providers: [
// 		Credentials({
// 			credentials: {
// 				// Define your credentials schema here
// 				email: { label: "Email", type: "text", placeholder: "Email" },
// 				password: { label: "Password", type: "password" },
// 			},
// 			async authorize(credentials: Record<string, string> = {}, req) {
// 				const { email, password } = credentials;
// 				const user = await User.findOne({ email });
// 				if (!user) {
// 					throw new Error("Invalid Email or Password");
// 				}
// 				const isPasswordMatch = await bcrypt.compare(
// 					password,
// 					user.password
// 				);
// 				if (!isPasswordMatch) {
// 					// Fix: Check if password doesn't match
// 					throw new Error("Invalid Email or Password");
// 				}
// 				return user;
// 			},
// 		}),
// 		GithubProvider({
// 			clientId: process.env.GITHUB_ID as string,
// 			clientSecret: process.env.GITHUB_SECRET as string,
// 		}),
// 		GoogleProvider({
// 			clientId: process.env.GOOGLE_CLIENT_ID as string,
// 			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
// 		}),
// 	],
// 	callbacks: {
// 		async session({ session, token, user }): Promise<Session> {
// 			if (adminEmails.includes(session.user.email)) {
// 				return session;
// 			} else {
// 				throw new Error("Access denied");
// 			}
// 		},
// 	},

// 	secret: process.env.NEXTAUTH_SECRET,
// };

// export default NextAuth(authOptions);

// export async function isAdminRequest(
// 	req: NextApiRequest,
// 	res: NextApiResponse
// ) {
// 	const session = await getServerSession(req, res, authOptions);
// 	const userEmail = session?.user?.email;
// 	if (!adminEmails.includes(userEmail as string)) {
// 		throw "Not admin";
// 	}
// }
