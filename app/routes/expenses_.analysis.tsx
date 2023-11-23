import ExpenseStatistics from "@/components/expenses/ExpenseStatistics";
import Chart from "@/components/expenses/Chart";
import expensesStyles from "@/styles/expenses.css";
import { type LinksFunction } from "@remix-run/node";
import ExpensesHeader from "../components/navigation/ExpensesHeader";
import { useLoaderData, useRouteError } from "@remix-run/react";
import { getExpenses } from "../data/expenses.server";
import { json } from "@remix-run/node";
import Error from "../components/util/Error";
import { requireUserSEssion } from "../data/auth.server";

export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: expensesStyles }];
};

export const loader = async ({ request }: { request: Request }) => {
	const userId = await requireUserSEssion(request);
	const expenses = await getExpenses(userId);

	if (!expenses || expenses.length === 0) {
		throw json(
			{ message: "There are no expenses yet." },
			{ status: 404, statusText: "Expenses not found" }
		);
	}

	return { expenses };
};

const ExpensesAnalysisPage = () => {
	const expenses = useLoaderData<typeof loader>().expenses;

	return (
		<>
			<ExpensesHeader />
			<main>
				<Chart expenses={expenses} />
				<ExpenseStatistics expenses={expenses} />
			</main>
		</>
	);
};

export default ExpensesAnalysisPage;

export function ErrorBoundary() {
	const caughtResponse = useRouteError() as {
		statusText?: string;
		data?: { message?: string };
	};

	return (
		<>
			<ExpensesHeader />
			<main>
				<Error title={caughtResponse?.statusText || ""}>
					<p>{caughtResponse.data?.message || ""}</p>
				</Error>
			</main>
		</>
	);
}
