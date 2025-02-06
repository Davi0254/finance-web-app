interface HandleIncomeProps {
  income: number | null;
  setIncome: (income: number | null) => void;
  setSubmittedIncome: (submittedIncome: number | null) => void;
  setError: (error: string | null) => void;
  setOpenCards: React.Dispatch<React.SetStateAction<{ [key: string]: boolean; }>>
}

type HandleIncomeFunction = (props: HandleIncomeProps) => Promise<void>

const handleIncome: HandleIncomeFunction = async ({
  income,
  setIncome,
  setError,
  setSubmittedIncome,
  setOpenCards
}) => {
  if (income === undefined) {
    setError("income must have a valid number");
    return;
  }

  const email = localStorage.getItem('email');

  try {
    const response = await fetch('http://localhost:3002/api/income/addIncome', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        income,
        email
      }),
    });

    const data = await response.json();

    if (response.ok) {
      if (data.income !== undefined) {
        setIncome(data.income);
        setSubmittedIncome(data.income || 0);
        setIncome(null);
        setError("");
        setOpenCards({ balance: false });
      } else {
        setError(data.error || "Failed to add income");
      }
    } else {
      setError(data.message || "Failed to add income");
    }
  } catch (error) {
    console.error("Error adding income:", error);
    setError("Error connecting to server");
  }
};

export default handleIncome;