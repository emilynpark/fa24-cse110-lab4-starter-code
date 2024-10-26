import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses, budget } = useContext(AppContext);

  const totalExpenses = expenses.reduce((total, item) => {
    return total + item.cost;
  }, 0);

  const alertType = totalExpenses > (budget ?? 0) ? "alert-danger" : "alert-success";

  useEffect(() => {
    if (budget !== null && totalExpenses > budget) {
      window.alert("You have exceeded your budget!");
    }
  }, [totalExpenses, budget]);

  const remainingAmount = budget !== null ? budget - totalExpenses : null;

  return (
    <div className={`alert ${alertType}`}>
      <span>
      Remaining: {remainingAmount !== null ? `$${remainingAmount}` : "Not set"}
      </span>
    </div>
  );
};

export default Remaining;

