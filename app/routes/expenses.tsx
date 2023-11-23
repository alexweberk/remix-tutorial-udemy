import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import ExpensesList from "@/components/expenses/ExpensesList";
import expensesStyles from "@/styles/expenses.css";
import { json, type LinksFunction } from "@remix-run/node";
import ExpensesHeader from "@/components/navigation/ExpensesHeader";
import { FaPlus, FaDownload } from "react-icons/fa/index.js";
import { getExpenses } from "../data/expenses.server";
import { requireUserSEssion } from "../data/auth.server";

export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: expensesStyles }];
};

const ExpensesLayout = () => {
	const expenses = useLoaderData<typeof loader>();

	const hasExpenses = expenses && expenses.length > 0;

	return (
		<>
			<ExpensesHeader />
			<Outlet />
			<main>
				<section id='expenses-actions'>
					<Link to='add'>
						<FaPlus />
						<span>Add Expense</span>
					</Link>
					<a href='/expenses/raw'>
						<FaDownload />
						<span>Load Raw Data</span>
					</a>
				</section>
				{hasExpenses && <ExpensesList expenses={expenses} />}
				{!hasExpenses && (
					<section id='no-expenses'>
						<h1>No expenses found</h1>
						<p>
							Start <Link to='add'>adding some</Link>.
						</p>
					</section>
				)}
			</main>
		</>
	);
};

export default ExpensesLayout;

export async function loader({ request }: { request: Request }) {
	const userId = await requireUserSEssion(request);
	const expenses = await getExpenses(userId);
	return json(expenses, {
		headers: {
			"Cache-Control": "max-age=3",
		},
	});
}

export function ErrorBoundary() {
	const error = useRouteError();
	console.log(error);
	return <p>Error</p>;
}

export function headers({ loaderHeaders }) {
	return {
		"Cache-Control": loaderHeaders.get("Cache-Control"), // 60 minutes
	};
}
