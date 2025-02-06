import { useEffect } from "react";

interface useGetIncomeProps {
  setSubmittedIncome: (submittedIncome: number | null) => void;
  setError: (error: string | null) => void;
}

const useGetIncome = ({setSubmittedIncome, setError }: useGetIncomeProps): void => {
  useEffect(() => {
    const fetchIncome = async () => {
      const email = localStorage.getItem("email");

      if (!email) {
        console.error("email not found");
        setError("Email not found"); 
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3002/api/income/getIncome?email=${email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setSubmittedIncome(data.income || 0);
        } else {
          setError(data.error || "You dont have Income");
        }
      } catch (error) {
        console.error("Error getting Income:", error);
        setError("Error connecting to server");
      }
    };

    fetchIncome();
  }, [setSubmittedIncome, setError]);
};

export default useGetIncome;