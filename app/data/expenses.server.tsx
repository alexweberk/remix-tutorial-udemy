import { prisma } from "./database.server";

export interface ExpenseData {
	title: string;
	amount: string;
	date: string;
}

export async function addExpense(expenseData: ExpenseData, userId: string) {
	try {
		return await prisma.expense.create({
			data: {
				title: expenseData.title,
				amount: +expenseData.amount,
				date: new Date(expenseData.date),
				User: { connect: { id: userId } },
			},
		});
	} catch (error) {
		throw new Error("Failed to add expense.");
	}
}

export async function getExpenses(userId: string) {
	if (!userId) {
		throw new Error("User not found.");
	}
	try {
		const expenses = await prisma.expense.findMany({
			where: { userId },
			orderBy: { date: "desc" },
		});
		return expenses;
	} catch (error) {
		throw new Error("Failed to get expenses.");
	}
}

export async function getExpense(id: string) {
	try {
		const expense = await prisma.expense.findFirst({
			where: { id },
		});
		return expense;
	} catch (error) {
		throw new Error("Failed to get expense.");
	}
}

export async function updateExpense(id: string, expenseData: ExpenseData) {
	try {
		const expense = await prisma.expense.update({
			where: { id },
			data: {
				title: expenseData.title,
				amount: +expenseData.amount,
				date: new Date(expenseData.date),
			},
		});
		return expense;
	} catch (error) {
		throw new Error("Failed to update expense.");
	}
}

export async function deleteExpense(id: string) {
	try {
		const expense = await prisma.expense.delete({
			where: { id },
		});
		return expense;
	} catch (error) {
		throw new Error("Failed to delete expense.");
	}
}
