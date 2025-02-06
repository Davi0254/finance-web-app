import { useEffect } from "react";

interface Row {
  name: string;
  target_value: number;
  completion_date: string | number;
}

interface DeleteGoalProps {
  setError: React.Dispatch<React.SetStateAction<string>>;
  setRows: (rows: Row[] | ((prevRows: Row[]) => Row[])) => void;
  row: Row;
}

const deleteGoal = async ({ row, setError, setRows }: DeleteGoalProps) => {
  if (!row || !row.name) {
    setError("No budget found");
    return;
  }

  const email = localStorage.getItem("email");

  try {
    const response = await fetch(
      'http://localhost:3002/api/goals/deleteGoal',
      {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name: row.name,
        })
      }
    );

    const data = await response.json();
    if (data.ok) {
      setRows((prevTasks) => {
        const updatedRows = prevTasks.filter((item) => item.name !== row.name);
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

export default deleteGoal;