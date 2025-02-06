interface Row {
  budgetName: string;
  amount: number;
  category: string;
}

interface handleBudgetProps {
  budgetName: string | null;
  amount: number | null;
  category: string | null;
  setError: (error: string | null) => void;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  rows: Row[];
  setRows: (rows: Row[] | ((prevRows: Row[]) => Row[])) => void;
}

const handleBudget = async (e: React.FormEvent<HTMLFormElement>, {
  rows,
  setRows,
  budgetName,
  amount,
  category,
  setError,
  setIsFormOpen
}: handleBudgetProps) => {
  e.preventDefault();
  if (
    !budgetName ||
    budgetName.trim() === "" ||
    !amount ||
    !category ||
    category.trim() === ""
  ) {
    setError("all fields are required");
    return;
  }

  const email = localStorage.getItem("email");

  try {
    const response = await fetch("http://localhost:3002/api/budget/addBudget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        budgetName,
        amount,
        category,
        email,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      const newRow = {
        budgetName: data.budgetName,
        amount: data.amount,
        category: data.category,
      };
      setRows([...rows, newRow]);
      setIsFormOpen(false);
    } else {
      setError(data.error || "Failed to update budget");
    }
  } catch (error) {
    console.error("Error updating balance:", error);
    setError("Error connecting to server");
  }
};

export default handleBudget;