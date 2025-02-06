'use client'

import { useState, useEffect } from 'react';
import balanceIcon from './assets/money-svgrepo-com(1).svg';
import incomeIcon from './assets/profit-diagram-svgrepo-com.svg'
import NavBar from '@/app/components/NavBar';
import { Card } from './components/Card';
import handleBalance from './utils/balanceUtils/handleBalance';
import useGetBalance from './utils/balanceUtils/useGetBalance';
import useGetIncome from './utils/incomeUtils/useGetIncome';
import handleIncome from './utils/incomeUtils/handleIncome';
import { BarChart } from './components/Chart';

export default function HomePage() {
  const [balance, setBalance] = useState<number | null>(null);
  const [income, setIncome] = useState<number | null>(null);
  const [submittedBalance, setSubmittedBalance] = useState<number | null>(null);
  const [submittedIncome, setSubmittedIncome] = useState<number | null>(null);
  const [error, setError] = useState<string | null>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [openCards, setOpenCards] = useState<{ [key: string]: boolean }>({
    balance: false,
    income: false,
  });

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwt_token');
    setToken(jwtToken)
  }, []);

  const handleAddBalance = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!balance) {
      return;
    }

    const newBalance = balance;
    setSubmittedBalance(newBalance);
    setBalance(null);
    setOpenCards({ balance: false });
  };

  const handleAddIncome = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!income) {
      return;
    }

    const newIncome = income;
    setSubmittedIncome(newIncome);
    setIncome(null);
    setOpenCards({ income: false });
  };

  useGetBalance({ setSubmittedBalance, setError });

  useGetIncome({ setSubmittedIncome, setError })

  return (
    <>
      <NavBar
        isMenuOpen={isMenuOpen}
        token={token}
        setIsMenuOpen={setIsMenuOpen}
      />
      <div className='flex flex-col justify-center items-center mt-16 sm:mt-24 gap-16 w-full mb-10'>
        <BarChart />
        <div className='flex flex-col sm:flex-row gap-16'>
          <Card
            id="balance"
            src={balanceIcon}
            isOpen={openCards["balance"]}
            setOpenCards={setOpenCards}
            labelText="balance:"
            submittedBalance={submittedBalance}
            addText="Add your balance"
            value={balance}
            onChange={(e) => setBalance(parseFloat(e.target.value))}
            onClick={!token ? handleAddBalance : () =>
              handleBalance({
                balance,
                setBalance,
                setError,
                setSubmittedBalance,
                setOpenCards
              })}
          />
          <Card
            id='income'
            src={incomeIcon}
            isOpen={openCards["income"]}
            setOpenCards={setOpenCards}
            labelText="Income:"
            submittedIncome={submittedIncome}
            addText="Add your Income"
            value={income}
            onChange={(e) => setIncome(parseFloat(e.target.value))}
            onClick={!token ? handleAddIncome : () =>
              handleIncome({
                income,
                setIncome,
                setError,
                setSubmittedIncome,
                setOpenCards
              })}
          />
        </div>
      </div>
    </>
  )
}


