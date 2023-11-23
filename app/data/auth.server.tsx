import { prisma } from "./database.server";
import bcrypt from "bcryptjs";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

const SESSION_SECRET = process.env.SESSION_SECRET as string;

const sessionStorage = createCookieSessionStorage({
	cookie: {
		secure: process.env.NODE_ENV === "production",
		secrets: [SESSION_SECRET],
		sameSite: "lax",
		maxAge: 30 * 24 * 60 * 60, // 30 days
		httpOnly: true,
	},
});

async function createUserSession(userId: string, redirectPath: string) {
	const session = await sessionStorage.getSession();
	session.set("userId", userId);
	return redirect(redirectPath, {
		headers: {
			"Set-Cookie": await sessionStorage.commitSession(session),
		},
	});
}

export async function getUserFromSession(request: Request) {
	const session = await sessionStorage.getSession(
		request.headers.get("Cookie")
	);
	const userId = session.get("userId");
	if (!userId) return null;

	return userId;
}

export async function destroyUserSession(request: Request) {
	const session = await sessionStorage.getSession(
		request.headers.get("Cookie")
	);
	return redirect("/", {
		headers: {
			"Set-Cookie": await sessionStorage.destroySession(session),
		},
	});
}

export async function requireUserSEssion(request: Request) {
	const userId = await getUserFromSession(request);

	if (!userId) {
		throw redirect("/auth?mode=login");
	}

	return userId;
}

export async function signup({
	email,
	password,
}: {
	email: string;
	password: string;
}) {
	const existingUser = await prisma.user.findFirst({ where: { email } });

	if (existingUser) {
		const error = new Error("User already exists");
		(error as any).status = 422;
		throw error;
	}

	const passHash = await bcrypt.hash(password, 12);

	const user = await prisma.user.create({
		data: { email, password: passHash },
	});

	return createUserSession(user.id, "/expenses");
}

export async function login({
	email,
	password,
}: {
	email: string;
	password: string;
}) {
	const existingUser = await prisma.user.findFirst({ where: { email } });

	if (!existingUser) {
		const error = new Error("Could not log in, please check your credentials");
		(error as any).status = 401;
		throw error;
	}

	const passMatch = await bcrypt.compare(password, existingUser.password);

	if (!passMatch) {
		const error = new Error("Incorrect password");
		(error as any).status = 401;
		throw error;
	}

	return createUserSession(existingUser.id, "/expenses");
}
