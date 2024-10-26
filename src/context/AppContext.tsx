import { createContext, useState } from "react";
import { Expense } from "../types/types";

interface AppContextType {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  budget: number | null;
  setBudget: React.Dispatch<React.SetStateAction<number | null>>;
}

const initialState: AppContextType = {
  expenses: [],
  setExpenses: () => {},
  budget: null,
  setBudget: () => {},
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = (props: any) => {
  const [expenses, setExpenses] = useState<Expense[]>(initialState.expenses);
  const [budget, setBudget] = useState<number | null>(initialState.budget);

  return (
    <AppContext.Provider
      value={{
        expenses: expenses,
        setExpenses: setExpenses,
        budget: budget,
        setBudget: setBudget,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
