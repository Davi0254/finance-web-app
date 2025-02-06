"use client";

import React, { useState, useEffect, FormEvent } from "react";
import NavBar from "@/app/components/NavBar";
import { Roboto } from "next/font/google";
import { Form } from "@/app/components/Form";
import { InputField } from "@/app/components/inputFields";
import { DeleteButton } from "@/app/components/Buttons";
import handleGoals from "@/app/utils/goalsUtils/handleGoals";
import useGetGoals from "../../utils/goalsUtils/useGetGoals";
import deleteGoal from "../../utils/goalsUtils/deleteGoal";

const roboto = Roboto({ weight: '400', subsets: ["latin"] })

interface Row {
  name: string;
  target_value: number;
  completion_date: any;
}

const Goals = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [rows, setRows] = useState<Row[]>([]);
  const [name, setName] = useState<string>("");
  const [target_value, setTarget_value] = useState<number>(0);
  const [completion_date, setCompletion_date] = useState<any>("");
  const [completed, setCompleted] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const toggleFormOpen = () => {
    setIsFormOpen((prev) => !prev);
  };

  const handleDelete = (rows: any[], index: number) => {
    const newRows = rows.filter((_: any, i: number) => i !== index);
    setRows(newRows)
  }

  const handleAddGoals = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.trim() !== "" && !target_value && !completion_date) {
      const newRows = { name, target_value, completion_date };
      setRows([...rows, newRows]);
      setName("");
      setTarget_value(0);
      setCompletion_date("");
      setIsFormOpen(false);
    }
  };

  useGetGoals({ setRows, setError })

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwt_token');
    setToken(jwtToken)
  }, []);

  return (
    <>
      <NavBar
        token={token}
        setIsMenuOpen={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
      />
      <div className="flex flex-col gap-4 items-center mt-10">
        <h1>ADD A FINANCE GOAL</h1>
        <Form
          isFormOpen={isFormOpen}
          toggleFormOpen={toggleFormOpen}
          onSubmit={(e) => {
            e.preventDefault();
            !token ? handleAddGoals(e) : handleGoals(e, {
              rows,
              setRows,
              name,
              setError,
              setIsFormOpen,
              target_value,
              completion_date
            })
          }}
        >
          <InputField
            id="Goal*"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputField
            id="target value*"
            type="number"
            value={target_value}
            onChange={(e) => setTarget_value(parseFloat(e.target.value))}
          />
          <div className="flex flex-col">
            <label htmlFor="date">date to completion *</label>
            <input
              className="border py-1 bg-white bg-opacity-60 rounded border-gray-600 w-44 hover:border-gray-900"
              type="date"
              id="date"
              value={completion_date}
              onChange={(e) => setCompletion_date(e.target.value)}
            />
          </div>
        </Form>
        <div className="flex flex-col mt-10 gap-6 justify-center">
          {rows.map((row, index) => {
            return (
              <ul
                key={index}
                className={`flex flex-col justify-center items-center bg-white rounded-md gap-4 border-solid shadow border-gray-300 pr-10 pl-10 py-10 mb-10 ${roboto.className}`}
              >
                <li>goal: {row.name}</li>
                <li>target_value: {row.target_value}</li>
                <li>date to completion: {row.completion_date}</li>
                <div className="flex gap-1">
                  <input type="checkbox" id="checkbox"></input>
                  <label htmlFor="checkbox" className="text-sm mt-1">
                    completed
                  </label>
                </div>
                <DeleteButton
                  onClick={() => !token ? handleDelete(rows, index): deleteGoal({ row, setError, setRows })}
                />
              </ul>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Goals;



