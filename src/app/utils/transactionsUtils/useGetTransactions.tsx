import { useEffect } from "react";

interface Row {
    name: string;
    status: string;
    method: string;
    amount: number;
  }

 interface useGetTransactionsProps {
    setRows: React.Dispatch<React.SetStateAction<Row[]>>
    setError: React.Dispatch<React.SetStateAction<string>>
 }

  const useGetTransactions = ({ setRows, setError }: useGetTransactionsProps): void => {
    useEffect(() => {
        const   fetchTransactions = async () => {
            const email = localStorage.getItem("email");

            if (!email) {
                setError("Email not found");
                return;
            }

            try {
                const response = await fetch(
                    `http://localhost:3002/api/transactions/getTransactions?email=${email}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                const data: Row[] = await response.json();
                
                if (response.ok) {
                    setRows([
                        ...data.map((item) => ({
                            name: item.name,
                            status: item.status,
                            method: item.method,
                            amount: item.amount
                        })),
                    ]);
                }
            } catch (error) {
                console.error(error);
                setError("Failed to fetch transactions");
            }
        };

        fetchTransactions();
    }, [setError, setRows]);
};

export default useGetTransactions;