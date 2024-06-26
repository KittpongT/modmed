import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";

type Props = {};

type Role = {
  role_name: string;
  total_hour: number;
  expense: number;
};

export default function Income({ }: Props) {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
  };

  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };
  const [minYear, setMinYear] = useState<number | null>(null);
  const [maxYear, setMaxYear] = useState<number | null>(null);

  const getMinMaxYearApi = async () => {
    try {
      const response = await fetch("http://localhost:3000/getMinMaxYearProfit");
      const data = await response.json();
      setMinYear(parseInt(data[0].min_year));
      setMaxYear(parseInt(data[0].max_year));
      console.log(data);
      console.log(minYear, maxYear);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  const [year, setYear] = useState<number[]>([]);

  useEffect(() => {
    getMinMaxYearApi();
    console.log(minYear, maxYear);
    if (minYear && maxYear) {
      const years = [];
      for (let i = minYear; i <= maxYear; i++) {
        years.push(i);
      }
      setYear(years);
    }
  }, [minYear, maxYear]);

  const [role, setRole] = useState<Role[]>([]);
  const [expense, setExpense] = useState<number | null>(0);
  const [income, setIncome] = useState<number | null>(0);

  const getOutcome = async (month: number | null, year: number | null) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/getExpenseByMonthYear/${month}/${year}`
      );
      const data = await response.json();
      setRole(data);
      var expense_temp = 0;
      for (let i = 0; i < data.length; i++) {
        expense_temp += data[i].expense;
      }
      setExpense(expense_temp);
      console.log(role);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  const getIncome = async (month: number | null, year: number | null) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/getTotalIncome/${month}/${year}`
      );
      const data = await response.json();
      setIncome(data[0].medical_fee);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  useEffect(() => {
    getOutcome(selectedMonth, selectedYear);
    getIncome(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  const getProfit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(selectedMonth, selectedYear);
    getIncome(selectedMonth, selectedYear);
    getOutcome(selectedMonth, selectedYear);
  };

  const profit = income - expense;

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="">
            <div className="text-center">
              <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box text-center">
                <li><a href="/income">Performance Report</a></li>
                <li><a href="/staff_report">Number of Staff Report</a></li>
                <li><a href ="/cases_report">Number of Cases Each Department Report</a></li>
              </ul>
            </div>

            <h1 className="text-5xl font-bold">Performance Summary</h1>
            <form onSubmit={getProfit}>
              <div className="my-5">
                <div>
                  <h2 className="text-2xl">Select Month</h2>
                  <div className="join justify-center">
                    {Array.from({ length: 12 }, (_, index) => (
                      <input
                        key={index}
                        className="join-item btn btn-square"
                        type="radio"
                        name="monthS"
                        value={String(index + 1)}
                        aria-label={String(index + 1)}
                        onChange={() => handleMonthChange(index + 1)}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl">Select Year</h2>
                  <select
                    className="select w-full max-w-xs"
                    onChange={(e) => handleYearChange(Number(e.target.value))}
                  >
                    <option disabled selected>
                      Select Year
                    </option>
                    {year.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
                {/* <button className="btn btn-primary my-2" type="submit">
                  Find
                </button> */}
              </div>
            </form>
            <div className="stats text-primary-content border-4 border-sky-200 shadow-lg">
              <div className="stats stats-vertical lg:stats-horizontal shadow">
                {role.map((r) => (
                  <div className="stat" key={r.role_name}>
                    <div className="stat-title">{r.role_name}</div>
                    <div className="stat-value">{r.expense}</div>
                  </div>
                ))}
              </div>
            </div>
            <br />
            <div className="stats text-primary-content border-4 border-sky-400 shadow-lg my-2">
              <div className="stats stats-vertical lg:stats-horizontal shadow">
                <div className="stat">
                  <div className="stat-title">Income</div>
                  <div className="stat-value">{income}</div>
                  <div className="stat-desc">Baht</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Expense</div>
                  <div className="stat-value">{expense}</div>
                  <div className="stat-desc">Baht</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Profit</div>
                  <div className={`stat-value ${profit > 0 ? 'text-green-400' : 'text-red-500'}`}>{profit}</div>
                  <div className="stat-desc">Baht</div>
                </div>
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}
