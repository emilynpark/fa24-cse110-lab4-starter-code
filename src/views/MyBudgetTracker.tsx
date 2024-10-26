import React, { useState, useContext } from "react";
import AddExpenseForm from "../components/Expense/AddExpenseForm";
import Budget from "../components/Budget/Budget";
import ExpenseList from "../components/Expense/ExpenseList";
import ExpenseTotal from "../components/Expense/ExpenseTotal";
import Remaining from "../components/Remaining";
import { AppContext } from "../context/AppContext";

export const MyBudgetTracker = () => {

  const { budget, setBudget } = useContext(AppContext);
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [budgetInput, setBudgetInput] = useState<number | null>(budget);

  const handleBudgetUpdate = () => {
    if (budgetInput !== null) {
      setBudget(budgetInput);
      setIsEditingBudget(false);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-3">My Budget Planner</h1>
      <div className="row mt-3">
        <div className="col-sm">
          <Budget />
        </div>
        <div className="col-sm">
          <Remaining />
        </div>
        <div className="col-sm">
          <ExpenseTotal />
        </div>
      </div>
      <div className="col-sm">
        <h3 className="mt-3">Set Budget</h3>
          {isEditingBudget ? (
            <>
              <label htmlFor="budget" className="form-label">Budget</label>
              <input
                type="number"
                className="form-control"
                id="budget"
                data-testid="budget-textbox"
                value={budgetInput !== null ? budgetInput : ""}
                onChange={(e) => setBudgetInput(Number(e.target.value))}
              />
              <button type="button" className="btn btn-secondary mt-2" onClick={handleBudgetUpdate} data-testid="save-budget-button">
                Save Budget
              </button>
              <button type="button" className="btn btn-light mt-2" onClick={() => setIsEditingBudget(false)}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <div>{budget !== null ? `$${budget}` : "Not set"}</div>
              <button type="button" className="btn btn-secondary mt-2" onClick={() => setIsEditingBudget(true)} data-testid="update-budget-button">
                Update Budget
              </button>
            </>
          )}
        </div>
      <h3 className="mt-3">Expenses</h3>
      <div className="row mt-3">
        <div className="col-sm">
          <ExpenseList />
        </div>
      </div>
      <h3 className="mt-3">Add Expense</h3>
      <div className="row mt-3">
        <div className="col-sm">
          <AddExpenseForm />
        </div>
      </div>
    </div>
  );
};

export default MyBudgetTracker;