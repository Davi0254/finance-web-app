interface BudgetItem {
    budget: string
    amount: string
} 

export const getChartData = async () => {
    try {

        const email = localStorage.getItem('email');

        const response = await fetch(`http://localhost:3002/api/budget/getBudget?email=${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch budget data');
        }

        const data = await response.json();

        const barChartData = {
            labels: data.map((item: BudgetItem) => item.budget),
            datasets: [
                {
                    label: 'Expenses',
                    data: data.map((item: BudgetItem) => parseFloat(item.amount)),
                    backgroundColor: ["pink", "blue", "gray", "green", "red"],
                    borderColor: "",
                    borderWidth: 1,
                },
            ],
        };

        return barChartData;
    } catch (error) {
        console.error('Error fetching chart data:', error);
        return null;
    }
};

export const barChartData = {
    labels: [
        'rent',
        'transportation',
        'food',
        'internet',
        'electricity'
    ],
    datasets: [
        {
            label: 'expenses',
            data: ['800', '150', '200', '100', '150'],
            backgroundColor: [
                "pink",
                "blue",
                "gray",
                "green",
                "red"
            ],
            borderColor: "",
            borderWidth: 1,
        },
    ],
}