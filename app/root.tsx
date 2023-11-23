import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
	Link,
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useMatches,
	useRouteError,
} from "@remix-run/react";

import sharedStylesUrl from "@/styles/shared.css";
import Error from "@/components/util/Error";
import { getUserFromSession } from "./data/auth.server";

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: sharedStylesUrl },
];

export const meta: MetaFunction = () => {
	return [
		{ charset: "utf-8" },
		{ title: "New Remix App" },
		{ viewport: "width=device-width,initial-scale=1" },
	];
};

export const loader = async ({ request }: { request: Request }) => {
	const userId = await getUserFromSession(request);
	return { userId };
};

function Document({
	title,
	children,
}: {
	title?: string;
	children?: React.ReactNode;
}) {
	const matches = useMatches();

	const disableJS = matches.some((match) => match.handle?.disableJS);

	return (
		<html lang='en'>
			<head>
				{title && <title>{title}</title>}
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				{!disableJS && <Scripts />}
				<LiveReload />
			</body>
		</html>
	);
}

export default function App() {
	return (
		<Document>
			<Outlet />
		</Document>
	);
}

export function ErrorBoundary() {
	const error = useRouteError();
	console.log(error);
	return (
		<Document title='An error occurred'>
			<main>
				<Error title='An error occurred...'>
					<p>{error.message || "Something went wrong..."}</p>
					<p>
						Back to <Link to='/'>safety</Link>.
					</p>
				</Error>
			</main>
		</Document>
	);
}
