import { useNavigate } from "@remix-run/react";
import ExpenseForm from "@/components/expenses/ExpenseForm";
import Modal from "@/components/util/Modal";
import { addExpense, type ExpenseData } from "@/data/expenses.server";
import { redirect } from "@remix-run/node";
import type { Params } from "@remix-run/react";
import { validateExpenseInput } from "../data/validation.server";
import { requireUserSEssion } from "../data/auth.server";

const AddExpensesPage = () => {
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

export default AddExpensesPage;

export async function action({
	request,
	params,
}: {
	request: Request;
	params: Params;
}) {
	const userId = await requireUserSEssion(request);

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

	await addExpense(expenseData, userId);
	return redirect("/expenses");
}
