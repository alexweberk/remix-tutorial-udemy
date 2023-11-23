import { json } from "@remix-run/node";
import { destroyUserSession } from "../data/auth.server";

export function action({ request }: { request: Request }) {
	if (request.method !== "POST") {
		throw json({ message: "Method not allowed" }, { status: 400 });
	}
	return destroyUserSession(request);
}
