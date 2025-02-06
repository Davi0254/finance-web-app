interface HandleBalanceProps {
  balance: number | null;
  setBalance: (balance: number | null) => void;
  setSubmittedBalance: (submittedBalance: number | null) => void;
  setError: (error: string | null) => void;
  setOpenCards: React.Dispatch<React.SetStateAction<{[key: string]: boolean;}>>
}

type HandleBalanceFunction = (props: HandleBalanceProps) => Promise<void>

const handleBalance: HandleBalanceFunction = async ({
  balance,
  setBalance,
  setError,
  setSubmittedBalance,
  setOpenCards
}) => {
  if (balance === undefined) {
    setError("balance must have a valid number");
    return;
  }

  const email = localStorage.getItem('email');

  try {
    const response = await fetch("http://localhost:3002/api/balance/addBalance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        balance,
        email
      }),
    });

    const data = await response.json();
   
    if (response.ok) {
      if (data.balance !== undefined) {
        setBalance(data.balance);
        setSubmittedBalance(data.balance || 0);
        setBalance(null);
        setError("");
        setOpenCards({ balance: false });
      } else {
        setError(data.error || "Failed to add balance");
      }
    } else {
      setError(data.message || "Failed to add balance");
    }
  } catch (error) {
    console.error("Error adding balance:", error);
    setError("Error connecting to server");
  }
};

export default handleBalance;