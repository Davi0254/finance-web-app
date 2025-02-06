"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Roboto } from "next/font/google";
import deleteBudget from "../utils/budgetUtils/deleteBudget";
import houseIcon from '../assets/house-svgrepo-com.svg';
import hamburgerIcon from '../assets/hamburger-svgrepo-com.svg';
import healthIcon from '../assets/health-healthcare-hospital-medic-medical-medicine-svgrepo-com.svg';
import busIcon from '../assets/bus-svgrepo-com.svg';
import bulbIcon from '../assets/electricity-bill-svgrepo-com.svg';
import { DeleteButton } from './Buttons';

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

interface Row {
    budgetName: string;
    amount: number;
    category: string;
    date?: string;
}

interface TableProps {
    setError: (error: string | null) => void;
    setRows: React.Dispatch<React.SetStateAction<Row[]>>
    rows: Row[];
}

const Table: React.FC<TableProps> = ({ setError, setRows, rows }) => {
    const [token, setToken] = useState<string | null>(null);

    const handleDelete = (index: number) => {
        const newRows = rows.filter((_, i) => i !== index);
        setRows(newRows);
    };

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwt_token');
        setToken(jwtToken)
    }, [])

    return (
        <div className={`mb-7 text-sm ${roboto.className}`}>
            <div className="grid border grid-cols-5 mb-1 border-gray-800 bg-white text-gray-900 shadow  ml-4 mr-4 sm:mr-96 sm:ml-96 text-center rounded-md">
                <div className="border-b">
                    <ul>budget</ul>
                </div>
                <div className="border-b">
                    <ul>amount</ul>
                </div>
                <div className="border-b">
                    <ul>date</ul>
                </div>
                <div className="border-b">
                    <ul>category</ul>
                </div>
            </div>
            {rows.map((row, index) => {
                return (
                    <div
                        key={index}
                        className={`grid grid-cols-5 items-center flex-shrink-0 border border-gray-800 bg-white rounded-md
                     text-gray-900 shadow mx-4 my-1 sm:mr-96 sm:ml-96 text-center p-1 ${roboto.className}`}
                    >
                        <ul>{row.budgetName}</ul>
                        <ul>${row.amount}</ul>
                        <ul className='text-xs'>{row.date}</ul>
                        <ul>
                            {row.category === 'Housing' && (
                                <li className='flex gap-1 justify-center'>
                                    <Image
                                        src={houseIcon}
                                        height={18}
                                        width={18}
                                        alt='icon'
                                    />
                                    {row.category}
                                </li>
                            )}
                            {row.category === 'Food' && (
                                <li className='flex gap-1 justify-center'>
                                    <Image
                                        src={hamburgerIcon}
                                        height={18}
                                        width={18}
                                        alt='icon'
                                    />
                                    {row.category}
                                </li>
                            )}
                            {row.category === 'Health' && (
                                <li className='flex gap-1 justify-center'>
                                    <Image
                                        src={healthIcon}
                                        height={18}
                                        width={18}
                                        alt='icon'
                                    />
                                    {row.category}
                                </li>
                            )}
                            {row.category === 'Transportation' && (
                                <li className='flex flex-col items-center gap-1 justify-center'>
                                    <Image
                                        src={busIcon}
                                        height={18}
                                        width={18}
                                        alt='icon'
                                    />
                                    {row.category}
                                </li>
                            )}
                            {row.category === 'Utilities' && (
                                <li className='flex gap-1 justify-center'>
                                    <Image
                                        src={bulbIcon}
                                        height={18}
                                        width={18}
                                        alt='icon'
                                    />
                                    {row.category}
                                </li>
                            )}
                        </ul>
                        <div>
                            <div>
                                <DeleteButton
                                    onClick={() => token ? deleteBudget({ row, setError, setRows }) : handleDelete(index)}
                                />
                            </div>
                        </div>
                    </div>
                );
            })
            }
            <div className="flex border border-gray-800 bg-white justify-center text-gray-900 shadow ml-4 mr-4 sm:mr-96 sm:ml-96 text-center rounded-md">
                <div className="border-b">
                    <ul>Total value</ul>
                </div>
            </div>
            <div className="flex border mt-1 border-gray-800 bg-white justify-center text-gray-900 shadow ml-4 mr-4 sm:mr-96 sm:ml-96 text-center rounded-md">
                <div className="border-b">
                    <div className="flex gap-1">
                        <p>$</p>
                        {rows.reduce((acc, row) => acc + Number(row.amount), 0)}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Table;


