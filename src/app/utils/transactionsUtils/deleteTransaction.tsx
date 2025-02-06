interface Row {
    name: string;
    status: string;
    method: string;
    amount: number;
  }
  
  interface DeleteItemProps {
    setError: React.Dispatch<React.SetStateAction<string>>;
    setRows: React.Dispatch<React.SetStateAction<Row[]>>
    row: Row;
  }
  
  const deleteItem = async ({ row, setError, setRows }: DeleteItemProps) => {
    if (!row || !row.name) {
      setError("No budget found");
      return;
    }
  
    const email = localStorage.getItem("email");
  
    try {
      const response = await fetch(
        `http://localhost:3002/api/transactions/deleteTransaction`,
        {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
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
  
  export default deleteItem;