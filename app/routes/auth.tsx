import { type LinksFunction, type MetaFunction } from "@remix-run/node";

import MainHeader from "@/components/navigation/MainHeader";
import AuthForm from "@/components/auth/AuthForm";

import authStyles from "@/styles/auth.css";
import { validateCredentials } from "../data/validation.server";
import { login, signup } from "../data/auth.server";

export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: authStyles }];
};

export const meta: MetaFunction = () => {
	return [
		{
			title: "Auth Page",
			description: "Auth page",
		},
	];
};
const AuthPage = () => {
	return (
		<>
			<MainHeader />
			<AuthForm />
		</>
	);
};

export default AuthPage;

export async function action({ request }: { request: Request }) {
	const searchParams = new URL(request.url).searchParams;
	const authMode = searchParams.get("mode") || "login";

	const formData = await request.formData();
	const credentials = Object.fromEntries(formData) as {
		email: string;
		password: string;
	};

	try {
		validateCredentials({
			email: credentials.email as string,
			password: credentials.password as string,
		});
	} catch (error) {
		return { error: error.message };
	}

	try {
		if (authMode === "login") {
			return await login(credentials);
		} else {
			return await signup(credentials);
		}
	} catch (error) {
		if (error.status === 422) {
			return {
				credentials: error.message,
			};
		}
		return {
			error: error.message,
		};
	}
}
