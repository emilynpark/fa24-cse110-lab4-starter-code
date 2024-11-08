import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [budgetInput, setBudgetInput] = useState(budget.toString());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBudget();
    }, []);

  useEffect(() => {
    setBudgetInput(budget.toString());
  }, [budget]);

  const loadBudget = async () => {
    try {
      const budgetAmount = await fetchBudget();
      setBudget(budgetAmount);
    } catch (err: any) {
      console.log(err.message);
    }
    };

  const handleSave = async () => {
    try {
      const updatedBudget = await updateBudget(Number(budgetInput));
      setBudget(updatedBudget);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating budget:", err);
      setError("Failed to update the budget. Please try again.");
    }
  };

  return (
    <div>
      <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
        {isEditing ? (
          <>
            <input
              type="number"
              className="form-control me-2"
              value={budgetInput}
              data-testid="budget-textbox"
              onChange={(e) => setBudgetInput(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" data-testid="save" onClick={handleSave}>
              Save
            </button>
            <button className="btn btn-light" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
            {error && <div className="text-danger ms-2">{error}</div>}
          </>
        ) : (
          <>
            <div data-testid="budget-label">Budget: ${budget}</div>
            <button className="btn btn-secondary" data-testid="edit" onClick={() => {setIsEditing(true);}}>
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Budget;