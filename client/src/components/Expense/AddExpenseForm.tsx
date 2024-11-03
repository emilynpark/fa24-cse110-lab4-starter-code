import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";
import { createExpense } from "../../../src/utils/expense-utils"

const AddExpenseForm = () => {
  const { expenses, setExpenses } = useContext(AppContext);

  const [description, setDescription] = useState<string>("");
  const [cost, setCost] = useState<number>(0);

  let idCounter = 0;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newExpense: Expense = { id: `expense-${idCounter++}`, description, cost };

    createExpense(newExpense);
    setExpenses([...expenses, newExpense]);

    setDescription("");
    setCost(0);

  };

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="description">Description</label>
          <input
            required
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="number"
            className="form-control"
            id="cost"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
          />
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3" data-testid="save-expense-button">
            Save Expense
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;

