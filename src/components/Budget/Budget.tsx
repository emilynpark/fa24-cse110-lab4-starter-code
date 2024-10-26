import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Budget = () => {
  const { budget } = useContext(AppContext);
    return (
      <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
        <div data-testid="budget-label">Budget: {budget !== null ? `$${budget}` : "Not set"}</div> {}
      </div>
    );
};

export default Budget;
