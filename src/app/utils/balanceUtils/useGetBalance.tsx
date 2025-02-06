import { useEffect } from "react";

interface useGetBalanceProps {
  setSubmittedBalance: (submittedBalance: number | null) => void;
  setError: (error: string | null) => void;
}

const useGetBalance = ({setSubmittedBalance, setError }: useGetBalanceProps): void => {
  useEffect(() => {
    const fetchBalance = async () => {
      const email = localStorage.getItem("email");

      if (!email) {
        console.error("email not found");
        setError("Email not found"); 
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3002/api/balance/getBalance?email=${email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setSubmittedBalance(data.balance || 0);
        } else {
          setError(data.error || "You dont have balance");
        }
      } catch (error) {
        console.error("Error getting balance:", error);
        setError("Error connecting to server");
      }
    };

    fetchBalance();
  }, [setSubmittedBalance, setError]);
};

export default useGetBalance;