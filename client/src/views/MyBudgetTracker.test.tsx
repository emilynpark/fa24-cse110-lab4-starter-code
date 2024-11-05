import { ReactNode } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AppProvider } from "../context/AppContext";
import MyBudgetTracker from "./MyBudgetTracker";

const renderWithContext = (children: ReactNode) => {
  return render(<AppProvider>{children}</AppProvider>);
};

describe("Expense Creation", () => {
  test("verifies that a new expense is correctly added to the expense list, and ensures that the total spent and remaining amount are updated accordingly", async () => {
    renderWithContext(<MyBudgetTracker />);
  
    const descriptionInput = screen.getByLabelText(/description/i);
    const costInput = screen.getByLabelText(/cost/i);

    fireEvent.change(descriptionInput, { target: { value: "Computer" } });
    fireEvent.change(costInput, { target: { value: 800 } });
    fireEvent.click(screen.getByTestId("save-expense-button"));

    expect(screen.getByText("Computer")).toBeInTheDocument();
    expect(screen.getByText("$800")).toBeInTheDocument();

    const totalSpent = screen.getByText(/spent so far:/i);
    expect(totalSpent).toHaveTextContent("Spent so far: $800");

    const remainingBudget = screen.getByText(/remaining:/i);
    expect(remainingBudget).toHaveTextContent("Remaining: $200");
  });
});

describe("Expense Deletion", () => {
    test("confirms that an expense was successfully removed from the list, and ensures that the total spent and remaining amount are updated accordingly", () => {
        renderWithContext(<MyBudgetTracker />);

        const descriptionInput = screen.getByLabelText(/description/i);
        const costInput = screen.getByLabelText(/cost/i);

        fireEvent.change(descriptionInput, { target: { value: "Utilities" } });
        fireEvent.change(costInput, { target: { value: 200 } });
        fireEvent.click(screen.getByTestId("save-expense-button"));

        expect(screen.getByText("Utilities")).toBeInTheDocument();
        expect(screen.getByText("$200")).toBeInTheDocument();

        const totalSpent = screen.getByText(/spent so far:/i);
        expect(totalSpent).toHaveTextContent("Spent so far: $200");

        const remainingBudget = screen.getByText(/remaining:/i);
        expect(remainingBudget).toHaveTextContent("Remaining: $800");

        const deleteButton = screen.getByTestId("delete-expense-button");
        fireEvent.click(deleteButton);
        expect(screen.queryByText("Utilities")).not.toBeInTheDocument();
        expect(screen.queryByText("$200")).not.toBeInTheDocument();

        expect(totalSpent).toHaveTextContent("Spent so far: $0");
        expect(remainingBudget).toHaveTextContent("Remaining: $600");
    });
});

describe("Budget Balance Verification", () => {
  test("validates that the equation budget = remaining balance + total expenditure holds true after various operations", () => {
    renderWithContext(<MyBudgetTracker />);

    const initialBudget = 1400;
    fireEvent.click(screen.getByTestId("update-budget-button"));
    fireEvent.change(screen.getByTestId("budget-textbox"), { target: { value: initialBudget } });
    fireEvent.click(screen.getByTestId("save-budget-button"));

    const remainingBudget = screen.getByText(/remaining:/i);
    expect(remainingBudget).toHaveTextContent("Remaining: $1400");
    
    const nameInput = screen.getByLabelText(/name/i);
    const costInput = screen.getByLabelText(/cost/i);

    const expenseName = "Rent";
    const expenseCost = 900;

    fireEvent.change(nameInput, { target: { value: expenseName } });
    fireEvent.change(costInput, { target: { value: expenseCost } });
    fireEvent.click(screen.getByTestId("save-expense-button"));

    const totalExpenditure = expenseCost;
    const remainingBalance = initialBudget - totalExpenditure;

    expect(screen.getByText(/spent so far:/i)).toHaveTextContent(`Spent so far: $${totalExpenditure}`);
    expect(screen.getByText(/remaining:/i)).toHaveTextContent(`Remaining: $${remainingBalance}`);

    expect(initialBudget).toEqual(remainingBalance + totalExpenditure);
  });
});

describe("Budget Update", () => {
    test("checks if the budget is updated correctly after it is edited", () => {
      renderWithContext(<MyBudgetTracker />);

      fireEvent.click(screen.getByTestId("update-budget-button"));
      fireEvent.change(screen.getByTestId("budget-textbox"), { target: { value: 800 } });
      fireEvent.click(screen.getByTestId("save-budget-button"));

      const budgetLabel = screen.getByText(/budget:/i);
      expect(budgetLabel).toHaveTextContent("Budget: $800");

      fireEvent.click(screen.getByTestId("update-budget-button"));
      fireEvent.change(screen.getByTestId("budget-textbox"), { target: { value: 1100 } });
      fireEvent.click(screen.getByTestId("save-budget-button"));

      expect(budgetLabel).toHaveTextContent("Budget: $1100");
    });
});  