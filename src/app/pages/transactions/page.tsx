'use client'

import NavBar from "@/app/components/NavBar";
import { useState } from "react";
import { Form } from "../../components/Form";
import { InputField, SelectField } from "../../components/inputFields";
import { DeleteButton } from "@/app/components/Buttons";
import useGetTransactions from "@/app/utils/transactionsUtils/useGetTransactions";
import handleTransaction from "@/app/utils/transactionsUtils/handleTransaction";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
} from "@/components/ui/table";
import deleteTransaction from "@/app/utils/transactionsUtils/deleteTransaction";

interface Row {
    name: string;
    status: string;
    method: string;
    amount: number;
}

const TransactionsPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [rows, setRows] = useState<Row[]>([]);
    const [name, setName] = useState("");
    const [status, setStatus] = useState("paid");
    const [method, setMethod] = useState("bank-transfer");
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState("");

    const toggleFormOpen = () => {
        setIsFormOpen((prev) => !prev)
    }

    const handleDelete = (rows: any[], index: number) => {
        const newRows = rows.filter((_: any, i: number) => i !== index);
        setRows(newRows)
    }

    const handleAddTransaction = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (name.trim() !== "" && status.trim() !== "" && method.trim() !== "" && amount !== undefined) {
            const newRow = { name, status, method, amount };
            setRows([...rows, newRow]);
            setName("");
            setStatus("");
            setMethod("");
            setAmount(0);
            setIsFormOpen(false);
        } else {
            console.error('error receiving data')
        }
    }

    useGetTransactions({ setRows, setError })

    const token = localStorage.getItem('jwt_token');

    return (
        <>
            <NavBar
                isMenuOpen={isMenuOpen}
                token={token}
                setIsMenuOpen={setIsMenuOpen}
            />
            <div className="sm:mx-96 m-10">
                <h1 className="text-center mb-7">ADD A NEW TRANSACTION</h1>
                <Form
                    isFormOpen={isFormOpen}
                    toggleFormOpen={toggleFormOpen}
                    onSubmit={!token ? handleAddTransaction : (event) =>
                        handleTransaction(event, {
                            rows,
                            setRows,
                            name,
                            setError,
                            setIsFormOpen,
                            status,
                            method,
                            amount
                        })}
                >
                    <InputField
                        id="transaction*"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <InputField
                        id="amount*"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value))}
                    />
                    <SelectField
                        id='status*'
                        onChange={(e) => setStatus(e.target.value)}
                        options={['paid', 'Pending', 'unpaid']}
                        value={status}
                    ></SelectField>
                    <SelectField
                        id='method*'
                        onChange={(e) => setMethod(e.target.value)}
                        options={['Credit-card', 'PayPal', 'Bank-transfer']}
                        value={status}
                    ></SelectField>
                </Form>
                <Table>
                    <TableCaption>A list of your recent transactions.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Transaction</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{row.name}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell>{row.method}</TableCell>
                                    <TableCell className="text-right ml-4">${row.amount}</TableCell>
                                <TableCell>
                                    <DeleteButton
                                        onClick={() => !token ? handleDelete( rows, index ) : deleteTransaction({ 
                                            row, 
                                            setError, 
                                            setRows
                                        })}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">$ {rows.reduce((acc, row) => acc + Number(row.amount), 0)}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </>
    )
}

export default TransactionsPage;
