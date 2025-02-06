'use client'

import { useState, FormEvent, useEffect } from "react";
import NavBar from "@/app/components/NavBar";
import Table from "@/app/components/Table";
import { Roboto } from "next/font/google";
import handleBudget from "@/app/utils/budgetUtils/handleBudget";
import useGetBudget from "@/app/utils/budgetUtils/useGetBudget";
import { Form } from "@/app/components/Form";
import { InputField, SelectField } from "../../components/inputFields";
import { BarChart } from '../../components/Chart';

const roboto = Roboto({ weight: '400', subsets: ["latin"] })

interface BudgetRow {
    budgetName: string;
    amount: number;
    date?: string;
    category: string;
}

const budgetPage: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [rows, setRows] = useState<BudgetRow[]>([]);
    const [budgetName, setBudgetName] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [category, setCategory] = useState<string>("housing");
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useGetBudget({ setError, setRows });

    const handleAddBudget = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const date = new Date().toDateString()

        if (budgetName.trim() !== "" && amount && category.trim() !== "") {
            const newRow = { budgetName, amount, category, date };
            setRows([...rows, newRow]);
            setBudgetName("");
            setAmount(0);
            setCategory("");
            setIsFormOpen(false);
        }
    }

    const toggleFormOpen = () => {
        setIsFormOpen((prev) => !prev)
    }

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwt_token');
        setToken(jwtToken)
    }, []);

    return (
        <>
            <div className={`mb-10 ${roboto.className}`}>
                <NavBar token={token} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}
                />
                <div className="flex flex-col items-center gap-4 mb-4 mt-10">
                    <h1>BUDGET</h1>
                    <Form
                        isFormOpen={isFormOpen}
                        toggleFormOpen={toggleFormOpen}
                        onSubmit={(e) => {
                            e.preventDefault();
                            !token ? handleAddBudget(e) : handleBudget(e, {
                                rows,
                                setRows,
                                budgetName,
                                setError,
                                setIsFormOpen,
                                amount,
                                category,
                            })
                        }}
                    >
                        <InputField
                            id="budget*"
                            type="text"
                            value={budgetName}
                            onChange={(e) => setBudgetName(e.target.value)}
                        />
                        <InputField
                            id="amount*"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(parseFloat(e.target.value))}
                        />
                        <SelectField
                            id='category*'
                            onChange={(e) => setCategory(e.target.value)}
                            options={['Housing', 'Food', 'Health', 'Transportation', 'Utilities']}
                            value={category}
                        >
                        </SelectField>
                    </Form>
                    <BarChart />
                </div>
            </div>
            <Table
                rows={rows}
                setError={setError}
                setRows={setRows}
            />

        </>
    )
}

export default budgetPage;






