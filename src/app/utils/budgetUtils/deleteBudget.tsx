interface Row {
  budgetName: string;
  amount: number;
  date: string;
  category: string;
}

interface DeleteItemProps {
  setError: (error: string) => void;
  setRows: React.Dispatch<React.SetStateAction<Row[]>>
  row: Row;
}

const deleteItem = async ({ row, setError, setRows }: DeleteItemProps) => {
  if (!row) {
    setError("No budget found");
    return;
  }

  const email = localStorage.getItem("email");

  try {
    const response = await fetch(
      `http://localhost:3002/api/budget/deleteBudget`,
      {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          budgetName: row.budgetName,
          email
        })
      }
    );

    const data = await response.json();
    if (data.ok) {
      setRows((prevTasks) => {
        const updatedRows = prevTasks.filter((item) => item.budgetName !== row.budgetName);
        return updatedRows;
      });
    } else {
      setError(data.error || "Failed to delete item");
    }
  } catch (error) {
    console.error("Error connecting to server", error);
    setError("Error connecting to server");
  }
};

export default deleteItem;