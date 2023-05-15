import { useSession } from "next-auth/react";
import Layout from "../layout";

export default function Hero() {
	const { data: session } = useSession();
	if (!session) return;
	return <Layout>Hello {session?.user?.email} </Layout>;
}
