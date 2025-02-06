interface Row {
  name: string;
  target_value: number;
  completion_date: any;
}

interface handleGoalsProps {
  name: string;
  target_value: number;
  completion_date: any
  rows: Row[];
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRows: (rows: Row[] | ((prevRows: Row[]) => Row[])) => void;
  setError: (error: string) => void;
}

const handleGoals = async (event: React.FormEvent<HTMLFormElement>, {
  rows,
  setRows,
  name,
  target_value,
  completion_date,
  setError,
  setIsFormOpen,
}: handleGoalsProps) => {
  event.preventDefault();
  if (
    !name || !target_value) {
    setError("all fields are required");
    return;
  }

  const email = localStorage.getItem("email");

  try {
    const response = await fetch("http://localhost:3002/api/Goals/addGoal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, target_value, completion_date, email })
    });

    const data = await response.json();
  
    if (response.ok) {
      const newRow: Row = {
        name: data.name,
        target_value: data.target_value,
        completion_date: data.completion_date
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

export default handleGoals;