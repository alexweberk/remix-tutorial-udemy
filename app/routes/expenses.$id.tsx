import { useNavigate } from "@remix-run/react";
import ExpenseForm from "@/components/expenses/ExpenseForm";
import Modal from "@/components/util/Modal";
import {
	type ExpenseData,
	deleteExpense,
	updateExpense,
} from "../data/expenses.server";
import { redirect } from "@remix-run/node";
import { validateExpenseInput } from "../data/validation.server";

type ExpenseDataWithId = ExpenseData & { id: string };

export function meta({ matches, params }: { matches: any[]; params: any }) {
	const expense = matches[1].data.find(
		(expense: ExpenseDataWithId) => expense.id === params.id
	);

	return [{ title: `Update ${expense.title}` }];
}

const UpdateExpensesPage = () => {
	const navigate = useNavigate();
	function closeHandler() {
		navigate("..");
	}
	return (
		<Modal onClose={closeHandler}>
			<ExpenseForm />
		</Modal>
	);
};

export default UpdateExpensesPage;

export async function action({
	params,
	request,
}: {
	params: any;
	request: any;
}) {
	const expenseId = params.id;
	if (request.method === "PATCH") {
		const formData = await request.formData();
		const expenseData: ExpenseData = {
			title: formData.get("title") as string,
			amount: formData.get("amount") as string,
			date: formData.get("date") as string,
		};
		try {
			validateExpenseInput(expenseData);
		} catch (error) {
			return error;
		}

		await updateExpense(expenseId, expenseData);
		return redirect("/expenses");
	} else if (request.method === "DELETE") {
		await deleteExpense(expenseId);
		return redirect("/expenses");
	}
}
