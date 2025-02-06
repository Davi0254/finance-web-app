'use client'

import { useEffect } from "react";

interface GoalsApiResponse {
    goal: string;
    target_value: number;
    completion_date: any;
}

interface Row {
    name: string;
    target_value: number;
    completion_date: any;
}

interface useGetGoalsProps {
    setRows: React.Dispatch<React.SetStateAction<Row[]>>
    setError: React.Dispatch<React.SetStateAction<string>>
}

const useGetGoals = ({ setRows, setError }: useGetGoalsProps): void => {
    useEffect(() => {
        const fetchGoals = async () => {
            const email = localStorage.getItem("email");

            if (!email) {
                setError("Email not found");
                return;
            }

            try {
                const response = await fetch(
                    `http://localhost:3002/api/goals/getGoals?email=${email}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                const data: GoalsApiResponse[] = await response.json();
                if (response.ok) {
                    setRows([
                        ...data.map((item) => ({
                            name: item.goal,
                            target_value: item.target_value,
                            completion_date: item.completion_date,
                        })),
                    ]);
                }
            } catch (error) {
                console.error(error);
                setError("Failed to fetch goals");
            }
        };

        fetchGoals();
    }, [setError, setRows]);
};

export default useGetGoals;