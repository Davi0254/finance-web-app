import { useEffect } from "react";

interface BudgetApiResponse {
    budget: string;
    amount: number;
    created_at: string;
    category: string;
  }

  interface Row {
    budgetName: string;
    amount: number;
    date: string;
    category: string;
  }
  
  interface useGetBudgetProps {
      setError: (error: string | null) => void;
      setRows: (rows: Row[]) => void;
  }
  
  const useGetBudget = ({ setRows, setError }: useGetBudgetProps): void => {
    useEffect(() => {
      const fetchBudget = async () => {
        const email = localStorage.getItem("email");
  
        if (!email) {
          setError("Email not found");
          return;
        }
  
        try {
          const response = await fetch(
            `http://localhost:3002/api/budget/getBudget?email=${email}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
  
          const data: BudgetApiResponse[] = await response.json();
  
          if (response.ok) {
            setRows([
              ...data.map((item)  => ({
                budgetName: item.budget,
                amount: item.amount,
                date: new Date(item.created_at).toLocaleDateString(),
                category: item.category,
              })),
            ]);
          } else {
            setError("Couldn't get data");
          }
        } catch (error) {
          console.error("Error connecting to server:", error);
          setError("Error connecting to server");
        }
      };
  
      fetchBudget();
    }, []);
  };

  export default useGetBudget;