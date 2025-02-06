interface Row {
    name: string;
    status: string;
    method: string;
    amount: number;
  }
  
  interface handleTransactionsProps  {
    name: string;
    status: string;
    method: string;
    amount: number;
    rows: Row[];
    setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setRows: React.Dispatch<React.SetStateAction<Row[]>>;
    setError: (error: string) => void;
  }
  
  const handleTransactions = async (event: React.FormEvent<HTMLFormElement>, {
    rows,
    setRows,
    name,
    setError,
    setIsFormOpen,
    status,
    method,
    amount
  }: handleTransactionsProps) => {
    event.preventDefault();
    if (
      !name ||
      name.trim() === "" ||
      !status ||
      status.trim() === "" ||
      !method ||
      method.trim() === "" ||
      amount === undefined
    ) {
      setError("all fields are required");
      return;
    }
  
    console.log(name, status, method, amount)
  
    const email = localStorage.getItem("email");
  
    try {
      const response = await fetch("http://localhost:3002/api/transactions/addTransaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          status,
          method,
          amount,
          email,
        }),
      });
  
      const data = await response.json();
  
      const date = new Date();
  
      if (response.ok) {
        const newRow = {
          name: data.name,
          status: data.status,
          method: data.method,
          amount: data.amount,
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
  
  export default handleTransactions;