import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";

const ExpenseItem = (currentExpense: Expense) => {
  const { expenses, setExpenses } = useContext(AppContext);

  const handleDeleteExpense = async (expense: Expense) => {
    try {
      const response = await fetch(`http://localhost:8080/expenses/${expense.id}`, {
      method: 'DELETE',
    });
      if (!response.ok) {
          throw new Error("Unable to delete expense");
      }
        const updatedExpenses = expenses.filter(e => e.id !== expense.id);
        setExpenses(updatedExpenses);
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };


  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.description}</div>
      <div>${currentExpense.cost}</div>
      <div>
        <button onClick={() => handleDeleteExpense(currentExpense)} data-testid="delete-expense-button">x</button>
      </div>
    </li>
  );
};

export default ExpenseItem;
